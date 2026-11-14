import { useState } from 'react';
import { ArrowRight, CheckCircle2, Github, Linkedin, Twitter, Youtube } from 'lucide-react';
import { ProductCategory } from '../data/products';

interface FooterProps {
  onSelectCategory: (category: ProductCategory) => void;
  onNavigateHome: (sectionId?: string) => void;
}

export function Footer({ onSelectCategory, onNavigateHome }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg('Please enter a valid engineering or work email address.');
      return;
    }
    setErrorMsg(null);
    setSubscribedEmail(trimmed);
    setEmail('');
  };

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com', icon: Github },
    { name: 'X (Twitter)', href: 'https://x.com', icon: Twitter },
    { name: 'YouTube', href: 'https://youtube.com', icon: Youtube },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Brand Summary + Social Links */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="inline-block font-display text-xl font-bold tracking-tight text-white"
            >
              BerryCore
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Precision ARM single-board computers, edge AI HATs, and 10-year guaranteed industrial compute modules.
            </p>

            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-semibold text-white mb-4">Hardware</h3>
              <ul className="space-y-2.5 text-sm text-slate-400">
                {(['Boards', 'Compute Modules', 'AI & HATs', 'Accessories'] as const).map(
                  (cat) => (
                    <li key={cat}>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectCategory(cat);
                          onNavigateHome('catalog');
                        }}
                        className="hover:text-white transition-colors text-left"
                      >
                        {cat}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateHome('capabilities')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Engineering Specs
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateHome('testimonials')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Case Studies
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateHome('partners')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Partner Ecosystem
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateHome('catalog')}
                    className="hover:text-white transition-colors text-left"
                  >
                    All Products
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold text-white mb-2">
              Hardware Release Notes
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Receive kernel updates, schematics, and silicon restock notifications. No marketing clutter.
            </p>

            {subscribedEmail ? (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Subscribed for release notes</span>
                </div>
                <p className="text-xs text-slate-400">
                  Confirmation sent to <span className="text-slate-200">{subscribedEmail}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubscribedEmail(null)}
                  className="text-xs text-slate-400 underline hover:text-white"
                >
                  Change email address
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} noValidate className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    placeholder="engineer@company.com"
                    className="w-full sm:flex-1 h-11 min-h-[44px] py-2.5 px-4 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-rose-500 focus-visible:ring-2 focus-visible:ring-rose-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 h-11 min-h-[44px] px-5 rounded-lg bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
                {errorMsg && (
                  <p className="text-xs text-rose-400" role="alert">
                    {errorMsg}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Quiet Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} BerryCore Hardware Ltd. Educational demo storefront.</p>
          <p>Open-source schematics · RoHS & CE compliant designs</p>
        </div>
      </div>
    </footer>
  );
}
