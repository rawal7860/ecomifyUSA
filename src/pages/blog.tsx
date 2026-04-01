import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { SEO } from "@/components/SEO";

const posts = [
    {
        slug: "/blog/foreign-llc-mistake",
        title: "The Foreign LLC mistake that costs US residents hundreds every year",
        excerpt: "Forming your LLC in Wyoming or Delaware while living in another state is one of the most expensive mistakes US ecommerce sellers make. Here's exactly what happens, with real cost calculations, and how to avoid it.",
        category: "LLC Formation",
        categoryColor: "bg-blue-100 text-blue-700",
        readTime: "5 min read",
        audience: "🇺🇸 US Residents",
        featured: true,
    },
    {
        slug: "/which-state",
        title: "Which US state should you form your LLC in? Complete 2026 guide",
        excerpt: "Wyoming, New Mexico, Missouri or Arizona? We compare the best states for international e-commerce sellers — and expose why Delaware, California, and New York are traps that cost you thousands.",
        category: "State Comparison",
        categoryColor: "bg-green-100 text-green-700",
        readTime: "8 min read",
        audience: "🌍 International Sellers",
        featured: true,
    },
    {
        slug: "/us-residents",
        title: "US citizens starting ecommerce: Your massive advantages over international sellers",
        excerpt: "EIN in 1 hour, real bank accounts at Chase and BofA, no registered agent needed. Here's the complete guide for US citizens launching an Amazon, Walmart, or Shopify business.",
        category: "US Sellers",
        categoryColor: "bg-purple-100 text-purple-700",
        readTime: "6 min read",
        audience: "🇺🇸 US Residents",
        featured: false,
    },
    {
        slug: "/services/us-sales-tax-compliance",
        title: "US sales tax for ecommerce sellers: What you actually need to know",
        excerpt: "Economic nexus, thresholds, multi-state filing — sales tax is the compliance area that trips up most international Amazon and Walmart sellers. Here's a plain-English breakdown.",
        category: "Sales Tax",
        categoryColor: "bg-amber-100 text-amber-700",
        readTime: "6 min read",
        audience: "🌍 All Sellers",
        featured: false,
    },
    {
        slug: "/services/llc-formation-structuring",
        title: "How to get an EIN as a non-US resident: Complete IRS guide",
        excerpt: "No SSN, no ITIN, no problem. Here's the exact process for foreign LLC owners to obtain an EIN from the IRS — including the fax method, Form SS-4 instructions, and typical timelines.",
        category: "EIN & Tax IDs",
        categoryColor: "bg-red-100 text-red-700",
        readTime: "5 min read",
        audience: "🌍 International Sellers",
        featured: false,
    },
    {
        slug: "/services/ecommerce-tax-exemptions",
        title: "How to get tax exemption certificates for Amazon, Walmart and Home Depot",
        excerpt: "Resale certificates let you buy inventory tax-free. Most states accept ITIN — you don't need an SSN. We've secured exemptions in 44+ states for international sellers.",
        category: "Tax Exemptions",
        categoryColor: "bg-teal-100 text-teal-700",
        readTime: "4 min read",
        audience: "🌍 All Sellers",
        featured: false,
    },
    {
        slug: "/blog/how-to-get-ein-non-us-resident",
        title: "How to get an EIN as a non-US resident: Complete 2026 guide",
        excerpt: "No SSN, no ITIN, no problem. Step-by-step IRS fax method, Form SS-4 line-by-line instructions, 15–30 day timeline, and the most common mistakes that delay your application.",
        category: "EIN & Tax IDs",
        categoryColor: "bg-red-100 text-red-700",
        readTime: "6 min read",
        audience: "🌍 International Sellers",
        featured: false,
    },
    {
        slug: "/blog/us-bank-account-non-resident",
        title: "How to open a US bank account without SSN: Mercury, Wise and Payoneer guide",
        excerpt: "A full comparison of Mercury, Wise Business, and Payoneer for international LLC owners — requirements, approval tips, and which option works best for Amazon disbursements.",
        category: "Banking",
        categoryColor: "bg-sky-100 text-sky-700",
        readTime: "5 min read",
        audience: "🌍 International Sellers",
        featured: false,
    },
    {
        slug: "/blog/amazon-fba-llc-guide",
        title: "Amazon FBA LLC guide for international sellers: Wyoming vs Delaware",
        excerpt: "Why FBA sellers need an LLC, Wyoming vs Delaware cost comparison, how sales tax nexus works for FBA inventory, resale certificates, and a step-by-step roadmap from LLC to first sale.",
        category: "LLC Formation",
        categoryColor: "bg-blue-100 text-blue-700",
        readTime: "7 min read",
        audience: "🌍 International Sellers",
        featured: false,
    },
];

