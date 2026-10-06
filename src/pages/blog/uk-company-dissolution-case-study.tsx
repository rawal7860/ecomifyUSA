import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { SEO } from "@/components/SEO";

const approachSteps = [
    "Reviewed both companies' financial records and identified outstanding corporation tax obligations",
    "Filed corporation tax returns for both entities with HMRC ensuring all liabilities were settled",
    "Confirmed HMRC had no objections or outstanding claims against either company",
    "Filed voluntary strike-off applications with Companies House for both entities",
    "Monitored the mandatory 2-month public notice period — during which creditors can intervene — until clean dissolution was confirmed",
];

const results = [
    { label: "Companies dissolved", value: "2" },
    { label: "HMRC objections", value: "Zero" },
    { label: "Creditor interventions", value: "None" },
    { label: "Outstanding liabilities", value: "Cleared" },
    { label: "Client status", value: "Fully compliant and free" },
];

const keyInsights = [
    "Corporation tax must be filed and settled before dissolution — HMRC actively monitors strike-off notices",
    "Companies House requires a 2-month public notice period specifically so creditors can intervene",
    "A clean dissolution with no HMRC objection confirms there are no active flags against the company",
    "International business owners often overlook UK dissolution requirements, leaving dormant companies on record unnecessarily",
];

const takeaways = [
    "Do not abandon a UK company — dormant companies still have filing obligations",
    "Voluntary strike-off is the clean legal route to closure",
    "HMRC clearance before dissolution protects against future liability claims",
    "Professional handling ensures no steps are missed",
];

export default function UKCompanyDissolutionCaseStudyPage() {
    const router = useRouter();

    return (
        <>
            <SEO
                title="How We Dissolved Two UK Limited Companies with Zero HMRC Complications | ecomifyUSA Blog"
                description="A step-by-step account of how ecomifyUSA handled corporation tax filing, HMRC clearance, and clean Companies House dissolution for two UK limited companies — with zero complications."
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
                    {/* Hero */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-xs font-semibold px-3 py-1 bg-purple-100 text-purple-700 rounded-full">Case Study</span>
                        <span className="text-xs text-slate-400">October 2026 · UK Business Owners · 4 min read</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        How We Dissolved Two UK Limited Companies with Zero HMRC Complications
                    </h1>
                    <p className="text-xl text-slate-500 mb-10 leading-relaxed">
                        A step-by-step account of how ecomifyUSA handled corporation tax filing, HMRC clearance, and clean Companies House dissolution for two UK limited companies — with zero complications.
                    </p>

                    {/* The challenge */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">The Challenge</h2>
                    <p className="text-slate-600 leading-relaxed mb-8">
                        Our client owned two UK limited companies that needed to be legally closed. The process required filing corporation tax returns, obtaining HMRC clearance, and navigating the Companies House voluntary strike-off process correctly. Any missed filing or outstanding liability could block dissolution and leave the client exposed to ongoing compliance obligations and penalties.
                    </p>

                    {/* Our approach */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Approach</h2>
                    <div className="space-y-3 mb-10">
                        {approachSteps.map((step, index) => (
                            <div key={step} className="flex gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center flex-shrink-0">{index + 1}</span>
                                <p className="text-slate-700 text-sm leading-relaxed">{step}</p>
                            </div>
                        ))}
                    </div>

                    {/* Results */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">The Results</h2>
                    <div className="grid sm:grid-cols-2 gap-4 mb-10">
                        {results.map((result) => (
                            <div key={result.label} className="rounded-2xl border border-purple-200 bg-purple-50 p-5">
                                <div className="text-sm text-purple-700 mb-1">{result.label}</div>
                                <div className="text-xl font-bold text-slate-900">{result.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Key insights */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Insights</h2>
                    <div className="space-y-3 mb-10">
                        {keyInsights.map((insight) => (
                            <div key={insight} className="flex items-start gap-3 text-slate-600 leading-relaxed">
                                <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                                <p>{insight}</p>
                            </div>
                        ))}
                    </div>

                    {/* Key takeaways */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Takeaways for UK Business Owners</h2>
                    <div className="space-y-3 mb-10">
                        {takeaways.map((takeaway) => (
                            <div key={takeaway} className="flex items-start gap-3 rounded-xl bg-green-50 border border-green-200 p-4">
                                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-slate-700 leading-relaxed">{takeaway}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                        <h2 className="text-xl font-bold text-purple-900 mb-2">Need to close your UK company cleanly?</h2>
                        <p className="text-purple-800 text-sm leading-relaxed mb-4">
                            Contact ecomifyUSA on WhatsApp or visit our checkout page.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a href="https://wa.me/13072180376?text=Hi%2C%20I%20need%20help%20closing%20my%20UK%20company." target="_blank" rel="noopener noreferrer">
                                <Button className="bg-purple-700 hover:bg-purple-800 text-white">
                                    <Phone className="mr-2 w-4 h-4" /> Contact us on WhatsApp
                                </Button>
                            </a>
                            <Button variant="outline" className="border-purple-300 text-purple-800 hover:bg-purple-100" onClick={() => router.push("/checkout")}>
                                Visit checkout <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </article>

                <Footer />
            </div>
        </>
    );
}
