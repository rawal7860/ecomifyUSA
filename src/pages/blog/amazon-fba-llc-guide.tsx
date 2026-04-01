import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    ArrowRight, CheckCircle2, XCircle, Phone,
    AlertTriangle, ChevronDown, ChevronUp, ShoppingCart, MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { SEO } from "@/components/SEO";

const faqs = [
    {
        q: "Do I need a US LLC to sell on Amazon FBA as a non-US resident?",
        a: "You are not legally required to have an LLC to sell on Amazon — Amazon allows sole proprietors and foreign individuals to register. However, an LLC separates your personal assets from business liabilities, unlocks US banking options (which simplifies disbursements), and is usually required to get a sales tax resale certificate to avoid paying sales tax on your inventory purchases.",
    },
    {
        q: "Wyoming or Delaware — which is better for Amazon FBA?",
        a: "Wyoming is better for most international Amazon FBA sellers. It has no state income tax, no franchise tax, very low annual fees ($60/yr), strong privacy laws, and no requirement to disclose member names publicly. Delaware is better if you plan to raise venture capital or need a corporate structure — the ongoing costs (Delaware franchise tax) are higher and less suitable for small e-commerce businesses.",
    },
    {
        q: "What is sales tax nexus and does my FBA inventory create it?",
        a: "Sales tax nexus means you have a legal connection to a state that requires you to collect and remit sales tax. For Amazon FBA sellers, storing inventory in Amazon's fulfillment centres creates physical nexus in those states — even if you live outside the US. Amazon now collects Marketplace Facilitator Tax on behalf of sellers in most states, which means Amazon handles most of your sales tax obligations automatically.",
    },
    {
        q: "Does Amazon collect sales tax for me?",
        a: "In most US states, yes. Amazon's Marketplace Facilitator laws mean Amazon collects and remits sales tax on your behalf in 45+ states. You do not need to file separately in those states. However, you are still responsible for states where Amazon is not a marketplace facilitator, and for sales made outside of Amazon (your Shopify store, for example).",
    },
    {
        q: "What is a resale certificate and do I need one?",
        a: "A resale certificate (also called a reseller's permit or tax exemption certificate) allows you to buy inventory without paying sales tax, because you'll collect sales tax when you resell to the end customer. For FBA sellers buying directly from US suppliers or wholesalers, a resale certificate can save significant money — typically 6–10% of your inventory cost per purchase.",
    },
    {
        q: "Can I get a resale certificate as a non-US resident with a Wyoming LLC?",
        a: "Yes. Many states issue resale certificates to out-of-state LLCs, including those owned by non-residents. Wyoming LLC + EIN + completed state-specific resale certificate form is typically all you need. We help clients get resale certificates in the states where their suppliers are based.",
    },
    {
        q: "Do I need to file US taxes as a non-US resident with a Wyoming LLC?",
        a: "Yes. A foreign-owned single-member LLC that is disregarded for tax purposes must file Form 5472 and a pro forma Form 1120 every year with the IRS. The penalty for missing these forms is $25,000. You'll also need to report income in your home country per your local tax laws. We recommend working with a US international tax accountant for your annual filings.",
    },
    {
        q: "Can I use my registered agent's address for my Amazon seller account?",
        a: "Yes, for your business address on the Amazon seller registration. However, your bank account and disbursement account must match your actual business banking details. Amazon will verify your identity during registration — use your real name and passport details regardless of what address you list.",
    },
];

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div
            className="border border-slate-200 rounded-xl overflow-hidden cursor-pointer"
            onClick={() => setOpen(o => !o)}
        >
            <div className="flex items-center justify-between p-5 bg-white hover:bg-slate-50 transition-colors">
                <span className="font-semibold text-slate-800 text-sm pr-4">{q}</span>
                {open ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
            </div>
            {open && (
                <div className="px-5 pb-5 bg-white">
                    <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
                </div>
            )}
        </div>
    );
}

