import { PRODUCT_CATEGORIES } from '../data/products.js';
import { iconArrowUpRight, iconEye, iconPlus, iconReset } from './icons.js';

export function renderProductGrid(
  container,
  {
    products,
    selectedCategory,
    searchQuery,
    onCategoryChange,
    onClearSearch,
    onOpenModal,
    onOpenProductPage,
    onQuickAdd,
  }
) {
  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 gsap-reveal">
        <div>
          <p class="text-xs font-medium text-rose-600 mb-2">Hardware Catalog</p>
          <h2 id="catalog-heading" class="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
            Single-board computers &amp; modular expansion
          </h2>
        </div>

        <div role="tablist" aria-label="Filter hardware by category" class="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg self-start lg:self-auto">
          ${PRODUCT_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return `
              <button
                type="button"
                role="tab"
                data-category-tab="${category}"
                aria-selected="${isActive}"
                class="px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 ${
                  isActive ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }"
              >
                ${category}
              </button>
            `;
          }).join('')}
        </div>
      </div>

      ${
        searchQuery.trim() !== ''
          ? `
        <div class="flex items-center justify-between gap-4 px-4 py-3 mb-8 bg-slate-50 border border-slate-200 rounded-lg text-sm">
          <p class="text-slate-600">
            Showing <span class="font-mono font-bold text-slate-900 tabular-nums">${products.length}</span>
            result${products.length === 1 ? '' : 's'} for
            <span class="font-semibold text-slate-900">"${searchQuery}"</span>
          </p>
          <button
            type="button"
            id="catalog-clear-search"
            class="inline-flex items-center gap-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 whitespace-nowrap shrink-0"
          >
            ${iconReset('w-3.5 h-3.5')}
            <span>Reset search</span>
          </button>
        </div>
      `
          : ''
      }

      ${
        products.length === 0
          ? `
        <div class="py-16 px-6 text-center bg-slate-50 border border-slate-200 rounded-xl">
          <h3 class="font-display text-lg font-semibold text-slate-900 mb-2">No matching hardware found</h3>
          <p class="text-sm text-slate-600 max-w-md mx-auto mb-6">
            Try clearing your search term or switching back to all hardware categories.
          </p>
          <button
            type="button"
            id="catalog-reset-all"
            class="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Show All Hardware
          </button>
        </div>
      `
          : `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          ${products
            .map(
              (product) => `
            <article class="gsap-stagger group bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300">
              <div
                data-card-primary="${product.id}"
                data-card-featured="${product.featured}"
                role="button"
                tabindex="0"
                aria-label="${
                  product.featured
                    ? `Open featured quick-view modal for ${product.name}`
                    : `Open product page for ${product.name}`
                }"
                class="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rose-600"
              >
                <img
                  src="${product.image}"
                  alt="${product.imageAlt}"
                  referrerpolicy="no-referrer"
                  loading="lazy"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div class="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none">
                  <span class="px-2.5 py-1 rounded-md bg-slate-900/90 text-white text-xs font-medium backdrop-blur-sm">
                    ${product.featured ? 'Click for Quick Modal' : 'Click for Specs'}
                  </span>
                </div>
              </div>

              <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-5">
                <div>
                  <div class="flex items-center justify-between gap-2 text-xs text-slate-500 mb-1.5">
                    <span>${product.kicker}</span>
                    <span class="font-mono text-slate-400">${product.variants[0]?.sku ?? ''}</span>
                  </div>

                  <div class="flex items-baseline justify-between gap-3 mb-2">
                    <h3 class="font-display text-lg font-semibold text-slate-900">
                      <button
                        type="button"
                        data-card-primary="${product.id}"
                        data-card-featured="${product.featured}"
                        class="text-left hover:text-rose-600 transition-colors focus:outline-none focus-visible:underline"
                      >
                        ${product.name}
                      </button>
                    </h3>
                    <span class="font-mono text-base font-bold text-slate-900 tabular-nums whitespace-nowrap shrink-0">$${product.basePrice}</span>
                  </div>

                  <p class="text-sm text-slate-600 leading-relaxed line-clamp-2">${product.shortDescription}</p>
                </div>

                <div class="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div class="flex items-center gap-2">
                    <button
                      type="button"
                      data-quick-view="${product.id}"
                      title="Quick view specification modal"
                      class="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
                    >
                      ${iconEye('w-3.5 h-3.5')}
                      <span>Quick View</span>
                    </button>
                    <button
                      type="button"
                      data-full-page="${product.id}"
                      title="Open full product specification page"
                      class="inline-flex items-center gap-1 h-9 px-3 rounded-lg text-xs font-medium text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
                    >
                      <span>Full Page</span>
                      ${iconArrowUpRight('w-3.5 h-3.5')}
                    </button>
                  </div>

                  <button
                    type="button"
                    data-quick-add="${product.id}"
                    aria-label="Add ${product.name} to cart"
                    class="inline-flex items-center justify-center gap-1 h-9 px-3.5 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-rose-600 transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
                  >
                    ${iconPlus('w-3.5 h-3.5')}
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </article>
          `
            )
            .join('')}
        </div>
      `
      }
    </div>
  `;

  container.querySelectorAll('[data-category-tab]').forEach((btn) => {
    btn.addEventListener('click', () => onCategoryChange(btn.dataset.categoryTab));
  });

  const clearBtn = container.querySelector('#catalog-clear-search');
  if (clearBtn) clearBtn.addEventListener('click', onClearSearch);

  const resetAllBtn = container.querySelector('#catalog-reset-all');
  if (resetAllBtn) {
    resetAllBtn.addEventListener('click', () => {
      onClearSearch();
      onCategoryChange('All');
    });
  }

  container.querySelectorAll('[data-card-primary]').forEach((el) => {
    const activate = () => {
      const id = el.dataset.cardPrimary;
      const isFeatured = el.dataset.cardFeatured === 'true';
      if (isFeatured) onOpenModal(id);
      else onOpenProductPage(id);
    };

    el.addEventListener('click', activate);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate();
      }
    });
  });

  container.querySelectorAll('[data-quick-view]').forEach((btn) => {
    btn.addEventListener('click', () => onOpenModal(btn.dataset.quickView));
  });

  container.querySelectorAll('[data-full-page]').forEach((btn) => {
    btn.addEventListener('click', () => onOpenProductPage(btn.dataset.fullPage));
  });

  container.querySelectorAll('[data-quick-add]').forEach((btn) => {
    btn.addEventListener('click', () => onQuickAdd(btn.dataset.quickAdd));
  });
}
