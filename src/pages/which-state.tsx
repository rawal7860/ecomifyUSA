import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CheckCircle2, XCircle, ArrowRight, Shield, AlertTriangle, ChevronDown, Star, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { SEO } from "@/components/SEO";

const goodStates = [
    {
        name: "Wyoming",
        flag: "🏔️",
        filingFee: "$100",
        annualFee: "$60/yr",
        privacy: "★★★★★",
        recommended: true,
        badge: "Best for E-commerce",
        color: "border-blue-500",
        pros: [
            "No state income tax — ever",
            "Strong privacy — owners NOT listed publicly",
            "Strongest asset protection laws in the US",
            "Low $60 annual fee only",
            "First state to create LLC (1977) — most mature laws",
            "Accepted by Amazon, Walmart, Shopify, all platforms",
            "Easy online filing — fast 1-3 day approval",
            "No citizenship or US residency required",
        ],
        cons: [
            "$60 annual report required every year",
            "Less known than Delaware for investors",
        ],
        bestFor: "Amazon FBA, Walmart sellers, dropshippers, freelancers, digital entrepreneurs — 90% of our international clients choose Wyoming.",
        verdict: "Our #1 recommendation for international e-commerce sellers.",
        verdictColor: "bg-blue-50 border-blue-200 text-blue-800",
    },
    {
        name: "New Mexico",
        flag: "🌵",
        filingFee: "$50",
        annualFee: "$0/yr",
        privacy: "★★★★★",
        recommended: true,
        badge: "Best for Budget",
        color: "border-green-500",
        pros: [
            "Lowest filing fee — only $50",
            "ZERO annual fees — no recurring costs ever",
            "Maximum anonymity — members not listed publicly at all",
            "No state income tax on LLC profits",
            "No annual report requirement",
            "Registered agent only recurring cost (~$50/yr)",
            "Perfect for holding companies and passive businesses",
        ],
        cons: [
            "No online filing system — paper only, slower",
            "No Certificate of Good Standing available",
            "Slightly less banking recognition than Wyoming",
            "Less established legal framework than Wyoming",
        ],
        bestFor: "Budget-conscious entrepreneurs, passive income businesses, holding companies, clients wanting maximum anonymity with zero annual costs.",
        verdict: "Best choice if you want the lowest possible long-term cost.",
        verdictColor: "bg-green-50 border-green-200 text-green-800",
    },
    {
        name: "Missouri",
        flag: "🏛️",
        filingFee: "$50",
        annualFee: "$0/yr",
        privacy: "★★★☆☆",
        recommended: true,
        badge: "Underrated Gem",
        color: "border-purple-400",
        pros: [
            "Only $50 filing fee",
            "NO annual report fees — ever",
            "No state income tax on pass-through LLC income",
            "Straightforward compliance requirements",
            "Solid legal framework for businesses",
            "Good for US market presence",
        ],
        cons: [
            "Less privacy than Wyoming or New Mexico",
            "Less internationally recognized",
            "Moderate banking acceptance",
        ],
        bestFor: "E-commerce sellers wanting low formation cost with zero ongoing fees. A hidden gem most agents don't recommend because it's not 'famous'.",
        verdict: "Underrated — zero annual fees makes it very cost-effective long term.",
        verdictColor: "bg-purple-50 border-purple-200 text-purple-800",
    },
    {
        name: "Arizona",
        flag: "🌞",
        filingFee: "$50",
        annualFee: "$0/yr",
        privacy: "★★★☆☆",
        recommended: true,
        badge: "No Annual Fees",
        color: "border-orange-400",
        pros: [
            "$50 filing fee only",
            "No annual report or recurring fees",
            "No state income tax on pass-through LLC income",
            "Business-friendly state regulations",
            "Good for US market access",
        ],
        cons: [
            "Publication requirement in some counties",
            "Less privacy protections than Wyoming/New Mexico",
            "Less internationally recognized",
        ],
        bestFor: "Sellers wanting zero annual maintenance costs with decent US market credibility.",
        verdict: "Solid choice for budget-conscious clients wanting no annual fees.",
        verdictColor: "bg-orange-50 border-orange-200 text-orange-800",
    },
];

