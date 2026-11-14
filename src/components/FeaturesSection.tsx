import { FEATURES } from '../data/products';

export function FeaturesSection() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="gsap-section bg-[#F8FAFC] border-b border-slate-200 py-14 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 sm:mb-12 gsap-reveal">
          <p className="text-xs font-medium text-rose-600 mb-2">
            Engineering & Services
          </p>
          <h2
            id="capabilities-heading"
            className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance"
          >
            Built for benchtop experimentation and ten-year field fleets.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature) => (
            <article
              key={feature.number}
              className="gsap-stagger bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-sm font-bold text-slate-400 tabular-nums">
                    {feature.number}
                  </span>
                  <span className="font-mono text-xs text-slate-600 tabular-nums">
                    {feature.metric}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-slate-900 mb-2.5">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
