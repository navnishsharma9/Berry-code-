import { HERO_SLIDES } from '../data/products.js';
import { iconArrowRight, iconChevronLeft, iconChevronRight } from './icons.js';

export function initHeroCarousel(container, { onOpenModal, onOpenProductPage }) {
  const totalSlides = HERO_SLIDES.length;
  const trackSlides = [...HERO_SLIDES, HERO_SLIDES[0]];

  let trackIndex = 0;
  let isTransitionEnabled = true;
  let isHovered = false;
  let isTouched = false;
  let isFocused = false;
  let touchStartX = null;
  let touchResumeTimer = null;
  let autoTimer = null;
  let fallbackTimer = null;

  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:py-10 lg:py-12">
      <div class="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950">
        <div class="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2">
          <span id="hero-desktop-counter" class="hidden sm:inline-flex items-center px-2.5 h-10 rounded-lg bg-slate-950/60 backdrop-blur-md border border-white/15 font-mono text-xs text-white/90 tabular-nums mr-1">
            01 / 0${totalSlides}
          </span>
          <button
            type="button"
            id="hero-prev-btn"
            aria-label="Previous slide"
            class="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-slate-950/65 backdrop-blur-md border border-white/20 text-white hover:bg-rose-600 hover:border-rose-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            ${iconChevronLeft('w-5 h-5')}
          </button>
          <button
            type="button"
            id="hero-next-btn"
            aria-label="Next slide"
            class="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-slate-950/65 backdrop-blur-md border border-white/20 text-white hover:bg-rose-600 hover:border-rose-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            ${iconChevronRight('w-5 h-5')}
          </button>
        </div>

        <div id="hero-track" class="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          ${trackSlides
            .map((slide, idx) => {
              const slideNumber = String((idx % totalSlides) + 1).padStart(2, '0');
              const HeadingTag = idx === 0 ? 'h1' : 'h2';
              return `
                <div
                  data-hero-slide="${idx}"
                  class="relative w-full shrink-0 min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex flex-col justify-between"
                >
                  <img
                    src="${slide.image}"
                    alt="${slide.imageAlt}"
                    referrerpolicy="no-referrer"
                    class="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <div aria-hidden="true" class="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/65 to-slate-950/30 lg:bg-gradient-to-r lg:from-slate-950/95 lg:via-slate-950/75 lg:to-slate-950/25"></div>
                  <div aria-hidden="true" class="hidden lg:block absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30"></div>

                  <div class="relative z-10 px-5 pt-5 sm:px-8 sm:pt-7 lg:px-12 lg:pt-10 pr-28 sm:pr-44">
                    <div class="inline-flex items-center gap-2.5 text-xs font-medium text-rose-300 tracking-wide">
                      <span>${slide.kicker}</span>
                      <span class="sm:hidden text-white/60" aria-hidden="true">·</span>
                      <span class="sm:hidden font-mono tabular-nums text-white/90">${slideNumber} / 0${totalSlides}</span>
                    </div>
                  </div>

                  <div class="relative z-10 px-5 pb-6 pt-16 sm:px-8 sm:pb-8 lg:px-12 lg:pb-11 lg:pt-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-10">
                    <div class="max-w-xl">
                      <${HeadingTag} class="font-display text-2xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white leading-[1.12] text-balance mb-3 sm:mb-4">
                        ${slide.headline}
                      </${HeadingTag}>
                      <p class="text-sm sm:text-base text-slate-200 leading-relaxed mb-6">
                        ${slide.description}
                      </p>
                      <div class="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          data-hero-modal="${slide.productId}"
                          class="inline-flex items-center justify-center gap-2 h-11 px-5 sm:px-6 rounded-lg bg-rose-600 text-white text-sm font-semibold hover:bg-rose-500 transition-colors whitespace-nowrap shrink-0 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                        >
                          <span>${slide.ctaPrimary}</span>
                          ${iconArrowRight('w-4 h-4')}
                        </button>
                        <button
                          type="button"
                          data-hero-page="${slide.productId}"
                          class="inline-flex items-center justify-center h-11 px-5 rounded-lg border border-white/30 bg-slate-950/55 backdrop-blur-md text-white text-sm font-medium hover:bg-white/15 hover:border-white/50 transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                        >
                          ${slide.ctaSecondary}
                        </button>
                      </div>
                    </div>

                    <dl class="grid grid-cols-3 gap-4 sm:gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/15 lg:bg-slate-950/60 lg:backdrop-blur-md lg:border lg:border-white/15 lg:rounded-xl lg:px-6 lg:py-4 shrink-0">
                      ${slide.keyMetrics
                        .map(
                          (m) => `
                          <div>
                            <dt class="text-[11px] sm:text-xs text-slate-300 mb-0.5 whitespace-nowrap">${m.label}</dt>
                            <dd class="font-mono text-sm sm:text-base font-bold text-white tabular-nums whitespace-nowrap">${m.value}</dd>
                          </div>
                        `
                        )
                        .join('')}
                    </dl>
                  </div>
                </div>
              `;
            })
            .join('')}
        </div>
      </div>

      <!-- Desktop Slide Tabs -->
      <div class="hidden sm:grid grid-cols-3 gap-3 mt-4" role="tablist" aria-label="Select featured product slide">
        ${HERO_SLIDES.map(
          (slide, idx) => `
          <button
            type="button"
            role="tab"
            data-hero-tab="${idx}"
            aria-selected="${idx === 0 ? 'true' : 'false'}"
            class="text-left px-4 py-3 rounded-xl border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 ${
              idx === 0
                ? 'bg-slate-900 border-slate-900 text-white'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }"
          >
            <span class="block text-[11px] font-mono tabular-nums opacity-75">0${idx + 1}</span>
            <span class="block text-xs sm:text-sm font-medium truncate">${slide.kicker}</span>
          </button>
        `
        ).join('')}
      </div>

      <!-- Mobile Dots & Centered Horizontal Line Below -->
      <div class="mt-5 sm:mt-6 flex flex-col items-center justify-center gap-3">
        <div class="flex sm:hidden items-center justify-center gap-1" role="tablist" aria-label="Mobile slide navigation dots">
          ${HERO_SLIDES.map(
            (slide, idx) => `
            <button
              type="button"
              role="tab"
              data-hero-dot="${idx}"
              aria-selected="${idx === 0 ? 'true' : 'false'}"
              aria-label="Go to slide ${idx + 1}: ${slide.kicker}"
              class="p-2 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 rounded-full"
            >
              <span class="block rounded-full transition-all duration-200 ${
                idx === 0 ? 'w-2.5 h-2.5 bg-rose-600' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
              }"></span>
            </button>
          `
          ).join('')}
        </div>

        <div class="w-40 sm:w-56 h-[2px] bg-slate-200 rounded-full overflow-hidden relative mx-auto" aria-hidden="true">
          <div
            id="hero-progress-line"
            class="h-full bg-rose-600 rounded-full transition-transform duration-300 ease-out"
            style="width: ${100 / totalSlides}%; transform: translateX(0%);"
          ></div>
        </div>
      </div>
    </div>
  `;

  const trackEl = container.querySelector('#hero-track');
  const counterEl = container.querySelector('#hero-desktop-counter');
  const progressEl = container.querySelector('#hero-progress-line');
  const tabBtns = Array.from(container.querySelectorAll('[data-hero-tab]'));
  const dotBtns = Array.from(container.querySelectorAll('[data-hero-dot]'));

  function syncUI() {
    const activeIndex = trackIndex % totalSlides;
    if (isTransitionEnabled) {
      trackEl.classList.add('transition-transform', 'duration-500', 'ease-[cubic-bezier(0.16,1,0.3,1)]');
    } else {
      trackEl.classList.remove('transition-transform', 'duration-500', 'ease-[cubic-bezier(0.16,1,0.3,1)]');
    }
    trackEl.style.transform = `translate3d(-${trackIndex * 100}%, 0, 0)`;

    if (counterEl) {
      counterEl.textContent = `${String(activeIndex + 1).padStart(2, '0')} / 0${totalSlides}`;
    }

    if (progressEl) {
      progressEl.style.transform = `translateX(${activeIndex * 100}%)`;
    }

    tabBtns.forEach((btn, idx) => {
      const selected = idx === activeIndex;
      btn.setAttribute('aria-selected', String(selected));
      btn.className = `text-left px-4 py-3 rounded-xl border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 ${
        selected
          ? 'bg-slate-900 border-slate-900 text-white'
          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`;
    });

    dotBtns.forEach((btn, idx) => {
      const selected = idx === activeIndex;
      btn.setAttribute('aria-selected', String(selected));
      const span = btn.querySelector('span');
      if (span) {
        span.className = `block rounded-full transition-all duration-200 ${
          selected ? 'w-2.5 h-2.5 bg-rose-600' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
        }`;
      }
    });
  }

  function resetAutoTimer() {
    if (autoTimer) window.clearInterval(autoTimer);
    if (isHovered || isTouched || isFocused) return;
    autoTimer = window.setInterval(() => {
      goNext();
    }, 3000);
  }

  function snapToZero() {
    if (fallbackTimer) {
      window.clearTimeout(fallbackTimer);
      fallbackTimer = null;
    }
    isTransitionEnabled = false;
    trackIndex = 0;
    syncUI();
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        isTransitionEnabled = true;
        syncUI();
      });
    });
  }

  function goNext() {
    isTransitionEnabled = true;
    trackIndex = trackIndex >= totalSlides ? 0 : trackIndex + 1;
    syncUI();
    if (trackIndex === totalSlides) {
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      fallbackTimer = window.setTimeout(snapToZero, 600);
    }
    resetAutoTimer();
  }

  function goPrev() {
    if (trackIndex === 0) {
      isTransitionEnabled = false;
      trackIndex = totalSlides;
      syncUI();
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          isTransitionEnabled = true;
          trackIndex = totalSlides - 1;
          syncUI();
        });
      });
    } else {
      isTransitionEnabled = true;
      trackIndex = Math.max(0, trackIndex - 1);
      syncUI();
    }
    resetAutoTimer();
  }

  trackEl.addEventListener('transitionend', () => {
    if (trackIndex === totalSlides) {
      snapToZero();
    }
  });

  container.querySelector('#hero-prev-btn').addEventListener('click', goPrev);
  container.querySelector('#hero-next-btn').addEventListener('click', goNext);

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      isTransitionEnabled = true;
      trackIndex = Number(btn.dataset.heroTab);
      syncUI();
      resetAutoTimer();
    });
  });

  dotBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      isTransitionEnabled = true;
      trackIndex = Number(btn.dataset.heroDot);
      syncUI();
      resetAutoTimer();
    });
  });

  container.querySelectorAll('[data-hero-modal]').forEach((btn) => {
    btn.addEventListener('click', () => onOpenModal(btn.dataset.heroModal));
  });

  container.querySelectorAll('[data-hero-page]').forEach((btn) => {
    btn.addEventListener('click', () => onOpenProductPage(btn.dataset.heroPage));
  });

  container.addEventListener('mouseenter', () => {
    isHovered = true;
    resetAutoTimer();
  });

  container.addEventListener('mouseleave', () => {
    isHovered = false;
    resetAutoTimer();
  });

  container.addEventListener(
    'touchstart',
    (e) => {
      if (touchResumeTimer) {
        window.clearTimeout(touchResumeTimer);
        touchResumeTimer = null;
      }
      isTouched = true;
      touchStartX = e.touches[0]?.clientX ?? null;
      resetAutoTimer();
    },
    { passive: true }
  );

  container.addEventListener('touchend', (e) => {
    if (touchStartX !== null) {
      const endX = e.changedTouches[0]?.clientX ?? touchStartX;
      const delta = touchStartX - endX;
      if (Math.abs(delta) > 40) {
        if (delta > 0) goNext();
        else goPrev();
      }
      touchStartX = null;
    }
    touchResumeTimer = window.setTimeout(() => {
      isTouched = false;
      resetAutoTimer();
    }, 1200);
  });

  container.addEventListener('touchcancel', () => {
    touchStartX = null;
    isTouched = false;
    resetAutoTimer();
  });

  container.addEventListener('focusin', () => {
    isFocused = true;
    resetAutoTimer();
  });

  container.addEventListener('focusout', (e) => {
    if (!container.contains(e.relatedTarget)) {
      isFocused = false;
      resetAutoTimer();
    }
  });

  syncUI();
  resetAutoTimer();
}
