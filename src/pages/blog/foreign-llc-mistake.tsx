import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowRight, AlertTriangle, CheckCircle2, XCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { SEO } from "@/components/SEO";

export default function ForeignLLCMistakePage() {
    const router = useRouter();

    return (
        <>
            <SEO
                title="The Foreign LLC Mistake That Costs US Residents Hundreds Every Year | ecomifyUSA Blog"
                description="Forming your LLC in Wyoming or Delaware while living in another state is one of the most expensive mistakes US ecommerce sellers make. Here's exactly what happens and how to avoid it."
            />
            <div className="min-h-screen bg-white font-sans">
                {/* Nav */}
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                        <Logo />
                        <nav className="hidden md:flex items-center gap-8">
                            <Link href="/pricing" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Pricing</Link>
                            <Link href="/which-state" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Which State?</Link>
                            <Link href="/us-residents" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">US Sellers</Link>
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
                        <span className="text-xs font-semibold px-3 py-1 bg-amber-100 text-amber-700 rounded-full">LLC Formation Guide</span>
                        <span className="text-xs text-slate-400">For US residents · 5 min read</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        The Foreign LLC mistake that costs US residents hundreds every year
                    </h1>
                    <p className="text-xl text-slate-500 mb-10 leading-relaxed">
                        You've heard Wyoming and Delaware are the "best" states for LLCs. As a US resident, forming in either of those states while living somewhere else could be one of the most expensive mistakes you make. Here's exactly why.
                    </p>

                    {/* Key warning box */}
                    <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl p-6 mb-10">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="font-bold text-amber-900 mb-1">The core mistake</div>
                                <p className="text-amber-800 text-sm leading-relaxed">
                                    If you live in Texas, California, Florida, or any other US state — and you form your LLC in Wyoming or Delaware — you will need to register that LLC as a <strong>Foreign LLC</strong> in your home state. That means two sets of fees, two registered agents, and two annual reports. Every. Single. Year.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 1 */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">What exactly is a "Foreign LLC"?</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        In US business law, the word "Foreign" doesn't mean international. It simply means "formed in a different state." A Wyoming LLC operating in Texas is a "Foreign LLC" in Texas — even though both states are in the same country.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        Every US state requires any LLC that "transacts business" within its borders to either be formed there (a Domestic LLC) or register as a Foreign LLC. Failure to register is technically illegal and can result in fines, voided contracts, and inability to use that state's courts.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-8">
                        The key phrase is "transacts business." For most ecommerce sellers who live and work from home, that means your home state — because that's where you are physically operating your business from.
                    </p>

                    {/* Section 2 — Real example */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">A real-world example</h2>
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
                        <p className="text-slate-700 leading-relaxed mb-3">
                            <strong>John lives in Florida.</strong> He's starting an Amazon FBA business and reads online that Wyoming LLCs have great privacy and low fees. He pays $100 to form a Wyoming LLC. Problem solved, right?
                        </p>
                        <p className="text-slate-700 leading-relaxed mb-3">
                            Not quite. John runs his business from his Florida home. He uses a Florida bank account, ships from Florida, manages inventory from Florida. Florida considers this "transacting business" in Florida.
                        </p>
                        <p className="text-slate-700 leading-relaxed mb-3">
                            Florida now requires John to register his Wyoming LLC as a Foreign LLC in Florida. That's an additional <strong>$125 filing fee</strong>, plus a <strong>$138.75 annual report</strong> every year in Florida, plus John still owes Wyoming's <strong>$60 annual report</strong>.
                        </p>
                        <p className="text-slate-700 leading-relaxed font-semibold">
                            John's "low cost" Wyoming LLC now costs him $100 (Wyoming formation) + $125 (Florida foreign registration) + $60/yr (Wyoming annual) + $138.75/yr (Florida annual) = $423.75 in year one, and $198.75 every year after — vs. just $125 + $138.75/yr if he had simply formed in Florida.
                        </p>
                    </div>

                    {/* Section 3 — Cost table */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">The true cost comparison</h2>
                    <p className="text-slate-600 leading-relaxed mb-6">
                        Here's what a Florida resident actually pays when forming in Wyoming vs forming in Florida — over 5 years:
                    </p>
                    <div className="overflow-x-auto mb-8">
                        <table className="w-full text-sm border border-slate-200 rounded-2xl overflow-hidden">
                            <thead className="bg-slate-900 text-white">
                                <tr>
                                    <th className="text-left p-4">Cost item</th>
                                    <th className="text-center p-4 text-amber-300">Wyoming LLC<br/>(Florida resident)</th>
                                    <th className="text-center p-4 text-green-400">Florida LLC<br/>(Florida resident)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { item: "Formation filing fee", wy: "$100", fl: "$125" },
                                    { item: "Foreign LLC registration (FL)", wy: "$125", fl: "—" },
                                    { item: "Registered agent (WY)", wy: "$60/yr", fl: "—" },
                                    { item: "Wyoming annual report", wy: "$60/yr", fl: "—" },
                                    { item: "Florida annual report", wy: "$138.75/yr", fl: "$138.75/yr" },
                                    { item: "Year 1 total", wy: "$423.75", fl: "$263.75", bold: true },
                                    { item: "Annual recurring cost", wy: "$258.75/yr", fl: "$138.75/yr", bold: true },
                                    { item: "5-year total cost", wy: "$1,458.75", fl: "$818.75", bold: true },
                                    { item: "Extra cost of \"smart\" Wyoming choice", wy: "+$640 over 5 years", fl: "—", highlight: true },
                                ].map((r, i) => (
                                    <tr key={i} className={`border-t border-slate-100 ${r.highlight ? "bg-red-50" : i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                                        <td className={`p-4 ${r.bold ? "font-semibold text-slate-900" : "text-slate-600"}`}>{r.item}</td>
                                        <td className={`p-4 text-center ${r.highlight ? "text-red-600 font-bold" : r.bold ? "font-semibold text-slate-900" : "text-slate-600"}`}>{r.wy}</td>
                                        <td className={`p-4 text-center ${r.bold ? "font-semibold text-green-600" : "text-slate-600"}`}>{r.fl}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Section 4 — When Wyoming IS right */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">When Wyoming or Delaware actually makes sense</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        Wyoming and Delaware are excellent states — but for specific situations:
                    </p>
                    <div className="space-y-3 mb-8">
                        {[
                            { title: "Non-US residents", desc: "If you live outside the US and have no physical US presence, you can form in any state. Wyoming is our top recommendation for international clients." },
                            { title: "Wyoming residents", desc: "If you actually live in Wyoming, absolutely form there. You get all the benefits with zero double-filing issues." },
                            { title: "Delaware for investors", desc: "If you're building a startup and plan to raise venture capital or angel investment, Delaware C-Corp is the right structure — investors often require it." },
                            { title: "Holding companies", desc: "If you're setting up a Wyoming LLC purely as a holding company for assets, with no operational activity, the foreign LLC rules may not apply. Consult a lawyer." },
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

                    {/* Section 5 — What to do */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">What US residents should do instead</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        The advice is simple: <strong>form your LLC in the state where you live and operate your business.</strong>
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        Don't let the "fame" of Wyoming or Delaware mislead you. For a US resident running an ecommerce business from home, your home state is almost always the right choice. You avoid double compliance, save money, and keep things simple.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-8">
                        If you've already formed in the wrong state, don't panic. You have options: dissolve the out-of-state LLC and re-form in your home state, or register as a Foreign LLC in your home state and accept the ongoing dual compliance costs. We can help you evaluate which option makes more sense for your situation.
                    </p>

                    {/* Already made the mistake */}
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10">
                        <h3 className="font-bold text-blue-900 mb-2">Already formed in the wrong state?</h3>
                        <p className="text-blue-700 text-sm leading-relaxed mb-3">
                            Don't worry — it's fixable. WhatsApp us and we'll help you figure out the most cost-effective path forward, whether that's dissolving and re-forming, or registering as a Foreign LLC in your home state.
                        </p>
                        <a href="https://wa.me/13072180376?text=Hi%2C%20I%20think%20I%20formed%20my%20LLC%20in%20the%20wrong%20state.%20Can%20you%20help%3F" target="_blank" rel="noopener noreferrer">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                <Phone className="mr-2 w-4 h-4" /> Get help on WhatsApp
                            </Button>
                        </a>
                    </div>

                    {/* Summary */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Summary</h2>
                    <div className="space-y-2 mb-10">
                        {[
                            "Foreign LLC = an LLC formed in a different state than where you operate",
                            "US residents operating from home trigger Foreign LLC requirements in their home state",
                            "This creates double fees, double annual reports, and double registered agents",
                            "Wyoming and Delaware are great — but only if you live there or are a non-US resident",
                            "US residents should form in their home state to keep things simple and affordable",
                            "If you've already made this mistake, there are solutions — reach out to us",
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
                            <Link href="/us-residents" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                <ArrowRight className="w-4 h-4" /> LLC formation for US ecommerce sellers
                            </Link>
                            <Link href="/which-state" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                                <ArrowRight className="w-4 h-4" /> Which state should I choose?
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
                        <h2 className="text-2xl font-bold mb-3">Form your LLC in the right state from day one</h2>
                        <p className="text-blue-100 mb-6">We'll tell you exactly which state to choose based on where you live — free advice, no obligation.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-5 rounded-xl font-bold" onClick={() => router.push("/pricing")}>
                                View Pricing <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                            <a href="https://wa.me/13072180376?text=Hi%2C%20I%20need%20help%20choosing%20the%20right%20state%20for%20my%20LLC." target="_blank" rel="noopener noreferrer">
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
