/**
 * Source of truth the AI assistant quotes from.
 * Edit this file when services, pricing, timelines, or policies change.
 */

import { SUPPORT_EMAIL, WHATSAPP_DISPLAY } from "@/lib/contact";

export const COMPANY = {
  name: "ecomifyUSA",
  tagline:
    "US business formation and tax compliance for international e-commerce sellers.",
  founderStory:
    "Our founder went through the IRS, banking, and state-compliance maze as a non-US seller — then built ecomifyUSA to solve it for others.",
  audience:
    "Amazon FBA / Walmart / Shopify sellers, freelancers, and digital entrepreneurs based outside the US — especially in Pakistan, India, UAE, Saudi Arabia, China, Bangladesh, Egypt, Nigeria, the Philippines, Turkey, and Brazil.",
  ratings: "5.0 average across 500+ international clients (Fiverr, Trustpilot, Google).",
  contact: {
    email: SUPPORT_EMAIL,
    whatsapp: WHATSAPP_DISPLAY,
  },
};

export const PLANS = [
  {
    name: "Wyoming LLC",
    price: 197,
    stateFee: 100,
    totalUpfront: 297,
    includes: [
      "Articles of Organization filed with Wyoming",
      "EIN / Tax ID for non-residents (no SSN/ITIN required)",
      "1 year registered agent",
      "Operating agreement",
      "Digital document delivery",
      "Email support",
    ],
    notIncluded: ["BOI report filing", "Sales tax registration"],
    bestFor: "Amazon/Walmart FBA sellers, freelancers, digital entrepreneurs.",
  },
  {
    name: "Wyoming LLC + Compliance",
    price: 297,
    stateFee: 100,
    totalUpfront: 397,
    badge: "Most Popular",
    includes: [
      "Everything in Wyoming LLC",
      "BOI report filing (required by US law)",
      "Sales tax registration (1 state)",
      "Bank account setup guidance (Wise / Mercury / Relay)",
      "Amazon/Walmart seller setup",
      "Priority WhatsApp support",
    ],
    bestFor:
      "Active e-commerce sellers who need full compliance from day one.",
  },
  {
    name: "Delaware LLC",
    price: 347,
    stateFee: 90,
    totalUpfront: 437,
    badge: "Investor Ready",
    includes: [
      "Everything in the Compliance plan",
      "Delaware franchise tax guidance",
      "Investor-ready structure",
      "Certificate of formation",
      "Annual report reminder",
      "Priority WhatsApp support",
    ],
    bestFor:
      "Startups raising investment, SaaS founders, venture-backed businesses.",
  },
];

export const ADDONS = [
  { name: "Sales tax filing", price: "from $49", unit: "per state / filing" },
  { name: "Annual report filing", price: "$99", unit: "per year + state fee" },
  { name: "Tax exemption certificates", price: "$149", unit: "up to 10 states" },
  { name: "Delaware franchise tax", price: "$149", unit: "per year" },
  { name: "Income tax preparation", price: "from $299", unit: "per year" },
  { name: "Registered agent renewal", price: "$99", unit: "per year" },
  { name: "Expedited processing", price: "$99", unit: "one-time" },
  { name: "Additional state registration", price: "$149", unit: "per state" },
];

export const SPECIALIST_SERVICES = [
  {
    name: "US Sales Tax Compliance (TaxJar integration)",
    price: "$500 setup + $150/month",
    desc:
      "Technical implementation partner for TaxJar — nexus audit, product taxability mapping, TaxJar API integration for custom e-commerce stacks, plus a CPA hand-off workflow.",
  },
  {
    name: "Delaware Franchise Tax",
    price: "$400 (includes IRS Form 1120)",
    desc:
      "Switches your filing from Authorized Shares to Assumed Par Value Method, minimising the bill to $400.",
  },
  {
    name: "Sales Tax Permit Recovery",
    price: "$500 (up to 4 states)",
    desc:
      "Recover portal access lost from a previous freelancer, file delinquent returns, and cancel unwanted permits.",
  },
  {
    name: "Amazon / Walmart Tax Exemption",
    price: "$275 (46 states)",
    desc:
      "Stop paying sales tax on wholesale purchases. Works in 44+ states even with only an ITIN (no SSN required).",
  },
  {
    name: "LLC Formation + EIN + Permits bundle",
    price: "$400 (Wyoming LLC + 4 state sales tax permits)",
    desc:
      "Complete US business setup for international entrepreneurs: Wyoming LLC, EIN without SSN, 4 state sales tax permits, bank account documentation.",
  },
  {
    name: "IRS Tax Filing for Foreign-Owned LLCs",
    price: "contact for quote",
    desc:
      "Form 1120 + Form 5472 compliance. Missing this filing carries a minimum $25,000 IRS penalty.",
  },
  {
    name: "Estonia e-Residency + OÜ Formation",
    price: "from $597 + €190 state fee",
    desc:
      "Fully remote EU business setup with Estonia e-Residency, OÜ company formation, and VAT registration support.",
  },
];

export const TIMELINES = {
  wyomingLlc: "1–3 business days",
  delawareLlc: "1–3 business days",
  einNonResident:
    "15–30 business days (IRS requires fax submission for foreign owners — we handle the entire IRS process for you).",
  salesTaxPermit: "5–10 business days per state, depends on state response time.",
  boiReport: "Filed within 1 business day of formation.",
};

