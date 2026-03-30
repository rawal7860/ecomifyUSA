import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    CheckCircle2, ArrowRight, Zap, Shield, Clock,
    DollarSign, Star, ChevronDown, Phone, Mail,
    ShoppingBag, TrendingUp, FileText, Building2, AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { SEO } from "@/components/SEO";

const advantages = [
    {
        icon: "⚡",
        title: "EIN in 1 hour",
        desc: "As a US citizen with an SSN, you get your EIN instantly online via the IRS website — no fax, no waiting 15-30 days. Your business is ready to operate the same day.",
        highlight: true,
    },
    {
        icon: "🏠",
        title: "No registered agent needed",
        desc: "When you form your LLC in your home state, you can be your own registered agent. That's $100-$300/year saved — every year — compared to international clients who always need one.",
        highlight: true,
    },
    {
        icon: "🏦",
        title: "Real physical bank accounts",
        desc: "Walk into Chase, Bank of America, Wells Fargo, or any local credit union and open a real US business account same day. International clients are limited to fintech-only options like Wise, Mercury, and Payoneer — which have transfer limits, holding risks, and no physical branches.",
        highlight: true,
    },
    {
        icon: "🏛️",
        title: "Form in your home state",
        desc: "No need to form in Wyoming or Delaware. Form in your own state — simpler compliance, no foreign LLC fees, and you already know your state's rules. Forming out of state creates double compliance costs.",
        highlight: true,
    },
    {
        icon: "💳",
        title: "Business credit cards & loans",
        desc: "US citizens can apply for business credit cards (Chase Ink, AmEx Business, Capital One Spark), SBA loans, and business lines of credit. International clients have almost no access to US business credit.",
        highlight: false,
    },
    {
        icon: "💰",
        title: "Full payment processing",
        desc: "Stripe, PayPal, Square, Shopify Payments — all available without verification hurdles. Your SSN makes KYC instant. International sellers often get accounts frozen or rejected.",
        highlight: false,
    },
    {
        icon: "📦",
        title: "Amazon & Walmart priority",
        desc: "US-based LLCs get faster seller account approvals, access to all seller programs, Brand Registry, FBA, and Walmart Fulfillment Services without extra documentation hurdles.",
        highlight: false,
    },
    {
        icon: "📊",
        title: "Simpler US tax filing",
        desc: "File Schedule C or Form 1065 with your personal return. No Form 5472, no Form 1120 complexity that foreign-owned LLCs must navigate. Your CPA can handle it affordably.",
        highlight: false,
    },
];

const bankComparison = [
    {
        type: "🇺🇸 US Citizen",
        banks: ["Chase Business Complete", "Bank of America Business", "Wells Fargo Business", "Capital One Business", "Local credit unions", "Any community bank"],
        features: ["Physical branch access", "Business debit + credit cards", "SBA loan eligibility", "Business line of credit", "Check writing", "Wire transfers"],
        color: "border-green-300 bg-green-50",
        labelColor: "bg-green-500",
    },
    {
        type: "🌍 International Client",
        banks: ["Mercury (fintech only)", "Wise Business", "Payoneer", "Relay", "Airwallex"],
        features: ["Online only — no branches", "Debit card (limited)", "No SBA loans", "No business credit line", "Limited check support", "Higher wire fees"],
        color: "border-slate-200 bg-slate-50",
        labelColor: "bg-slate-400",
    },
];

const platforms = [
    { name: "Amazon FBA", icon: "📦", desc: "Sell nationwide with Amazon fulfillment. US LLC gives you full seller privileges, Brand Registry access, and faster account approval." },
    { name: "Walmart Marketplace", icon: "🛒", desc: "US-based sellers get priority approval on Walmart. Reach 120M+ monthly visitors with your own branded storefront." },
    { name: "Shopify Store", icon: "🛍️", desc: "Launch your own branded store. Shopify Payments available instantly with US LLC + SSN — no third-party payment workarounds needed." },
    { name: "Etsy", icon: "🎨", desc: "Perfect for handmade, vintage, and unique products. US LLC gives you professional credibility and simplified tax reporting." },
    { name: "TikTok Shop", icon: "📱", desc: "The fastest growing ecommerce platform. US sellers get first access to TikTok Shop's full feature set and affiliate programs." },
    { name: "eBay", icon: "🔨", desc: "Established marketplace with 135M+ buyers. US LLC unlocks PowerSeller status and full business seller benefits." },
];

