import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Cpu,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';
import { HardwareImage } from './HardwareImage';

interface ProductDetailPageProps {
  product: Product;
  onBackToCatalog: () => void;
  onAddToCart: (product: Product, variantId: string, quantity: number) => void;
  onSelectRelatedProduct: (productId: string) => void;
}

export function ProductDetailPage({
  product,
  onBackToCatalog,
  onAddToCart,
  onSelectRelatedProduct,
}: ProductDetailPageProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id ?? ''
  );
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState<'photo' | 'pinout'>('photo');

  useEffect(() => {
    setSelectedVariantId(product.variants[0]?.id ?? '');
    setQuantity(1);
    setAddedFeedback(false);
    setActiveGalleryTab('photo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    if (!activeVariant) return;
    onAddToCart(product, activeVariant.id, quantity);
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1800);
  };

  return (
    <main className="bg-[#F8FAFC] min-h-screen pb-24 lg:pb-16">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
            <button
              type="button"
              onClick={onBackToCatalog}
              className="hover:text-slate-900 transition-colors focus:outline-none focus-visible:underline"
            >
              Catalog
            </button>
            <span aria-hidden="true">/</span>
            <span>{product.category}</span>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-slate-900">{product.name}</span>
          </nav>

          <button
            type="button"
            onClick={onBackToCatalog}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-rose-600 transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to Hardware Gallery</span>
          </button>
        </div>
      </div>

      {/* Main Contiguous Purchase Module */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Sticky Hardware Gallery */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              {activeGalleryTab === 'photo' ? (
                <div className="aspect-[4/3] bg-slate-100">
                  <HardwareImage
                    src={product.image}
                    alt={product.imageAlt}
                    title={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] bg-slate-900 text-slate-100 p-6 sm:p-10 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <p className="font-mono text-xs text-rose-400 mb-1">
                        Mechanical & I/O Reference
                      </p>
                      <h3 className="font-display text-lg font-semibold text-white">
                        {product.name} — Interface Topology
                      </h3>
                    </div>
                    <Cpu className="w-6 h-6 text-slate-400" aria-hidden="true" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 my-auto py-4">
                    {product.specs.slice(0, 4).map((spec) => (
                      <div
                        key={spec.label}
                        className="p-3.5 rounded-lg bg-slate-800/70 border border-slate-700/80"
                      >
                        <p className="text-[11px] font-mono text-slate-400 mb-1">
                          {spec.label}
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-white">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-t border-slate-800 pt-4">
                    <span>40-Pin Standard 2.54 mm Pitch</span>
                    <span>STEP CAD & Schematic Available</span>
                  </div>
                </div>
              )}
            </div>

            {/* Gallery View Switcher */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveGalleryTab('photo')}
                className={`px-4 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  activeGalleryTab === 'photo'
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Studio View
              </button>
              <button
                type="button"
                onClick={() => setActiveGalleryTab('pinout')}
                className={`px-4 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  activeGalleryTab === 'pinout'
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Interface Topology
              </button>
            </div>

            {/* Detailed Engineering Overview */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 mt-6">
              <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
                Engineering Overview
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                {product.longDescription}
              </p>

              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Key Architectural Highlights
              </h3>
              <ul className="space-y-2.5">
                {product.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5 text-sm text-slate-700"
                  >
                    <Check
                      className="w-4 h-4 text-rose-600 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Sticky Purchase Module & Technical Spec Table */}
          <div className="lg:col-span-5 min-w-0 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8">
              <div className="flex items-center justify-between gap-3 text-xs text-slate-500 mb-2">
                <span>{product.category}</span>
                <span className="font-mono text-slate-400">
                  SKU: {activeVariant?.sku}
                </span>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-2 text-balance">
                {product.name}
              </h1>

              <p className="text-sm text-slate-600 mb-6">{product.tagline}</p>

              <div className="flex items-baseline justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
                <div>
                  <span className="font-mono text-3xl font-bold text-slate-900 tabular-nums">
                    ${activeVariant?.price ?? product.basePrice}
                  </span>
                  <span className="text-xs text-slate-500 ml-2">USD / unit</span>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  <span>In Stock & Ready</span>
                </span>
              </div>

              {/* Variant Selector */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-700 mb-2.5">
                  Select Configuration
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {product.variants.map((variant) => {
                    const isSelected = variant.id === activeVariant?.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 ${
                          isSelected
                            ? 'bg-slate-900 border-slate-900 text-white'
                            : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-sm font-medium">{variant.label}</span>
                        <span className="font-mono text-sm font-bold tabular-nums shrink-0">
                          ${variant.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                <div className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start border border-slate-200 rounded-lg bg-slate-50 h-12 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-12 sm:w-11 h-full flex items-center justify-center text-slate-600 hover:text-slate-900"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-mono text-sm font-bold text-slate-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                    aria-label="Increase quantity"
                    className="w-12 sm:w-11 h-full flex items-center justify-center text-slate-600 hover:text-slate-900"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className={`w-full sm:flex-1 min-w-0 inline-flex items-center justify-center gap-2 h-12 px-4 sm:px-6 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 ${
                    addedFeedback
                      ? 'bg-emerald-700 text-white'
                      : 'bg-rose-600 text-white hover:bg-rose-700'
                  }`}
                >
                  {addedFeedback ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" />
                      <span>Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                      <span>
                        Add to Cart — $
                        {((activeVariant?.price ?? product.basePrice) * quantity).toLocaleString()}
                      </span>
                    </>
                  )}
                </button>
              </div>

              {/* Shipping & Warranty Guarantees */}
              <div className="space-y-2.5 pt-5 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                  <span>{product.shippingNote}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                  <span>{product.warranty}</span>
                </div>
              </div>
            </div>

            {/* Technical Specifications Table */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
              <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
                Technical Specifications
              </h2>
              <dl className="divide-y divide-slate-100">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4"
                  >
                    <dt className="text-xs font-medium text-slate-500 shrink-0">
                      {spec.label}
                    </dt>
                    <dd className="font-mono text-xs text-slate-900 sm:text-right tabular-nums">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Related Hardware */}
        <section aria-label="Related hardware" className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="font-display text-xl font-bold text-slate-900">
              Compatible Modules & Accessories
            </h2>
            <button
              type="button"
              onClick={onBackToCatalog}
              className="text-xs font-medium text-rose-600 hover:text-rose-700"
            >
              View Full Catalog
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <button
                key={rel.id}
                type="button"
                onClick={() => onSelectRelatedProduct(rel.id)}
                className="group text-left bg-white border border-slate-200 rounded-xl overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all"
              >
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                  <HardwareImage
                    src={rel.image}
                    alt={rel.imageAlt}
                    title={rel.name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex items-baseline justify-between gap-3">
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">{rel.category}</p>
                    <p className="font-display text-sm font-semibold text-slate-900 group-hover:text-rose-600 transition-colors">
                      {rel.name}
                    </p>
                  </div>
                  <span className="font-mono text-sm font-bold text-slate-900 tabular-nums">
                    ${rel.basePrice}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Sticky Mobile Bottom Buy Bar (<= 15% viewport height) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-900 truncate">{product.name}</p>
          <p className="font-mono text-sm font-bold text-slate-900 tabular-nums">
            ${((activeVariant?.price ?? product.basePrice) * quantity).toLocaleString()}
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="h-10 px-5 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 whitespace-nowrap shrink-0"
        >
          {addedFeedback ? 'Added' : 'Add to Cart'}
        </button>
      </div>
    </main>
  );
}
