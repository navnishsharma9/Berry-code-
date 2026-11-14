import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2 } from 'lucide-react';
import {
  PRODUCTS,
  Product,
  ProductCategory,
} from './data/products';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { FeaturesSection } from './components/FeaturesSection';
import { ProductGrid } from './components/ProductGrid';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BrandsGrid } from './components/BrandsGrid';
import { Footer } from './components/Footer';
import { FeaturedProductModal } from './components/FeaturedProductModal';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartDrawer, CartItem } from './components/CartDrawer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainRef = useRef<HTMLDivElement | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [modalProductId, setModalProductId] = useState<string | null>(null);
  const [activeProductPageId, setActiveProductPageId] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      variantId: PRODUCTS[0].variants[1].id,
      quantity: 1,
    },
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
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
  }, [searchQuery, selectedCategory]);

  const modalProduct = useMemo(
    () => PRODUCTS.find((p) => p.id === modalProductId) ?? null,
    [modalProductId]
  );

  const activePageProduct = useMemo(
    () => PRODUCTS.find((p) => p.id === activeProductPageId) ?? null,
    [activeProductPageId]
  );

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  // GSAP ScrollTrigger animations for sections entering the viewport
  useEffect(() => {
    if (activeProductPageId !== null) return;
    if (!mainRef.current) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('.gsap-section');

      sections.forEach((section) => {
        const headerEl = section.querySelectorAll('.gsap-reveal');
        const staggerEls = section.querySelectorAll('.gsap-stagger');

        if (headerEl.length > 0) {
          gsap.from(headerEl, {
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

        if (staggerEls.length > 0) {
          gsap.from(staggerEls, {
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
    }, mainRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [activeProductPageId]);

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2800);
  };

  const handleAddToCart = (
    product: Product,
    variantId: string,
    quantity: number
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.variantId === variantId
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { product, variantId, quantity }];
    });
    showToast(`Added ${product.name} to bag`);
  };

  const handleQuickAddToCart = (product: Product) => {
    const defaultVariant = product.variants[0];
    if (!defaultVariant) return;
    handleAddToCart(product, defaultVariant.id, 1);
  };

  const handleUpdateCartQuantity = (
    productId: string,
    variantId: string,
    delta: number
  ) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.variantId === variantId) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (productId: string, variantId: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.variantId === variantId)
      )
    );
  };

  const handleNavigateHome = (sectionId?: string) => {
    setActiveProductPageId(null);
    setModalProductId(null);

    if (sectionId) {
      window.setTimeout(() => {
        const target = document.getElementById(sectionId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (activeProductPageId !== null && value.trim() !== '') {
      setActiveProductPageId(null);
    }
  };

  const handleSearchSubmit = () => {
    handleNavigateHome('catalog');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        onNavigateHome={handleNavigateHome}
      />

      {activePageProduct ? (
        <ProductDetailPage
          product={activePageProduct}
          onBackToCatalog={() => handleNavigateHome('catalog')}
          onAddToCart={handleAddToCart}
          onSelectRelatedProduct={(id) => setActiveProductPageId(id)}
        />
      ) : (
        <div ref={mainRef} className="flex-1">
          <HeroCarousel
            onOpenFeaturedModal={(id) => setModalProductId(id)}
            onOpenProductPage={(id) => setActiveProductPageId(id)}
          />

          <FeaturesSection />

          <ProductGrid
            products={filteredProducts}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery('')}
            onOpenFeaturedModal={(id) => setModalProductId(id)}
            onOpenProductPage={(id) => setActiveProductPageId(id)}
            onQuickAddToCart={handleQuickAddToCart}
          />

          <TestimonialsSection />

          <BrandsGrid />
        </div>
      )}

      <Footer
        onSelectCategory={setSelectedCategory}
        onNavigateHome={handleNavigateHome}
      />

      <FeaturedProductModal
        product={modalProduct}
        onClose={() => setModalProductId(null)}
        onAddToCart={handleAddToCart}
        onOpenProductPage={(id) => setActiveProductPageId(id)}
      />

      <CartDrawer
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />

      {/* Non-intrusive Add-to-Cart Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 text-white text-sm shadow-lg border border-slate-800"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => {
              setToastMessage(null);
              setCartOpen(true);
            }}
            className="text-xs font-semibold text-rose-400 hover:text-rose-300 underline underline-offset-4 whitespace-nowrap"
          >
            View Bag
          </button>
        </div>
      )}
    </div>
  );
}
