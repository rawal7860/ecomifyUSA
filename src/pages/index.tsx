import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    Building2, Star, ArrowRight, Shield, Clock,
    DollarSign, FileText, CheckCircle2, MapPin,
    ArrowRightCircle, Zap, Globe, ChevronDown, ChevronUp,
    TrendingUp, Award, Headphones, Users, Mail, Phone,
    ShoppingCart, Truck, HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { USMap } from "@/components/USMap";
import { UKMap } from "@/components/UKMap";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";

// --- COMPONENT: Trust Bar ---
function TrustBar() {
    return (
        <div className="border-y border-slate-200 bg-white py-10 relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                    {[
                        { icon: Star, label: "5.0 Rating", sub: "500+ Reviews", color: "text-green-600" },
                        { icon: Award, label: "Top Rated", sub: "Level 2 Seller", color: "text-blue-600" },
                        { icon: Clock, label: "24h Delivery", sub: "Fast Turnaround", color: "text-indigo-600" },
                        { icon: Shield, label: "100% Safe", sub: "Money Back", color: "text-slate-600" },
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 group cursor-default">
                            <div className={`flex items-center gap-2 font-bold text-xl ${item.color} group-hover:scale-110 transition-transform`}>
                                <item.icon className="w-6 h-6 fill-current" /> {item.label}
                            </div>
                            <span className="text-sm text-slate-500 font-medium">{item.sub}</span>
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

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">

            {/* 1. Enhanced Header */}
            <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"}`}>
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <Logo />
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/case-studies"><Button variant="ghost" className="hidden sm:inline-flex text-slate-600 hover:text-blue-600">Case Studies</Button></Link>
                        <Link href="/services"><Button variant="ghost" className="hidden sm:inline-flex text-slate-600 hover:text-blue-600">Services</Button></Link>
                        <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20">Get Started</Button>
                    </div>
                </div>
            </header>

            {/* 2. PREMIUM BENTO HERO WITH HUBBLE-STYLE EARTH GLOBE */}
            <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-50 relative overflow-hidden">

                {/* 🌍 HUBBLE-STYLE EARTH GLOBE - LEFT SIDE (Opacity 40%) */}
                <div className="absolute top-0 left-0 w-1/2 h-full z-0 overflow-hidden">
                    <div
                        className="w-full h-full bg-cover bg-center bg-no-repeat opacity-40"
                        style={{
                            backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1200px-The_Earth_seen_from_Apollo_17.jpg')",
                            maskImage: 'linear-gradient(to right, black 0%, black 30%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to right, black 0%, black 30%, transparent 100%)'
                        }}
                    ></div>
                    {/* Blue Brand Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 via-blue-400/30 to-transparent mix-blend-overlay"></div>
                </div>

                {/* Background Blobs */}
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
                            <Link href="/checkout">
                                <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 px-8 py-7 text-lg rounded-xl shadow-xl shadow-slate-900/20 transition-all hover:scale-105">
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

                    {/* The Bento Grid */}
                    <div className="grid md:grid-cols-3 gap-6 auto-rows-[280px]">
                        <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">USA & UK Coverage</h3>
                                <p className="text-slate-500 max-w-sm">Form your company in Wyoming, Delaware, London, or anywhere in between with full tax compliance.</p>
                                <Button className="mt-6 bg-slate-900 text-white hover:bg-slate-800">Explore States</Button>
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

            {/* 3. TRUST BAR */}
            <TrustBar />

            {/* 4. HOW IT WORKS */}
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

            {/* 5. Services Preview */}
            <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">Our Expertise</div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Specialized Services</h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {[
                            { title: "US Sales Tax Compliance", desc: "Preparation, registration, and filing of monthly, quarterly, or yearly US sales tax returns.", icon: DollarSign, link: "/services" },
                            { title: "LLC Formation & Structuring", desc: "End-to-end US LLC formation for non-residents, including EIN acquisition.", icon: Building2, link: "/services" },
                            { title: "Delaware Franchise Tax", desc: "Expert, timely filing of Delaware Franchise Tax and annual reports.", icon: TrendingUp, link: "/services" },
                        ].map((service, i) => (
                            <Link href={service.link} key={i}>
                                <Card className="h-full hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 cursor-pointer border-0 bg-white group overflow-hidden">
                                    <CardContent className="p-8">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:from-blue-600 group-hover:to-blue-700 group-hover:text-white transition-all">
                                            <service.icon className="w-6 h-6" />
                                        </div>
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

            {/* 6. Maps Section */}
            <section className="py-24 bg-white">
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

            {/* 7. ENHANCED FAQ SECTION - PREMIUM DESIGN */}
            <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
                {/* Decorative Background */}
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
                        <FAQItem
                            icon="🏢"
                            question="Do I need to be a US citizen to form an LLC?"
                            answer="No! You do not need to be a US citizen or resident to form a US LLC. We help entrepreneurs from over 50 countries set up their businesses remotely. All you need is a valid passport and proof of address from your home country."
                        />
                        <FAQItem
                            icon="📋"
                            question="Can I get sales tax exemption without an SSN?"
                            answer="Yes! Most states accept ITIN for exemption certificates. Only a few states (DC, MD, etc.) require SSN. We've successfully gotten clients exempt in 44+ states with just an ITIN number."
                        />
                        <FAQItem
                            icon="⏱️"
                            question="How long does EIN take for non-US residents?"
                            answer="Typically 15-30 business days. The IRS requires fax submission for foreign owners (no online application available). We offer expedited processing for an additional fee if you need it faster."
                        />
                        <FAQItem
                            icon="🔐"
                            question="What if I lost my state portal logins?"
                            answer="We can recover them! We contact each state tax department, verify your identity with formation documents and ID, and regain access to all your portals. We also set up proper documentation so this doesn't happen again."
                        />
                        <FAQItem
                            icon="💰"
                            question="Do you offer refunds?"
                            answer="Yes, we offer a money-back guarantee if we cannot deliver the promised service. Official state fees are non-refundable once paid to government agencies. See our full Refund Policy for details."
                        />
                        <FAQItem
                            icon="🚀"
                            question="How quickly can I start selling on Amazon/Walmart?"
                            answer="Once you have your LLC and EIN (typically 2-4 weeks), you can immediately apply for Amazon/Walmart seller accounts. We expedite the formation process to get you selling faster. Many clients start selling within 30 days."
                        />
                        <FAQItem
                            icon="🌍"
                            question="I'm outside the US. Can you still help me?"
                            answer="Absolutely! Over 80% of our clients are international. We specialize in helping non-US residents form US companies remotely. No need to travel to the US. We handle everything online."
                        />
                        <FAQItem
                            icon="📧"
                            question="Do you provide ongoing compliance support?"
                            answer="Yes! We offer monthly compliance packages including sales tax filing, annual reports, and registered agent services. Starting at $150/month. We also provide one-time filing services if you prefer."
                        />
                        <FAQItem
                            icon="🏦"
                            question="Can I open a US bank account as a non-resident?"
                            answer="Yes! With your LLC documents and EIN, you can open accounts with Mercury, Wise, Payoneer, and other fintech banks that serve non-residents. Traditional banks may require in-person visits."
                        />
                        <FAQItem
                            icon="📞"
                            question="How do I contact support?"
                            answer="Email us at support@ecomifyusa.com or WhatsApp +1 (307) 218-0376. We respond within 24-48 hours. We also provide ongoing support for all our clients throughout their business journey."
                        />
                    </div>

                    {/* Help CTA */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl shadow-blue-100 border border-blue-100">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Still have questions?</h3>
                            <p className="text-slate-600 mb-6 max-w-xl mx-auto">Our team of experts is here to help. Reach out and we'll get back to you within 24 hours.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="mailto:support@ecomifyusa.com" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all hover:scale-105">
                                    <Mail className="w-5 h-5" /> Email Us
                                </a>
                                <a href="https://wa.me/13072180376" target="_blank" className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all hover:scale-105">
                                    <Phone className="w-5 h-5" /> WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. FINAL CTA */}
            <CheckoutSection />

            {/* 9. Footer */}
            <Footer />
        </div>
    );
}