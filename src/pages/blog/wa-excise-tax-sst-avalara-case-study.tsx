import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowRight, AlertTriangle, CheckCircle2, XCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { SEO } from "@/components/SEO";

export default function WAExciseTaxCaseStudyPage() {
    const router = useRouter();

    return (
        <>
            <SEO
                title="How We Fixed a Washington State Excise Tax Crisis for an Amazon FBA Seller (And Why Avalara Missed It) | ecomifyUSA Blog"
                description="A foreign-owned US LLC selling on Amazon FBA owed Washington B&O tax and retail sales tax — but Avalara never flagged it. We assessed the liability, filed correctly, and resolved the issue. Here's exactly what happened."
            />
            <div className="min-h-screen bg-white font-sans">
                {/* Nav */}
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                        <Logo />
                        <nav className="hidden md:flex items-center gap-8">
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

                {/* Article */}
                <article className="max-w-3xl mx-auto px-4 py-16">

                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-xs font-semibold px-3 py-1 bg-purple-100 text-purple-700 rounded-full">Case Study</span>
                        <span className="text-xs text-slate-400">Amazon FBA · 6 min read</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        How We Fixed a Washington State Excise Tax Crisis for an Amazon FBA Seller (And Why Avalara Missed It)
                    </h1>
                    <p className="text-xl text-slate-500 mb-10 leading-relaxed">
                        A foreign-owned US LLC was selling on Amazon FBA, using Avalara for sales tax, and thought compliance was covered. It wasn't. Washington's Business & Occupation tax had been missed entirely — and the state was about to come knocking.
                    </p>

                    {/* Key warning box */}
                    <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl p-6 mb-10">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="font-bold text-amber-900 mb-1">The core problem</div>
                                <p className="text-amber-800 text-sm leading-relaxed">
                                    Washington State has <strong>two separate tax obligations</strong> — retail sales tax and B&O (Business &amp; Occupation) excise tax. Avalara's Streamlined Sales Tax (SST) program handles sales tax automatically. But <strong>B&O tax is filed separately</strong>, directly with the Washington Department of Revenue, and Avalara does not file it for you.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 1 — Introduction */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        Our client was a foreign national — a non-US resident — who had formed a Wyoming LLC to sell on Amazon FBA. Like thousands of international sellers, they had signed up for Avalara to handle US sales tax compliance. The setup appeared solid: 25+ states covered, remittances automated, no manual filings needed.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        Then the Washington Department of Revenue (DOR) sent an "Immediate Action Required" notice. Three months of returns were outstanding. Penalties were accruing. Collections proceedings were threatened.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-8">
                        The client was blindsided. Avalara was supposed to handle this. What went wrong?
                    </p>

                    {/* Section 2 — What Is Washington Excise Tax */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">What Is Washington Excise Tax (B&O + Sales Tax)?</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        Washington State is one of a handful of US states without a personal income tax — instead, it funds state government largely through the <strong>Business &amp; Occupation (B&O) tax</strong>, a gross receipts tax applied to virtually every business that has nexus in the state.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        Washington also levies <strong>retail sales tax</strong> on taxable sales to Washington customers — the standard consumption tax most sellers are familiar with.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        Both are filed together on the <strong>Washington Combined Excise Tax Return</strong>, submitted monthly through the My DOR portal. Here's how the two components work:
                    </p>

                    <div className="overflow-x-auto mb-8">
                        <table className="w-full text-sm border border-slate-200 rounded-2xl overflow-hidden">
                            <thead className="bg-slate-900 text-white">
                                <tr>
                                    <th className="text-left p-4">Tax type</th>
                                    <th className="text-center p-4">Rate</th>
                                    <th className="text-center p-4">What triggers it</th>
                                    <th className="text-center p-4">Who files?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { type: "B&O – Retailing", rate: "0.471%", trigger: "Gross receipts from WA sales", who: "You, via My DOR" },
                                    { type: "Retail Sales Tax", rate: "~10.1% (varies by city)", trigger: "Taxable sales to WA customers", who: "Avalara SST (if enrolled)" },
                                ].map((r, i) => (
                                    <tr key={i} className={`border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                                        <td className="p-4 font-semibold text-slate-900">{r.type}</td>
                                        <td className="p-4 text-center text-slate-600">{r.rate}</td>
                                        <td className="p-4 text-center text-slate-600">{r.trigger}</td>
                                        <td className="p-4 text-center text-slate-600">{r.who}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <p className="text-slate-600 leading-relaxed mb-8">
                        The critical point: both taxes are reported on the same return. Avalara handles the sales tax remittance through the SST program, but <strong>the B&O portion must be reported separately by the business itself</strong>. Avalara does not do this automatically.
                    </p>

                    {/* Section 3 — How the Problem Arose */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">How the Problem Arose</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        When our client enrolled in Avalara SST, they were given a dashboard showing multi-state sales tax remittances. Washington appeared on the list. Green checkmarks. Everything looked fine.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        What the dashboard didn't make obvious was that Avalara's SST enrollment only covered <em>retail sales tax</em>. The B&O portion of the Washington Combined Excise Return was left entirely unfiled. For months.
                    </p>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
                        <p className="text-slate-700 leading-relaxed mb-3">
                            <strong>The timeline:</strong> The client started selling in Washington through Amazon FBA in early 2026. Amazon has FBA fulfillment centers in Washington, which creates physical nexus — and a clear B&O tax obligation from the first sale.
                        </p>
                        <p className="text-slate-700 leading-relaxed mb-3">
                            January, February, and March 2026 returns were never filed. By April, the Washington DOR had flagged the account and issued an enforcement notice. At this point, penalties were already accruing at 5% of unpaid tax per month, plus interest.
                        </p>
                        <p className="text-slate-700 leading-relaxed font-semibold">
                            The client contacted us after receiving the DOR notice — convinced they had done everything right because Avalara showed Washington as "covered."
                        </p>
                    </div>

                    {/* Section 4 — What We Did */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">What We Did</h2>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        We assessed the situation, quantified the liability, filed all outstanding returns, and set up a clean ongoing compliance process. Here's the step-by-step:
                    </p>
                    <ol className="space-y-4 mb-8">
                        {[
                            {
                                step: "1",
                                title: "Diagnosed the root cause",
                                body: "Confirmed that Avalara SST remits retail sales tax only — not Washington B&O. The client's My DOR account showed three unfiled periods with enforcement pending.",
                            },
                            {
                                step: "2",
                                title: "Pulled and cleaned transaction data",
                                body: "Exported Avalara CSV transaction reports for January, February, and March 2026. Filtered to Washington state only. Excluded cancelled transactions — only Locked and Committed transactions count toward gross receipts.",
                            },
                            {
                                step: "3",
                                title: "Calculated B&O liability",
                                body: "Applied the Retailing B&O rate of 0.471% to gross Washington sales for each period. Verified figures against the client's Amazon sales reports for cross-reference.",
                            },
                            {
                                step: "4",
                                title: "Filed all three outstanding returns via My DOR",
                                body: "Logged in with SAW credentials, filed Combined Excise Tax Returns for January, February, and March 2026 under the B&O Retailing classification.",
                            },
                            {
                                step: "5",
                                title: "Applied the SER deduction to avoid double-payment",
                                body: "Used the \"Retail Sales Tax Reported on SER\" deduction within the return to ensure the client was not charged for sales tax already remitted by Avalara. This is critical — without it, you pay the same tax twice.",
                            },
                            {
                                step: "6",
                                title: "Leveraged the Small Business Credit",
                                body: "Washington automatically applies a Small Business B&O Tax Credit to businesses with qualifying gross income. After applying the credit, total B&O liability across all three periods came to $0.00.",
                            },
                            {
                                step: "7",
                                title: "Set up ongoing monthly compliance",
                                body: "Obtained accountant access to the client's Avalara portal. Established a monthly workflow to pull transaction data and file the Washington Combined Excise Return within the first 10 days of each month.",
                            },
                        ].map((item) => (
                            <li key={item.step} className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">{item.step}</span>
                                <div>
                                    <strong className="text-slate-900">{item.title}:</strong>{" "}
                                    <span className="text-slate-600">{item.body}</span>
                                </div>
                            </li>
                        ))}
                    </ol>

                    {/* Results */}
                    <div className="overflow-x-auto mb-10">
                        <table className="w-full text-sm border border-slate-200 rounded-2xl overflow-hidden">
                            <thead className="bg-slate-900 text-white">
                                <tr>
                                    <th className="text-left p-4">Outcome</th>
                                    <th className="text-center p-4">Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { outcome: "Periods resolved", result: "3 months (Jan–Mar 2026)" },
                                    { outcome: "Total B&O tax due", result: "$0.00 (Small Business Credit)" },
                                    { outcome: "Double-payment of sales tax", result: "Avoided (SER deduction)" },
                                    { outcome: "Collections / enforcement", result: "Closed" },
                                    { outcome: "Ongoing monthly compliance", result: "Set up" },
                                ].map((r, i) => (
                                    <tr key={i} className={`border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                                        <td className="p-4 text-slate-600">{r.outcome}</td>
                                        <td className="p-4 text-center font-semibold text-green-600">{r.result}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Section 5 — Why Avalara Missed It */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Avalara Missed It</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        Avalara is an excellent tool — for the specific thing it does. The SST (Streamlined Sales Tax) program automates <em>retail sales tax</em> collection and remittance across participating states. That's genuinely valuable and complex work.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        But Avalara is not a full-service tax compliance platform. It does not:
                    </p>
                    <div className="space-y-3 mb-6">
                        {[
                            "File Washington B&O tax (a gross receipts tax separate from sales tax)",
                            "Flag when your state has a non-sales-tax obligation triggered by your nexus",
                            "Submit the Washington Combined Excise Tax Return on your behalf",
                            "Warn you that SST enrollment alone is insufficient for WA compliance",
                        ].map((point, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <div className="text-slate-600 text-sm">{point}</div>
                            </div>
                        ))}
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-8">
                        Avalara's dashboard showed Washington as an active state — because sales tax <em>was</em> being collected and remitted there. The B&O gap was invisible inside the tool. Most sellers, reasonably, assume "state covered" means full compliance. It doesn't.
                    </p>

                    {/* Section 6 — Lessons for FBA Sellers */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Lessons for FBA Sellers</h2>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        If you sell on Amazon FBA and have inventory in Washington state fulfillment centers, you have physical nexus — and both obligations apply to you from your very first Washington sale.
                    </p>
                    <div className="space-y-3 mb-8">
                        {[
                            {
                                title: "Avalara SST ≠ full Washington compliance",
                                desc: "If you use Avalara SST, you still need to file the Washington Combined Excise Tax Return monthly. The B&O portion is your responsibility.",
                            },
                            {
                                title: "FBA nexus is physical nexus",
                                desc: "Amazon stores your inventory in their fulfillment centers. If any of those warehouses are in Washington, you have nexus — regardless of where your LLC is registered.",
                            },
                            {
                                title: "The Small Business Credit is real",
                                desc: "Washington offers a B&O tax credit for businesses with qualifying gross income. For many FBA sellers in the early stages, this brings total B&O liability to $0 — but you still have to file.",
                            },
                            {
                                title: "Use the SER deduction or pay twice",
                                desc: "When filing your Combined Excise Return, always apply the \"Retail Sales Tax Reported on SER\" deduction to avoid being charged for sales tax Avalara already remitted.",
                            },
                            {
                                title: "Late filing means penalties, even on $0 tax",
                                desc: "Washington assesses late filing penalties based on the number of periods missed, not just the tax owed. File on time every month — even if your liability is zero.",
                            },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-semibold text-slate-900 text-sm">{item.title}</div>
                                    <div className="text-slate-600 text-sm mt-0.5">{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA box */}
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10">
                        <h3 className="font-bold text-blue-900 mb-2">Using Avalara and selling in Washington?</h3>
                        <p className="text-blue-700 text-sm leading-relaxed mb-3">
                            If you use Avalara SST and have FBA inventory in Washington, you very likely have unfiled B&O returns. WhatsApp us — we'll review your situation and let you know what's outstanding before the DOR notices.
                        </p>
                        <a
                            href="https://wa.me/13072180376?text=Hi%2C%20I%20use%20Avalara%20and%20sell%20in%20Washington%20state.%20Can%20you%20check%20my%20B%26O%20compliance%3F"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                <Phone className="mr-2 w-4 h-4" /> Get a free compliance check
                            </Button>
                        </a>
                    </div>

                    {/* Summary */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Summary</h2>
                    <div className="space-y-2 mb-10">
                        {[
                            "Washington has two taxes: retail sales tax (Avalara covers this) and B&O excise tax (you must file this yourself)",
                            "Amazon FBA inventory in Washington creates physical nexus and triggers both obligations",
                            "Avalara SST enrollment does not satisfy the B&O filing requirement",
                            "The Washington Combined Excise Tax Return is filed monthly via My DOR",
                            "The Small Business Credit often brings B&O liability to $0 — but you must still file",
                            "We resolved 3 months of outstanding returns, eliminated the enforcement risk, and set up ongoing monthly compliance",
                        ].map((point, i) => (
                            <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                {point}
                            </div>
                        ))}
                    </div>

                    {/* Related links */}
                    <div className="border-t border-slate-200 pt-8">
                        <div className="text-sm font-semibold text-slate-500 mb-4">Related guides</div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/services/us-sales-tax-compliance" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                <ArrowRight className="w-4 h-4" /> US sales tax compliance service
                            </Link>
                            <Link href="/blog/amazon-fba-llc-guide" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                <ArrowRight className="w-4 h-4" /> Amazon FBA LLC guide for international sellers
                            </Link>
                            <Link href="/pricing" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                <ArrowRight className="w-4 h-4" /> View our pricing
                            </Link>
                        </div>
                    </div>
                </article>

                {/* CTA */}
                <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-indigo-700">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h2 className="text-2xl font-bold mb-3">Is your Washington tax compliance actually complete?</h2>
                        <p className="text-blue-100 mb-6">
                            Most FBA sellers using Avalara are missing the B&O filing. We'll diagnose your gaps, file what's outstanding, and handle monthly compliance going forward.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-5 rounded-xl font-bold"
                                onClick={() => router.push("/pricing")}
                            >
                                View Pricing <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                            <a
                                href="https://wa.me/13072180376?text=Hi%2C%20I%20need%20help%20with%20Washington%20state%20excise%20tax%20and%20Avalara%20compliance."
                                target="_blank"
                                rel="noopener noreferrer"
                            >
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
