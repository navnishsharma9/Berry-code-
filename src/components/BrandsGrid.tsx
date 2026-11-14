import { PARTNER_BRANDS, PartnerBrand } from '../data/products';

function BrandMark({ type }: { type: PartnerBrand['markType'] }) {
  const props = {
    className: 'w-5 h-5 text-slate-700 group-hover:text-rose-600 transition-colors shrink-0',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    'aria-hidden': true as const,
  };

  switch (type) {
    case 'circuit':
      return (
        <svg {...props}>
          <rect x="7" y="7" width="10" height="10" rx="2" />
          <path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" />
        </svg>
      );
    case 'prism':
      return (
        <svg {...props}>
          <polygon points="12 3 21 19 3 19" />
          <path d="M12 3v16" />
        </svg>
      );
    case 'grid':
      return (
        <svg {...props}>
          <rect x="4" y="4" width="6" height="6" rx="1" />
          <rect x="14" y="4" width="6" height="6" rx="1" />
          <rect x="4" y="14" width="6" height="6" rx="1" />
          <rect x="14" y="14" width="6" height="6" rx="1" />
        </svg>
      );
    case 'wave':
      return (
        <svg {...props}>
          <path d="M3 12c2.5-5 5-5 7.5 0s5 5 7.5 0 3-3 3-3" />
        </svg>
      );
    case 'hex':
      return (
        <svg {...props}>
          <polygon points="12 2 20 7 20 17 12 22 4 17 4 7" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case 'node':
      return (
        <svg {...props}>
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path d="M8.2 10.8l7.4-3.7M8.2 13.2l7.4 3.7" />
        </svg>
      );
    case 'orbit':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-30 12 12)" />
        </svg>
      );
    case 'frame':
      return (
        <svg {...props}>
          <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />
          <rect x="9" y="9" width="6" height="6" />
        </svg>
      );
    case 'pulse':
      return (
        <svg {...props}>
          <path d="M3 12h4l2.5-6 5 12 2.5-6h4" />
        </svg>
      );
    case 'layer':
      return (
        <svg {...props}>
          <polygon points="12 3 21 8 12 13 3 8" />
          <path d="M3 12.5l9 5 9-5M3 17l9 5 9-5" />
        </svg>
      );
    case 'vertex':
      return (
        <svg {...props}>
          <path d="M4 5l8 14L20 5" />
          <path d="M9 5l3 5.5L15 5" />
        </svg>
      );
    case 'core':
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
  }
}

export function BrandsGrid() {
  return (
    <section
      id="partners"
      aria-labelledby="partners-heading"
      className="gsap-section bg-white border-b border-slate-200 py-14 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 gsap-reveal">
          <div>
            <p className="text-xs font-medium text-rose-600 mb-2">
              Ecosystem Partners
            </p>
            <h2
              id="partners-heading"
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance"
            >
              Certified hardware & silicon partners
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Validated drivers, carrier boards, and optical peripherals engineered for zero-friction BerryOS integration.
          </p>
        </div>

        {/* 6 Columns x 2 Rows Grid on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {PARTNER_BRANDS.map((brand) => (
            <div
              key={brand.id}
              className="gsap-stagger group bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between gap-3 transition-colors hover:bg-white hover:border-slate-300"
            >
              <BrandMark type={brand.markType} />
              <div>
                <p className="font-display text-sm font-semibold text-slate-900 truncate">
                  {brand.name}
                </p>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {brand.sector}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
