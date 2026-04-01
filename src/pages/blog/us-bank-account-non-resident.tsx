import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    ArrowRight, CheckCircle2, XCircle, Phone,
    AlertTriangle, ChevronDown, ChevronUp, Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { SEO } from "@/components/SEO";

const faqs = [
    {
        q: "Can I open a US bank account without visiting the US?",
        a: "Yes. Mercury, Wise Business, and Payoneer all allow you to open accounts entirely online without visiting the US. You'll need your LLC documents, EIN, and passport — no in-person visit required.",
    },
    {
        q: "Does Mercury work for non-US residents?",
        a: "Yes. Mercury is specifically designed for startups and online businesses, including those owned by non-US residents. You need an EIN, a US LLC, and valid government-issued ID. Mercury does not serve residents of certain sanctioned countries.",
    },
    {
        q: "Is Wise a real bank account?",
        a: "Wise Business provides a US account number and routing number that functions like a real US bank account for receiving payments. However, it's technically an e-money account, not an FDIC-insured bank account. For most international sellers, this distinction doesn't matter for day-to-day use.",
    },
    {
        q: "Can I receive Amazon payments in a Wise or Payoneer account?",
        a: "Amazon Seller Central accepts both Wise and Payoneer account numbers for disbursements, as long as the account holds a valid US routing number and account number. Mercury also works for Amazon disbursements.",
    },
    {
        q: "What if Mercury rejects my application?",
        a: "Mercury rejects applications for various reasons: incomplete documents, LLC not yet in good standing, or account volume patterns that trigger fraud checks. Wise or Payoneer are solid alternatives. We can advise on which option fits your situation best.",
    },
    {
        q: "Do I need a US address to open these accounts?",
        a: "Mercury and Relay require a US address (your registered agent's address is usually acceptable). Wise and Payoneer are more flexible and often accept international addresses, though a US address can help with approval.",
    },
    {
        q: "Can I use my LLC's registered agent address for Mercury?",
        a: "Yes. Mercury accepts registered agent addresses as the business address on your application. Just make sure the address on your Mercury application matches what's on your LLC formation documents.",
    },
    {
        q: "What's the difference between Mercury and Relay?",
        a: "Both are excellent US business bank accounts for international LLCs. Mercury is more widely used in the e-commerce community and has a slicker dashboard. Relay offers more sub-accounts for budgeting. Either works well — Mercury is our most commonly recommended option.",
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

const comparisonData = [
    {
        feature: "Account type",
        mercury: "FDIC-insured bank account",
        wise: "E-money account (US routing + account number)",
        payoneer: "Payment account (US receiving details)",
    },
    {
        feature: "EIN required",
        mercury: "Yes",
        wise: "Recommended",
        payoneer: "Recommended",
    },
    {
        feature: "LLC required",
        mercury: "Yes",
        wise: "Preferred (sole proprietor also works)",
        payoneer: "Preferred",
    },
    {
        feature: "Application fully online",
        mercury: "Yes",
        wise: "Yes",
        payoneer: "Yes",
    },
    {
        feature: "Monthly fee",
        mercury: "$0",
        wise: "$0 (send fees apply)",
        payoneer: "$0 (receive/withdraw fees apply)",
    },
    {
        feature: "US debit card",
        mercury: "Yes (Mastercard)",
        wise: "Yes (Visa)",
        payoneer: "Yes (Mastercard)",
    },
    {
        feature: "Amazon disbursements",
        mercury: "Yes",
        wise: "Yes",
        payoneer: "Yes",
    },
    {
        feature: "Stripe/PayPal compatible",
        mercury: "Yes",
        wise: "Yes",
        payoneer: "Limited",
    },
    {
        feature: "Wire transfers",
        mercury: "Yes (free incoming)",
        wise: "Yes",
        payoneer: "Yes",
    },
    {
        feature: "Best for",
        mercury: "Main business bank account",
        wise: "Multi-currency + global payments",
        payoneer: "Marketplace sellers (Amazon, Upwork, Fiverr)",
    },
];

export default function USBankAccountGuide() {
    const router = useRouter();

    return (
        <>
            <SEO
                title="How to Open a US Bank Account Without SSN: Mercury, Wise & Payoneer Guide | ecomifyUSA"
                description="Complete guide for international LLC owners on opening a US bank account without an SSN. Mercury vs Wise vs Payoneer comparison, requirements, and step-by-step approval tips."
                url="https://ecomifyusa.com/blog/us-bank-account-non-resident"
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
                        <span className="text-slate-600">US bank account for non-residents</span>
                    </nav>

                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full">Banking Guide</span>
                        <span className="text-xs text-slate-400">For international LLC owners · 7 min read</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        How to open a US bank account without SSN: Mercury, Wise and Payoneer guide for international LLC owners
                    </h1>
                    <p className="text-xl text-slate-500 mb-10 leading-relaxed">
                        A US bank account separates your business finances, lets you receive marketplace disbursements, and makes tax time simpler. You don't need an SSN or a US visit to open one — here's how.
                    </p>

                    {/* Key info box */}
                    <div className="bg-green-50 border-l-4 border-green-500 rounded-r-2xl p-6 mb-10">
                        <div className="flex items-start gap-3">
                            <Building2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="font-bold text-green-900 mb-1">What you'll need before you apply</div>
                                <ul className="text-green-800 text-sm space-y-1">
                                    <li>• A formed US LLC (Wyoming or Delaware recommended for non-residents)</li>
                                    <li>• An EIN from the IRS</li>
                                    <li>• A valid passport or government-issued photo ID</li>
                                    <li>• Your LLC Articles of Organization / Certificate of Formation</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Section 1 */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Why you need a US bank account</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        Receiving Amazon or Shopify payouts into a foreign bank account creates immediate problems: your marketplace may not support international accounts, currency conversion fees eat into margins, and US tax compliance becomes harder without a clear paper trail.
                    </p>
                    <div className="space-y-3 mb-8">
                        {[
                            { title: "Marketplace disbursements", desc: "Amazon, Walmart, Etsy, and Shopify prefer — or require — a US bank account for disbursements to US-registered businesses." },
                            { title: "Stripe and PayPal", desc: "Stripe requires a US bank account to pay out USD balances from a US Stripe account. PayPal Business works similarly." },
                            { title: "Professional credibility", desc: "US clients and suppliers feel more comfortable paying a US bank account. It also avoids international wire fees on their end." },
                            { title: "Tax separation", desc: "A dedicated US business account makes it straightforward to identify business income and expenses for your annual IRS filings." },
                            { title: "Lower conversion fees", desc: "Holding USD in a US account and converting only what you need, when you need it, saves money versus mandatory conversion on every payout." },
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

                    {/* Section 2 — Comparison table */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Mercury vs Wise vs Payoneer: full comparison</h2>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        Three options dominate for international LLC owners. Here's how they stack up:
                    </p>
                    <div className="overflow-x-auto mb-8">
                        <table className="w-full text-sm border border-slate-200 rounded-2xl overflow-hidden">
                            <thead className="bg-slate-900 text-white">
                                <tr>
                                    <th className="text-left p-4">Feature</th>
                                    <th className="text-center p-4 text-blue-300">Mercury</th>
                                    <th className="text-center p-4 text-green-300">Wise Business</th>
                                    <th className="text-center p-4 text-orange-300">Payoneer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((row, i) => (
                                    <tr key={i} className={`border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                                        <td className="p-4 font-medium text-slate-700">{row.feature}</td>
                                        <td className="p-4 text-center text-slate-600">{row.mercury}</td>
                                        <td className="p-4 text-center text-slate-600">{row.wise}</td>
                                        <td className="p-4 text-center text-slate-600">{row.payoneer}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Section 3 — Requirements */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Requirements and documents for each option</h2>

                    {/* Mercury */}
                    <div className="border border-slate-200 rounded-2xl overflow-hidden mb-6">
                        <div className="bg-slate-900 px-6 py-4">
                            <h3 className="text-white font-bold text-lg">Mercury</h3>
                            <p className="text-slate-400 text-sm">Best overall choice for most international LLC owners</p>
                        </div>
                        <div className="p-6 space-y-3">
                            {[
                                "US LLC in good standing (Articles of Organization or Certificate of Formation)",
                                "EIN confirmation letter (CP 575) or EIN assignment letter",
                                "Valid government-issued photo ID (passport preferred)",
                                "US business address (registered agent address acceptable)",
                                "Social Security Number is NOT required for non-resident foreign owners",
                                "Mercury does not serve residents of: Cuba, Iran, North Korea, Syria, or other OFAC-sanctioned jurisdictions",
                            ].map((req, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-slate-600">{req}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Wise */}
                    <div className="border border-slate-200 rounded-2xl overflow-hidden mb-6">
                        <div className="bg-slate-900 px-6 py-4">
                            <h3 className="text-white font-bold text-lg">Wise Business</h3>
                            <p className="text-slate-400 text-sm">Best for multi-currency operations and global payments</p>
                        </div>
                        <div className="p-6 space-y-3">
                            {[
                                "US LLC documents (or you can open as a sole proprietor)",
                                "EIN recommended but not always mandatory at sign-up",
                                "Valid government-issued ID (passport or national ID)",
                                "Business address — international addresses accepted",
                                "Description of your business activities",
                                "Note: Wise may request additional verification during account review",
                            ].map((req, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-slate-600">{req}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payoneer */}
                    <div className="border border-slate-200 rounded-2xl overflow-hidden mb-8">
                        <div className="bg-slate-900 px-6 py-4">
                            <h3 className="text-white font-bold text-lg">Payoneer</h3>
                            <p className="text-slate-400 text-sm">Best for Amazon, Upwork, Fiverr, and marketplace payouts</p>
                        </div>
                        <div className="p-6 space-y-3">
                            {[
                                "Government-issued photo ID (passport, driver's license, or national ID)",
                                "Proof of address (utility bill, bank statement — international addresses fine)",
                                "LLC formation documents if registering as a business",
                                "EIN recommended for business accounts",
                                "Payoneer is accepted directly by Amazon, Upwork, Fiverr, and many other platforms",
                                "Payoneer provides a US payment account — not a full bank account with Visa/wire features of Mercury",
                            ].map((req, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-slate-600">{req}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 4 — Step by step */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Step-by-step: opening your Mercury account</h2>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        Mercury is the most popular choice for international e-commerce LLCs. Here's the complete process:
                    </p>
                    <div className="space-y-4 mb-8">
                        {[
                            {
                                step: "1",
                                title: "Have your LLC and EIN ready",
                                desc: "Before applying, ensure your LLC is in good standing with the state and you have your EIN letter. Mercury will verify both.",
                            },
                            {
                                step: "2",
                                title: "Go to Mercury's website and start an application",
                                desc: "Visit mercury.com and click 'Open an account.' Mercury's entire process is online — no phone calls needed.",
                            },
                            {
                                step: "3",
                                title: "Enter your LLC details",
                                desc: "Provide your LLC name, EIN, state of formation, business address (registered agent address is fine), and business description.",
                            },
                            {
                                step: "4",
                                title: "Verify your identity",
                                desc: "Upload your passport or government ID. Mercury uses an automated verification system. Have a clear, well-lit photo of your document ready.",
                            },
                            {
                                step: "5",
                                title: "Upload your LLC documents",
                                desc: "Upload your Articles of Organization or Certificate of Formation. These must show the same LLC name as your EIN letter.",
                            },
                            {
                                step: "6",
                                title: "Wait for approval",
                                desc: "Mercury typically approves or requests more information within 1–5 business days. Once approved, your account is live and you'll receive virtual account numbers immediately.",
                            },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-5 border border-slate-200 rounded-xl bg-white">
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                                    {item.step}
                                </div>
                                <div>
                                    <div className="font-semibold text-slate-900 mb-1">{item.title}</div>
                                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Section 5 — Tips */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Tips to maximise your approval chances</h2>
                    <div className="space-y-3 mb-8">
                        {[
                            { tip: "Match names exactly", desc: "The name on your Mercury application, your EIN letter, and your LLC documents must all match precisely — including spacing and punctuation." },
                            { tip: "Use your registered agent address", desc: "If you don't have a US address, use your registered agent's address. This is legal and widely accepted." },
                            { tip: "Describe your business clearly", desc: "When asked about your business activities, be specific: 'Amazon FBA seller of consumer electronics' is better than 'e-commerce.' Vague descriptions trigger more scrutiny." },
                            { tip: "Have your EIN letter ready", desc: "The CP 575 or 147C letter from the IRS is the most reliable proof of your EIN. Screenshots of the IRS portal are not accepted." },
                            { tip: "Don't rush document uploads", desc: "Blurry or cropped ID photos are a top rejection reason. Take the photos in good lighting and ensure all four corners of the document are visible." },
                            { tip: "If Mercury declines, try Relay", desc: "Relay is Mercury's main alternative and is equally popular with international LLC owners. Some applicants who were declined by Mercury were approved by Relay within days." },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                                <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-semibold text-slate-900 text-sm">{item.tip}</div>
                                    <div className="text-slate-600 text-sm mt-0.5">{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* WhatsApp CTA */}
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10">
                        <h3 className="font-bold text-blue-900 mb-2">Need help getting your LLC and EIN ready for Mercury?</h3>
                        <p className="text-blue-700 text-sm leading-relaxed mb-4">
                            We handle LLC formation, EIN application, and advise on your banking setup. Most clients have their LLC + EIN ready for Mercury in under 5 weeks.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a href="https://wa.me/13072180376?text=Hi%2C%20I%20need%20help%20setting%20up%20a%20US%20LLC%20and%20opening%20a%20Mercury%20bank%20account." target="_blank" rel="noopener noreferrer">
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
                            <Link href="/blog/amazon-fba-llc-guide" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                <ArrowRight className="w-4 h-4" /> Amazon FBA LLC guide
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
                        <h2 className="text-2xl font-bold mb-3">Get your LLC + EIN + banking setup sorted in one go</h2>
                        <p className="text-blue-100 mb-6">
                            We handle LLC formation and EIN so you're ready to open Mercury or Wise with everything in order.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-5 rounded-xl font-bold"
                                onClick={() => router.push("/checkout")}
                            >
                                Get Started <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                            <a href="https://wa.me/13072180376?text=Hi%2C%20I%20want%20to%20open%20a%20US%20bank%20account%20for%20my%20international%20LLC." target="_blank" rel="noopener noreferrer">
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
