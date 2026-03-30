import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CheckCircle2, ArrowRight, Shield, Zap, Star, HelpCircle, ChevronDown, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { SEO } from "@/components/SEO";

const plans = [
    {
        name: "Wyoming LLC",
        badge: null,
        price: 197,
        stateFee: 100,
        stateNote: "+ $100 Wyoming state fee",
        color: "border-slate-200",
        btnClass: "bg-slate-900 hover:bg-slate-800 text-white",
        features: [
            "Articles of Organization filed",
            "EIN / Tax ID (non-resident)",
            "1 year registered agent",
            "Operating agreement",
            "Digital document delivery",
            "Email support",
        ],
        notIncluded: ["BOI report filing", "Sales tax registration"],
        ideal: "Best for: Amazon/Walmart FBA sellers, freelancers, digital entrepreneurs",
        checkoutNote: "wyoming-llc-basic",
    },
    {
        name: "Wyoming LLC + Compliance",
        badge: "Most Popular",
        price: 297,
        stateFee: 100,
        stateNote: "+ $100 Wyoming state fee",
        color: "border-blue-500",
        btnClass: "bg-blue-600 hover:bg-blue-700 text-white",
        features: [
            "Everything in Wyoming LLC",
            "BOI report filing (required by law)",
            "Sales tax registration (1 state)",
            "Bank account setup guidance",
            "Amazon/Walmart seller setup",
            "Priority WhatsApp support",
        ],
        notIncluded: [],
        ideal: "Best for: Active e-commerce sellers needing full compliance from day one",
        checkoutNote: "wyoming-llc-compliance",
    },
    {
        name: "Delaware LLC",
        badge: "Investor Ready",
        price: 347,
        stateFee: 90,
        stateNote: "+ $90 Delaware state fee",
        color: "border-slate-200",
        btnClass: "bg-slate-900 hover:bg-slate-800 text-white",
        features: [
            "Everything in Compliance plan",
            "Delaware franchise tax guidance",
            "Investor-ready structure",
            "Certificate of formation",
            "Annual report reminder",
            "Priority WhatsApp support",
        ],
        notIncluded: [],
        ideal: "Best for: Startups seeking investment, SaaS founders, venture-backed businesses",
        checkoutNote: "delaware-llc",
    },
];

const addons = [
    { name: "Sales tax filing", price: "From $49", per: "per state/filing" },
    { name: "Annual report filing", price: "$99", per: "per year + state fee" },
    { name: "Tax exemption certificates", price: "$149", per: "up to 10 states" },
    { name: "Delaware franchise tax", price: "$149", per: "per year" },
    { name: "Income tax preparation", price: "From $299", per: "per year" },
    { name: "Registered agent renewal", price: "$99", per: "per year" },
    { name: "Expedited processing", price: "$99", per: "one-time" },
    { name: "Additional state registration", price: "$149", per: "per state" },
];

const faqs = [
    {
        q: "What exactly is included in the state fee?",
        a: "The state fee is paid directly to the US government (Wyoming Secretary of State or Delaware Division of Corporations). It is not our service fee. Wyoming charges $100 and Delaware charges $90. These are mandatory government fees that every LLC must pay regardless of who helps you form it.",
    },
    {
        q: "How long does formation take?",
        a: "Wyoming LLC formation takes 1-3 business days. Delaware takes 1-3 business days. The EIN (Tax ID) for non-US residents takes 15-30 business days as the IRS requires fax submission for foreign owners. We handle the entire IRS process for you.",
    },
    {
        q: "Do I need an SSN or ITIN to get started?",
        a: "No. You only need a valid passport and proof of your home address. We obtain your EIN using your foreign passport number — no SSN or ITIN required at the formation stage.",
    },
    {
        q: "Can I upgrade from Wyoming Basic to Compliance later?",
        a: "Yes. You can add the BOI filing, sales tax registration, and other services at any time. We will charge the difference in price.",
    },
    {
        q: "What payment methods do you accept?",
        a: "We accept Wise, PayPal, credit/debit cards, and bank transfer. All payments are processed securely. The state fee is paid separately directly to the government.",
    },
    {
        q: "Is there a money-back guarantee?",
        a: "Yes. If we cannot deliver the promised service, we offer a full refund of our service fee. Government state fees are non-refundable once paid to the state.",
    },
];

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? "border-blue-300 shadow-md" : "border-slate-200 hover:border-blue-200"}`}>
            <button className="w-full px-6 py-5 flex items-center justify-between text-left" onClick={() => setOpen(!open)}>
                <span className="font-semibold text-slate-800 text-base">{q}</span>
                <ChevronDown className={`w-5 h-5 text-blue-500 transition-transform duration-300 flex-shrink-0 ml-4 ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <div className="px-6 pb-5">
                    <p className="text-slate-600 leading-relaxed border-l-2 border-blue-200 pl-4">{a}</p>
                </div>
            )}
        </div>
    );
}

