import { PRODUCTS } from '../data/products.js';
import {
  iconArrowLeft,
  iconBag,
  iconCheck,
  iconCheckCircle,
  iconCpu,
  iconMinus,
  iconPlus,
  iconShield,
  iconTruck,
} from './icons.js';

export function renderProductDetailPage(
  container,
  { product, onBackToCatalog, onAddToCart, onSelectProduct }
) {
  let selectedVariantId = product.variants[0]?.id ?? '';
  let quantity = 1;
  let activeGalleryTab = 'photo';
  let feedbackTimer = null;

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  function render() {
    const activeVariant =
      product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];
    const lineTotal = ((activeVariant?.price ?? product.basePrice) * quantity).toLocaleString();

    container.innerHTML = `
      <div class="bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-xs text-slate-500">
            <button type="button" id="pdp-breadcrumb-home" class="hover:text-slate-900 transition-colors">Catalog</button>
            <span aria-hidden="true">/</span>
            <span>${product.category}</span>
            <span aria-hidden="true">/</span>
            <span class="font-medium text-slate-900">${product.name}</span>
          </nav>

          <button type="button" id="pdp-back-btn" class="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
            ${iconArrowLeft('w-3.5 h-3.5')}
            <span>Back to Hardware Gallery</span>
          </button>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div class="lg:col-span-7 lg:sticky lg:top-24 space-y-4">
            <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              ${
                activeGalleryTab === 'photo'
                  ? `
                <div class="aspect-[4/3] bg-slate-100">
                  <img
                    src="${product.image}"
                    alt="${product.imageAlt}"
                    referrerpolicy="no-referrer"
                    class="w-full h-full object-cover"
                  />
                </div>
              `
                  : `
                <div class="aspect-[4/3] bg-slate-900 text-slate-100 p-6 sm:p-10 flex flex-col justify-between">
                  <div class="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <p class="font-mono text-xs text-rose-400 mb-1">Mechanical &amp; I/O Reference</p>
                      <h3 class="font-display text-lg font-semibold text-white">${product.name} — Interface Topology</h3>
                    </div>
                    <span class="text-slate-400">${iconCpu('w-6 h-6')}</span>
                  </div>
                  <div class="grid grid-cols-2 gap-4 my-auto py-4">
                    ${product.specs
                      .slice(0, 4)
                      .map(
                        (s) => `
                      <div class="p-3.5 rounded-lg bg-slate-800/70 border border-slate-700/80">
                        <p class="text-[11px] font-mono text-slate-400 mb-1">${s.label}</p>
                        <p class="text-xs sm:text-sm font-medium text-white">${s.value}</p>
                      </div>
                    `
                      )
                      .join('')}
                  </div>
                  <div class="flex items-center justify-between text-xs font-mono text-slate-400 border-t border-slate-800 pt-4">
                    <span>40-Pin Standard 2.54 mm Pitch</span>
                    <span>STEP CAD &amp; Schematic Available</span>
                  </div>
                </div>
              `
              }
            </div>

            <div class="flex items-center gap-3">
              <button
                type="button"
                data-gallery-tab="photo"
                class="px-4 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  activeGalleryTab === 'photo'
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }"
              >
                Studio View
              </button>
              <button
                type="button"
                data-gallery-tab="pinout"
                class="px-4 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  activeGalleryTab === 'pinout'
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }"
              >
                Interface Topology
              </button>
            </div>

            <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 mt-6">
              <h2 class="font-display text-xl font-bold text-slate-900 mb-3">Engineering Overview</h2>
              <p class="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">${product.longDescription}</p>
              <h3 class="text-sm font-semibold text-slate-900 mb-3">Key Architectural Highlights</h3>
              <ul class="space-y-2.5">
                ${product.highlights
                  .map(
                    (h) => `
                  <li class="flex items-start gap-2.5 text-sm text-slate-700">
                    <span class="text-rose-600 shrink-0 mt-0.5">${iconCheck('w-4 h-4')}</span>
                    <span>${h}</span>
                  </li>
                `
                  )
                  .join('')}
              </ul>
            </div>
          </div>

          <div class="lg:col-span-5 min-w-0 space-y-6">
            <div class="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8">
              <div class="flex items-center justify-between gap-3 text-xs text-slate-500 mb-2">
                <span>${product.category}</span>
                <span class="font-mono text-slate-400">SKU: ${activeVariant?.sku ?? ''}</span>
              </div>

              <h1 class="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-2 text-balance">
                ${product.name}
              </h1>
              <p class="text-sm text-slate-600 mb-6">${product.tagline}</p>

              <div class="flex items-baseline justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
                <div>
                  <span class="font-mono text-3xl font-bold text-slate-900 tabular-nums">$${activeVariant?.price ?? product.basePrice}</span>
                  <span class="text-xs text-slate-500 ml-2">USD / unit</span>
                </div>
                <span class="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                  ${iconCheckCircle('w-4 h-4')}
                  <span>In Stock &amp; Ready</span>
                </span>
              </div>

              <div class="mb-6">
                <p class="block text-xs font-semibold text-slate-700 mb-2.5">Select Configuration</p>
                <div class="grid grid-cols-1 gap-2">
                  ${product.variants
                    .map((v) => {
                      const isSelected = v.id === activeVariant?.id;
                      return `
                        <button
                          type="button"
                          data-pdp-variant="${v.id}"
                          class="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 ${
                            isSelected
                              ? 'bg-slate-900 border-slate-900 text-white'
                              : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
                          }"
                        >
                          <span class="text-sm font-medium">${v.label}</span>
                          <span class="font-mono text-sm font-bold tabular-nums shrink-0">$${v.price}</span>
                        </button>
                      `;
                    })
                    .join('')}
                </div>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                <div class="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start border border-slate-200 rounded-lg bg-slate-50 h-12 shrink-0">
                  <button type="button" id="pdp-qty-dec" aria-label="Decrease quantity" class="w-12 sm:w-11 h-full flex items-center justify-center text-slate-600 hover:text-slate-900">
                    ${iconMinus('w-4 h-4')}
                  </button>
                  <span class="w-10 text-center font-mono text-sm font-bold text-slate-900 tabular-nums">${quantity}</span>
                  <button type="button" id="pdp-qty-inc" aria-label="Increase quantity" class="w-12 sm:w-11 h-full flex items-center justify-center text-slate-600 hover:text-slate-900">
                    ${iconPlus('w-4 h-4')}
                  </button>
                </div>

                <button
                  type="button"
                  id="pdp-add-btn"
                  class="w-full sm:flex-1 min-w-0 inline-flex items-center justify-center gap-2 h-12 px-4 sm:px-6 rounded-lg bg-rose-600 text-white hover:bg-rose-700 text-sm font-semibold transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
                >
                  ${iconBag('w-4 h-4')}
                  <span>Add to Cart — $${lineTotal}</span>
                </button>
              </div>

              <div class="space-y-2.5 pt-5 border-t border-slate-100 text-xs text-slate-600">
                <div class="flex items-center gap-2.5">
                  <span class="text-slate-400 shrink-0">${iconTruck('w-4 h-4')}</span>
                  <span>${product.shippingNote}</span>
                </div>
                <div class="flex items-center gap-2.5">
                  <span class="text-slate-400 shrink-0">${iconShield('w-4 h-4')}</span>
                  <span>${product.warranty}</span>
                </div>
              </div>
            </div>

            <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
              <h2 class="font-display text-lg font-bold text-slate-900 mb-4">Technical Specifications</h2>
              <dl class="divide-y divide-slate-100">
                ${product.specs
                  .map(
                    (spec) => `
                  <div class="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                    <dt class="text-xs font-medium text-slate-500 shrink-0">${spec.label}</dt>
                    <dd class="font-mono text-xs text-slate-900 sm:text-right tabular-nums">${spec.value}</dd>
                  </div>
                `
                  )
                  .join('')}
              </dl>
            </div>
          </div>
        </div>

        <section aria-label="Related hardware" class="mt-16 pt-12 border-t border-slate-200">
          <div class="flex items-center justify-between gap-4 mb-6">
            <h2 class="font-display text-xl font-bold text-slate-900">Compatible Modules &amp; Accessories</h2>
            <button type="button" id="pdp-related-all" class="text-xs font-medium text-rose-600 hover:text-rose-700">View Full Catalog</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${relatedProducts
              .map(
                (rel) => `
              <button type="button" data-related-id="${rel.id}" class="group text-left bg-white border border-slate-200 rounded-xl overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all">
                <div class="aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img src="${rel.image}" alt="${rel.imageAlt}" referrerpolicy="no-referrer" loading="lazy" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                </div>
                <div class="p-4 flex items-baseline justify-between gap-3">
                  <div>
                    <p class="text-xs text-slate-500 mb-0.5">${rel.category}</p>
                    <p class="font-display text-sm font-semibold text-slate-900 group-hover:text-rose-600 transition-colors">${rel.name}</p>
                  </div>
                  <span class="font-mono text-sm font-bold text-slate-900 tabular-nums">$${rel.basePrice}</span>
                </div>
              </button>
            `
              )
              .join('')}
          </div>
        </section>
      </div>

      <div class="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 flex items-center justify-between gap-4">
        <div class="min-w-0">
          <p class="text-xs font-medium text-slate-900 truncate">${product.name}</p>
          <p class="font-mono text-sm font-bold text-slate-900 tabular-nums">$${lineTotal}</p>
        </div>
        <button type="button" id="pdp-mobile-add-btn" class="h-10 px-5 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 whitespace-nowrap shrink-0">
          Add to Cart
        </button>
      </div>
    `;

    container.querySelector('#pdp-breadcrumb-home').addEventListener('click', onBackToCatalog);
    container.querySelector('#pdp-back-btn').addEventListener('click', onBackToCatalog);
    container.querySelector('#pdp-related-all').addEventListener('click', onBackToCatalog);

    container.querySelectorAll('[data-gallery-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeGalleryTab = btn.dataset.galleryTab;
        render();
      });
    });

    container.querySelectorAll('[data-pdp-variant]').forEach((btn) => {
      btn.addEventListener('click', () => {
        selectedVariantId = btn.dataset.pdpVariant;
        render();
      });
    });

    container.querySelector('#pdp-qty-dec').addEventListener('click', () => {
      quantity = Math.max(1, quantity - 1);
      render();
    });

    container.querySelector('#pdp-qty-inc').addEventListener('click', () => {
      quantity = Math.min(99, quantity + 1);
      render();
    });

    const triggerAdd = () => {
      if (!activeVariant) return;
      onAddToCart(product, activeVariant.id, quantity);
      const desktopBtn = container.querySelector('#pdp-add-btn');
      const mobileBtn = container.querySelector('#pdp-mobile-add-btn');

      desktopBtn.classList.remove('bg-rose-600', 'hover:bg-rose-700');
      desktopBtn.classList.add('bg-emerald-700');
      desktopBtn.innerHTML = `${iconCheck('w-4 h-4')}<span>Added to Cart</span>`;
      if (mobileBtn) mobileBtn.textContent = 'Added';

      if (feedbackTimer) window.clearTimeout(feedbackTimer);
      feedbackTimer = window.setTimeout(() => {
        render();
      }, 1600);
    };

    container.querySelector('#pdp-add-btn').addEventListener('click', triggerAdd);
    container.querySelector('#pdp-mobile-add-btn').addEventListener('click', triggerAdd);

    container.querySelectorAll('[data-related-id]').forEach((btn) => {
      btn.addEventListener('click', () => onSelectProduct(btn.dataset.relatedId));
    });
  }

  render();
}