const steps = [
    { num: "01", title: "Choose your home state", desc: "Form in the state where you live. Simple, straightforward, no foreign LLC complications." },
    { num: "02", title: "File Articles of Organization", desc: "We prepare and file your LLC paperwork with your Secretary of State. Most states approve in 1-5 business days." },
    { num: "03", title: "Get your EIN instantly", desc: "Apply online at IRS.gov using your SSN. Takes 10 minutes — your EIN appears on screen immediately." },
    { num: "04", title: "Open your physical bank account", desc: "Visit Chase, BofA, or any local bank with your LLC documents and EIN. Same-day approval. No fintech workarounds needed." },
    { num: "05", title: "Set up your seller accounts", desc: "Apply on Amazon, Walmart, Shopify, or wherever you plan to sell. US LLC + EIN = fast approvals everywhere." },
    { num: "06", title: "Start selling", desc: "You're ready to receive payments, buy inventory, and scale your ecommerce business — fully protected by LLC liability shield." },
];

const faqs = [
    { q: "Should I form in my home state or Wyoming?", a: "Always form in your home state as a US resident. Forming in Wyoming or Delaware and then operating from your home state means you need to register as a Foreign LLC in your home state anyway — paying fees and filing annual reports in both states. We've written a full guide on this mistake at /blog/foreign-llc-mistake — it's one of the most expensive errors new ecommerce sellers make." },
    { q: "Can I really open a bank account at a physical bank?", a: "Yes — this is one of the biggest advantages US citizens have. Take your LLC formation documents, EIN confirmation letter, and a government ID to any Chase, Bank of America, Wells Fargo, or local bank. Most open business accounts same day. International clients cannot do this — they're restricted to online-only fintech banks like Mercury, Wise, and Payoneer, which have transfer limits and no physical presence." },
    { q: "How fast can I get my EIN?", a: "If you have an SSN, you can get your EIN in about 10 minutes online at IRS.gov — it appears on screen immediately. This is a massive advantage over international clients who must fax the IRS and wait 15-30 business days." },
    { q: "Do I need to collect sales tax as an ecommerce seller?", a: "Yes, once you exceed economic nexus thresholds in a state (typically $100,000 in sales or 200 transactions per year), you must collect and remit sales tax there. We handle multi-state sales tax registration and filing — this is one of our most popular services for growing US sellers." },
    { q: "Should I form an LLC or S-Corp for ecommerce?", a: "Start with an LLC — simpler, lower cost, and sufficient protection. Once your annual net profit exceeds $40,000-$50,000, converting to S-Corp taxation can save significant self-employment taxes. We can advise on the right timing for your situation." },
    { q: "What's the cheapest state to form an LLC?", a: "The cheapest state is your home state — because you avoid the double-filing costs of a foreign LLC. Among all states, Kentucky ($40), Montana ($35), and New Mexico ($50) have the lowest filing fees — but only makes sense if you actually live there." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? "border-blue-300 shadow-md" : "border-slate-200 hover:border-blue-200"}`}>
            <button className="w-full px-6 py-5 flex items-center justify-between text-left" onClick={() => setOpen(!open)}>
                <span className="font-semibold text-slate-800 text-base pr-4">{q}</span>
                <ChevronDown className={`w-5 h-5 text-blue-500 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <div className="px-6 pb-5">
                    <p className="text-slate-600 leading-relaxed border-l-2 border-blue-200 pl-4">{a}</p>
                </div>
            )}
        </div>
    );
}

