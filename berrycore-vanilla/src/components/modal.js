import gsap from 'gsap';
import { iconArrowRight, iconBag, iconCheck, iconCheckCircle, iconClose } from './icons.js';

export function renderFeaturedModal(
  modalRoot,
  { product, onClose, onAddToCart, onOpenProductPage }
) {
  if (!product) {
    modalRoot.classList.add('hidden');
    modalRoot.innerHTML = '';
    return;
  }

  let selectedVariantId = product.variants[0]?.id ?? '';
  let addedTimer = null;
  let hasAnimatedOpen = false;

  function render() {
    const activeVariant =
      product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];

    modalRoot.innerHTML = `
      <div
        id="modal-dialog-panel"
        class="relative w-full max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-y-auto lg:overflow-hidden max-h-[90vh] flex flex-col lg:grid lg:grid-cols-12"
      >
        <button
          type="button"
          id="modal-close-btn"
          aria-label="Close product preview"
          class="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/95 text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-100 hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
        >
          ${iconClose('w-5 h-5')}
        </button>

        <div class="lg:col-span-6 bg-slate-100 flex items-center justify-center h-56 sm:h-72 lg:h-full shrink-0">
          <img
            src="${product.image}"
            alt="${product.imageAlt}"
            referrerpolicy="no-referrer"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="lg:col-span-6 p-5 sm:p-8 lg:overflow-y-auto flex flex-col justify-between gap-6">
          <div>
            <div class="flex items-center gap-2 text-xs text-slate-500 mb-2 pr-10">
              <span>${product.kicker}</span>
              <span aria-hidden="true">·</span>
              <span class="font-mono">${activeVariant?.sku ?? ''}</span>
            </div>

            <h2 id="modal-product-title" class="font-display text-2xl font-bold text-slate-900 mb-2">
              ${product.name}
            </h2>

            <div class="flex items-baseline gap-3 mb-4">
              <span class="font-mono text-2xl font-bold text-slate-900 tabular-nums">$${activeVariant?.price ?? product.basePrice}</span>
              <span class="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                ${iconCheckCircle('w-3.5 h-3.5')}
                <span>In Stock</span>
              </span>
            </div>

            <p class="text-sm text-slate-600 leading-relaxed mb-5">${product.shortDescription}</p>

            <div class="mb-5">
              <p class="text-xs font-medium text-slate-700 mb-2">Configuration</p>
              <div class="flex flex-wrap gap-2">
                ${product.variants
                  .map((v) => {
                    const isSelected = v.id === activeVariant?.id;
                    return `
                      <button
                        type="button"
                        data-modal-variant="${v.id}"
                        class="px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 ${
                          isSelected
                            ? 'bg-slate-900 border-slate-900 text-white'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }"
                      >
                        ${v.label} — <span class="font-mono tabular-nums">$${v.price}</span>
                      </button>
                    `;
                  })
                  .join('')}
              </div>
            </div>

            <div class="border-t border-slate-100 pt-4">
              <p class="text-xs font-medium text-slate-700 mb-2.5">Key Specifications</p>
              <ul class="space-y-1.5">
                ${product.highlights
                  .slice(0, 3)
                  .map(
                    (h) => `
                  <li class="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                    <span class="text-rose-600 shrink-0 mt-0.5">${iconCheck('w-3.5 h-3.5')}</span>
                    <span>${h}</span>
                  </li>
                `
                  )
                  .join('')}
              </ul>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              type="button"
              id="modal-add-btn"
              class="w-full sm:flex-1 h-11 min-h-[44px] shrink-0 inline-flex items-center justify-center gap-2 px-5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 text-sm font-semibold transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
            >
              ${iconBag('w-4 h-4')}
              <span>Add to Cart</span>
            </button>
            <button
              type="button"
              id="modal-full-page-btn"
              class="w-full sm:flex-1 h-11 min-h-[44px] shrink-0 inline-flex items-center justify-center gap-2 px-5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm font-medium hover:bg-slate-50 transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
            >
              <span>Full Product Page</span>
              ${iconArrowRight('w-4 h-4')}
            </button>
          </div>
        </div>
      </div>
    `;

    modalRoot.classList.remove('hidden');

    const panelEl = modalRoot.querySelector('#modal-dialog-panel');
    if (!hasAnimatedOpen) {
      hasAnimatedOpen = true;
      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReduced) {
        gsap.fromTo(
          modalRoot,
          { opacity: 0 },
          { opacity: 1, duration: 0.22, ease: 'power2.out' }
        );
        gsap.fromTo(
          panelEl,
          { opacity: 0, y: 24, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.34,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          }
        );
      }
    }

    panelEl.addEventListener('click', (e) => e.stopPropagation());
    modalRoot.querySelector('#modal-close-btn').addEventListener('click', onClose);

    modalRoot.querySelectorAll('[data-modal-variant]').forEach((btn) => {
      btn.addEventListener('click', () => {
        selectedVariantId = btn.dataset.modalVariant;
        render();
      });
    });

    const addBtn = modalRoot.querySelector('#modal-add-btn');
    addBtn.addEventListener('click', () => {
      if (!activeVariant) return;
      onAddToCart(product, activeVariant.id, 1);
      addBtn.classList.remove('bg-rose-600', 'hover:bg-rose-700');
      addBtn.classList.add('bg-emerald-700');
      addBtn.innerHTML = `${iconCheck('w-4 h-4')}<span>Added to Cart</span>`;
      if (addedTimer) window.clearTimeout(addedTimer);
      addedTimer = window.setTimeout(() => {
        addBtn.classList.remove('bg-emerald-700');
        addBtn.classList.add('bg-rose-600', 'hover:bg-rose-700');
        addBtn.innerHTML = `${iconBag('w-4 h-4')}<span>Add to Cart</span>`;
      }, 1600);
    });

    modalRoot.querySelector('#modal-full-page-btn').addEventListener('click', () => {
      onClose();
      onOpenProductPage(product.id);
    });
  }

  render();
}
