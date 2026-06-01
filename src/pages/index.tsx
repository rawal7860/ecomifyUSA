import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Star, ArrowRight, Shield, Clock,
    DollarSign, FileText, CheckCircle2, MapPin, Zap, Globe, Mail, Phone, HelpCircle, Menu, X, AlertTriangle, Bell, Calendar
} from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";

// Maps are heavy (react-simple-maps + large GeoJSON) and sit below the fold.
// Load them lazily, client-side only, so they don't block initial JS/render.
const USMap = dynamic(() => import("@/components/USMap").then((m) => m.USMap), {
    ssr: false,
    loading: () => <div style={{ minHeight: 360 }} aria-hidden="true" />,
});
const UKMap = dynamic(() => import("@/components/UKMap").then((m) => m.UKMap), {
    ssr: false,
    loading: () => <div style={{ minHeight: 360 }} aria-hidden="true" />,
});
import Logo from "@/components/Logo";
import { SEO, organizationJsonLd, faqJsonLd } from "@/components/SEO";
import FAQItem from "@/components/home/FAQItem";
import FormationReceipt from "@/components/home/FormationReceipt";
import VerificationBlock from "@/components/home/VerificationBlock";

// Mirror of the homepage FAQ items for FAQPage structured data (rich results in Google).
const HOME_FAQS = [
    { q: "Do I need to be a US citizen to form an LLC?", a: "No. You do not need to be a US citizen or resident to form a US LLC. We help entrepreneurs from over 50 countries set up remotely. All you need is a valid passport and proof of address." },
    { q: "Can I get sales tax exemption without an SSN?", a: "Yes. Most states accept ITIN for exemption certificates. We've gotten clients exempt in 44+ states with just an ITIN number." },
    { q: "How long does EIN take for non-US residents?", a: "Typically 15-30 business days. The IRS requires fax submission for foreign owners. Expedited processing is available." },
    { q: "Do you offer refunds?", a: "Yes, we offer a money-back guarantee if we cannot deliver the promised service. Official state fees are non-refundable once paid to government agencies." },
    { q: "I'm outside the US. Can you still help me?", a: "Absolutely. Over 80% of our clients are international. We specialize in helping non-US residents form US companies remotely — no travel required." },
    { q: "Do you provide ongoing compliance support?", a: "Yes. We offer monthly compliance packages including sales tax filing, annual reports, and registered agent services starting at $150/month." },
];



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
    const [, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        // passive: true lets the browser optimize scroll perf — INP improvement on mobile.
        window.addEventListener('scroll', handleScroll, { passive: true });
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

    // Hero A/B variant. Default is the dark "ink" band; set NEXT_PUBLIC_HERO_VARIANT="light"
    // (or wire this to your experimentation platform) to test the light hero.
    const heroLight = process.env.NEXT_PUBLIC_HERO_VARIANT === "light";
    const hero = heroLight
        ? {
            section: "relative overflow-hidden bg-paper border-b border-hairline pt-14 pb-20 lg:pt-20 lg:pb-24",
            badge: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-hairline text-slate-600 text-sm font-medium mb-8",
            star: "fill-gold text-gold",
            h1: "text-5xl lg:text-7xl font-bold text-ink mb-6 tracking-tight leading-[1.05]",
            accent: "text-gold",
            sub: "text-lg lg:text-xl text-slate-600 mb-5 leading-relaxed max-w-xl mx-auto lg:mx-0",
            mono: "font-mono text-sm text-slate-500 mb-9",
            secondaryBtn: "px-8 py-7 text-lg rounded-xl border-slate-300 text-slate-800 bg-white hover:bg-slate-50",
        }
        : {
            section: "relative overflow-hidden bg-ink pt-14 pb-20 lg:pt-20 lg:pb-24",
            badge: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-slate-200 text-sm font-medium mb-8",
            star: "fill-gold-bright text-gold-bright",
            h1: "text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.05]",
            accent: "text-gold-bright",
            sub: "text-lg lg:text-xl text-slate-300 mb-5 leading-relaxed max-w-xl mx-auto lg:mx-0",
            mono: "font-mono text-sm text-slate-400 mb-9",
            secondaryBtn: "px-8 py-7 text-lg rounded-xl border-white/25 text-white bg-transparent hover:bg-white/10 hover:text-white",
        };

    return (
        <>
            <SEO
                title="ecomifyUSA - US & UK LLC Formation for International Entrepreneurs"
                description="Form your US LLC or UK Limited Company remotely. We handle formation, EIN, sales tax compliance, and Delaware franchise tax. 500+ satisfied clients worldwide."
                url="https://ecomifyusa.com/"
                jsonLd={[organizationJsonLd, faqJsonLd(HOME_FAQS)]}
            />
            <div className="min-h-screen bg-paper font-sans">
                {/* Navigation */}
                <header ref={headerRef} className="bg-paper/85 backdrop-blur-md sticky top-0 z-50 border-b border-hairline">
                    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                        <Logo />
                        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
                            <Link href="/case-studies" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Case Studies</Link>
                            <Link href="/pricing" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Pricing</Link>
                            <Link href="/which-state" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Which State?</Link>
                            <Link href="/us-residents" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">US Sellers</Link>
                            <Link href="/blog" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Blog</Link>
                            <Link href="/services" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Services</Link>
                            <Link href="/checkout?service=Wyoming%20LLC">
                                <Button className="bg-gold hover:bg-gold-bright text-white shadow-lg shadow-gold/20">Get Started</Button>
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
                            <nav aria-label="Mobile navigation" className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
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
                                        <Button className="w-full bg-gold hover:bg-gold-bright text-white shadow-lg shadow-blue-600/20">
                                            Get Started
                                        </Button>
                                    </Link>
                                </div>
                            </nav>
                        </div>
                    )}
                </header>

                <main id="main-content">
                {/* HERO — 7/5 split (variant: ink default / light A-B) */}
                <section className={hero.section}>
                    {/* depth glows — ink variant only */}
                    {!heroLight && (
                        <>
                            <div aria-hidden="true" className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-3xl opacity-30 -translate-y-1/3 translate-x-1/4" style={{ background: "radial-gradient(circle, #2563eb 0%, transparent 70%)" }} />
                            <div aria-hidden="true" className="absolute bottom-0 left-0 w-[520px] h-[520px] rounded-full blur-3xl opacity-20 translate-y-1/3 -translate-x-1/4" style={{ background: "radial-gradient(circle, #B98A2E 0%, transparent 70%)" }} />
                        </>
                    )}

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
                            {/* Left — message + CTAs */}
                            <div className="lg:col-span-7 text-center lg:text-left ec-hero-item">
                                <div className={hero.badge}>
                                    <Star className={`w-4 h-4 ${hero.star}`} aria-hidden="true" />
                                    <span>Rated 5.0 by 500+ e-commerce founders</span>
                                </div>
                                <h1 className={hero.h1}>
                                    Your US company,<br />
                                    <span className={hero.accent}>run like a bank.</span>
                                </h1>
                                <p className={hero.sub}>
                                    LLC formation, EIN, and tax compliance for international founders — handled end to end. No hidden fees, ever.
                                </p>
                                <p className={hero.mono}>No SSN · No ITIN · No US visit · 50+ countries</p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <Link href="/checkout?service=Wyoming%20LLC">
                                        <Button
                                            size="lg"
                                            className="bg-gold hover:bg-gold-bright text-white px-8 py-7 text-lg rounded-xl shadow-xl shadow-black/30 transition-colors"
                                        >
                                            Begin formation <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </Link>
                                    <a href="https://wa.me/13072180376" target="_blank" rel="noopener noreferrer">
                                        <Button size="lg" variant="outline" className={hero.secondaryBtn}>
                                            Talk to a human
                                        </Button>
                                    </a>
                                </div>
                            </div>
                            {/* Right — Formation Receipt */}
                            <div className="lg:col-span-5 ec-hero-item" style={{ animationDelay: "0.18s" }}>
                                <FormationReceipt />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FEATURES — paper bento */}
                <section className="bg-paper py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-6 auto-rows-[280px] ec-reveal ec-reveal-up">
                            <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-hairline relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                                        <Globe className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">USA &amp; UK Coverage</h3>
                                    <p className="text-slate-500 max-w-sm">Form your company in Wyoming, Delaware, London, or anywhere in between with full tax compliance.</p>
                                    <Link href="/services">
                                        <Button className="mt-6 bg-slate-900 text-white hover:bg-slate-800">Explore States</Button>
                                    </Link>
                                </div>
                                <div className="absolute right-0 bottom-0 w-3/4 h-3/4 bg-blue-50 rounded-tl-3xl opacity-50 group-hover:scale-105 transition-transform duration-700">
                                    <div className="w-full h-full opacity-20 bg-[url('/images/world-map.svg')] bg-cover bg-center"></div>
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
                                <div className="text-6xl font-bold opacity-10 -mb-4 font-mono">01</div>
                            </div>

                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-hairline flex flex-col justify-center items-center text-center group hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-verify mb-4 group-hover:scale-110 transition-transform">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h3 className="text-4xl font-bold text-slate-900 mb-2 font-mono">100%</h3>
                                <p className="text-slate-600 font-medium">Compliance Guarantee</p>
                                <p className="text-sm text-slate-400 mt-2">IRS &amp; HMRC Approved</p>
                            </div>

                            <div className="md:col-span-2 bg-ink rounded-3xl p-8 shadow-sm text-white flex items-center justify-between relative overflow-hidden group">
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-2">Transparent Pricing</h3>
                                    <p className="text-slate-400">No hidden fees. State fees shown separately.</p>
                                    <div className="flex gap-2 mt-4">
                                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white font-mono">Wyoming $100</span>
                                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white font-mono">Delaware $90</span>
                                    </div>
                                </div>
                                <div className="text-right relative z-10">
                                    <div className="text-4xl font-bold text-gold-bright font-mono">$0/mo</div>
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
                        {/* Stats — ledger strip */}
                        <div className="bg-hairline border border-hairline rounded-2xl overflow-hidden mb-16 ec-reveal ec-reveal-up">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-px">
                                {[
                                    { num: "5.0", label: "Average rating", note: "★★★★★ across platforms" },
                                    { num: "500+", label: "Founders served", note: "since 2021" },
                                    { num: "50+", label: "Countries", note: "fully remote" },
                                    { num: "24h", label: "Avg. delivery", note: "formation filed" },
                                ].map((s) => (
                                    <div key={s.label} className="bg-white px-6 py-8 text-center">
                                        <p className="font-mono text-4xl font-bold text-ink mb-1">{s.num}</p>
                                        <p className="text-sm font-semibold text-slate-700">{s.label}</p>
                                        <p className="text-xs text-slate-400 mt-1">{s.note}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="ec-reveal ec-reveal-up">
                            <VerificationBlock />
                        </div>

                        {/* Testimonials Section */}
                        <div>
                            <p className="text-center text-sm font-semibold text-slate-500 tracking-widest uppercase mb-12">What Clients Say</p>
                            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 ec-reveal ec-reveal-up">
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
                                    <Button className="bg-gold hover:bg-gold-bright text-white px-8 py-6 text-lg rounded-xl shadow-xl shadow-blue-600/20 transition-all hover:scale-105 font-bold">
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
                                    <div className="mt-6 p-4 bg-paper rounded-xl">
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
                        <div className="grid lg:grid-cols-2 gap-12 ec-reveal ec-reveal-up">
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
                        <div className="space-y-4 mb-12 ec-reveal ec-reveal-up">
                            <FAQItem question="Do I need to be a US citizen to form an LLC?" answer="No! You do not need to be a US citizen or resident to form a US LLC. We help entrepreneurs from over 50 countries set up their businesses remotely. All you need is a valid passport and proof of address from your home country." />
                            <FAQItem question="Can I get sales tax exemption without an SSN?" answer="Yes! Most states accept ITIN for exemption certificates. Only a few states (DC, MD, etc.) require SSN. We've successfully gotten clients exempt in 44+ states with just an ITIN number." />
                            <FAQItem question="How long does EIN take for non-US residents?" answer="Typically 15-30 business days. The IRS requires fax submission for foreign owners (no online application available). We offer expedited processing for an additional fee if you need it faster." />
                            <FAQItem question="What if I lost my state portal logins?" answer="We can recover them! We contact each state tax department, verify your identity with formation documents and ID, and regain access to all your portals. We also set up proper documentation so this doesn't happen again." />
                            <FAQItem question="Do you offer refunds?" answer="Yes, we offer a money-back guarantee if we cannot deliver the promised service. Official state fees are non-refundable once paid to government agencies. See our full Refund Policy for details." />
                            <FAQItem question="How quickly can I start selling on Amazon/Walmart?" answer="Once you have your LLC and EIN (typically 2-4 weeks), you can immediately apply for Amazon/Walmart seller accounts. We expedite the formation process to get you selling faster. Many clients start selling within 30 days." />
                            <FAQItem question="I'm outside the US. Can you still help me?" answer="Absolutely! Over 80% of our clients are international. We specialize in helping non-US residents form US companies remotely. No need to travel to the US. We handle everything online." />
                            <FAQItem question="Do you provide ongoing compliance support?" answer="Yes! We offer monthly compliance packages including sales tax filing, annual reports, and registered agent services. Starting at $150/month. We also provide one-time filing services if you prefer." />
                            <FAQItem question="Can I open a US bank account as a non-resident?" answer="Yes! With your LLC documents and EIN, you can open accounts with Mercury, Wise, Payoneer, and other fintech banks that serve non-residents. Traditional banks may require in-person visits." />
                            <FAQItem question="How do I contact support?" answer="Email us at support@ecomifyusa.com or WhatsApp +1 (307) 218-0376. We respond within 24-48 hours. We also provide ongoing support for all our clients throughout their business journey." />
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
                </main>

                {/* Footer */}
                <Footer />
                <style jsx>{`
                    .ribbon-path {
                        fill: none;
                        stroke-width: 2;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        opacity: 0.15;
                    }
                    .ribbon-path-1 {
                        stroke: #3b82f6;
                        animation: flow1 25s ease-in-out infinite;
                    }
                    .ribbon-path-2 {
                        stroke: #6366f1;
                        animation: flow2 30s ease-in-out infinite;
                    }
                    .ribbon-path-3 {
                        stroke: #2563eb;
                        animation: flow3 28s ease-in-out infinite;
                    }
                    .ribbon-path-4 {
                        stroke: #4f46e5;
                        animation: flow4 26s ease-in-out infinite;
                    }
                    @keyframes flow1 {
                        0%, 100% { transform: translateX(-5%) translateY(0); }
                        50% { transform: translateX(5%) translateY(2%); }
                    }
                    @keyframes flow2 {
                        0%, 100% { transform: translateX(5%) translateY(0); }
                        50% { transform: translateX(-5%) translateY(-2%); }
                    }
                    @keyframes flow3 {
                        0%, 100% { transform: translateX(-3%) translateY(0); }
                        50% { transform: translateX(7%) translateY(3%); }
                    }
                    @keyframes flow4 {
                        0%, 100% { transform: translateX(4%) translateY(0); }
                        50% { transform: translateX(-6%) translateY(-1%); }
                    }
                    @media (prefers-reduced-motion: reduce) {
                        .ribbon-path-1,
                        .ribbon-path-2,
                        .ribbon-path-3,
                        .ribbon-path-4 {
                            animation: none;
                        }
                    }
                `}</style>
            </div>
        </>
    );
}
