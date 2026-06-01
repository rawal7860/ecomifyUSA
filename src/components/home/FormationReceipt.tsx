import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { FEATURED_PLAN, allInPrice, usd } from "@/lib/pricing";

/**
 * Formation Receipt — surfaces the ALL-IN price above the fold and demos the offer
 * in one glance (interim static version of the "Vault" hero concept).
 * Numbers use the mono font ("mono-for-money" fintech cue) and the single pricing source.
 */
export default function FormationReceipt() {
  const includedItems = [
    "Registered agent (1 year)",
    "EIN / Tax ID — no SSN needed",
    "Operating agreement",
  ];

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl border border-hairline shadow-xl shadow-slate-900/5 overflow-hidden">
        {/* Header strip */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-hairline bg-paper/60">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Formation Receipt
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-verify">
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> FILED
          </span>
        </div>

        {/* Line items */}
        <div className="px-6 py-5 space-y-3">
          <Row label={FEATURED_PLAN.name} value={usd(FEATURED_PLAN.price)} />
          <Row label="Wyoming state fee" value={usd(FEATURED_PLAN.stateFee)} />
          {includedItems.map((item) => (
            <div key={item} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-verify flex-shrink-0" aria-hidden="true" />
                {item}
              </span>
              <span className="font-mono text-verify font-semibold">included</span>
            </div>
          ))}

          <div className="border-t border-dashed border-hairline pt-4 mt-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-900">All-in, today</span>
            <span className="font-mono text-3xl font-bold text-gold">{usd(allInPrice(FEATURED_PLAN))}</span>
          </div>
          <p className="text-xs text-slate-400">No hidden fees. State fee shown separately, paid to the government.</p>
        </div>

        {/* CTA */}
        <div className="px-6 pb-6">
          <Link href={`/checkout?service=${encodeURIComponent(FEATURED_PLAN.name)}`} className="block">
            <span className="flex items-center justify-center gap-2 w-full bg-gold hover:bg-gold-bright text-white font-semibold rounded-xl py-3.5 transition-colors">
              Begin formation <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </span>
          </Link>
          <p className="text-center text-xs text-slate-400 mt-3 font-mono">
            Filed by ecomifyUSA · 30 N Gould St, Sheridan, WY
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-600">{label}</span>
      <span className="font-mono font-semibold text-slate-900">{value}</span>
    </div>
  );
}
