import Link from "next/link";
import { useRouter } from "next/router";
import {
    ArrowRight, MessageCircle, Shield, CheckCircle2,
    Star, Globe, Users, TrendingUp, Heart, Zap,
    FileText, DollarSign, Clock, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { SEO } from "@/components/SEO";

const WHATSAPP = "https://wa.me/13072180376?text=Hi%2C%20I%20found%20your%20About%20page%20and%20would%20like%20to%20learn%20more.";

const stats = [
    { number: "500+", label: "Clients helped", icon: "🌍" },
    { number: "50+",  label: "Countries served", icon: "🗺️" },
    { number: "5.0",  label: "Average rating", icon: "⭐" },
    { number: "24h",  label: "Avg. delivery time", icon: "⚡" },
];

const values = [
    {
        icon: <Shield className="w-6 h-6 text-blue-600" />,
        title: "Radical Transparency",
        desc: "No hidden fees, ever. The price you see is the price you pay. We explain every cost, every step, and every government fee upfront — before you commit.",
    },
    {
        icon: <MessageCircle className="w-6 h-6 text-green-600" />,
        title: "WhatsApp-First Support",
        desc: "We don't hide behind support tickets. You get our direct WhatsApp number. Real responses from the person actually handling your formation — not a chatbot.",
    },
    {
        icon: <Heart className="w-6 h-6 text-rose-500" />,
        title: "Client Success Over Revenue",
        desc: "If Wyoming isn't right for your situation, we'll tell you — even if it means less work for us. Our reputation is built on giving honest advice, not upselling.",
    },
    {
        icon: <Globe className="w-6 h-6 text-indigo-600" />,
        title: "Built for Non-Residents",
        desc: "Everything we do is optimised for international sellers. We know the EIN fax process, ITIN workarounds, Wise/Mercury setup, and multi-state tax rules by heart.",
    },
];

const differentiators = [
    {
        emoji: "🎯",
        title: "Specialist, not generalist",
        desc: "We only do US business formation and compliance for ecommerce sellers. We don't file personal taxes, handle immigration, or do general accounting. Deep focus means better results.",
    },
    {
        emoji: "🌍",
        title: "We've lived the problem",
        desc: "Our founder went through this exact process — the IRS confusion, the bank rejections, the state compliance maze — before building ecomifyUSA to solve it for others.",
    },
    {
        emoji: "🔄",
        title: "End-to-end service",
        desc: "Formation, EIN, registered agent, sales tax registration, exemption certificates, annual reports. One team handles your entire US compliance journey.",
    },
    {
        emoji: "📋",
        title: "Process-driven",
        desc: "Every formation follows a proven checklist refined across 500+ clients. Nothing is forgotten. You get the same reliable outcome whether you're from Pakistan or Brazil.",
    },
    {
        emoji: "💬",
        title: "No offshore anonymity",
        desc: "You know exactly who is handling your documents. We're a real, named business — not a faceless overseas service with no accountability.",
    },
    {
        emoji: "📚",
        title: "Education-first",
        desc: "We explain why we recommend each step so you understand your own business structure. Clients who understand their setup make better decisions for years to come.",
    },
];

const credentials = [
    {
        icon: <Award className="w-5 h-5 text-amber-500" />,
        title: "Enrolled Agent (EA) Exam — In Progress",
        desc: "Pursuing the IRS Enrolled Agent designation — the highest US tax credential awarded by the IRS to non-attorneys. EA status allows unlimited practice rights before the IRS.",
    },
    {
        icon: <Star className="w-5 h-5 text-yellow-500" />,
        title: "Fiverr Level 2 Seller",
        desc: "Earned Fiverr Level 2 status through consistent 5-star delivery, on-time completion, and high repeat-client rates across hundreds of orders.",
    },
    {
        icon: <TrendingUp className="w-5 h-5 text-green-600" />,
        title: "5.0 Rating Across Platforms",
        desc: "Maintained a perfect 5-star rating on Fiverr, Trustpilot, and Google across 500+ completed engagements since 2021.",
    },
    {
        icon: <Users className="w-5 h-5 text-blue-600" />,
        title: "50+ Countries Served",
        desc: "Clients from Pakistan, UAE, UK, India, Nigeria, China, Bangladesh, Turkey, Saudi Arabia and 40+ more countries have successfully formed their US businesses with us.",
    },
];

const services = [
    { icon: "🏢", name: "Wyoming LLC Formation", href: "/services/llc-formation-structuring" },
    { icon: "🏛️", name: "Delaware LLC Formation", href: "/services/llc-formation-structuring" },
    { icon: "📊", name: "US Sales Tax Compliance", href: "/services/us-sales-tax-compliance" },
    { icon: "🎫", name: "Tax Exemption Certificates", href: "/services/ecommerce-tax-exemptions" },
    { icon: "📄", name: "Delaware Franchise Tax", href: "/services/delaware-franchise-tax" },
    { icon: "🌐", name: "Global Ecommerce Support", href: "/services/global-ecommerce-support" },
];

const timeline = [
    { year: "2021", event: "Founded after our founder personally struggled with US LLC formation as a non-resident from Pakistan." },
    { year: "2022", event: "Reached 100 clients. Expanded from LLC formation into EIN services, sales tax, and exemption certificates." },
    { year: "2023", event: "Achieved Fiverr Level 2 status. Began serving clients from 50+ countries across 6 continents." },
    { year: "2024", event: "Crossed 500 formations. Launched ecomifyUSA.com as a dedicated platform for international ecommerce sellers." },
    { year: "2025", event: "Began pursuing IRS Enrolled Agent (EA) designation. Expanded services to Delaware franchise tax and income tax cleanup." },
];

export default function AboutPage() {
    const router = useRouter();

    return (
        <>
            <SEO
                title="About ecomifyUSA — US LLC Formation Specialists for International Sellers"
                description="Learn about ecomifyUSA — founded by a Pakistani entrepreneur who experienced the complexity of US business setup firsthand. 500+ clients, 50+ countries, 5-star rated."
            />
            <div className="min-h-screen bg-slate-50 font-sans">

                {/* Nav */}
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                        <Logo />
                        <nav className="hidden md:flex items-center gap-8">
                            <Link href="/pricing" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Pricing</Link>
                            <Link href="/which-state" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Which State?</Link>
                            <Link href="/blog" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Blog</Link>
                            <Link href="/about" className="text-blue-600 font-medium">About</Link>
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

                {/* ── Hero ── */}
                <section className="py-20 px-4 bg-white border-b border-slate-100">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-6">
                            🇵🇰 Founded by an international entrepreneur, for international entrepreneurs
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5 tracking-tight leading-tight">
                            About <span className="text-blue-600">ecomifyUSA</span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            We make US LLC formation simple, affordable, and reliable for international ecommerce sellers — because we've been through it ourselves.
                        </p>
                    </div>
                </section>

                {/* ── Stats bar ── */}
                <section className="bg-blue-600 py-10 px-4">
                    <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
                        {stats.map((s, i) => (
                            <div key={i}>
                                <div className="text-3xl mb-1">{s.icon}</div>
                                <div className="text-3xl font-bold">{s.number}</div>
                                <div className="text-blue-200 text-sm mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="max-w-5xl mx-auto px-4 py-16 space-y-20">

                    {/* ── Founder story ── */}
                    <section className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Our Story</div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-5 leading-tight">
                                Born from personal frustration with US business setup
                            </h2>
                            <div className="space-y-4 text-slate-600 leading-relaxed">
                                <p>
                                    ecomifyUSA was founded by a Pakistani entrepreneur who tried to set up a US LLC to sell on Amazon FBA — and hit wall after wall. The IRS website was confusing. Registered agent services had hidden fees. "Wyoming is the best state" advice was everywhere, but no one explained why — or whether it was even true for his situation.
                                </p>
                                <p>
                                    After spending weeks researching, making mistakes, and learning the hard way, he finally got it right. Then someone asked for help. Then another person. By the time he'd helped 50 people, it was clear: <strong className="text-slate-800">there was a real gap in the market for a specialist who understood the non-resident experience.</strong>
                                </p>
                                <p>
                                    ecomifyUSA launched in 2021 with one mission: make the process that took weeks of research take 24 hours instead — with expert guidance at every step.
                                </p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white">
                                <div className="text-4xl mb-3">🇵🇰</div>
                                <h3 className="text-xl font-bold mb-2">Pakistani entrepreneur</h3>
                                <p className="text-blue-100 text-sm leading-relaxed">
                                    Our founder experienced the exact confusion, rejection, and complexity that our clients face — before turning that hard-won knowledge into a service that removes those barriers for everyone.
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                <div className="flex items-center gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                                    <span className="text-sm text-slate-500 ml-1">5.0 · 500+ clients</span>
                                </div>
                                <p className="text-sm text-slate-600 italic leading-relaxed">
                                    "Got my Wyoming LLC + EIN in 3 days. Best service for non-US sellers. The founder actually understands our situation as international sellers."
                                </p>
                                <p className="text-xs text-slate-400 mt-3 font-medium">— Ahmed K., Amazon FBA · Pakistan 🇵🇰</p>
                            </div>
                        </div>
                    </section>

                    {/* ── Mission ── */}
                    <section className="bg-white rounded-3xl border border-slate-200 p-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                                <Zap className="w-7 h-7 text-blue-600" />
                            </div>
                            <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Our Mission</div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-5">
                                Make US business formation accessible to every international seller
                            </h2>
                            <p className="text-slate-500 leading-relaxed text-lg">
                                The US market is the world's largest ecommerce opportunity. But the legal, tax, and compliance complexity around forming a US entity has locked out millions of talented international entrepreneurs. We exist to remove that barrier — one formation at a time.
                            </p>
                        </div>
                    </section>

                    {/* ── Why we started ── */}
                    <section>
                        <div className="text-center mb-10">
                            <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Why We Started</div>
                            <h2 className="text-3xl font-bold text-slate-900">The problem we set out to solve</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    emoji: "😤",
                                    title: "Generic advice that ignores non-residents",
                                    desc: "Most online guides assume you're a US citizen with an SSN. Non-residents face completely different EIN processes, bank options, and tax obligations — and most guides just don't cover it.",
                                },
                                {
                                    emoji: "💸",
                                    title: "Hidden fees from formation mills",
                                    desc: "Large formation services quote $49 then bill $200+ in add-ons. Registered agent fees, state fees, processing fees — all buried in the fine print. We price transparently.",
                                },
                                {
                                    emoji: "🤷",
                                    title: "No one to actually ask",
                                    desc: "International sellers had nowhere to get a straight answer. Forums gave conflicting advice. Accountants charged $300/hr for basic questions. We fill that gap with direct WhatsApp support.",
                                },
                            ].map((item, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6">
                                    <div className="text-3xl mb-3">{item.emoji}</div>
                                    <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── What makes us different ── */}
                    <section>
                        <div className="text-center mb-10">
                            <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">What Makes Us Different</div>
                            <h2 className="text-3xl font-bold text-slate-900">Specialist in non-resident formation — not a generic service</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {differentiators.map((d, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-md transition-all">
                                    <div className="text-2xl mb-3">{d.emoji}</div>
                                    <h3 className="font-bold text-slate-800 mb-2">{d.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">{d.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── Values ── */}
                    <section>
                        <div className="text-center mb-10">
                            <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Our Values</div>
                            <h2 className="text-3xl font-bold text-slate-900">How we work with every client</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {values.map((v, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 flex gap-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                                        {v.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 mb-1.5">{v.title}</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── Credentials ── */}
                    <section>
                        <div className="text-center mb-10">
                            <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Credentials & Recognition</div>
                            <h2 className="text-3xl font-bold text-slate-900">Why clients trust ecomifyUSA</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-5">
                            {credentials.map((c, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 flex gap-4 items-start">
                                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                                        {c.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-800 mb-1">{c.title}</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed">{c.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── Timeline ── */}
                    <section>
                        <div className="text-center mb-10">
                            <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Our Journey</div>
                            <h2 className="text-3xl font-bold text-slate-900">From one formation to 500+</h2>
                        </div>
                        <div className="relative">
                            <div className="absolute left-16 top-0 bottom-0 w-px bg-slate-200 hidden md:block" />
                            <div className="space-y-6">
                                {timeline.map((t, i) => (
                                    <div key={i} className="flex gap-6 items-start">
                                        <div className="w-12 shrink-0 text-right">
                                            <span className="text-sm font-bold text-blue-600">{t.year}</span>
                                        </div>
                                        <div className="hidden md:flex w-8 shrink-0 items-center justify-center pt-0.5">
                                            <div className="w-3 h-3 bg-blue-600 rounded-full ring-4 ring-blue-100 relative z-10" />
                                        </div>
                                        <div className="bg-white rounded-xl border border-slate-200 p-4 flex-1">
                                            <p className="text-sm text-slate-600 leading-relaxed">{t.event}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ── Services overview ── */}
                    <section>
                        <div className="text-center mb-10">
                            <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">What We Do</div>
                            <h2 className="text-3xl font-bold text-slate-900">Services for international ecommerce sellers</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {services.map((svc, i) => (
                                <Link key={i} href={svc.href}>
                                    <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-300 hover:shadow-md transition-all flex items-center gap-3 group">
                                        <span className="text-2xl">{svc.icon}</span>
                                        <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors leading-snug">{svc.name}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="text-center mt-6">
                            <Link href="/services">
                                <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                                    View all services <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            </Link>
                        </div>
                    </section>

                    {/* ── CTA ── */}
                    <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 text-white text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-3">Ready to start your US business?</h2>
                            <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg">
                                Join 500+ international entrepreneurs who trusted ecomifyUSA to handle their US LLC formation and compliance.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    size="lg"
                                    className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-5 rounded-xl font-bold"
                                    onClick={() => router.push("/checkout")}
                                >
                                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-5 rounded-xl">
                                        <MessageCircle className="mr-2 w-4 h-4" /> WhatsApp Us
                                    </Button>
                                </a>
                            </div>
                            <p className="mt-6 text-blue-200 text-sm">
                                Questions first? WhatsApp us — we reply within hours.
                            </p>
                        </div>
                    </section>

                </div>

                <Footer />
            </div>
        </>
    );
}