export const ELIGIBILITY = {
  ssnNeeded:
    "No SSN or ITIN required at formation. We obtain your EIN using your foreign passport number.",
  documentsRequired:
    "A valid passport and proof of your home address. That's it for formation.",
  whoCantWeHelp:
    "We don't handle personal US tax returns, immigration, or general accounting. We focus exclusively on US business formation, tax compliance, and tax exemptions for non-US e-commerce sellers.",
  travelRequired:
    "No US travel is required. Everything — formation, EIN, banking docs, permits — is handled remotely.",
};

export const PAYMENTS = {
  methods: "Wise, PayPal, credit / debit card, and bank transfer.",
  currency: "USD. State fees are paid separately, directly to the government.",
  refund:
    "If we cannot deliver the promised service we offer a full refund of our service fee. Government state fees are non-refundable once paid to the state.",
  upgrade:
    "You can upgrade from Wyoming Basic to Compliance (or add BOI / sales tax registration) at any time — we only charge the price difference.",
};

export const POLICIES = {
  delivery:
    "All deliverables are digital, sent by email and made available in your client portal. We email status updates at each milestone (filed → approved → EIN issued).",
  privacy:
    "We collect only what's necessary to file with the state and IRS. Documents are stored encrypted. We never sell or share your data with third parties.",
  refundDetails:
    "Service-fee refunds are processed within 5–10 business days to the original payment method. State filing fees are non-refundable.",
  paymentSecurity:
    "Card payments are processed by Stripe. We never store full card details on our servers.",
};

export const COMMON_QA = [
  {
    q: "Why Wyoming?",
    a: "No state income tax, low $100 state fee, strong privacy (members aren't on the public record), and friendly for single-member LLCs owned by non-US residents.",
  },
  {
    q: "Why Delaware?",
    a: "The default choice when raising US venture investment — investors are most familiar with Delaware C-corps and LLCs. Higher franchise tax than Wyoming, so pick it only if you plan to fundraise.",
  },
  {
    q: "Do I get a US bank account?",
    a: "We provide setup guidance for Wise, Mercury, and Relay — they accept non-resident LLC owners remotely. We don't open the account on your behalf; we prepare every document you need and walk you through it.",
  },
  {
    q: "What is BOI?",
    a: "Beneficial Ownership Information report — a US federal filing required for all LLCs. Missing it carries fines up to $500/day. Included in the Compliance and Delaware plans, or available as an add-on.",
  },
  {
    q: "What is Form 5472?",
    a: "An IRS filing required for any US LLC with a foreign owner, even if it had zero income. Missing it is a $25,000 minimum penalty. We file it as part of our IRS Tax Filing service.",
  },
  {
    q: "What is nexus?",
    a: "Nexus means you have enough connection to a US state that you must collect and remit its sales tax. Selling on Amazon FBA usually creates nexus in every state where Amazon stores your inventory.",
  },
  {
    q: "I already formed my LLC elsewhere — can you help with compliance only?",
    a: "Yes. We offer standalone services: sales tax registration, BOI, annual reports, IRS filings, tax exemption certificates, and permit recovery.",
  },
  {
    q: "How do I check my order status?",
    a: "If you have an account, log in and your dashboard shows live status. If you're chatting here while logged in, ask me and I'll look it up.",
  },
];

/** Render the whole knowledge base as a single prompt section. */
export function knowledgeAsPromptSection(): string {
  const planLines = PLANS.map(
    (p) =>
      `• ${p.name}${p.badge ? ` (${p.badge})` : ""} — $${p.price} service + $${p.stateFee} state fee (total $${p.totalUpfront} upfront). Includes: ${p.includes.join("; ")}. Best for: ${p.bestFor}`,
  ).join("\n");

  const addonLines = ADDONS.map(
    (a) => `• ${a.name}: ${a.price} (${a.unit})`,
  ).join("\n");

  const specialistLines = SPECIALIST_SERVICES.map(
    (s) => `• ${s.name} — ${s.price}. ${s.desc}`,
  ).join("\n");

  const timelineLines = Object.entries(TIMELINES)
    .map(([k, v]) => `• ${k}: ${v}`)
    .join("\n");

  const eligibilityLines = Object.entries(ELIGIBILITY)
    .map(([k, v]) => `• ${k}: ${v}`)
    .join("\n");

  const paymentLines = Object.entries(PAYMENTS)
    .map(([k, v]) => `• ${k}: ${v}`)
    .join("\n");

  const policyLines = Object.entries(POLICIES)
    .map(([k, v]) => `• ${k}: ${v}`)
    .join("\n");

  const qaLines = COMMON_QA.map((qa) => `Q: ${qa.q}\nA: ${qa.a}`).join("\n\n");

  return `# About ${COMPANY.name}
${COMPANY.tagline}
Audience: ${COMPANY.audience}
Founder story: ${COMPANY.founderStory}
Ratings: ${COMPANY.ratings}
Contact: ${COMPANY.contact.email} · WhatsApp ${COMPANY.contact.whatsapp}

# Core formation plans
${planLines}

# Add-ons
${addonLines}

# Specialist services
${specialistLines}

# Typical timelines
${timelineLines}

# Eligibility & requirements
${eligibilityLines}

# Payments
${paymentLines}

# Policies (high level)
${policyLines}

# Common questions
${qaLines}`;
}
