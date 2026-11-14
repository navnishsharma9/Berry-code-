import { iconBag, iconCheckCircle, iconClose, iconMinus, iconPlus, iconTrash } from './icons.js';

export function renderCartDrawer(
  drawerRoot,
  { isOpen, items, orderConfirmed, onClose, onUpdateQuantity, onRemoveItem, onCheckout, onResetConfirmed }
) {
  if (!isOpen) {
    drawerRoot.classList.add('hidden');
    drawerRoot.innerHTML = '';
    return;
  }

  const subtotal = items.reduce((sum, item) => {
    const variant =
      item.product.variants.find((v) => v.id === item.variantId) ?? item.product.variants[0];
    return sum + (variant?.price ?? item.product.basePrice) * item.quantity;
  }, 0);

  const freeShippingThreshold = 150;
  const remaining = Math.max(0, freeShippingThreshold - subtotal);

  drawerRoot.innerHTML = `
    <div id="cart-panel" class="w-full max-w-md bg-white h-full flex flex-col shadow-2xl border-l border-slate-200">
      <div class="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <span class="text-slate-900">${iconBag('w-5 h-5')}</span>
          <h2 class="font-display text-lg font-bold text-slate-900">Hardware Bag</h2>
        </div>
        <button type="button" id="cart-close-btn" aria-label="Close shopping cart" class="w-10 h-10 inline-flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100">
          ${iconClose('w-5 h-5')}
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-6">
        ${
          orderConfirmed
            ? `
          <div class="py-12 text-center space-y-4">
            <div class="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
              ${iconCheckCircle('w-6 h-6')}
            </div>
            <h3 class="font-display text-xl font-bold text-slate-900">Order #BC-1042 Confirmed</h3>
            <p class="text-sm text-slate-600 max-w-xs mx-auto leading-relaxed">
              This is a learning demo storefront. Your sample hardware order has been queued for inspection.
            </p>
            <button type="button" id="cart-continue-btn" class="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800">
              Continue Exploring
            </button>
          </div>
        `
            : items.length === 0
              ? `
          <div class="py-16 text-center space-y-3">
            <div class="w-10 h-10 text-slate-300 mx-auto flex items-center justify-center">${iconBag('w-10 h-10')}</div>
            <p class="font-display text-base font-semibold text-slate-900">Your hardware bag is empty</p>
            <p class="text-sm text-slate-500 max-w-xs mx-auto">
              Add single-board computers, AI HATs, or enclosures from the catalog to test the cart flow.
            </p>
          </div>
        `
              : `
          <div class="space-y-4">
            <div class="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
              ${
                remaining === 0
                  ? '<span class="font-medium text-emerald-700">Unlocked complimentary express courier shipping.</span>'
                  : `<span>Add <span class="font-mono font-bold text-slate-900 tabular-nums">$${remaining}</span> more for complimentary express shipping.</span>`
              }
            </div>

            <ul class="divide-y divide-slate-200">
              ${items
                .map((item) => {
                  const variant =
                    item.product.variants.find((v) => v.id === item.variantId) ??
                    item.product.variants[0];
                  const unitPrice = variant?.price ?? item.product.basePrice;
                  return `
                  <li class="py-4 flex gap-4">
                    <div class="w-20 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                      <img src="${item.product.image}" alt="${item.product.imageAlt}" referrerpolicy="no-referrer" class="w-full h-full object-cover" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-start justify-between gap-2">
                        <h3 class="font-display text-sm font-semibold text-slate-900 truncate">${item.product.name}</h3>
                        <span class="font-mono text-sm font-bold text-slate-900 tabular-nums shrink-0">$${(unitPrice * item.quantity).toLocaleString()}</span>
                      </div>
                      <p class="text-xs text-slate-500 mt-0.5">${variant?.label ?? ''} · <span class="font-mono">${variant?.sku ?? ''}</span></p>
                      <div class="flex items-center justify-between mt-3">
                        <div class="inline-flex items-center border border-slate-200 rounded-md h-8">
                          <button type="button" data-cart-dec="${item.product.id}|${item.variantId}" aria-label="Decrease quantity" class="w-8 h-full flex items-center justify-center text-slate-600 hover:text-slate-900">
                            ${iconMinus('w-3.5 h-3.5')}
                          </button>
                          <span class="w-8 text-center font-mono text-xs font-bold tabular-nums">${item.quantity}</span>
                          <button type="button" data-cart-inc="${item.product.id}|${item.variantId}" aria-label="Increase quantity" class="w-8 h-full flex items-center justify-center text-slate-600 hover:text-slate-900">
                            ${iconPlus('w-3.5 h-3.5')}
                          </button>
                        </div>
                        <button type="button" data-cart-remove="${item.product.id}|${item.variantId}" aria-label="Remove ${item.product.name}" class="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600">
                          ${iconTrash('w-3.5 h-3.5')}
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </li>
                `;
                })
                .join('')}
            </ul>
          </div>
        `
        }
      </div>

      ${
        items.length > 0 && !orderConfirmed
          ? `
        <div class="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
          <div class="flex items-baseline justify-between">
            <span class="text-sm text-slate-600">Subtotal</span>
            <span class="font-mono text-xl font-bold text-slate-900 tabular-nums">$${subtotal.toLocaleString()}</span>
          </div>
          <button type="button" id="cart-checkout-btn" class="w-full h-12 rounded-lg bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 transition-colors">
            Place Demo Order
          </button>
        </div>
      `
          : ''
      }
    </div>
  `;

  drawerRoot.classList.remove('hidden');

  drawerRoot.querySelector('#cart-panel').addEventListener('click', (e) => e.stopPropagation());
  drawerRoot.querySelector('#cart-close-btn').addEventListener('click', onClose);

  const continueBtn = drawerRoot.querySelector('#cart-continue-btn');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      onResetConfirmed();
      onClose();
    });
  }

  const checkoutBtn = drawerRoot.querySelector('#cart-checkout-btn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', onCheckout);

  drawerRoot.querySelectorAll('[data-cart-dec]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const [productId, variantId] = btn.dataset.cartDec.split('|');
      onUpdateQuantity(productId, variantId, -1);
    });
  });

  drawerRoot.querySelectorAll('[data-cart-inc]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const [productId, variantId] = btn.dataset.cartInc.split('|');
      onUpdateQuantity(productId, variantId, 1);
    });
  });

  drawerRoot.querySelectorAll('[data-cart-remove]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const [productId, variantId] = btn.dataset.cartRemove.split('|');
      onRemoveItem(productId, variantId);
    });
  });
}
