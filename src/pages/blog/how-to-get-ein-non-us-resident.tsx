import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    ArrowRight, CheckCircle2, AlertTriangle, Phone,
    FileText, Clock, ChevronDown, ChevronUp, Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { SEO } from "@/components/SEO";

const faqs = [
    {
        q: "Can I get an EIN without an SSN or ITIN?",
        a: "Yes. Non-US residents without an SSN or ITIN can still obtain an EIN by faxing Form SS-4 directly to the IRS. The IRS assigns EINs to entities, not individuals, so your personal tax ID status doesn't block you from getting one.",
    },
    {
        q: "How long does the IRS fax method take?",
        a: "The IRS typically processes faxed SS-4 applications within 4–8 weeks, though the official window is up to 45 business days. During peak filing seasons (Jan–April) it can take a little longer. Once processed, the IRS faxes your EIN confirmation letter (CP 575) back to the same fax number.",
    },
    {
        q: "Can I call the IRS to get an EIN faster?",
        a: "The IRS international phone line (267-941-1099) is technically available for non-residents, but wait times are very long and the agent must verify your identity. Many callers are disconnected or told to fax instead. The fax method is more reliable.",
    },
    {
        q: "Do I need an EIN to open a Mercury or Wise account?",
        a: "Yes. Mercury requires an EIN and your LLC formation documents. Wise Business and Payoneer also strongly prefer an EIN for US account features. Without an EIN, your US banking options are very limited.",
    },
    {
        q: "Can I use my EIN for Amazon FBA?",
        a: "Absolutely. Amazon requires an EIN for US seller accounts when you register as a business entity. You'll enter it during the tax interview in Seller Central. It's also required for Walmart Marketplace.",
    },
    {
        q: "What is the difference between an EIN and an ITIN?",
        a: "An EIN (Employer Identification Number) identifies a business entity — your LLC or corporation. An ITIN (Individual Taxpayer Identification Number) identifies an individual who can't get an SSN. You might eventually need both: the EIN for your LLC and an ITIN for your personal US tax return.",
    },
    {
        q: "My SS-4 was rejected. What went wrong?",
        a: "The most common reasons for SS-4 rejection are: mismatched name between the form and state LLC records, wrong entity type checked, responsible party listed as the LLC itself instead of a real person, or a missing or incorrect address. We review your SS-4 before filing to catch these issues.",
    },
    {
        q: "Do I need a US address to get an EIN?",
        a: "You need a mailing address for IRS correspondence, but it doesn't have to be a US address. Many non-residents use their registered agent's address or their own foreign address on line 4a/4b. We guide you on exactly how to fill this in.",
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

export default function EINGuide() {
    const router = useRouter();

    return (
        <>
            <SEO
                title="How to Get an EIN as a Non-US Resident: Complete 2026 Guide | ecomifyUSA"
                description="Step-by-step guide to getting a US EIN (Employer Identification Number) as a non-US resident using the IRS fax method. Covers Form SS-4 instructions, timeline, and common mistakes."
                url="https://ecomifyusa.com/blog/how-to-get-ein-non-us-resident"
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
                        <span className="text-slate-600">EIN for non-US residents</span>
                    </nav>

                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-700 rounded-full">EIN Guide</span>
                        <span className="text-xs text-slate-400">For international sellers · 8 min read</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        How to get an EIN as a non-US resident: Complete 2026 guide
                    </h1>
                    <p className="text-xl text-slate-500 mb-10 leading-relaxed">
                        An EIN is the IRS-issued tax ID number for your US LLC. Without one, you can't open a US bank account, pay taxes, or sell on Amazon as a business. Here's exactly how to get yours — even without a US address, SSN, or ITIN.
                    </p>

                    {/* Key info box */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-2xl p-6 mb-10">
                        <div className="flex items-start gap-3">
                            <Clock className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="font-bold text-blue-900 mb-1">Quick facts</div>
                                <ul className="text-blue-800 text-sm space-y-1">
                                    <li>• Method for non-residents: IRS fax (Form SS-4)</li>
                                    <li>• Typical processing time: 15–30 business days</li>
                                    <li>• Cost: Free (IRS does not charge for EINs)</li>
                                    <li>• SSN or ITIN required: No</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Section 1 */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">What is an EIN?</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        An <strong>Employer Identification Number (EIN)</strong> — also called a Federal Tax Identification Number — is a nine-digit number the IRS assigns to US business entities. The format is XX-XXXXXXX. Think of it as a Social Security Number for your LLC.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-8">
                        Despite the word "employer," you don't need to have employees to get or use an EIN. Single-member LLCs with no employees use EINs routinely for banking, tax filing, and marketplace seller accounts.
                    </p>

                    {/* Section 2 */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Why you need an EIN as a non-US resident</h2>
                    <div className="space-y-3 mb-8">
                        {[
                            { title: "US bank account", desc: "Mercury, Relay, and most US business banks require an EIN to open an account for your LLC." },
                            { title: "Amazon & Walmart seller accounts", desc: "Both marketplaces require an EIN during the tax interview when registering a business entity." },
                            { title: "Payment processors", desc: "Stripe, PayPal Business, and Square require an EIN to verify your business identity." },
                            { title: "IRS tax filings", desc: "Your LLC must file Form 5472 and Form 1120 (for single-member foreign-owned LLCs) using the EIN." },
                            { title: "Contracts and invoices", desc: "US clients may require your EIN on W-9 forms for contractor payments over $600/year." },
                            { title: "Sales tax permits", desc: "States require an EIN when you apply for a sales tax permit or reseller certificate." },
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

                    {/* Section 3 */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">The IRS fax method: step by step</h2>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        US residents can apply for an EIN online in minutes via the IRS website. Non-US residents cannot use the online tool — you must use the <strong>fax method</strong>. Here's the complete process:
                    </p>
                    <div className="space-y-4 mb-8">
                        {[
                            {
                                step: "1",
                                title: "Form your LLC first",
                                desc: "You must have a registered LLC before applying for an EIN. The IRS needs your LLC's legal name and state of formation. If you haven't formed your LLC yet, start there.",
                            },
                            {
                                step: "2",
                                title: "Download Form SS-4",
                                desc: "Download the latest version of IRS Form SS-4 (Application for Employer Identification Number) from irs.gov. Do not use older versions — the IRS updates the form periodically.",
                            },
                            {
                                step: "3",
                                title: "Complete the form",
                                desc: "Fill in your LLC's legal name, address, state of formation, entity type (LLC), and responsible party details. See the section below for line-by-line instructions.",
                            },
                            {
                                step: "4",
                                title: "Fax to the IRS",
                                desc: "Fax your completed SS-4 to the IRS international fax number: +1 855-641-6935. You don't need a physical fax machine — online fax services like eFax, HelloFax, or FaxZero work fine.",
                            },
                            {
                                step: "5",
                                title: "Wait for the IRS to fax back",
                                desc: "The IRS will fax your EIN confirmation letter (CP 575) to the same number you faxed from. This typically takes 15–30 business days. Keep checking your fax inbox.",
                            },
                            {
                                step: "6",
                                title: "Save your EIN letter",
                                desc: "The CP 575 letter is your official EIN documentation. Keep a digital copy — Mercury, Amazon, and other services may ask for it. The IRS does not issue duplicates easily.",
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

                    {/* Section 4 — Form SS-4 instructions */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Form SS-4: line-by-line instructions for non-residents</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        The form has many fields, but only about half are relevant to non-resident LLC owners. Here's what to write on each key line:
                    </p>
                    <div className="overflow-x-auto mb-8">
                        <table className="w-full text-sm border border-slate-200 rounded-2xl overflow-hidden">
                            <thead className="bg-slate-900 text-white">
                                <tr>
                                    <th className="text-left p-4 w-24">Line</th>
                                    <th className="text-left p-4">What to write</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { line: "1", val: "Your LLC's exact legal name as it appears on your state formation certificate (e.g., 'Acme Trading LLC')" },
                                    { line: "2", val: "Leave blank (trade name / DBA — skip if same as line 1)" },
                                    { line: "3", val: "Leave blank (executor/trustee — not applicable)" },
                                    { line: "4a", val: "Your LLC's mailing address (can be your registered agent's address or your foreign address)" },
                                    { line: "4b", val: "City, state, ZIP — use your registered agent's address if using a US address" },
                                    { line: "5a", val: "Your physical business address if different from line 4a (otherwise repeat line 4a)" },
                                    { line: "7a", val: "Your full legal name (the responsible party — a real person, not the LLC)" },
                                    { line: "7b", val: "Your foreign passport number or ITIN if you have one; write 'N/A — foreign person, no SSN/ITIN' if you don't" },
                                    { line: "8a", val: "Check 'LLC'" },
                                    { line: "8b", val: "Number of LLC members (write '1' for single-member)" },
                                    { line: "8c", val: "State where LLC is organised (e.g., Wyoming)" },
                                    { line: "9a", val: "Check 'Other' and write 'Started new business'" },
                                    { line: "10", val: "Date your LLC was formed (from your state formation documents)" },
                                    { line: "11", val: "Leave today's date or the date you want the EIN effective" },
                                    { line: "13", val: "Highest number of employees expected in next 12 months — write '0' if no US employees" },
                                    { line: "14", val: "Principal business activity — e.g., 'E-commerce retail' or 'Import/export'" },
                                    { line: "16", val: "Check 'Other' and describe: 'LLC taxed as disregarded entity / sole proprietorship'" },
                                ].map((r, i) => (
                                    <tr key={i} className={`border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                                        <td className="p-4 font-mono font-semibold text-blue-600">{r.line}</td>
                                        <td className="p-4 text-slate-600">{r.val}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Section 5 — Timeline */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">What to expect: the 15–30 day timeline</h2>
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
                        <div className="space-y-4">
                            {[
                                { day: "Day 1", event: "You fax your completed SS-4 to the IRS." },
                                { day: "Day 1–3", event: "IRS fax system acknowledges receipt (some online fax services show delivery confirmation)." },
                                { day: "Day 15–30", event: "IRS processes your application. This is the longest step — the IRS international unit handles these manually." },
                                { day: "Day 15–45", event: "IRS faxes your CP 575 EIN confirmation letter to your fax number. You can now use the EIN immediately." },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="text-xs font-semibold text-blue-600 w-20 flex-shrink-0 pt-0.5">{item.day}</div>
                                    <p className="text-slate-600 text-sm leading-relaxed">{item.event}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                            <p className="text-amber-800 text-xs leading-relaxed">
                                <strong>Note:</strong> During peak tax season (January–April) processing can extend to 45–60 business days. If you haven't received your EIN after 60 business days, contact the IRS international line at +1 267-941-1099.
                            </p>
                        </div>
                    </div>

                    {/* Section 6 — Common mistakes */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Common mistakes that delay your EIN</h2>
                    <div className="space-y-3 mb-8">
                        {[
                            { mistake: "LLC name mismatch", fix: "The name on your SS-4 must match your state formation documents exactly — including punctuation and 'LLC' vs 'L.L.C.'." },
                            { mistake: "Wrong responsible party", fix: "Line 7a must be a real person (a human individual), not the LLC itself. The IRS rejects forms where the LLC is listed as the responsible party." },
                            { mistake: "Missing entity type", fix: "Line 8a must clearly indicate LLC. Also complete 8b (number of members) and 8c (state of organisation)." },
                            { mistake: "Faxing to the wrong number", fix: "International applicants use +1 855-641-6935. The domestic number (855-641-6935 within US) is the same, but from outside the US you need the +1 country code." },
                            { mistake: "No fax return number", fix: "The IRS faxes your EIN back to the number your fax came from. If your online fax service doesn't have an inbound number, the IRS has nowhere to send it." },
                            { mistake: "Applying before LLC is formed", fix: "You cannot get an EIN for an LLC that doesn't exist yet. Form your LLC first, then apply." },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-semibold text-slate-900 text-sm">{item.mistake}</div>
                                    <div className="text-slate-600 text-sm mt-0.5">{item.fix}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Section 7 — How we help */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">How ecomifyUSA handles your EIN application</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        Getting an EIN is technically a free, DIY process — but mistakes are common and can delay your timeline by weeks. Every error means re-faxing and restarting the clock. Our EIN service includes:
                    </p>
                    <div className="space-y-2 mb-6">
                        {[
                            "We prepare your SS-4 using your exact LLC formation documents so names match perfectly",
                            "We review every field before faxing — no rejections due to missing or wrong entity types",
                            "We fax on your behalf using a reliable online fax service with a confirmed inbound number",
                            "We track your application and follow up with the IRS if no response after 30 days",
                            "We forward your CP 575 EIN letter the moment it arrives",
                            "We guide you on next steps: opening Mercury, filing with Amazon, and more",
                        ].map((point, i) => (
                            <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                {point}
                            </div>
                        ))}
                    </div>

                    {/* WhatsApp CTA */}
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10">
                        <h3 className="font-bold text-blue-900 mb-2">Ready to get your EIN?</h3>
                        <p className="text-blue-700 text-sm leading-relaxed mb-4">
                            We handle the entire SS-4 process for you. Most clients receive their EIN in 15–25 business days. WhatsApp us to get started or ask any questions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a href="https://wa.me/13072180376?text=Hi%2C%20I%20need%20help%20getting%20an%20EIN%20for%20my%20US%20LLC%20as%20a%20non-US%20resident." target="_blank" rel="noopener noreferrer">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <Phone className="mr-2 w-4 h-4" /> Get EIN via WhatsApp
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
                            <Link href="/blog/us-bank-account-non-resident" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                <ArrowRight className="w-4 h-4" /> Open a US bank account without SSN
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
                        <h2 className="text-2xl font-bold mb-3">Get your EIN in 15–30 days — handled for you</h2>
                        <p className="text-blue-100 mb-6">
                            We prepare, review, and fax your SS-4 so you can focus on building your business.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-5 rounded-xl font-bold"
                                onClick={() => router.push("/checkout")}
                            >
                                Get Started <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                            <a href="https://wa.me/13072180376?text=Hi%2C%20I%20need%20an%20EIN%20for%20my%20US%20LLC." target="_blank" rel="noopener noreferrer">
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
