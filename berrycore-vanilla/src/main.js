import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FEATURES, PARTNER_BRANDS, PRODUCTS } from './data/products.js';
import { initHeroCarousel } from './components/heroCarousel.js';
import { renderProductGrid } from './components/productGrid.js';
import { initTestimonialsCarousel } from './components/testimonialsCarousel.js';
import { renderFeaturedModal } from './components/modal.js';
import { renderProductDetailPage } from './components/productPage.js';
import { renderCartDrawer } from './components/cartDrawer.js';
import { brandMarkSvg, iconCheckCircle } from './components/icons.js';

gsap.registerPlugin(ScrollTrigger);

// Application State
const state = {
  searchQuery: '',
  selectedCategory: 'All',
  modalProductId: null,
  activeProductPageId: null,
  cartOpen: false,
  orderConfirmed: false,
  cartItems: [
    {
      product: PRODUCTS[0],
      variantId: PRODUCTS[0].variants[1].id,
      quantity: 1,
    },
  ],
};

// DOM References
const landingViewEl = document.getElementById('landing-view');
const productDetailEl = document.getElementById('product-detail-view');
const heroSectionEl = document.getElementById('top');
const featuresSectionEl = document.getElementById('capabilities');
const catalogSectionEl = document.getElementById('catalog');
const testimonialsSectionEl = document.getElementById('testimonials');
const partnersSectionEl = document.getElementById('partners');

const modalRootEl = document.getElementById('featured-modal-root');
const cartDrawerRootEl = document.getElementById('cart-drawer-root');
const toastRootEl = document.getElementById('toast-root');
const headerCartCountEl = document.getElementById('header-cart-count');

const desktopSearchInput = document.getElementById('desktop-search-input');
const desktopSearchClear = document.getElementById('desktop-search-clear');
const mobileSearchInput = document.getElementById('mobile-search-input');
const mobileSearchClear = document.getElementById('mobile-search-clear');
const mobileSearchPanel = document.getElementById('mobile-search-panel');
const mobileSearchToggle = document.getElementById('mobile-search-toggle');
const mobileNavPanel = document.getElementById('mobile-nav-panel');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenuIconOpen = document.getElementById('mobile-menu-icon-open');
const mobileMenuIconClose = document.getElementById('mobile-menu-icon-close');

let toastTimer = null;
let gsapCtx = null;

// Static Section Renderers
function renderFeatures() {
  featuresSectionEl.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mb-10 sm:mb-12 gsap-reveal">
        <p class="text-xs font-medium text-rose-600 mb-2">Engineering &amp; Services</p>
        <h2 id="capabilities-heading" class="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
          Built for benchtop experimentation and ten-year field fleets.
        </h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${FEATURES.map(
          (f) => `
          <article class="gsap-stagger bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5">
            <div>
              <div class="flex items-center justify-between gap-2 mb-4">
                <span class="font-mono text-sm font-bold text-slate-400 tabular-nums">${f.number}</span>
                <span class="font-mono text-xs text-slate-600 tabular-nums">${f.metric}</span>
              </div>
              <h3 class="font-display text-lg font-semibold text-slate-900 mb-2.5">${f.title}</h3>
              <p class="text-sm text-slate-600 leading-relaxed">${f.description}</p>
            </div>
          </article>
        `
        ).join('')}
      </div>
    </div>
  `;
}

function renderPartnerBrands() {
  partnersSectionEl.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 gsap-reveal">
        <div>
          <p class="text-xs font-medium text-rose-600 mb-2">Ecosystem Partners</p>
          <h2 id="partners-heading" class="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
            Certified hardware &amp; silicon partners
          </h2>
        </div>
        <p class="text-sm text-slate-600 max-w-md">
          Validated drivers, carrier boards, and optical peripherals engineered for zero-friction BerryOS integration.
        </p>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        ${PARTNER_BRANDS.map(
          (brand) => `
          <div class="gsap-stagger group bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between gap-3 transition-colors hover:bg-white hover:border-slate-300">
            ${brandMarkSvg(brand.markType)}
            <div>
              <p class="font-display text-sm font-semibold text-slate-900 truncate">${brand.name}</p>
              <p class="text-[11px] text-slate-500 truncate mt-0.5">${brand.sector}</p>
            </div>
          </div>
        `
        ).join('')}
      </div>
    </div>
  `;
}

