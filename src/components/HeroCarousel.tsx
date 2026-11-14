import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../data/products';
import { HardwareImage } from './HardwareImage';

interface HeroCarouselProps {
  onOpenFeaturedModal: (productId: string) => void;
  onOpenProductPage: (productId: string) => void;
}

export function HeroCarousel({
  onOpenFeaturedModal,
  onOpenProductPage,
}: HeroCarouselProps) {
  const totalSlides = HERO_SLIDES.length;
  // Append cloned first slide for seamless right-to-left loop on wrap-around
  const trackSlides = [...HERO_SLIDES, HERO_SLIDES[0]];

  const [trackIndex, setTrackIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchResumeTimer = useRef<number | null>(null);

  const activeIndex = trackIndex % totalSlides;
  const isPaused = isHovered || isTouched || isFocused;

  const handleNext = useCallback(() => {
    setTrackIndex((prev) => {
      if (prev >= totalSlides) return 0;
      return prev + 1;
    });
    setIsTransitionEnabled(true);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    if (trackIndex === 0) {
      setIsTransitionEnabled(false);
      setTrackIndex(totalSlides);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsTransitionEnabled(true);
          setTrackIndex(totalSlides - 1);
        });
      });
    } else {
      setIsTransitionEnabled(true);
      setTrackIndex((prev) => Math.max(0, prev - 1));
    }
  }, [trackIndex, totalSlides]);

  const handleSelectSlide = (index: number) => {
    setIsTransitionEnabled(true);
    setTrackIndex(index);
  };

  const handleTrackTransitionEnd = () => {
    if (trackIndex === totalSlides) {
      setIsTransitionEnabled(false);
      setTrackIndex(0);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsTransitionEnabled(true);
        });
      });
    }
  };

  useEffect(() => {
    if (trackIndex !== totalSlides) return;
    const fallback = window.setTimeout(() => {
      setIsTransitionEnabled(false);
      setTrackIndex(0);
      window.requestAnimationFrame(() => {
        setIsTransitionEnabled(true);
      });
    }, 600);
    return () => window.clearTimeout(fallback);
  }, [trackIndex, totalSlides]);

  // 3-second auto-scroll when user is not interacting
  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      handleNext();
    }, 3000);

    return () => window.clearInterval(timer);
  }, [isPaused, handleNext, trackIndex]);

  useEffect(() => {
    return () => {
      if (touchResumeTimer.current !== null) {
        window.clearTimeout(touchResumeTimer.current);
      }
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (touchResumeTimer.current !== null) {
      window.clearTimeout(touchResumeTimer.current);
      touchResumeTimer.current = null;
    }
    setIsTouched(true);
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
      const deltaX = touchStartX.current - endX;
      if (Math.abs(deltaX) > 40) {
        if (deltaX > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
      touchStartX.current = null;
    }

    touchResumeTimer.current = window.setTimeout(() => {
      setIsTouched(false);
    }, 1200);
  };

  const handleTouchCancel = () => {
    touchStartX.current = null;
    setIsTouched(false);
  };

  return (
    <section
      id="top"
      aria-label="Featured hardware showcase"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setIsFocused(false);
        }
      }}
      className="bg-white border-b border-slate-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:py-10 lg:py-12">
        {/* Full-Image Overlay Carousel Frame */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950">
          {/* Persistent Prev / Next Controls Pinned Cleanly Top-Right Over Scrim */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center px-2.5 h-10 rounded-lg bg-slate-950/60 backdrop-blur-md border border-white/15 font-mono text-xs text-white/90 tabular-nums mr-1">
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(totalSlides).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-slate-950/65 backdrop-blur-md border border-white/20 text-white hover:bg-rose-600 hover:border-rose-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-slate-950/65 backdrop-blur-md border border-white/20 text-white hover:bg-rose-600 hover:border-rose-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Horizontal Right-to-Left Sliding Track */}
          <div
            onTransitionEnd={handleTrackTransitionEnd}
            className={`flex ${
              isTransitionEnabled
                ? 'transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]'
                : ''
            }`}
            style={{
              transform: `translate3d(-${trackIndex * 100}%, 0, 0)`,
            }}
          >
            {trackSlides.map((slide, slideIdx) => {
              const isClone = slideIdx === totalSlides;
              const isSlideActive = !isClone && slideIdx === activeIndex;

              return (
                <div
                  key={`${slide.id}-${slideIdx}`}
                  aria-hidden={!isSlideActive}
                  className="relative w-full shrink-0 min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex flex-col justify-between"
                >
                  {/* Full-Bleed Product Photography */}
                  <HardwareImage
                    src={slide.image}
                    alt={slide.imageAlt}
                    title={slide.kicker}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />

                  {/* Measured Multi-Directional Contrast Scrim (>= 4.5:1 text legibility) */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/65 to-slate-950/30 lg:bg-gradient-to-r lg:from-slate-950/95 lg:via-slate-950/75 lg:to-slate-950/25"
                  />
                  <div
                    aria-hidden="true"
                    className="hidden lg:block absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30"
                  />

                  {/* Top Metadata Bar Over Image */}
                  <div className="relative z-10 px-5 pt-5 sm:px-8 sm:pt-7 lg:px-12 lg:pt-10 pr-28 sm:pr-44">
                    <div className="inline-flex items-center gap-2.5 text-xs font-medium text-rose-300 tracking-wide">
                      <span>{slide.kicker}</span>
                      <span className="sm:hidden text-white/60" aria-hidden="true">
                        ·
                      </span>
                      <span className="sm:hidden font-mono tabular-nums text-white/90">
                        {String((slideIdx % totalSlides) + 1).padStart(2, '0')} /{' '}
                        {String(totalSlides).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Bottom / Left Product Details & Action Buttons Over Image */}
                  <div className="relative z-10 px-5 pb-6 pt-16 sm:px-8 sm:pb-8 lg:px-12 lg:pb-11 lg:pt-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-10">
                    <div className="max-w-xl">
                      {slideIdx === 0 ? (
                        <h1 className="font-display text-2xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white leading-[1.12] text-balance mb-3 sm:mb-4">
                          {slide.headline}
                        </h1>
                      ) : (
                        <h2 className="font-display text-2xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white leading-[1.12] text-balance mb-3 sm:mb-4">
                          {slide.headline}
                        </h2>
                      )}

                      <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-6">
                        {slide.description}
                      </p>

                      {/* Action Buttons Over Image */}
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          tabIndex={isSlideActive ? 0 : -1}
                          onClick={() => onOpenFeaturedModal(slide.productId)}
                          className="inline-flex items-center justify-center gap-2 h-11 px-5 sm:px-6 rounded-lg bg-rose-600 text-white text-sm font-semibold hover:bg-rose-500 transition-colors whitespace-nowrap shrink-0 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                        >
                          <span>{slide.ctaPrimary}</span>
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </button>

                        <button
                          type="button"
                          tabIndex={isSlideActive ? 0 : -1}
                          onClick={() => onOpenProductPage(slide.productId)}
                          className="inline-flex items-center justify-center h-11 px-5 rounded-lg border border-white/30 bg-slate-950/55 backdrop-blur-md text-white text-sm font-medium hover:bg-white/15 hover:border-white/50 transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                        >
                          {slide.ctaSecondary}
                        </button>
                      </div>
                    </div>

                    {/* Key Specs Readout Over Image */}
                    <dl className="grid grid-cols-3 gap-4 sm:gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/15 lg:bg-slate-950/60 lg:backdrop-blur-md lg:border lg:border-white/15 lg:rounded-xl lg:px-6 lg:py-4 shrink-0">
                      {slide.keyMetrics.map((metric) => (
                        <div key={metric.label}>
                          <dt className="text-[11px] sm:text-xs text-slate-300 mb-0.5 whitespace-nowrap">
                            {metric.label}
                          </dt>
                          <dd className="font-mono text-sm sm:text-base font-bold text-white tabular-nums whitespace-nowrap">
                            {metric.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop/Tablet Slide Selector Tabs */}
        <div
          className="hidden sm:grid grid-cols-3 gap-3 mt-4"
          role="tablist"
          aria-label="Select featured product slide"
        >
          {HERO_SLIDES.map((slide, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleSelectSlide(idx)}
                className={`text-left px-4 py-3 rounded-xl border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 ${
                  isSelected
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span className="block text-[11px] font-mono tabular-nums opacity-75">
                  0{idx + 1}
                </span>
                <span className="block text-xs sm:text-sm font-medium truncate">
                  {slide.kicker}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile Dots & Centered Horizontal Indicator Line Below */}
        <div className="mt-5 sm:mt-6 flex flex-col items-center justify-center gap-3">
          {/* Dots on Mobile */}
          <div
            className="flex sm:hidden items-center justify-center gap-1"
            role="tablist"
            aria-label="Mobile slide navigation dots"
          >
            {HERO_SLIDES.map((slide, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`Go to slide ${idx + 1}: ${slide.kicker}`}
                  onClick={() => handleSelectSlide(idx)}
                  className="p-2 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 rounded-full"
                >
                  <span
                    className={`block rounded-full transition-all duration-200 ${
                      isSelected
                        ? 'w-2.5 h-2.5 bg-rose-600'
                        : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Centered Horizontal Line Below */}
          <div
            className="w-40 sm:w-56 h-[2px] bg-slate-200 rounded-full overflow-hidden relative mx-auto"
            aria-hidden="true"
          >
            <div
              className="h-full bg-rose-600 rounded-full transition-transform duration-300 ease-out"
              style={{
                width: `${100 / totalSlides}%`,
                transform: `translateX(${activeIndex * 100}%)`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