const badStates = [
    {
        name: "Delaware",
        flag: "⚠️",
        filingFee: "$90",
        annualFee: "$300/yr franchise tax",
        why: "Delaware is famous — but mainly for corporations raising venture capital. For international e-commerce sellers, the $300 annual franchise tax is charged every year whether you make money or not. The 'prestigious' legal system only matters if you're in court — most small sellers never need it.",
        hidden: ["$300/yr franchise tax — mandatory, no exceptions", "Higher registered agent costs", "Annual report required", "Only useful if raising VC investment"],
        avoid: "Unless you are seeking investor funding or building a startup, Delaware costs far more than it gives back to e-commerce sellers.",
    },
    {
        name: "California",
        flag: "🚫",
        filingFee: "$70",
        annualFee: "$800/yr — mandatory",
        why: "California has a deceptively low $70 filing fee. But it charges every LLC $800 per year in franchise tax — even if you made $0 revenue. If you accidentally do any business in California, you owe this tax too. This alone costs you $4,000 over 5 years just to exist.",
        hidden: ["$800/yr franchise tax — even with zero revenue", "Strict compliance rules and audits", "Complex state tax returns required", "If you have any California customers, you may owe tax"],
        avoid: "The $800/year minimum tax makes California one of the worst states for international e-commerce sellers. Never recommend.",
    },
    {
        name: "New York",
        flag: "🚫",
        filingFee: "$200",
        annualFee: "$300+/yr + publication",
        why: "New York has a hidden trap almost nobody warns about: the Publication Requirement. You must publish your LLC formation in two local newspapers for 6 consecutive weeks. In Manhattan, this costs $1,200-$1,500+. Plus high annual fees. Total first year cost can exceed $2,000.",
        hidden: ["Publication in 2 newspapers — $600 to $1,500+ cost", "High annual filing fees", "Complex state compliance rules", "Biennial statement required every 2 years"],
        avoid: "The newspaper publication requirement alone makes New York a trap for international sellers who don't know about it upfront.",
    },
    {
        name: "Texas",
        flag: "⚠️",
        filingFee: "$300",
        annualFee: "$0 (under $2.47M revenue)",
        why: "Texas has a high $300 filing fee and while annual fees are $0 for most small businesses, the franchise tax kicks in above $2.47M revenue. The real issue is the $300 upfront cost — 3x more expensive than Wyoming to start with no additional benefit for international e-commerce sellers.",
        hidden: ["$300 filing fee — highest of common states", "Franchise tax above $2.47M revenue", "Public Information Report required annually", "No privacy protections"],
        avoid: "High formation cost with no privacy advantages. Better options exist for international sellers at one-third the price.",
    },
];

function StateCard({ state }: { state: typeof goodStates[0] }) {
    const [open, setOpen] = useState(false);
    return (
        <div className={`bg-white rounded-3xl border-2 ${state.color} p-6 shadow-sm hover:shadow-lg transition-all duration-300`}>
            <div className="flex items-start justify-between mb-3">
                <div>
                    <span className="text-2xl mr-2">{state.flag}</span>
                    <span className="text-xl font-bold text-slate-900">{state.name}</span>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600">{state.badge}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-slate-50 rounded-xl p-2 text-center">
                    <div className="text-xs text-slate-400 mb-0.5">Filing</div>
                    <div className="text-sm font-bold text-slate-800">{state.filingFee}</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-2 text-center">
                    <div className="text-xs text-slate-400 mb-0.5">Annual</div>
                    <div className="text-sm font-bold text-slate-800">{state.annualFee}</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-2 text-center">
                    <div className="text-xs text-slate-400 mb-0.5">Privacy</div>
                    <div className="text-xs text-yellow-500">{state.privacy}</div>
                </div>
            </div>
            <ul className="space-y-1.5 mb-4">
                {state.pros.slice(0, open ? state.pros.length : 4).map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />{p}
                    </li>
                ))}
                {!open && state.pros.length > 4 && (
                    <button onClick={() => setOpen(true)} className="text-xs text-blue-500 hover:underline ml-6">
                        +{state.pros.length - 4} more benefits...
                    </button>
                )}
            </ul>
            {open && state.cons.map((c, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-slate-400 mb-1">
                    <div className="w-4 h-4 rounded-full border border-slate-300 flex-shrink-0 mt-0.5 text-center text-xs leading-4">−</div>{c}
                </div>
            ))}
            <div className={`mt-3 p-3 rounded-xl border text-xs leading-relaxed font-medium ${state.verdictColor}`}>
                ✓ {state.verdict}
            </div>
        </div>
    );
}