export default function AmazonFBALLCGuide() {
    const router = useRouter();

    return (
        <>
            <SEO
                title="Amazon FBA LLC Guide for International Sellers: Wyoming vs Delaware | ecomifyUSA"
                description="Should you use Wyoming or Delaware for your Amazon FBA LLC? Complete guide covering sales tax nexus, tax exemption certificates, and step-by-step from LLC formation to your first FBA sale."
                url="https://ecomifyusa.com/blog/amazon-fba-llc-guide"
            />
            <div className="min-h-screen bg-white font-sans">
                {/* Nav */}
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                        <Logo />
                        <nav className="hidden md:flex items-center gap-8">
                            <Link href="/case-studies" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Case Studies</Link>
                            <Link href="/pricing" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Pricing</Link>
                            <Link href="/which-state" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Which State?</Link>
                            <Link href="/blog" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Blog</Link>
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

                <article className="max-w-3xl mx-auto px-4 py-16">

                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
                        <span>/</span>
                        <span className="text-slate-600">Amazon FBA LLC guide</span>
                    </nav>

                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-xs font-semibold px-3 py-1 bg-orange-100 text-orange-700 rounded-full">Amazon FBA Guide</span>
                        <span className="text-xs text-slate-400">For international sellers · 10 min read</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        Amazon FBA LLC guide for international sellers: Wyoming vs Delaware
                    </h1>
                    <p className="text-xl text-slate-500 mb-10 leading-relaxed">
                        Thousands of international sellers launch Amazon FBA businesses through US LLCs every year. This guide covers which state to choose, how sales tax nexus works, how to get tax exemption certificates, and exactly what to do from LLC formation to your first sale.
                    </p>

                    {/* Key info box */}
                    <div className="bg-orange-50 border-l-4 border-orange-400 rounded-r-2xl p-6 mb-10">
                        <div className="flex items-start gap-3">
                            <ShoppingCart className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="font-bold text-orange-900 mb-1">Our recommendation for most international FBA sellers</div>
                                <p className="text-orange-800 text-sm leading-relaxed">
                                    <strong>Wyoming LLC.</strong> No state income tax, no franchise tax, $60/year total state cost, strong privacy, and wide acceptance. Delaware is excellent for venture-backed companies but unnecessarily expensive for e-commerce sellers.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 1 */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Amazon FBA sellers need an LLC</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        You can technically sell on Amazon as an individual without an LLC, but doing so exposes you to significant risk and closes off important advantages:
                    </p>
                    <div className="space-y-3 mb-8">
                        {[
                            {
                                title: "Liability protection",
                                desc: "If a customer sues over a product defect, injury, or intellectual property dispute, an LLC limits the lawsuit to business assets. Without an LLC, your personal savings, property, and assets are at risk.",
                            },
                            {
                                title: "US bank account access",
                                desc: "Banks like Mercury require a US LLC to open a business account. A US bank account simplifies Amazon disbursements and avoids international wire fees.",
                            },
                            {
                                title: "Resale certificates",
                                desc: "Buying inventory wholesale from US suppliers or 3PL warehouses requires a resale certificate to avoid paying sales tax. Most states issue resale certificates only to registered businesses, not individuals.",
                            },
                            {
                                title: "Professional credibility",
                                desc: "US suppliers, freight forwarders, and 3PLs are more willing to work with a registered business entity than a foreign individual. An LLC makes you look established.",
                            },
                            {
                                title: "Tax treaty benefits",
                                desc: "Depending on your home country, a US LLC may allow you to take advantage of US-foreign tax treaties, reducing double taxation on your business income.",
                            },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-semibold text-slate-900 text-sm">{item.title}</div>
                                    <div className="text-slate-600 text-sm mt-0.5">{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Section 2 — Wyoming vs Delaware */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Wyoming vs Delaware: the FBA seller's breakdown</h2>
                    <div className="overflow-x-auto mb-8">
                        <table className="w-full text-sm border border-slate-200 rounded-2xl overflow-hidden">
                            <thead className="bg-slate-900 text-white">
                                <tr>
                                    <th className="text-left p-4">Factor</th>
                                    <th className="text-center p-4 text-blue-300">Wyoming LLC</th>
                                    <th className="text-center p-4 text-purple-300">Delaware LLC</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { factor: "State income tax", wy: "None", de: "None (for non-residents)" },
                                    { factor: "Annual state fee", wy: "$60/year (flat)", de: "$300/year minimum franchise tax" },
                                    { factor: "Formation cost", wy: "~$100", de: "~$90" },
                                    { factor: "Member privacy", wy: "Very strong (members not on public record)", de: "Moderate (managers disclosed)" },
                                    { factor: "Registered agent required", wy: "Yes (~$50–100/yr)", de: "Yes (~$50–150/yr)" },
                                    { factor: "Best for FBA sellers", wy: "Yes — our top recommendation", de: "Only if raising investment" },
                                    { factor: "Investor acceptance", wy: "Limited (VCs often prefer Delaware)", de: "Excellent — VC/angel standard" },
                                    { factor: "5-year total cost (approx)", wy: "~$400–500", de: "~$1,800–2,500" },
                                ].map((r, i) => (
                                    <tr key={i} className={`border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                                        <td className="p-4 font-medium text-slate-700">{r.factor}</td>
                                        <td className="p-4 text-center text-slate-600">{r.wy}</td>
                                        <td className="p-4 text-center text-slate-600">{r.de}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-8">
                        For the vast majority of international Amazon FBA sellers — especially those just starting out — <strong>Wyoming is the clear winner</strong>. Delaware's advantages are almost exclusively relevant to venture-funded companies, not product-based e-commerce businesses.
                    </p>

                    {/* Section 3 — Sales tax nexus */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Sales tax nexus explained for FBA sellers</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        Sales tax nexus is the legal connection between your business and a US state that triggers a sales tax collection obligation. For Amazon FBA sellers, two types of nexus matter:
                    </p>
                    <div className="space-y-4 mb-6">
                        <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
                            <h3 className="font-bold text-slate-900 mb-2">Physical nexus</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Created when your inventory is stored in a state's Amazon fulfillment centre. If Amazon stores your products in California, Texas, New York, or any other state — even briefly — you have physical nexus there. This was a major concern before marketplace facilitator laws changed the landscape.
                            </p>
                        </div>
                        <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
                            <h3 className="font-bold text-slate-900 mb-2">Economic nexus</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Triggered when your sales into a state exceed a threshold — typically $100,000/year or 200 transactions. All 50 states plus Washington D.C. now have economic nexus laws following the 2018 <em>South Dakota v. Wayfair</em> Supreme Court ruling.
                            </p>
                        </div>
                    </div>

                    {/* Marketplace facilitator box */}
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="font-bold text-green-900 mb-1">Good news: Amazon handles most of this for you</div>
                                <p className="text-green-800 text-sm leading-relaxed">
                                    In 45+ states, Amazon is a <strong>Marketplace Facilitator</strong> — meaning Amazon collects and remits sales tax on your behalf. You don't need to register for a sales tax permit, file returns, or collect sales tax on Amazon sales in those states. The responsibility falls entirely on Amazon.
                                    <br /><br />
                                    The remaining states (and any non-Amazon sales) are where you may still have obligations — consult a US tax professional if your revenue is significant.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 4 — Tax exemption certificates */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Tax exemption (resale) certificates for FBA sellers</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        A resale certificate lets you buy inventory from US suppliers without paying sales tax at the point of purchase. Since you'll collect sales tax when you resell, you shouldn't pay it when you buy — that's what the certificate proves to the supplier.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
                        <h3 className="font-bold text-blue-900 mb-2">How much can this save you?</h3>
                        <p className="text-blue-700 text-sm leading-relaxed mb-2">
                            Sales tax rates range from 4% to 10%+ depending on the state. On $50,000/year of inventory purchases from US suppliers, a resale certificate saves you:
                        </p>
                        <div className="grid grid-cols-3 gap-3 text-center">
                            {[
                                { rate: "6% state", saving: "$3,000/yr" },
                                { rate: "8% state", saving: "$4,000/yr" },
                                { rate: "10% state", saving: "$5,000/yr" },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border border-blue-200 rounded-lg p-3">
                                    <div className="text-blue-600 font-bold text-lg">{item.saving}</div>
                                    <div className="text-blue-700 text-xs">{item.rate} tax rate</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        To get a resale certificate, you typically need to:
                    </p>
                    <div className="space-y-2 mb-8">
                        {[
                            "Register for a sales tax permit in the state where your supplier is based (free in most states)",
                            "Complete that state's resale certificate form (e.g., California CDTFA-230, Texas Form 01-339)",
                            "Provide your LLC name, address, EIN, and sales tax permit number",
                            "Present the completed form to your supplier before your first purchase",
                        ].map((step, i) => (
                            <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                                <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                    {i + 1}
                                </div>
                                {step}
                            </div>
                        ))}
                    </div>

                    {/* Section 5 — Step by step */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">From LLC to first sale: the complete roadmap</h2>
                    <div className="space-y-4 mb-8">
                        {[
                            {
                                step: "1",
                                title: "Form your Wyoming LLC",
                                time: "3–5 business days",
                                desc: "File Articles of Organization with the Wyoming Secretary of State. You'll need a registered agent with a Wyoming address. We handle this for you.",
                            },
                            {
                                step: "2",
                                title: "Get your EIN from the IRS",
                                time: "15–30 business days",
                                desc: "Fax Form SS-4 to the IRS. You need the EIN before you can open a bank account or register on Amazon as a business. We prepare and fax the SS-4 for you.",
                            },
                            {
                                step: "3",
                                title: "Open a US bank account",
                                time: "1–5 business days after EIN",
                                desc: "Apply for Mercury or Relay with your LLC documents and EIN. Once approved, you'll have a US bank account number and routing number for Amazon disbursements.",
                            },
                            {
                                step: "4",
                                title: "Register on Amazon Seller Central",
                                time: "1–3 days",
                                desc: "Go to sellercentral.amazon.com and create a Professional seller account. You'll need your LLC name, EIN, US bank account, passport, and credit card. Complete the tax interview using your EIN.",
                            },
                            {
                                step: "5",
                                title: "Get resale certificates if buying from US suppliers",
                                time: "1–2 weeks",
                                desc: "If you're sourcing from US wholesalers, register for sales tax permits in their states and obtain resale certificates. This step is optional if you're importing from overseas.",
                            },
                            {
                                step: "6",
                                title: "Send inventory to Amazon FBA",
                                time: "Varies by supplier",
                                desc: "Create your product listings, generate FBA shipping plans, and ship inventory to Amazon's designated fulfillment centres. Amazon will allocate inventory across their network.",
                            },
                            {
                                step: "7",
                                title: "Go live and start selling",
                                time: "Once inventory is received",
                                desc: "Your listings go live after Amazon receives and processes your inventory, typically 1–3 business days after delivery. You'll receive your first disbursement 14 days after your first sale.",
                            },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-5 border border-slate-200 rounded-xl bg-white">
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                                    {item.step}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-3 mb-1">
                                        <div className="font-semibold text-slate-900">{item.title}</div>
                                        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full flex-shrink-0">{item.time}</span>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Warning box */}
                    <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl p-6 mb-8">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="font-bold text-amber-900 mb-1">Don't skip your annual IRS filing</div>
                                <p className="text-amber-800 text-sm leading-relaxed">
                                    Foreign-owned single-member LLCs must file <strong>Form 5472</strong> and a pro forma <strong>Form 1120</strong> with the IRS each year, even if the LLC had no income. The penalty for failing to file is <strong>$25,000 per form</strong>. This is one of the most common and costly mistakes international FBA sellers make.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* WhatsApp CTA */}
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10">
                        <h3 className="font-bold text-blue-900 mb-2">Ready to set up your Amazon FBA LLC?</h3>
                        <p className="text-blue-700 text-sm leading-relaxed mb-4">
                            We handle Wyoming LLC formation and EIN for international FBA sellers. Most clients have their LLC + EIN ready to register on Amazon within 4–6 weeks. WhatsApp us to get started.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a href="https://wa.me/13072180376?text=Hi%2C%20I%20want%20to%20set%20up%20a%20Wyoming%20LLC%20for%20Amazon%20FBA%20as%20an%20international%20seller." target="_blank" rel="noopener noreferrer">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <Phone className="mr-2 w-4 h-4" /> Chat on WhatsApp
                                </Button>
                            </a>
                            <Link href="/pricing">
                                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                                    View pricing
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* FAQ */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently asked questions</h2>
                    <div className="space-y-3 mb-12">
                        {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
                    </div>

                    {/* Related posts */}
                    <div className="border-t border-slate-200 pt-8">
                        <div className="text-sm font-semibold text-slate-500 mb-4">Related guides</div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/blog/how-to-get-ein-non-us-resident" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                <ArrowRight className="w-4 h-4" /> How to get an EIN as a non-US resident
                            </Link>
                            <Link href="/blog/us-bank-account-non-resident" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                <ArrowRight className="w-4 h-4" /> Open a US bank account without SSN
                            </Link>
                            <Link href="/which-state" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                <ArrowRight className="w-4 h-4" /> Wyoming vs Delaware: which state guide
                            </Link>
                            <Link href="/pricing" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                <ArrowRight className="w-4 h-4" /> View our pricing
                            </Link>
                        </div>
                    </div>
                </article>

                {/* Bottom CTA */}
                <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-indigo-700">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h2 className="text-2xl font-bold mb-3">Start your Amazon FBA LLC today</h2>
                        <p className="text-blue-100 mb-6">
                            Wyoming LLC + EIN handled for you. Join 500+ international sellers who launched their US business with ecomifyUSA.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-5 rounded-xl font-bold"
                                onClick={() => router.push("/checkout")}
                            >
                                Get Started <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                            <a href="https://wa.me/13072180376?text=Hi%2C%20I%20want%20to%20set%20up%20a%20US%20LLC%20for%20Amazon%20FBA." target="_blank" rel="noopener noreferrer">
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-5 rounded-xl">
                                    <Phone className="mr-2 w-4 h-4" /> Ask on WhatsApp
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