function getFilteredProducts() {
  const q = state.searchQuery.trim().toLowerCase();
  return PRODUCTS.filter((product) => {
    const matchesCategory =
      state.selectedCategory === 'All' || product.category === state.selectedCategory;
    if (!matchesCategory) return false;
    if (!q) return true;
    const haystack = [
      product.name,
      product.category,
      product.tagline,
      product.shortDescription,
      ...product.specs.map((s) => `${s.label} ${s.value}`),
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}

function updateCatalogGrid() {
  renderProductGrid(catalogSectionEl, {
    products: getFilteredProducts(),
    selectedCategory: state.selectedCategory,
    searchQuery: state.searchQuery,
    onCategoryChange: (cat) => {
      state.selectedCategory = cat;
      updateCatalogGrid();
    },
    onClearSearch: () => {
      setSearchQuery('');
    },
    onOpenModal: openModal,
    onOpenProductPage: openProductPage,
    onQuickAdd: (productId) => {
      const prod = PRODUCTS.find((p) => p.id === productId);
      if (prod && prod.variants[0]) {
        addToCart(prod, prod.variants[0].id, 1);
      }
    },
  });
}

function syncCartBadge() {
  const count = state.cartItems.reduce((total, item) => total + item.quantity, 0);
  headerCartCountEl.textContent = `(${count})`;
}

function showToast(message) {
  toastRootEl.innerHTML = `
    <span class="text-emerald-400 shrink-0">${iconCheckCircle('w-4 h-4')}</span>
    <span>${message}</span>
    <button type="button" id="toast-view-bag" class="text-xs font-semibold text-rose-400 hover:text-rose-300 underline underline-offset-4 whitespace-nowrap">View Bag</button>
  `;
  toastRootEl.classList.remove('hidden');

  toastRootEl.querySelector('#toast-view-bag').addEventListener('click', () => {
    toastRootEl.classList.add('hidden');
    openCart();
  });

  if (toastTimer) window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toastRootEl.classList.add('hidden');
  }, 2800);
}

function addToCart(product, variantId, quantity) {
  state.orderConfirmed = false;
  const idx = state.cartItems.findIndex(
    (item) => item.product.id === product.id && item.variantId === variantId
  );
  if (idx >= 0) {
    state.cartItems[idx].quantity += quantity;
  } else {
    state.cartItems.push({ product, variantId, quantity });
  }
  syncCartBadge();
  showToast(`Added ${product.name} to bag`);
  if (state.cartOpen) syncCartDrawer();
}

function syncCartDrawer() {
  renderCartDrawer(cartDrawerRootEl, {
    isOpen: state.cartOpen,
    items: state.cartItems,
    orderConfirmed: state.orderConfirmed,
    onClose: () => {
      state.cartOpen = false;
      syncCartDrawer();
    },
    onUpdateQuantity: (productId, variantId, delta) => {
      state.cartItems = state.cartItems
        .map((item) => {
          if (item.product.id === productId && item.variantId === variantId) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
      syncCartBadge();
      syncCartDrawer();
    },
    onRemoveItem: (productId, variantId) => {
      state.cartItems = state.cartItems.filter(
        (item) => !(item.product.id === productId && item.variantId === variantId)
      );
      syncCartBadge();
      syncCartDrawer();
    },
    onCheckout: () => {
      state.orderConfirmed = true;
      state.cartItems = [];
      syncCartBadge();
      syncCartDrawer();
    },
    onResetConfirmed: () => {
      state.orderConfirmed = false;
    },
  });
}

function openCart() {
  state.cartOpen = true;
  syncCartDrawer();
}

function openModal(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;
  state.modalProductId = productId;
  renderFeaturedModal(modalRootEl, {
    product,
    onClose: closeModal,
    onAddToCart: addToCart,
    onOpenProductPage: openProductPage,
  });
}

function closeModal() {
  state.modalProductId = null;
  renderFeaturedModal(modalRootEl, {
    product: null,
    onClose: closeModal,
    onAddToCart: addToCart,
    onOpenProductPage: openProductPage,
  });
}

function openProductPage(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;
  state.activeProductPageId = productId;
  landingViewEl.classList.add('hidden');
  productDetailEl.classList.remove('hidden');

  renderProductDetailPage(productDetailEl, {
    product,
    onBackToCatalog: () => navigateHome('catalog'),
    onAddToCart: addToCart,
    onSelectProduct: openProductPage,
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateHome(sectionId) {
  closeModal();
  state.activeProductPageId = null;
  productDetailEl.classList.add('hidden');
  landingViewEl.classList.remove('hidden');
  ScrollTrigger.refresh();

  if (sectionId && sectionId !== 'top') {
    window.setTimeout(() => {
      const target = document.getElementById(sectionId);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function setSearchQuery(value) {
  state.searchQuery = value;
  desktopSearchInput.value = value;
  mobileSearchInput.value = value;
  desktopSearchClear.classList.toggle('hidden', value === '');
  mobileSearchClear.classList.toggle('hidden', value === '');

  if (state.activeProductPageId !== null && value.trim() !== '') {
    navigateHome('catalog');
  }
  updateCatalogGrid();
}

function initScrollAnimations() {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return;
  }

  if (gsapCtx) gsapCtx.revert();
  gsapCtx = gsap.context(() => {
    const sections = gsap.utils.toArray('.gsap-section');
    sections.forEach((section) => {
      const headers = section.querySelectorAll('.gsap-reveal');
      const cards = section.querySelectorAll('.gsap-stagger');

      if (headers.length > 0) {
        gsap.from(headers, {
          y: 22,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: section,
            start: 'top 86%',
            once: true,
          },
        });
      }

      if (cards.length > 0) {
        gsap.from(cards, {
          y: 22,
          opacity: 0,
          duration: 0.5,
          stagger: 0.045,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: section,
            start: 'top 86%',
            once: true,
          },
        });
      }
    });
  }, landingViewEl);
}

// Header & Footer Event Bindings
document.getElementById('brand-home-link').addEventListener('click', (e) => {
  e.preventDefault();
  navigateHome();
});

document.querySelectorAll('[data-nav]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    mobileNavPanel.classList.add('hidden');
    mobileMenuIconOpen.classList.remove('hidden');
    mobileMenuIconClose.classList.add('hidden');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    navigateHome(el.dataset.nav);
  });
});

document.querySelectorAll('[data-footer-category]').forEach((btn) => {
  btn.addEventListener('click', () => {
    state.selectedCategory = btn.dataset.footerCategory;
    updateCatalogGrid();
    navigateHome('catalog');
  });
});

desktopSearchInput.addEventListener('input', (e) => setSearchQuery(e.target.value));
mobileSearchInput.addEventListener('input', (e) => setSearchQuery(e.target.value));
desktopSearchClear.addEventListener('click', () => setSearchQuery(''));
mobileSearchClear.addEventListener('click', () => setSearchQuery(''));

document.getElementById('desktop-search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  navigateHome('catalog');
});

document.getElementById('mobile-search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  mobileSearchPanel.classList.add('hidden');
  mobileSearchToggle.setAttribute('aria-expanded', 'false');
  navigateHome('catalog');
});

mobileSearchToggle.addEventListener('click', () => {
  const isHidden = mobileSearchPanel.classList.toggle('hidden');
  mobileSearchToggle.setAttribute('aria-expanded', String(!isHidden));
  if (!isHidden) mobileSearchInput.focus();
});

mobileMenuToggle.addEventListener('click', () => {
  const isHidden = mobileNavPanel.classList.toggle('hidden');
  mobileMenuToggle.setAttribute('aria-expanded', String(!isHidden));
  mobileMenuIconOpen.classList.toggle('hidden', !isHidden);
  mobileMenuIconClose.classList.toggle('hidden', isHidden);
});

document.getElementById('open-cart-btn').addEventListener('click', openCart);

modalRootEl.addEventListener('click', closeModal);
cartDrawerRootEl.addEventListener('click', () => {
  state.cartOpen = false;
  syncCartDrawer();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (state.modalProductId) closeModal();
    if (state.cartOpen) {
      state.cartOpen = false;
      syncCartDrawer();
    }
  }
});

// Newsletter Signup Form
document.getElementById('footer-year').textContent = String(new Date().getFullYear());
const newsletterContainer = document.getElementById('newsletter-container');

function bindNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('newsletter-email');
  const errorEl = document.getElementById('newsletter-error');
  if (!form) return;

  emailInput.addEventListener('input', () => {
    errorEl.classList.add('hidden');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = emailInput.value.trim();
    if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      errorEl.textContent = 'Please enter a valid engineering or work email address.';
      errorEl.classList.remove('hidden');
      return;
    }

    newsletterContainer.innerHTML = `
      <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
        <div class="flex items-center gap-2 text-sm font-medium text-emerald-400">
          ${iconCheckCircle('w-4 h-4')}
          <span>Subscribed for release notes</span>
        </div>
        <p class="text-xs text-slate-400">
          Confirmation sent to <span class="text-slate-200">${val}</span>.
        </p>
        <button type="button" id="newsletter-reset-btn" class="text-xs text-slate-400 underline hover:text-white">
          Change email address
        </button>
      </div>
    `;

    document.getElementById('newsletter-reset-btn').addEventListener('click', () => {
      newsletterContainer.innerHTML = `
        <form id="newsletter-form" novalidate class="space-y-2">
          <div class="flex flex-col sm:flex-row gap-2">
            <label for="newsletter-email" class="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="engineer@company.com"
              class="w-full sm:flex-1 h-11 min-h-[44px] py-2.5 px-4 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-rose-500 focus-visible:ring-2 focus-visible:ring-rose-500 transition-colors"
            />
            <button
              type="submit"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 h-11 min-h-[44px] px-5 rounded-lg bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            >
              <span>Subscribe</span>
            </button>
          </div>
          <p id="newsletter-error" class="hidden text-xs text-rose-400" role="alert"></p>
        </form>
      `;
      bindNewsletterForm();
    });
  });
}

// Initial Bootstrap
initHeroCarousel(heroSectionEl, {
  onOpenModal: openModal,
  onOpenProductPage: openProductPage,
});
renderFeatures();
updateCatalogGrid();
initTestimonialsCarousel(testimonialsSectionEl);
renderPartnerBrands();
syncCartBadge();
bindNewsletterForm();
initScrollAnimations();
