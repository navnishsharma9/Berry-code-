import { useEffect, useState } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { Product } from '../data/products';
import { HardwareImage } from './HardwareImage';

export interface CartItem {
  product: Product;
  variantId: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, variantId: string, delta: number) => void;
  onRemoveItem: (productId: string, variantId: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => {
    const variant =
      item.product.variants.find((v) => v.id === item.variantId) ??
      item.product.variants[0];
    return sum + (variant?.price ?? item.product.basePrice) * item.quantity;
  }, 0);

  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleCheckout = () => {
    setOrderConfirmed(true);
    onClearCart();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl border-l border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-slate-900" aria-hidden="true" />
            <h2 className="font-display text-lg font-bold text-slate-900">
              Hardware Bag
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping cart"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {orderConfirmed ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900">
                Order #BC-1042 Confirmed
              </h3>
              <p className="text-sm text-slate-600 max-w-xs mx-auto leading-relaxed">
                This is a learning demo storefront. Your sample hardware order has been queued for inspection.
              </p>
              <button
                type="button"
                onClick={() => {
                  setOrderConfirmed(false);
                  onClose();
                }}
                className="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800"
              >
                Continue Exploring
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-display text-base font-semibold text-slate-900">
                Your hardware bag is empty
              </p>
              <p className="text-sm text-slate-500 max-w-xs mx-auto">
                Add single-board computers, AI HATs, or enclosures from the catalog to test the cart flow.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
                {remainingForFreeShipping === 0 ? (
                  <span className="font-medium text-emerald-700">
                    Unlocked complimentary express courier shipping.
                  </span>
                ) : (
                  <span>
                    Add{' '}
                    <span className="font-mono font-bold text-slate-900 tabular-nums">
                      ${remainingForFreeShipping}
                    </span>{' '}
                    more for complimentary express shipping.
                  </span>
                )}
              </div>

              <ul className="divide-y divide-slate-200">
                {items.map((item) => {
                  const variant =
                    item.product.variants.find((v) => v.id === item.variantId) ??
                    item.product.variants[0];
                  const unitPrice = variant?.price ?? item.product.basePrice;

                  return (
                    <li
                      key={`${item.product.id}-${item.variantId}`}
                      className="py-4 flex gap-4"
                    >
                      <div className="w-20 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                        <HardwareImage
                          src={item.product.image}
                          alt={item.product.imageAlt}
                          title={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display text-sm font-semibold text-slate-900 truncate">
                            {item.product.name}
                          </h3>
                          <span className="font-mono text-sm font-bold text-slate-900 tabular-nums shrink-0">
                            ${(unitPrice * item.quantity).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {variant?.label} · <span className="font-mono">{variant?.sku}</span>
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="inline-flex items-center border border-slate-200 rounded-md h-8">
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(item.product.id, item.variantId, -1)
                              }
                              aria-label="Decrease quantity"
                              className="w-8 h-full flex items-center justify-center text-slate-600 hover:text-slate-900"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center font-mono text-xs font-bold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(item.product.id, item.variantId, 1)
                              }
                              aria-label="Increase quantity"
                              className="w-8 h-full flex items-center justify-center text-slate-600 hover:text-slate-900"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              onRemoveItem(item.product.id, item.variantId)
                            }
                            aria-label={`Remove ${item.product.name}`}
                            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {items.length > 0 && !orderConfirmed && (
          <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-slate-600">Subtotal</span>
              <span className="font-mono text-xl font-bold text-slate-900 tabular-nums">
                ${subtotal.toLocaleString()}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full h-12 rounded-lg bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 transition-colors"
            >
              Place Demo Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
