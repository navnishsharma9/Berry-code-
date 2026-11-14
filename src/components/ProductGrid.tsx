import { ArrowUpRight, Eye, Plus, RotateCcw } from 'lucide-react';
import {
  PRODUCT_CATEGORIES,
  Product,
  ProductCategory,
} from '../data/products';
import { HardwareImage } from './HardwareImage';

interface ProductGridProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
  searchQuery: string;
  onClearSearch: () => void;
  onOpenFeaturedModal: (productId: string) => void;
  onOpenProductPage: (productId: string) => void;
  onQuickAddToCart: (product: Product) => void;
}

export function ProductGrid({
  products,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onClearSearch,
  onOpenFeaturedModal,
  onOpenProductPage,
  onQuickAddToCart,
}: ProductGridProps) {
  const handleCardPrimaryClick = (product: Product) => {
    if (product.featured) {
      onOpenFeaturedModal(product.id);
    } else {
      onOpenProductPage(product.id);
    }
  };

  return (
    <section
      id="catalog"
      aria-labelledby="catalog-heading"
      className="gsap-section bg-white border-b border-slate-200 py-14 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 gsap-reveal">
          <div>
            <p className="text-xs font-medium text-rose-600 mb-2">
              Hardware Catalog
            </p>
            <h2
              id="catalog-heading"
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance"
            >
              Single-board computers & modular expansion
            </h2>
          </div>

          {/* Interactive Category Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter hardware by category"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg self-start lg:self-auto"
          >
            {PRODUCT_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onCategoryChange(category)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Search Feedback Bar */}
        {searchQuery.trim() !== '' && (
          <div className="flex items-center justify-between gap-4 px-4 py-3 mb-8 bg-slate-50 border border-slate-200 rounded-lg text-sm">
            <p className="text-slate-600">
              Showing <span className="font-mono font-bold text-slate-900 tabular-nums">{products.length}</span>{' '}
              result{products.length === 1 ? '' : 's'} for{' '}
              <span className="font-semibold text-slate-900">"{searchQuery}"</span>
            </p>
            <button
              type="button"
              onClick={onClearSearch}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset search</span>
            </button>
          </div>
        )}

        {/* Empty Search / Filter State */}
        {products.length === 0 ? (
          <div className="py-16 px-6 text-center bg-slate-50 border border-slate-200 rounded-xl">
            <h3 className="font-display text-lg font-semibold text-slate-900 mb-2">
              No matching hardware found
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
              Try clearing your search term or switching back to all hardware categories.
            </p>
            <button
              type="button"
              onClick={() => {
                onClearSearch();
                onCategoryChange('All');
              }}
              className="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              Show All Hardware
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product) => (
              <article
                key={product.id}
                className="gsap-stagger group bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300"
              >
                {/* Uniform 4:3 Image Backdrop */}
                <div
                  onClick={() => handleCardPrimaryClick(product)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardPrimaryClick(product);
                    }
                  }}
                  aria-label={
                    product.featured
                      ? `Open featured quick-view modal for ${product.name}`
                      : `Open product page for ${product.name}`
                  }
                  className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rose-600"
                >
                  <HardwareImage
                    src={product.image}
                    alt={product.imageAlt}
                    title={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />

                  {/* Subtle Hover Quick-Inspect Overlay */}
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-md bg-slate-900/90 text-white text-xs font-medium backdrop-blur-sm">
                      {product.featured ? 'Click for Quick Modal' : 'Click for Specs'}
                    </span>
                  </div>
                </div>

                {/* Card Content — Identical Field Order */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-5">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-1.5">
                      <span>{product.kicker}</span>
                      <span className="font-mono text-slate-400">
                        {product.variants[0]?.sku}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between gap-3 mb-2">
                      <h3 className="font-display text-lg font-semibold text-slate-900">
                        <button
                          type="button"
                          onClick={() => handleCardPrimaryClick(product)}
                          className="text-left hover:text-rose-600 transition-colors focus:outline-none focus-visible:underline"
                        >
                          {product.name}
                        </button>
                      </h3>
                      <span className="font-mono text-base font-bold text-slate-900 tabular-nums whitespace-nowrap shrink-0">
                        ${product.basePrice}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Interactive Footer Controls */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenFeaturedModal(product.id)}
                        title="Quick view specification modal"
                        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
                      >
                        <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Quick View</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenProductPage(product.id)}
                        title="Open full product specification page"
                        className="inline-flex items-center gap-1 h-9 px-3 rounded-lg text-xs font-medium text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
                      >
                        <span>Full Page</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onQuickAddToCart(product)}
                      aria-label={`Add ${product.name} to cart`}
                      className="inline-flex items-center justify-center gap-1 h-9 px-3.5 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-rose-600 transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
                    >
                      <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
