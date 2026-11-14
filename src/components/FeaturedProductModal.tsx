import { useEffect, useState } from 'react';
import { ArrowRight, Check, CheckCircle2, ShoppingBag, X } from 'lucide-react';
import { Product } from '../data/products';
import { HardwareImage } from './HardwareImage';

interface FeaturedProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variantId: string, quantity: number) => void;
  onOpenProductPage: (productId: string) => void;
}

export function FeaturedProductModal({
  product,
  onClose,
  onAddToCart,
  onOpenProductPage,
}: FeaturedProductModalProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedVariantId(product.variants[0]?.id ?? '');
      setAddedFeedback(false);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];

  const handleAdd = () => {
    if (!activeVariant) return;
    onAddToCart(product, activeVariant.id, 1);
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col lg:grid lg:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product preview"
          className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/90 text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Image Column */}
        <div className="lg:col-span-6 bg-slate-100 flex items-center justify-center min-h-[220px] sm:min-h-[280px]">
          <HardwareImage
            src={product.image}
            alt={product.imageAlt}
            title={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Quick Spec & Action Column */}
        <div className="lg:col-span-6 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 pr-10">
              <span>{product.kicker}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{activeVariant?.sku}</span>
            </div>

            <h2
              id="modal-product-title"
              className="font-display text-2xl font-bold text-slate-900 mb-2"
            >
              {product.name}
            </h2>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-mono text-2xl font-bold text-slate-900 tabular-nums">
                ${activeVariant?.price ?? product.basePrice}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>In Stock</span>
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-5">
              {product.shortDescription}
            </p>

            {/* Variant Selector */}
            <div className="mb-5">
              <p className="text-xs font-medium text-slate-700 mb-2">
                Configuration
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => {
                  const isSelected = variant.id === activeVariant?.id;
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariantId(variant.id)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 ${
                        isSelected
                          ? 'bg-slate-900 border-slate-900 text-white'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {variant.label} —{' '}
                      <span className="font-mono tabular-nums">${variant.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Key Hardware Highlights */}
            <div className="border-t border-slate-100 pt-4">
              <p className="text-xs font-medium text-slate-700 mb-2.5">
                Key Specifications
              </p>
              <ul className="space-y-1.5">
                {product.highlights.slice(0, 3).map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed"
                  >
                    <Check
                      className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Modal Action Footer */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleAdd}
              className={`flex-1 inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 ${
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
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenProductPage(product.id);
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm font-medium hover:bg-slate-50 transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
            >
              <span>Full Product Page</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
