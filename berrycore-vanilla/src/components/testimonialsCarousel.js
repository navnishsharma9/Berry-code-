import { TESTIMONIALS } from '../data/products.js';
import { iconChevronLeft, iconChevronRight } from './icons.js';

function getItemsPerView() {
  if (window.innerWidth >= 1024) return 4;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

export function initTestimonialsCarousel(container) {
  const totalItems = TESTIMONIALS.length;
  let itemsPerView = getItemsPerView();
  let trackIndex = 0;
  let isTransitionEnabled = true;
  let isHovered = false;
  let isTouched = false;
  let isFocused = false;
  let touchStartX = null;
  let touchResumeTimer = null;
  let autoTimer = null;
  let fallbackTimer = null;

  function renderMarkup() {
    const trackItems = [...TESTIMONIALS, ...TESTIMONIALS.slice(0, itemsPerView)];
    const activeIndex = trackIndex % totalItems;

    container.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12 gsap-reveal">
          <div class="max-w-2xl">
            <p class="text-xs font-medium text-rose-600 mb-2">Field Deployments</p>
            <h2 id="testimonials-heading" class="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
              Trusted by embedded teams, research labs, and educators.
            </h2>
          </div>

          <div class="flex items-center justify-between sm:justify-end gap-4 shrink-0">
            <span id="test-counter" class="font-mono text-xs text-slate-600 tabular-nums">
              ${String(activeIndex + 1).padStart(2, '0')} / ${String(totalItems).padStart(2, '0')}
            </span>
            <div class="flex items-center gap-2">
              <button
                type="button"
                id="test-prev-btn"
                aria-label="Previous testimonial"
                class="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
              >
                ${iconChevronLeft('w-5 h-5')}
              </button>
              <button
                type="button"
                id="test-next-btn"
                aria-label="Next testimonial"
                class="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
              >
                ${iconChevronRight('w-5 h-5')}
              </button>
            </div>
          </div>
        </div>

        <div class="overflow-hidden -mx-3">
          <div
            id="test-track"
            class="flex items-stretch transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style="transform: translate3d(-${(trackIndex * 100) / itemsPerView}%, 0, 0);"
          >
            ${trackItems
              .map(
                (item) => `
              <div class="shrink-0 px-3" style="width: ${100 / itemsPerView}%;">
                <figure class="h-full bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between gap-5">
                  <div>
                    <p class="font-mono text-xs font-bold text-rose-600 mb-3 tabular-nums">${item.outcome}</p>
                    <blockquote class="text-sm text-slate-700 leading-relaxed">“${item.quote}”</blockquote>
                  </div>
                  <figcaption class="pt-4 border-t border-slate-100">
                    <p class="font-display text-sm font-semibold text-slate-900">${item.author}</p>
                    <p class="text-xs text-slate-500 mt-0.5">${item.role} · ${item.organization}</p>
                  </figcaption>
                </figure>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <div class="mt-7 flex flex-col items-center justify-center gap-3">
          <div class="flex sm:hidden items-center justify-center flex-wrap gap-0.5" role="tablist" aria-label="Mobile testimonial dots">
            ${TESTIMONIALS.map(
              (item, idx) => `
              <button
                type="button"
                role="tab"
                data-test-dot="${idx}"
                aria-selected="${idx === activeIndex ? 'true' : 'false'}"
                aria-label="View testimonial ${idx + 1}: ${item.author}"
                class="p-1.5 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 rounded-full"
              >
                <span class="block rounded-full transition-all duration-200 ${
                  idx === activeIndex ? 'w-2.5 h-2.5 bg-rose-600' : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
                }"></span>
              </button>
            `
            ).join('')}
          </div>

          <div class="w-40 sm:w-56 h-[2px] bg-slate-200 rounded-full overflow-hidden relative mx-auto" aria-hidden="true">
            <div
              id="test-progress-line"
              class="h-full bg-rose-600 rounded-full transition-transform duration-300 ease-out"
              style="width: ${100 / totalItems}%; transform: translateX(${activeIndex * 100}%);"
            ></div>
          </div>
        </div>
      </div>
    `;

    bindEvents();
  }

  function syncTrack() {
    const trackEl = container.querySelector('#test-track');
    const counterEl = container.querySelector('#test-counter');
    const progressEl = container.querySelector('#test-progress-line');
    const dotBtns = Array.from(container.querySelectorAll('[data-test-dot]'));
    const activeIndex = trackIndex % totalItems;

    if (trackEl) {
      if (isTransitionEnabled) {
        trackEl.classList.add('transition-transform', 'duration-500', 'ease-[cubic-bezier(0.16,1,0.3,1)]');
      } else {
        trackEl.classList.remove('transition-transform', 'duration-500', 'ease-[cubic-bezier(0.16,1,0.3,1)]');
      }
      trackEl.style.transform = `translate3d(-${(trackIndex * 100) / itemsPerView}%, 0, 0)`;
    }

    if (counterEl) {
      counterEl.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(totalItems).padStart(2, '0')}`;
    }

    if (progressEl) {
      progressEl.style.transform = `translateX(${activeIndex * 100}%)`;
    }

    dotBtns.forEach((btn, idx) => {
      const selected = idx === activeIndex;
      btn.setAttribute('aria-selected', String(selected));
      const span = btn.querySelector('span');
      if (span) {
        span.className = `block rounded-full transition-all duration-200 ${
          selected ? 'w-2.5 h-2.5 bg-rose-600' : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
        }`;
      }
    });
  }

  function snapToZero() {
    if (fallbackTimer) {
      window.clearTimeout(fallbackTimer);
      fallbackTimer = null;
    }
    isTransitionEnabled = false;
    trackIndex = 0;
    syncTrack();
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        isTransitionEnabled = true;
        syncTrack();
      });
    });
  }

  function resetAutoTimer() {
    if (autoTimer) window.clearInterval(autoTimer);
    if (isHovered || isTouched || isFocused) return;
    autoTimer = window.setInterval(() => {
      goNext();
    }, 3000);
  }

  function goNext() {
    isTransitionEnabled = true;
    trackIndex = trackIndex >= totalItems ? 0 : trackIndex + 1;
    syncTrack();
    if (trackIndex >= totalItems) {
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      fallbackTimer = window.setTimeout(snapToZero, 600);
    }
    resetAutoTimer();
  }

  function goPrev() {
    if (trackIndex === 0) {
      isTransitionEnabled = false;
      trackIndex = totalItems;
      syncTrack();
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          isTransitionEnabled = true;
          trackIndex = totalItems - 1;
          syncTrack();
        });
      });
    } else {
      isTransitionEnabled = true;
      trackIndex = Math.max(0, trackIndex - 1);
      syncTrack();
    }
    resetAutoTimer();
  }

  function bindEvents() {
    const trackEl = container.querySelector('#test-track');
    trackEl.addEventListener('transitionend', () => {
      if (trackIndex >= totalItems) {
        snapToZero();
      }
    });

    container.querySelector('#test-prev-btn').addEventListener('click', goPrev);
    container.querySelector('#test-next-btn').addEventListener('click', goNext);

    container.querySelectorAll('[data-test-dot]').forEach((btn) => {
      btn.addEventListener('click', () => {
        isTransitionEnabled = true;
        trackIndex = Number(btn.dataset.testDot);
        syncTrack();
        resetAutoTimer();
      });
    });
  }

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

  window.addEventListener('resize', () => {
    const nextPerView = getItemsPerView();
    if (nextPerView !== itemsPerView) {
      itemsPerView = nextPerView;
      trackIndex = trackIndex % totalItems;
      renderMarkup();
    }
  });

  renderMarkup();
  resetAutoTimer();
}
