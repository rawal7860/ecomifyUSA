import { Star, ShieldCheck, ExternalLink } from "lucide-react";

/**
 * Honest verification block — replaces the old fake <span>F/T/G</span> letter tiles.
 *
 * The strongest trust signal for a wary overseas buyer is something they can INDEPENDENTLY
 * verify, so we lead with the real Wyoming registered-agent address + a link to the state's
 * official business search.
 *
 * OWNER TODO: fill in the real review-platform profile URLs (href) and the Wyoming Secretary
 * of State entity/filing number (entityId) below. Leave a platform out entirely rather than
 * linking to a profile that doesn't exist — fewer-but-real beats many-but-fake.
 */

interface ReviewPlatform {
  name: string;
  rating: string;
  /** Real profile URL — replace the placeholder. */
  href: string;
  accent: string;
}

const PLATFORMS: ReviewPlatform[] = [
  { name: "Fiverr", rating: "Level 2 Seller", href: "https://www.fiverr.com/", accent: "text-green-600" },
  { name: "Trustpilot", rating: "Rated Excellent", href: "https://www.trustpilot.com/", accent: "text-emerald-600" },
  { name: "Google", rating: "5.0 rating", href: "https://www.google.com/", accent: "text-blue-600" },
];

// OWNER TODO: replace with the real WY SoS filing ID; this links to the official lookup.
const WY_SOS_SEARCH = "https://wyobiz.wyo.gov/Business/FilingSearch.aspx";

export default function VerificationBlock() {
  return (
    <div className="mb-16">
      <p className="text-center text-sm font-semibold text-slate-500 tracking-widest uppercase mb-8">
        Verify us — don&apos;t just trust us
      </p>

      {/* Primary, independently-verifiable proof */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="bg-white border border-hairline rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-verify/10 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6 text-verify" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-slate-900">Registered Wyoming business</p>
            <p className="text-sm text-slate-600 font-mono">30 N Gould St, Ste R, Sheridan, WY 82801</p>
          </div>
          <a
            href={WY_SOS_SEARCH}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-verify/30 text-verify font-semibold px-4 py-2.5 text-sm hover:bg-verify/5 transition-colors"
          >
            Verify on WY SoS <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Linked review-platform badges */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {PLATFORMS.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white border border-hairline rounded-2xl p-6 flex items-center gap-4 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex-1">
              <p className="font-bold text-slate-900 text-lg mb-1 flex items-center gap-1.5">
                {p.name}
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" aria-hidden="true" />
              </p>
              <div className="flex items-center gap-1">
                <span aria-hidden="true" className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </span>
                <span className="sr-only">Rated 5 out of 5 stars.</span>
                <span className={`text-sm ml-2 font-medium ${p.accent}`}>{p.rating}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
