/**
 * SINGLE SOURCE OF TRUTH for pricing.
 *
 * Before this file, prices were duplicated and contradictory across pricing.tsx,
 * services.tsx, USMap.tsx, and state/[state].tsx. Import from here so a number
 * is only ever changed in one place.
 *
 * NOTE FOR THE OWNER: confirm the canonical Wyoming formation price. pricing.tsx
 * sells the Wyoming bundle at $197, while the per-state configurator (state/[state].tsx)
 * uses a flat $150 service fee + the state's filing fee. They model the offer
 * differently — reconcile if they should match.
 */

export interface FormationPlan {
  id: string;
  name: string;
  /** Our service fee, USD. */
  price: number;
  /** Government filing fee paid to the state, USD. */
  stateFee: number;
  badge?: string;
}

/** Core LLC formation plans (authoritative — mirrors the pricing page). */
export const FORMATION_PLANS: readonly FormationPlan[] = [
  { id: "wyoming-llc", name: "Wyoming LLC", price: 197, stateFee: 100 },
  { id: "wyoming-compliance", name: "Wyoming LLC + Compliance", price: 297, stateFee: 100, badge: "Most Popular" },
  { id: "delaware-llc", name: "Delaware LLC", price: 347, stateFee: 90, badge: "Investor Ready" },
] as const;

/** Flat service fee for the generic per-state formation configurator. */
export const STATE_FORMATION_SERVICE_FEE = 150;

/** Optional add-on: IRS EIN registration in the per-state configurator. */
export const EIN_ADDON_FEE = 50;

/** All-in (our fee + government state fee) for a formation plan. */
export function allInPrice(plan: FormationPlan): number {
  return plan.price + plan.stateFee;
}

/** Format a USD amount with no cents (e.g. 297 -> "$297"). */
export function usd(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

/** The plan we lead with in the hero Formation Receipt. */
export const FEATURED_PLAN: FormationPlan =
  FORMATION_PLANS.find((p) => p.id === "wyoming-llc") ?? FORMATION_PLANS[0];