const categories = ["All", "LLC Formation", "State Comparison", "Sales Tax", "EIN & Tax IDs", "Tax Exemptions", "Banking", "US Sellers"];

export default function BlogIndexPage() {
    const router = useRouter();
    const [active, setActive] = React.useState("All");

    const filtered = active === "All" ? posts : posts.filter(p => p.category === active);
    const featured = posts.filter(p => p.featured);
    const rest = filtered.filter(p => !p.featured);

    return (
        <>
            <SEO
                title="Blog & Guides — ecomifyUSA | US LLC Formation for International Sellers"
                description="Expert guides on US LLC formation, state comparison, sales tax compliance, and EIN for non-residents. Written by ecomifyUSA — specialists in international e-commerce business setup."
            />
            <div className="min-h-screen bg-slate-50 font-sans">
                {/* Nav */}
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                        <Logo />
                        <nav className="hidden md:flex items-center gap-8">
                            <Link href="/pricing" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Pricing</Link>
                            <Link href="/which-state" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Which State?</Link>
                            <Link href="/blog" className="text-blue-600 font-medium">Blog</Link>
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
                <section className="py-16 px-4 bg-white border-b border-slate-100">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-6">
                            📚 Free guides & resources
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                            Blog & Guides
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                            Expert knowledge on US LLC formation, sales tax, and ecommerce compliance — written from 500+ real client formations.
                        </p>
                    </div>
                </section>

                <div className="max-w-5xl mx-auto px-4 py-12">

                    {/* Featured posts */}
                    <div className="mb-12">
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">Featured guides</div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {featured.map((post, i) => (
                                <Link href={post.slug} key={i}>
                                    <div className="bg-white rounded-3xl border-2 border-blue-200 p-7 hover:shadow-xl hover:border-blue-400 transition-all duration-300 h-full flex flex-col group">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${post.categoryColor}`}>{post.category}</span>
                                            <span className="text-xs text-slate-400">{post.audience}</span>
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">{post.title}</h2>
                                        <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">{post.excerpt}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-1 text-xs text-slate-400">
                                                <Clock className="w-3.5 h-3.5" /> {post.readTime}
                                            </span>
                                            <span className="flex items-center gap-1 text-sm text-blue-600 font-semibold group-hover:gap-2 transition-all">
                                                Read guide <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Category filter */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {categories.map((cat, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${active === cat ? "bg-blue-600 text-white shadow-md" : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* All posts grid */}
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">All guides</div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
                        {filtered.map((post, i) => (
                            <Link href={post.slug} key={i}>
                                <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 h-full flex flex-col group">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${post.categoryColor}`}>{post.category}</span>
                                    </div>
                                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">{post.title}</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed flex-1 mb-3">{post.excerpt}</p>
                                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                                        <span className="text-xs text-slate-400">{post.audience} · {post.readTime}</span>
                                        <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white text-center">
                        <h2 className="text-2xl font-bold mb-3">Have a specific question?</h2>
                        <p className="text-blue-100 mb-6 max-w-xl mx-auto">Can't find what you're looking for? WhatsApp us directly — we respond within a few hours.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-5 rounded-xl font-bold" onClick={() => router.push("/checkout")}>
                                Get Started <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                            <a href="https://wa.me/13072180376?text=Hi%2C%20I%20have%20a%20question%20about%20US%20LLC%20formation." target="_blank" rel="noopener noreferrer">
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-5 rounded-xl">
                                    💬 WhatsApp Us
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