export default function PricingPage() {
    const router = useRouter();

    return (
        <>
            <SEO
                title="Pricing — ecomifyUSA | US LLC Formation for Non-Residents"
                description="Transparent pricing for US LLC formation. Wyoming LLC from $197, Delaware LLC from $347. EIN for non-residents included. No hidden fees."
            />
            <div className="min-h-screen bg-slate-50 font-sans">
                {/* Nav */}
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                        <Logo />
                        <nav className="hidden md:flex items-center gap-8">
                            <Link href="/case-studies" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Case Studies</Link>
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
                <section className="pt-20 pb-12 text-center px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 text-sm font-medium mb-6">
                        <Shield className="w-4 h-4 text-green-500" /> No hidden fees. State fees shown separately.
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
                        Simple, transparent pricing
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-3">
                        Form your US LLC from anywhere in the world. EIN for non-residents always included.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>Rated 5.0 by 500+ international entrepreneurs</span>
                    </div>
                </section>

                {/* Pricing Cards */}
                <section className="max-w-6xl mx-auto px-4 pb-16">
                    <div className="grid md:grid-cols-3 gap-6">
                        {plans.map((plan, i) => (
                            <div key={i} className={`bg-white rounded-3xl border-2 ${plan.color} p-8 flex flex-col relative ${plan.badge === "Most Popular" ? "shadow-2xl shadow-blue-100 scale-[1.02]" : "shadow-sm"}`}>
                                {plan.badge && (
                                    <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${plan.badge === "Most Popular" ? "bg-blue-600 text-white" : "bg-slate-800 text-white"}`}>
                                        {plan.badge === "Most Popular" ? "★ Most Popular" : plan.badge}
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                                        <span className="text-slate-500 text-sm">our fee</span>
                                    </div>
                                    <div className="mt-1 text-sm text-slate-500">{plan.stateNote}</div>
                                    <div className="mt-2 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full inline-block">
                                        Total: ${plan.price + plan.stateFee} all-in
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-6 flex-1">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-start gap-3 text-sm text-slate-700">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                            {f}
                                        </li>
                                    ))}
                                    {plan.notIncluded.map((f, j) => (
                                        <li key={j} className="flex items-start gap-3 text-sm text-slate-400 line-through">
                                            <div className="w-4 h-4 rounded-full border border-slate-300 flex-shrink-0 mt-0.5" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <div className="text-xs text-slate-500 bg-slate-50 rounded-xl p-3 mb-5 leading-relaxed">
                                    {plan.ideal}
                                </div>

                                <Button
                                    className={`w-full py-6 text-base rounded-xl font-semibold ${plan.btnClass}`}
                                    onClick={() => router.push(`/checkout?plan=${plan.checkoutNote}`)}
                                >
                                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Trust strip */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-green-500" /> Money-back guarantee</span>
                        <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-blue-500" /> EIN for non-residents included</span>
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> No hidden fees ever</span>
                        <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> 500+ happy clients</span>
                    </div>
                </section>

                {/* What is included explainer */}
                <section className="bg-white py-16 px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900 text-center mb-3">What you get with every plan</h2>
                        <p className="text-slate-500 text-center mb-10">We handle the entire process remotely. You never need to visit the US.</p>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { icon: "📄", title: "Articles of Organization", desc: "We prepare and file your LLC formation documents with the Secretary of State. You receive certified copies." },
                                { icon: "🔢", title: "EIN for non-residents", desc: "We obtain your Employer Identification Number from the IRS via fax — the only method available to non-US residents. Takes 15-30 days." },
                                { icon: "📬", title: "Registered agent (1 year)", desc: "A registered agent with a physical US address receives legal documents on your behalf. Required by all states." },
                                { icon: "📋", title: "Operating agreement", desc: "Your internal company document showing ownership structure. Required by banks to open a US business account." },
                                { icon: "💳", title: "Bank account guidance", desc: "We guide you through opening a US business account with Mercury, Wise, or Payoneer — no US visit required." },
                                { icon: "📦", title: "Amazon/Walmart ready", desc: "With your LLC and EIN, you can immediately apply as a seller on Amazon US, Walmart, and other US marketplaces." },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-5 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                                    <div className="text-2xl flex-shrink-0">{item.icon}</div>
                                    <div>
                                        <div className="font-semibold text-slate-900 mb-1">{item.title}</div>
                                        <div className="text-sm text-slate-500 leading-relaxed">{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Add-ons */}
                <section className="py-16 px-4 bg-slate-50">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900 text-center mb-3">Add-on services</h2>
                        <p className="text-slate-500 text-center mb-10">Add to any plan — before or after formation.</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            {addons.map((a, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-slate-200 px-6 py-4 flex items-center justify-between hover:border-blue-200 transition-colors">
                                    <div>
                                        <div className="font-semibold text-slate-800 text-sm">{a.name}</div>
                                        <div className="text-xs text-slate-400 mt-0.5">{a.per}</div>
                                    </div>
                                    <div className="text-blue-600 font-bold text-sm">{a.price}</div>
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-sm text-slate-400 mt-6">Need a custom quote? <a href="https://wa.me/13072180376" className="text-blue-600 hover:underline">WhatsApp us</a></p>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">Pricing FAQs</h2>
                        <div className="space-y-3">
                            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-indigo-700">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Ready to form your US LLC?</h2>
                        <p className="text-blue-100 mb-8 text-lg">Join 500+ international entrepreneurs. Your LLC could be ready in 24 hours.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-6 text-lg rounded-xl font-bold"
                                onClick={() => router.push("/checkout")}
                            >
                                Start Formation <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <a href="https://wa.me/13072180376" target="_blank" rel="noopener noreferrer">
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-10 py-6 text-lg rounded-xl">
                                    <Phone className="mr-2 w-5 h-5" /> WhatsApp us first
                                </Button>
                            </a>
                        </div>
                        <p className="text-blue-200 text-sm mt-6">100% remote · No US visit needed · Money-back guarantee</p>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
