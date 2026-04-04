import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    Building2, Star, ArrowRight, Shield, Clock,
    DollarSign, FileText, CheckCircle2, MapPin,
    ArrowRightCircle, Zap, Globe, ChevronDown, ChevronUp,
    TrendingUp, Award, Headphones, Users, Mail, Phone,
    ShoppingCart, Truck, HelpCircle, Menu, X, AlertTriangle, Bell, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { USMap } from "@/components/USMap";
import { UKMap } from "@/components/UKMap";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { SEO } from "@/components/SEO";

// --- COMPONENT: Trust & Social Proof Section ---
function TrustBar() {
    const reviews = [
        {
            initials: "AK", name: "Ahmed K.", flag: "🇵🇰",
            location: "Amazon FBA seller, Pakistan",
            text: "Got my Wyoming LLC + EIN in 3 days. Best service for non-US sellers. Highly recommend!",
            avatarBg: "bg-blue-100", avatarText: "text-blue-700"
        },
        {
            initials: "SM", name: "Sara M.", flag: "🇦🇪",
            location: "E-commerce founder, UAE",
            text: "Handled my sales tax compliance across 12 states. Zero stress, 100% accurate filing.",
            avatarBg: "bg-green-100", avatarText: "text-green-700"
        },
        {
            initials: "RJ", name: "Raj J.", flag: "🇮🇳",
            location: "Walmart seller, India",
            text: "Got tax exemption in 44 states with just my ITIN. Saved thousands in tax. Game changer!",
            avatarBg: "bg-yellow-100", avatarText: "text-yellow-700"
        },
        {
            initials: "ML", name: "Ming L.", flag: "🇨🇳",
            location: "Amazon seller, China",
            text: "Delaware LLC formed remotely, no US travel needed. Professional and very responsive team.",
            avatarBg: "bg-purple-100", avatarText: "text-purple-700"
        },
        {
            initials: "OA", name: "Omar A.", flag: "🇸🇦",
            location: "FBA seller, Saudi Arabia",
            text: "Entire US company setup done online. Registered agent, EIN, everything. Truly professional.",
            avatarBg: "bg-red-100", avatarText: "text-red-700"
        },
    ];

    const platforms = [
        { initial: "f", name: "Fiverr", rating: "Level 2 Seller", bg: "bg-green-500" },
        { initial: "T", name: "Trustpilot", rating: "Excellent", bg: "bg-emerald-500" },
        { initial: "G", name: "Google", rating: "5.0 rating", bg: "bg-blue-500" },
    ];

    return (
        <div className="border-y border-slate-200 bg-slate-50 py-10 relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Stats Row */}
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-8">
                    {[
                        { num: "5.0", label: "Average rating", star: true },
                        { num: "500+", label: "Happy clients" },
                        { num: "50+", label: "Countries served" },
                        { num: "24h", label: "Avg. delivery" },
                    ].map((s, i) => (
                        <React.Fragment key={i}>
                            <div className="flex items-center gap-2">
                                {s.star && <span className="text-yellow-400 text-lg tracking-wide">★★★★★</span>}
                                <div>
                                    <div className="text-xl font-bold text-slate-900">{s.num}</div>
                                    <div className="text-xs text-slate-500">{s.label}</div>
                                </div>
                            </div>
                            {i < 3 && <div className="hidden md:block w-px h-8 bg-slate-200" />}
                        </React.Fragment>
                    ))}
                </div>

                {/* Platform Badges */}
                <p className="text-center text-xs text-slate-400 uppercase tracking-widest mb-3">Verified on</p>
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {platforms.map((p, i) => (
                        <div key={i} className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 bg-white">
                            <div className={`w-5 h-5 ${p.bg} rounded text-white text-xs flex items-center justify-center font-bold`}>
                                {p.initial}
                            </div>
                            <div>
                                <div className="text-xs font-semibold text-slate-800">{p.name}</div>
                                <div className="text-xs text-yellow-500">★★★★★ <span className="text-slate-400">{p.rating}</span></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Review Cards */}
                <p className="text-center text-xs text-slate-400 uppercase tracking-widest mb-3">What clients say</p>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {reviews.map((r, i) => (
                        <div key={i} className="min-w-[220px] max-w-[240px] flex-shrink-0 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-2 mb-3">
                                <div className={`w-8 h-8 rounded-full ${r.avatarBg} ${r.avatarText} flex items-center justify-center text-xs font-bold flex-shrink-0`}>
                                    {r.initials}
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-slate-800">{r.name} {r.flag}</div>
                                    <div className="text-xs text-slate-400">{r.location}</div>
                                </div>
                            </div>
                            <div className="text-yellow-400 text-xs mb-2">★★★★★</div>
                            <p className="text-xs text-slate-500 leading-relaxed">"{r.text}"</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

// --- COMPONENT: FAQ Item (Modern Card Style) ---
function FAQItem({ icon, question, answer }: { icon: string; question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                ? "border-blue-300 shadow-lg shadow-blue-100"
                : "border-slate-200 hover:border-blue-200 hover:shadow-md"
                }`}
        >
            <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-4">
                    <span className="text-2xl">{icon}</span>
                    <span className="text-lg font-semibold text-slate-900">{question}</span>
                </div>
                <div className={`w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-180 bg-blue-100" : ""}`}>
                    <ChevronDown className="w-5 h-5 text-blue-600" />
                </div>
            </button>
            <div className={`transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-6 pb-5 pt-0">
                    <div className="ml-12 pl-4 border-l-2 border-blue-200">
                        <p className="text-slate-600 leading-relaxed">{answer}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- SUB-COMPONENT: Checkout Section ---
function CheckoutSection() {
    const router = useRouter();
    return (
        <div className="py-16 text-center bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-2xl mt-12 mb-20 max-w-5xl mx-auto px-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
            <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <Zap className="w-4 h-4" /> Limited Time: Free Registered Agent
                </div>
                <h3 className="text-3xl font-bold mb-4">Ready to launch your empire?</h3>
                <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                    Join 500+ entrepreneurs who started their journey with ecomifyUSA.
                    Your LLC could be formed in as little as 24 hours.
                </p>
                <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-7 text-xl rounded-full shadow-xl transition-all hover:scale-105 font-bold"
                    onClick={() => router.push("/checkout")}
                >
                    Start Your Formation Now <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
                <div className="mt-6 flex items-center justify-center gap-6 text-sm text-blue-200 font-medium">
                    <span className="flex items-center gap-1"><Shield className="h-4 w-4" /> 100% Compliance</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Money-Back Guarantee</span>
                </div>
            </div>
        </div>
    );
}

// --- MAIN PAGE COMPONENT ---
export default function HomePage() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
                setMobileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <SEO
                title="ecomifyUSA - US & UK LLC Formation for International Entrepreneurs"
                description="Form your US LLC or UK Limited Company remotely. We handle formation, EIN, sales tax compliance, and Delaware franchise tax. 500+ satisfied clients worldwide."
            />
            <div className="min-h-screen bg-slate-50 font-sans">
                {/* Navigation */}
                <header ref={headerRef} className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                        <Logo />
                        <nav className="hidden md:flex items-center gap-8">
                            <Link href="/case-studies" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Case Studies</Link>
                            <Link href="/pricing" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Pricing</Link>
                            <Link href="/which-state" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Which State?</Link>
                            <Link href="/us-residents" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">US Sellers</Link>
                            <Link href="/blog" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Blog</Link>
                            <Link href="/services" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Services</Link>
                            <Link href="/checkout">
                                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20">Get Started</Button>
                            </Link>
                        </nav>
                        <button
                            className="md:hidden p-2 rounded-md text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                            onClick={() => setMobileOpen(prev => !prev)}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                    {/* Mobile menu */}
                    {mobileOpen && (
                        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md">
                            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
                                {[
                                    { href: "/case-studies", label: "Case Studies" },
                                    { href: "/pricing", label: "Pricing" },
                                    { href: "/which-state", label: "Which State?" },
                                    { href: "/us-residents", label: "US Sellers" },
                                    { href: "/blog", label: "Blog" },
                                    { href: "/services", label: "Services" },
                                ].map(({ href, label }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        onClick={() => setMobileOpen(false)}
                                        className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 font-medium px-3 py-3 rounded-lg transition-colors"
                                    >
                                        {label}
                                    </Link>
                                ))}
                                <div className="pt-2 border-t border-slate-100 mt-1">
                                    <Link href="/checkout" onClick={() => setMobileOpen(false)}>
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20">
                                            Get Started
                                        </Button>
                                    </Link>
                                </div>
                            </nav>
                        </div>
                    )}
                </header>

                {/* Hero Section with Globe */}
                <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1/2 h-full z-0 overflow-hidden">
                        <div
                            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-40"
                            style={{
                                backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1200px-The_Earth_seen_from_Apollo_17.jpg')",
                                maskImage: 'linear-gradient(to right, black 0%, black 30%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to right, black 0%, black 30%, transparent 100%)'
                            }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 via-blue-400/30 to-transparent mix-blend-overlay"></div>
                    </div>

                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/4"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 text-sm font-medium mb-8 hover:shadow-md transition-shadow cursor-default">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>Rated 5.0 by 500+ E-commerce Founders</span>
                            </div>
                            <h1 className="text-5xl lg:text-8xl font-bold text-slate-900 mb-8 tracking-tight leading-[1.1]">
                                Launch your global <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600">
                                    business in minutes.
                                </span>
                            </h1>
                            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                                We handle the LLC formation, tax IDs, and compliance.
                                You handle the growth. <span className="font-semibold text-slate-900">No hidden fees. Ever.</span>
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="#maps-section">
                                    <Button
                                        size="lg"
                                        className="bg-slate-900 text-white hover:bg-slate-800 px-8 py-7 text-lg rounded-xl shadow-xl shadow-slate-900/20 transition-all hover:scale-105"
                                    >
                                        Start Your Formation
                                    </Button>
                                </Link>
                                <Link href="/services">
                                    <Button size="lg" variant="outline" className="px-8 py-7 text-lg rounded-xl border-slate-200 hover:bg-white bg-white/50 backdrop-blur-sm">
                                        View Services
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Bento Grid */}
                        <div className="grid md:grid-cols-3 gap-6 auto-rows-[280px]">
                            <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                                        <Globe className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">USA & UK Coverage</h3>
                                    <p className="text-slate-500 max-w-sm">Form your company in Wyoming, Delaware, London, or anywhere in between with full tax compliance.</p>
                                    <Link href="/services">
                                        <Button className="mt-6 bg-slate-900 text-white hover:bg-slate-800">Explore States</Button>
                                    </Link>
                                </div>
                                <div className="absolute right-0 bottom-0 w-3/4 h-3/4 bg-blue-50 rounded-tl-3xl opacity-50 group-hover:scale-105 transition-transform duration-700">
                                    <div className="w-full h-full opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center"></div>
                                </div>
                            </div>

                            <div className="bg-blue-600 rounded-3xl p-8 shadow-xl shadow-blue-900/20 text-white flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300">
                                <div>
                                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                                        <Zap className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-2">24-Hour<br />Processing</h3>
                                    <p className="text-blue-100">Fast-track filing options available for urgent business needs.</p>
                                </div>
                                <div className="text-6xl font-bold opacity-10 -mb-4">01</div>
                            </div>

                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center group hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h3 className="text-4xl font-bold text-slate-900 mb-2">100%</h3>
                                <p className="text-slate-600 font-medium">Compliance Guarantee</p>
                                <p className="text-sm text-slate-400 mt-2">IRS & HMRC Approved</p>
                            </div>

                            <div className="md:col-span-2 bg-slate-900 rounded-3xl p-8 shadow-sm text-white flex items-center justify-between relative overflow-hidden group">
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-2">Transparent Pricing</h3>
                                    <p className="text-slate-400">No hidden fees. State fees included.</p>
                                    <div className="flex gap-2 mt-4">
                                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Wyoming $100</span>
                                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Delaware $90</span>
                                    </div>
                                </div>
                                <div className="text-right relative z-10">
                                    <div className="text-4xl font-bold text-green-400">$0/mo</div>
                                    <div className="text-sm text-slate-500">after formation</div>
                                </div>
                                <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500 rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trust & Social Proof Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        {/* Stats Bar */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-100 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-4xl font-bold text-slate-900 mb-1">5.0</p>
                                <p className="text-sm text-slate-600">Average rating</p>
                            </div>

                            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:shadow-lg transition-all duration-300">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <p className="text-4xl font-bold text-slate-900 mb-1">500+</p>
                                <p className="text-sm text-slate-600">Happy clients</p>
                            </div>

                            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 hover:shadow-lg transition-all duration-300">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Globe className="w-6 h-6 text-green-600" />
                                </div>
                                <p className="text-4xl font-bold text-slate-900 mb-1">50+</p>
                                <p className="text-sm text-slate-600">Countries served</p>
                            </div>

                            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 hover:shadow-lg transition-all duration-300">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Clock className="w-6 h-6 text-purple-600" />
                                </div>
                                <p className="text-4xl font-bold text-slate-900 mb-1">24h</p>
                                <p className="text-sm text-slate-600">Avg. delivery</p>
                            </div>
                        </div>

                        {/* Verified On Section */}
                        <div className="mb-16">
                            <p className="text-center text-sm font-semibold text-slate-500 tracking-widest uppercase mb-8">Verified On</p>
                            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                                {/* Fiverr Badge */}
                                <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold text-xl">F</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-slate-900 text-lg mb-1">Fiverr</p>
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <svg key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                                <span className="text-sm text-slate-600 ml-2">Level 2 Seller</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Trustpilot Badge */}
                                <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold text-xl">T</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-slate-900 text-lg mb-1">Trustpilot</p>
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <svg key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                                <span className="text-sm text-slate-600 ml-2">Excellent</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Google Badge */}
                                <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold text-xl">G</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-slate-900 text-lg mb-1">Google</p>
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <svg key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                                <span className="text-sm text-slate-600 ml-2">5.0 rating</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Testimonials Section */}
                        <div>
                            <p className="text-center text-sm font-semibold text-slate-500 tracking-widest uppercase mb-12">What Clients Say</p>
                            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                                {/* Testimonial 1 */}
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                                            AK
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">Ahmed K.</p>
                                            <p className="text-xs text-slate-500">Pakistan</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 mb-3">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed">"Got my Wyoming LLC + EIN in 3 days. Best service for non-US sellers. Highly recommend!"</p>
                                </div>

                                {/* Testimonial 2 */}
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-lg">
                                            SM
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">Sara M.</p>
                                            <p className="text-xs text-slate-500">UAE</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 mb-3">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed">"Handled my sales tax compliance across 12 states. Zero stress, 100% accurate filing."</p>
                                </div>

                                {/* Testimonial 3 */}
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold text-lg">
                                            RJ
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">Raj J.</p>
                                            <p className="text-xs text-slate-500">India</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 mb-3">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed">"Got tax exemption in 44 states with just my ITIN. Saved thousands in tax. Game changer!"</p>
                                </div>

                                {/* Testimonial 4 */}
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-lg">
                                            ML
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">Ming L.</p>
                                            <p className="text-xs text-slate-500">China</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 mb-3">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed">"Delaware LLC formed remotely, no US travel needed. Professional and very responsive team."</p>
                                </div>

                                {/* Testimonial 5 */}
                                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-lg">
                                            OA
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">Omar A.</p>
                                            <p className="text-xs text-slate-500">Saudi Arabia</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 mb-3">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed">"Entire US company setup done online. Registered agent, EIN, everything professional."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">Simple Process</div>
                            <h2 className="text-4xl font-bold text-slate-900 mb-4">From Idea to LLC in 3 Steps</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">We've simplified the bureaucracy so you don't have to deal with it.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-12 relative">
                            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 -z-10"></div>
                            {[
                                { step: "01", title: "Select Your State", desc: "Choose from 50 US states or the UK. We show you the tax benefits of each.", icon: MapPin },
                                { step: "02", title: "We File Everything", desc: "We prepare and file your Articles of Organization and obtain your EIN/Tax ID.", icon: FileText },
                                { step: "03", title: "You Get Paid", desc: "Receive your official documents and start accepting payments instantly.", icon: DollarSign },
                            ].map((item, i) => (
                                <div key={i} className="relative bg-white p-6 text-center group">
                                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-50 to-blue-100 border-4 border-white rounded-full flex items-center justify-center text-3xl font-bold text-blue-600 mb-6 group-hover:scale-110 group-hover:border-blue-200 transition-all shadow-md">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Specialized Services Section */}
                <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-slate-900 mb-2">Our Specialized Services</h2>
                            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { title: "US Sales Tax Compliance", desc: "Preparation, registration, and filing of monthly, quarterly, or yearly US sales tax returns across multiple states.", link: "/services/us-sales-tax-compliance" },
                                { title: "E-commerce Tax Exemptions", desc: "Streamlining the process to secure resale certificates for Amazon, Walmart, and Home Depot.", link: "/services/ecommerce-tax-exemptions" },
                                { title: "LLC Formation & Structuring", desc: "End-to-end US LLC formation for non-residents, including EIN acquisition and registered agent setup.", link: "/services/llc-formation-structuring" },
                                { title: "Delaware Franchise Tax", desc: "Expert, timely filing of Delaware Franchise Tax and annual reports to maintain good standing.", link: "/services/delaware-franchise-tax" },
                                { title: "Income Tax & Cleanup", desc: "Professional income tax preparation for corporations/LLCs and cleaning up prior year bookkeeping.", link: "/services/income-tax-cleanup" },
                                { title: "Global E-commerce Support", desc: "Handling HMRC filings and providing tailored document approval support for international sellers.", link: "/services/global-ecommerce-support" }
                            ].map((service, i) => (
                                <Link href={service.link} key={i}>
                                    <Card className="h-full hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 cursor-pointer border-0 bg-white group overflow-hidden">
                                        <CardContent className="p-8">
                                            <CardTitle className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{service.title}</CardTitle>
                                            <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
                                            <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                                Learn More <ArrowRight className="ml-1 w-4 h-4" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Never Miss a Deadline Section */}
                <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-2 rounded-full text-red-700 text-sm font-medium mb-6">
                                    <AlertTriangle className="w-4 h-4" />
                                    <span>$2.3M in penalties prevented annually</span>
                                </div>
                                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                                    Never Miss a <span className="text-blue-600">Deadline</span> Again
                                </h2>
                                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                    Our free client portal eliminates compliance stress. Track all your deadlines,
                                    manage documents securely, and get automated reminders before penalties kick in.
                                </p>
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        </div>
                                        <span className="text-slate-700">Automated deadline tracking across all states</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        </div>
                                        <span className="text-slate-700">Smart email & SMS reminders</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        </div>
                                        <span className="text-slate-700">Secure document storage & organization</span>
                                    </div>
                                </div>
                                <Link href="/portal">
                                    <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg rounded-xl shadow-xl shadow-blue-600/20 transition-all hover:scale-105 font-bold">
                                        Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-blue-100 border border-slate-100">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold text-slate-900">Your Compliance Dashboard</h3>
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                                            <div className="flex items-center gap-3">
                                                <Calendar className="w-5 h-5 text-green-600" />
                                                <div>
                                                    <p className="font-semibold text-slate-900">Delaware Franchise Tax</p>
                                                    <p className="text-sm text-slate-600">Due in 14 days</p>
                                                </div>
                                            </div>
                                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                                            <div className="flex items-center gap-3">
                                                <Bell className="w-5 h-5 text-yellow-600" />
                                                <div>
                                                    <p className="font-semibold text-slate-900">Wyoming Annual Report</p>
                                                    <p className="text-sm text-slate-600">Due in 30 days</p>
                                                </div>
                                            </div>
                                            <Clock className="w-5 h-5 text-yellow-600" />
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-5 h-5 text-blue-600" />
                                                <div>
                                                    <p className="font-semibold text-slate-900">Sales Tax Filing (CA)</p>
                                                    <p className="text-sm text-slate-600">Due in 7 days</p>
                                                </div>
                                            </div>
                                            <AlertTriangle className="w-5 h-5 text-orange-500" />
                                        </div>
                                    </div>
                                    <div className="mt-6 p-4 bg-slate-50 rounded-xl">
                                        <p className="text-sm text-slate-600 mb-2">Compliance Score</p>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 bg-slate-200 rounded-full h-2">
                                                <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
                                            </div>
                                            <span className="text-sm font-bold text-slate-900">98%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Shield className="w-10 h-10 text-blue-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Maps Section */}
                <section id="maps-section" className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12">
                            <div>
                                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">USA</div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-4">USA State Selection</h2>
                                <p className="text-slate-600 mb-8">Select a state to view formation fees, annual reports, and tax requirements.</p>
                                <div className="bg-white p-4 rounded-2xl shadow-xl shadow-blue-100 border border-slate-100">
                                    <USMap />
                                </div>
                            </div>
                            <div>
                                <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">UK</div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-4">United Kingdom Coverage</h2>
                                <p className="text-slate-600 mb-8">Interactive data for England, Scotland, Wales, and Northern Ireland.</p>
                                <div className="bg-white p-4 rounded-2xl shadow-xl shadow-indigo-100 border border-slate-100">
                                    <UKMap />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200 text-blue-700 text-sm font-semibold mb-4">
                                <HelpCircle className="w-4 h-4" /> FAQ
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Everything you need to know about forming your LLC with ecomifyUSA. Can't find your answer? <a href="mailto:support@ecomifyusa.com" className="text-blue-600 font-semibold hover:underline">Contact us</a>.</p>
                        </div>
                        <div className="space-y-4 mb-12">
                            <FAQItem icon="🏢" question="Do I need to be a US citizen to form an LLC?" answer="No! You do not need to be a US citizen or resident to form a US LLC. We help entrepreneurs from over 50 countries set up their businesses remotely. All you need is a valid passport and proof of address from your home country." />
                            <FAQItem icon="📋" question="Can I get sales tax exemption without an SSN?" answer="Yes! Most states accept ITIN for exemption certificates. Only a few states (DC, MD, etc.) require SSN. We've successfully gotten clients exempt in 44+ states with just an ITIN number." />
                            <FAQItem icon="⏱️" question="How long does EIN take for non-US residents?" answer="Typically 15-30 business days. The IRS requires fax submission for foreign owners (no online application available). We offer expedited processing for an additional fee if you need it faster." />
                            <FAQItem icon="🔐" question="What if I lost my state portal logins?" answer="We can recover them! We contact each state tax department, verify your identity with formation documents and ID, and regain access to all your portals. We also set up proper documentation so this doesn't happen again." />
                            <FAQItem icon="💰" question="Do you offer refunds?" answer="Yes, we offer a money-back guarantee if we cannot deliver the promised service. Official state fees are non-refundable once paid to government agencies. See our full Refund Policy for details." />
                            <FAQItem icon="🚀" question="How quickly can I start selling on Amazon/Walmart?" answer="Once you have your LLC and EIN (typically 2-4 weeks), you can immediately apply for Amazon/Walmart seller accounts. We expedite the formation process to get you selling faster. Many clients start selling within 30 days." />
                            <FAQItem icon="🌍" question="I'm outside the US. Can you still help me?" answer="Absolutely! Over 80% of our clients are international. We specialize in helping non-US residents form US companies remotely. No need to travel to the US. We handle everything online." />
                            <FAQItem icon="📧" question="Do you provide ongoing compliance support?" answer="Yes! We offer monthly compliance packages including sales tax filing, annual reports, and registered agent services. Starting at $150/month. We also provide one-time filing services if you prefer." />
                            <FAQItem icon="🏦" question="Can I open a US bank account as a non-resident?" answer="Yes! With your LLC documents and EIN, you can open accounts with Mercury, Wise, Payoneer, and other fintech banks that serve non-residents. Traditional banks may require in-person visits." />
                            <FAQItem icon="📞" question="How do I contact support?" answer="Email us at support@ecomifyusa.com or WhatsApp +1 (307) 218-0376. We respond within 24-48 hours. We also provide ongoing support for all our clients throughout their business journey." />
                        </div>
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-blue-100 border border-blue-100">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">Still have questions?</h3>
                                <p className="text-slate-600 mb-6 max-w-xl mx-auto">Our team of experts is here to help. Reach out and we'll get back to you within 24 hours.</p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a href="mailto:support@ecomifyusa.com" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all hover:scale-105">
                                        <Mail className="w-5 h-5" /> Email Us
                                    </a>
                                    <a href="https://wa.me/13072180376" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all hover:scale-105">
                                        <Phone className="w-5 h-5" /> WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <CheckoutSection />
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