function BadStateCard({ state }: { state: typeof badStates[0] }) {
    return (
        <div className="bg-white rounded-2xl border border-red-100 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">{state.flag}</span>
                <div>
                    <h3 className="font-bold text-slate-900">{state.name}</h3>
                    <span className="text-xs text-red-500 font-semibold">Not recommended for international sellers</span>
                </div>
                <div className="ml-auto text-right">
                    <div className="text-xs text-slate-400">Annual cost</div>
                    <div className="text-sm font-bold text-red-500">{state.annualFee}</div>
                </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">{state.why}</p>
            <div className="bg-red-50 rounded-xl p-3">
                <div className="text-xs font-semibold text-red-700 mb-1.5">Hidden costs & traps:</div>
                {state.hidden.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-red-600 mb-1">
                        <XCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />{h}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function WhichStatePage() {
    const router = useRouter();

    return (
        <>
            <SEO
                title="Which US State Should I Form My LLC In? Complete Guide for International Sellers"
                description="Wyoming, New Mexico, Missouri or Arizona? Expert guide for international e-commerce sellers on which US state to form your LLC. Avoid costly mistakes with Delaware, California and New York."
            />
            <div className="min-h-screen bg-slate-50 font-sans">
                {/* Nav */}
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                        <Logo />
                        <nav className="hidden md:flex items-center gap-8">
                            <Link href="/case-studies" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Case Studies</Link>
                            <Link href="/pricing" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Pricing</Link>
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
                <section className="pt-16 pb-10 px-4 text-center bg-white border-b border-slate-100">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-6">
                        <Star className="w-4 h-4 fill-blue-400" /> Based on 500+ international client formations
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight max-w-4xl mx-auto">
                        Which US state should you form your LLC in?
                    </h1>
                    <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-6">
                        The wrong state choice can cost you hundreds of dollars every year. Our expert guide — based on forming LLCs for 500+ international e-commerce sellers — tells you exactly which states to choose and which to avoid.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> Updated for 2026</span>
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> For non-US residents</span>
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> E-commerce focused</span>
                    </div>
                </section>

                {/* Quick answer */}
                <section className="max-w-5xl mx-auto px-4 py-10">
                    <div className="bg-blue-600 rounded-3xl p-8 text-white mb-12">
                        <h2 className="text-2xl font-bold mb-4">⚡ Quick answer</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <div className="text-blue-200 text-sm font-semibold mb-2">✅ RECOMMENDED STATES</div>
                                <div className="space-y-2">
                                    {["Wyoming — Best overall for e-commerce sellers", "New Mexico — Best for zero annual fees", "Missouri — Great budget option, no annual fees", "Arizona — Low cost, no annual fees"].map((s, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-green-300 flex-shrink-0" />
                                            <span>{s}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="text-red-200 text-sm font-semibold mb-2">❌ STATES TO AVOID</div>
                                <div className="space-y-2">
                                    {["California — $800/yr mandatory tax even with $0 revenue", "New York — Newspaper publication costs $1,500+", "Delaware — $300/yr franchise tax, only for VC startups", "Texas — $300 filing fee, no privacy benefits"].map((s, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm">
                                            <XCircle className="w-4 h-4 text-red-300 flex-shrink-0" />
                                            <span>{s}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Good states */}
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">✅ Best states for international sellers</h2>
                    <p className="text-slate-500 mb-8">These four states consistently deliver the best value for non-US e-commerce entrepreneurs.</p>
                    <div className="grid md:grid-cols-2 gap-6 mb-16">
                        {goodStates.map((s, i) => <StateCard key={i} state={s} />)}
                    </div>

                    {/* 5-year cost comparison */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">5-year total cost comparison</h2>
                        <p className="text-slate-500 mb-6 text-sm">Registered agent cost (~$60/yr) included in all states. Based on typical e-commerce seller with no physical US presence.</p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200">
                                        <th className="text-left py-3 px-4 text-slate-600 font-semibold">State</th>
                                        <th className="text-center py-3 px-4 text-slate-600 font-semibold">Year 1</th>
                                        <th className="text-center py-3 px-4 text-slate-600 font-semibold">Year 2-5 (each)</th>
                                        <th className="text-center py-3 px-4 text-slate-600 font-semibold">5-Year Total</th>
                                        <th className="text-center py-3 px-4 text-slate-600 font-semibold">Verdict</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { state: "Wyoming", y1: "$220", recurring: "$120", total5: "$700", v: "✅ Best value", vc: "text-green-600 font-semibold" },
                                        { state: "New Mexico", y1: "$110", recurring: "$60", total5: "$350", v: "✅ Cheapest overall", vc: "text-green-600 font-semibold" },
                                        { state: "Missouri", y1: "$110", recurring: "$60", total5: "$350", v: "✅ Tied cheapest", vc: "text-green-600 font-semibold" },
                                        { state: "Arizona", y1: "$110", recurring: "$60", total5: "$350", v: "✅ No annual fees", vc: "text-green-600 font-semibold" },
                                        { state: "Delaware", y1: "$450", recurring: "$360", total5: "$1,890", v: "⚠️ Expensive", vc: "text-amber-600 font-semibold" },
                                        { state: "California", y1: "$930", recurring: "$860", total5: "$4,370", v: "❌ Avoid", vc: "text-red-600 font-semibold" },
                                        { state: "New York", y1: "$1,960", recurring: "$360", total5: "$3,400", v: "❌ Avoid", vc: "text-red-600 font-semibold" },
                                        { state: "Texas", y1: "$420", recurring: "$60", total5: "$660", v: "⚠️ Overpriced start", vc: "text-amber-600 font-semibold" },
                                    ].map((r, i) => (
                                        <tr key={i} className={`border-b border-slate-100 ${i < 4 ? "bg-green-50/30" : i > 5 ? "bg-red-50/30" : "bg-amber-50/30"}`}>
                                            <td className="py-3 px-4 font-medium text-slate-800">{r.state}</td>
                                            <td className="py-3 px-4 text-center text-slate-600">{r.y1}</td>
                                            <td className="py-3 px-4 text-center text-slate-600">{r.recurring}</td>
                                            <td className="py-3 px-4 text-center font-bold text-slate-800">{r.total5}</td>
                                            <td className={`py-3 px-4 text-center ${r.vc}`}>{r.v}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-slate-400 mt-3">* New York Year 1 includes newspaper publication requirement ($1,200 avg). California includes $800/yr franchise tax. Delaware includes $300/yr franchise tax.</p>
                    </div>

                    {/* Bad states */}
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">❌ States to avoid — and why</h2>
                    <p className="text-slate-500 mb-8">These states are famous names but terrible choices for international e-commerce sellers. Here's the truth no one tells you.</p>
                    <div className="grid md:grid-cols-2 gap-6 mb-16">
                        {badStates.map((s, i) => <BadStateCard key={i} state={s} />)}
                    </div>

                    {/* Decision guide */}
                    <div className="bg-slate-900 rounded-3xl p-8 text-white mb-16">
                        <h2 className="text-2xl font-bold mb-6">🎯 Which state is right for YOU?</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { q: "Amazon / Walmart FBA seller", a: "Wyoming", reason: "Best platform acceptance, strong privacy, low annual cost" },
                                { q: "Dropshipper or online store", a: "Wyoming or New Mexico", reason: "Both work perfectly — choose New Mexico to save annual fees" },
                                { q: "Freelancer / consultant", a: "New Mexico", reason: "Zero annual fees, maximum anonymity, cheapest overall" },
                                { q: "Startup seeking investment", a: "Delaware (C-Corp)", reason: "Only case where Delaware makes sense — investors require it" },
                                { q: "Holding company / passive income", a: "New Mexico", reason: "Zero annual fees, full anonymity, lowest long-term cost" },
                                { q: "Want lowest possible cost", a: "New Mexico / Missouri / Arizona", reason: "All three have $50 filing fee and zero annual report fees" },
                            ].map((item, i) => (
                                <div key={i} className="bg-white/10 rounded-2xl p-4">
                                    <div className="text-slate-300 text-sm mb-1">If you are a...</div>
                                    <div className="font-semibold text-white mb-1">{item.q}</div>
                                    <div className="text-blue-300 font-bold text-sm mb-1">→ Choose {item.a}</div>
                                    <div className="text-slate-400 text-xs">{item.reason}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white text-center">
                        <h2 className="text-2xl font-bold mb-3">Still not sure which state is right for you?</h2>
                        <p className="text-blue-100 mb-6 max-w-xl mx-auto">We've helped 500+ international sellers choose the right state. WhatsApp us and we'll recommend the best option for your specific business — free, no obligation.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-base rounded-xl font-bold"
                                onClick={() => router.push("/pricing")}
                            >
                                View Pricing <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <a href="https://wa.me/13072180376?text=Hi%2C%20I%20need%20help%20choosing%20which%20US%20state%20to%20form%20my%20LLC%20in." target="_blank" rel="noopener noreferrer">
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-base rounded-xl">
                                    <Phone className="mr-2 w-5 h-5" /> Ask on WhatsApp
                                </Button>
                            </a>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