export default function USResidentsPage() {
    const router = useRouter();

    return (
        <>
            <SEO
                title="LLC Formation for US Citizens Starting Ecommerce | ecomifyUSA"
                description="US citizens get huge advantages forming an LLC — EIN in 1 hour, real bank accounts at Chase and BofA, no registered agent needed. Start your Amazon, Walmart or Shopify business today."
            />
            <div className="min-h-screen bg-slate-50 font-sans">
                {/* Nav */}
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                        <Logo />
                        <nav className="hidden md:flex items-center gap-8">
                            <Link href="/pricing" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Pricing</Link>
                            <Link href="/which-state" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Which State?</Link>
                            <Link href="/services" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Services</Link>
                            <Link href="/checkout">
                                <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
                            </Link>
                        </nav>
                        <div className="md:hidden">
                            <Link href="/checkout">
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Hero */}
                <section className="pt-20 pb-16 px-4 bg-white border-b border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                    <div className="max-w-5xl mx-auto relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-medium mb-6">
                                    🇺🇸 For US citizens & residents
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]">
                                    You have a massive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">head start.</span>
                                </h1>
                                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                                    As a US citizen, forming an LLC for your ecommerce business is faster, cheaper, and simpler. EIN in 1 hour. Real bank accounts. No registered agent. Form in your home state today.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg rounded-xl font-semibold" onClick={() => router.push("/checkout")}>
                                        Start My LLC Today <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                    <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-xl border-slate-200" onClick={() => router.push("/pricing")}>
                                        View Pricing
                                    </Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 lg:w-80 w-full">
                                {[
                                    { num: "1 hr", label: "EIN processing time", icon: "⚡", color: "bg-yellow-50 border-yellow-200" },
                                    { num: "$0", label: "Registered agent cost", icon: "🏠", color: "bg-green-50 border-green-200" },
                                    { num: "Same day", label: "Real bank account", icon: "🏦", color: "bg-blue-50 border-blue-200" },
                                    { num: "50", label: "States we cover", icon: "🗺️", color: "bg-purple-50 border-purple-200" },
                                ].map((s, i) => (
                                    <div key={i} className={`${s.color} border rounded-2xl p-4 text-center`}>
                                        <div className="text-2xl mb-1">{s.icon}</div>
                                        <div className="text-2xl font-bold text-slate-900">{s.num}</div>
                                        <div className="text-xs text-slate-500 mt-0.5 leading-tight">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* US vs International comparison table */}
                <section className="py-16 px-4 bg-slate-50">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900 text-center mb-3">Your advantages over international sellers</h2>
                        <p className="text-slate-500 text-center mb-10">International clients face significant hurdles at every step. As a US citizen, you skip all of them.</p>
                        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                            <div className="grid grid-cols-3 bg-slate-900 text-white text-sm font-semibold">
                                <div className="p-4">Requirement</div>
                                <div className="p-4 text-center text-green-400">🇺🇸 US Citizen</div>
                                <div className="p-4 text-center text-slate-400">🌍 International</div>
                            </div>
                            {[
                                { item: "Get EIN", us: "10 min online", intl: "15-30 business days via fax" },
                                { item: "Registered agent", us: "Be your own — $0/yr", intl: "Required — $100-300/yr" },
                                { item: "Bank account", us: "Chase, BofA, any bank — same day", intl: "Fintech only (Mercury, Wise, Payoneer)" },
                                { item: "Business credit card", us: "Chase Ink, AmEx, Capital One", intl: "Almost no access" },
                                { item: "SBA loans", us: "Fully eligible", intl: "Not eligible" },
                                { item: "Stripe / PayPal", us: "Instant KYC approval", intl: "Complex verification, risk of freeze" },
                                { item: "Amazon account", us: "Fast, fewer verifications", intl: "Extra documentation required" },
                                { item: "State choice", us: "Form in home state — simple", intl: "Must choose carefully to avoid double fees" },
                                { item: "Annual compliance", us: "One state only", intl: "Complex multi-state requirements" },
                            ].map((r, i) => (
                                <div key={i} className={`grid grid-cols-3 border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                                    <div className="p-4 text-sm font-medium text-slate-700">{r.item}</div>
                                    <div className="p-4 text-sm text-center text-green-600 font-semibold">{r.us}</div>
                                    <div className="p-4 text-sm text-center text-slate-400">{r.intl}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Bank account deep dive */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900 text-center mb-3">The banking advantage is huge</h2>
                        <p className="text-slate-500 text-center mb-10">This is one of the most overlooked advantages US citizens have. Real banks vs fintech — the difference matters enormously for your business.</p>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            {bankComparison.map((b, i) => (
                                <div key={i} className={`rounded-3xl border-2 ${b.color} p-6`}>
                                    <div className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold mb-4 ${b.labelColor}`}>{b.type}</div>
                                    <div className="mb-4">
                                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Available banks</div>
                                        {b.banks.map((bank, j) => (
                                            <div key={j} className="flex items-center gap-2 text-sm text-slate-700 mb-1">
                                                <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${i === 0 ? "text-green-500" : "text-slate-400"}`} />
                                                {bank}
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Features</div>
                                        {b.features.map((f, j) => (
                                            <div key={j} className={`flex items-center gap-2 text-sm mb-1 ${i === 0 ? "text-slate-700" : "text-slate-400"}`}>
                                                <div className={`w-3.5 h-3.5 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs ${i === 0 ? "bg-green-500" : "bg-slate-300"}`}>
                                                    {i === 0 ? "✓" : "−"}
                                                </div>
                                                {f}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-sm text-blue-800 leading-relaxed">
                            <strong>Why this matters for ecommerce:</strong> A real business bank account at Chase or BofA gives you access to business credit cards (which build business credit), SBA loans for inventory financing, wire transfer capabilities for suppliers, and physical branches for cash deposits if you sell locally. Fintech accounts like Mercury and Wise are functional but have daily/monthly transfer limits, can freeze funds without notice, and offer no path to business credit or loans.
                        </div>
                    </div>
                </section>

                {/* Warning blog-style section */}
                <section className="py-16 px-4 bg-amber-50 border-y border-amber-200">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <AlertTriangle className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <div className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">Important advice for US residents</div>
                                <h2 className="text-2xl font-bold text-slate-900">Don't make this expensive mistake</h2>
                            </div>
                        </div>
                        <div className="prose prose-slate max-w-none">
                            <p className="text-slate-700 leading-relaxed mb-4">
                                We regularly see US residents who form their LLC in Wyoming or Delaware because they heard those states are "the best" — without realising they've just created a <strong>Foreign LLC problem</strong> for themselves.
                            </p>
                            <p className="text-slate-700 leading-relaxed mb-4">
                                Here's what happens: If you live in Texas but form your LLC in Wyoming, your Wyoming LLC is considered a <strong>"Foreign LLC"</strong> the moment you do any business in Texas — which you will, because you live there. Texas then requires you to register your Wyoming LLC as a Foreign LLC in Texas, file annual reports in both states, and pay registered agent fees in both states. Instead of saving money, you've doubled your compliance costs.
                            </p>
                            <p className="text-slate-700 leading-relaxed mb-4">
                                <strong>The simple rule:</strong> US residents should form their LLC in the state where they live and operate. Wyoming and Delaware are excellent choices — but only if you actually live there, or if you are a non-US resident with no physical US presence.
                            </p>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Want to understand this in detail? We've written a complete guide explaining the Foreign LLC concept, when it applies, and the exact costs involved.
                            </p>
                        </div>
                        <div className="mt-6">
                            <Link href="/blog/foreign-llc-mistake">
                                <Button variant="outline" className="border-amber-400 text-amber-700 hover:bg-amber-100">
                                    Read: The Foreign LLC Mistake Guide <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Platforms */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900 text-center mb-3">Which platform are you selling on?</h2>
                        <p className="text-slate-500 text-center mb-10">Your LLC works across all major US ecommerce platforms.</p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {platforms.map((p, i) => (
                                <div key={i} className="bg-slate-50 rounded-2xl border border-slate-200 p-5 hover:border-blue-300 hover:shadow-md transition-all">
                                    <div className="text-2xl mb-2">{p.icon}</div>
                                    <h3 className="font-bold text-slate-900 mb-1">{p.name}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Steps */}
                <section className="py-16 px-4 bg-slate-50">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900 text-center mb-3">From idea to selling in 6 steps</h2>
                        <p className="text-slate-500 text-center mb-10">We handle the paperwork. You focus on building your business.</p>
                        <div className="space-y-4">
                            {steps.map((s, i) => (
                                <div key={i} className="flex gap-6 items-start bg-white rounded-2xl p-5 border border-slate-100 hover:border-blue-200 transition-colors">
                                    <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg flex-shrink-0">{s.num}</div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-1">{s.title}</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">Common questions from US sellers</h2>
                        <div className="space-y-3">
                            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-indigo-700">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <div className="text-4xl mb-4">🇺🇸</div>
                        <h2 className="text-3xl font-bold mb-4">Ready to launch your ecommerce LLC?</h2>
                        <p className="text-blue-100 mb-8 text-lg max-w-xl mx-auto">You have every advantage. Let us handle the paperwork so you can focus on building your business.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-6 text-lg rounded-xl font-bold" onClick={() => router.push("/checkout")}>
                                Start My LLC <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <a href="https://wa.me/13072180376?text=Hi%2C%20I%27m%20a%20US%20citizen%20looking%20to%20form%20an%20LLC%20for%20my%20ecommerce%20business." target="_blank" rel="noopener noreferrer">
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-10 py-6 text-lg rounded-xl">
                                    <Phone className="mr-2 w-5 h-5" /> Chat on WhatsApp
                                </Button>
                            </a>
                        </div>
                        <p className="text-blue-200 text-sm mt-6">All 50 states covered · Same-day EIN guidance · Sales tax compliance included</p>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
