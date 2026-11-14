import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

function getItemsPerView(): number {
  if (typeof window === 'undefined') return 4;
  if (window.innerWidth >= 1024) return 4;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

export function TestimonialsSection() {
  const totalItems = TESTIMONIALS.length;
  const [itemsPerView, setItemsPerView] = useState<number>(getItemsPerView);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchResumeTimer = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const nextPerView = getItemsPerView();
      setItemsPerView((prev) => {
        if (prev !== nextPerView) {
          setIsTransitionEnabled(false);
          setTrackIndex((current) => current % totalItems);
          window.requestAnimationFrame(() => {
            setIsTransitionEnabled(true);
          });
        }
        return nextPerView;
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [totalItems]);

  const trackItems = [...TESTIMONIALS, ...TESTIMONIALS.slice(0, itemsPerView)];
  const activeIndex = trackIndex % totalItems;
  const isPaused = isHovered || isTouched || isFocused;

  const handleNext = useCallback(() => {
    setIsTransitionEnabled(true);
    setTrackIndex((prev) => (prev >= totalItems ? 0 : prev + 1));
  }, [totalItems]);

  const handlePrev = useCallback(() => {
    if (trackIndex === 0) {
      setIsTransitionEnabled(false);
      setTrackIndex(totalItems);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsTransitionEnabled(true);
          setTrackIndex(totalItems - 1);
        });
      });
    } else {
      setIsTransitionEnabled(true);
      setTrackIndex((prev) => Math.max(0, prev - 1));
    }
  }, [trackIndex, totalItems]);

  const handleSelectIndex = (idx: number) => {
    setIsTransitionEnabled(true);
    setTrackIndex(idx);
  };

  const handleTrackTransitionEnd = () => {
    if (trackIndex >= totalItems) {
      setIsTransitionEnabled(false);
      setTrackIndex(0);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsTransitionEnabled(true);
        });
      });
    }
  };

  // Fallback reset if transitionend does not fire (e.g. inactive tab)
  useEffect(() => {
    if (trackIndex < totalItems) return;
    const fallback = window.setTimeout(() => {
      setIsTransitionEnabled(false);
      setTrackIndex(0);
      window.requestAnimationFrame(() => {
        setIsTransitionEnabled(true);
      });
    }, 600);
    return () => window.clearTimeout(fallback);
  }, [trackIndex, totalItems]);

  // 3-second auto-scroll when not interacted with
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
      id="testimonials"
      aria-labelledby="testimonials-heading"
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
      className="gsap-section bg-[#F8FAFC] border-b border-slate-200 py-14 sm:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Counter & Arrow Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12 gsap-reveal">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-rose-600 mb-2">
              Field Deployments
            </p>
            <h2
              id="testimonials-heading"
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance"
            >
              Trusted by embedded teams, research labs, and educators.
            </h2>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
            <span className="font-mono text-xs text-slate-600 tabular-nums">
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(totalItems).padStart(2, '0')}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Sliding Carousel Track: 1 on mobile, 2 on tablet, 4 on desktop */}
        <div className="overflow-hidden -mx-3">
          <div
            onTransitionEnd={handleTrackTransitionEnd}
            className={`flex items-stretch ${
              isTransitionEnabled
                ? 'transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]'
                : ''
            }`}
            style={{
              transform: `translate3d(-${(trackIndex * 100) / itemsPerView}%, 0, 0)`,
            }}
          >
            {trackItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="shrink-0 px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <figure className="h-full bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between gap-5">
                  <div>
                    <p className="font-mono text-xs font-bold text-rose-600 mb-3 tabular-nums">
                      {item.outcome}
                    </p>
                    <blockquote className="text-sm text-slate-700 leading-relaxed">
                      “{item.quote}”
                    </blockquote>
                  </div>

                  <figcaption className="pt-4 border-t border-slate-100">
                    <p className="font-display text-sm font-semibold text-slate-900">
                      {item.author}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {item.role} · {item.organization}
                    </p>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Dots & Centered Horizontal Progress Line Below */}
        <div className="mt-7 flex flex-col items-center justify-center gap-3">
          <div
            className="flex sm:hidden items-center justify-center flex-wrap gap-0.5"
            role="tablist"
            aria-label="Mobile testimonial dots"
          >
            {TESTIMONIALS.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`View testimonial ${idx + 1}: ${item.author}`}
                  onClick={() => handleSelectIndex(idx)}
                  className="p-1.5 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 rounded-full"
                >
                  <span
                    className={`block rounded-full transition-all duration-200 ${
                      isSelected
                        ? 'w-2.5 h-2.5 bg-rose-600'
                        : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
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
                width: `${100 / totalItems}%`,
                transform: `translateX(${activeIndex * 100}%)`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
