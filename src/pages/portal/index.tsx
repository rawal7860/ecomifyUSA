import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    Calendar, Bell, FileText, Shield, CheckCircle2,
    ArrowRight, Star, TrendingUp, Clock, AlertTriangle,
    Users, Zap, DollarSign, Heart, Award, Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { SEO } from "@/components/SEO";

export default function PortalPage() {
    const router = useRouter();

    const features = [
        {
            icon: <Calendar className="w-6 h-6" />,
            title: "Deadline Tracking",
            description: "Never miss a compliance deadline again. Our system tracks all your state filings, tax payments, and annual reports."
        },
        {
            icon: <Bell className="w-6 h-6" />,
            title: "Smart Reminders",
            description: "Get automated reminders via email and SMS. Set up custom notification schedules for different types of deadlines."
        },
        {
            icon: <FileText className="w-6 h-6" />,
            title: "Document Management",
            description: "Store all your business documents securely. Upload EIN confirmations, formation certificates, and tax filings in one place."
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Compliance Alerts",
            description: "Stay ahead of regulatory changes. Get instant notifications about new requirements or filing deadlines."
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "Progress Tracking",
            description: "Monitor your compliance status across all states. See what's completed, pending, or overdue at a glance."
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Team Collaboration",
            description: "Share access with your accountant or team members. Keep everyone on the same page with shared deadlines."
        }
    ];

    const testimonials = [
        {
            name: "Sarah Chen",
            company: "TechStart LLC",
            text: "The portal saved me from a $5,000 late filing penalty. I got reminded 2 weeks before my Delaware franchise tax was due. Worth every penny!",
            rating: 5
        },
        {
            name: "Marcus Rodriguez",
            company: "Global Imports Inc",
            text: "Managing compliance across 12 states was overwhelming until I found this portal. Now I sleep better knowing nothing will slip through the cracks.",
            rating: 5
        },
        {
            name: "Priya Patel",
            company: "Fashion Forward Ltd",
            text: "The document storage alone is a game-changer. No more digging through emails for EIN numbers or formation docs. Everything organized perfectly.",
            rating: 5
        }
    ];

    const stats = [
        { number: "$2.3M", label: "Penalties Prevented", icon: <DollarSign className="w-5 h-5" /> },
        { number: "98%", label: "On-Time Compliance", icon: <CheckCircle2 className="w-5 h-5" /> },
        { number: "500+", label: "Active Users", icon: <Users className="w-5 h-5" /> },
        { number: "24/7", label: "Monitoring", icon: <Clock className="w-5 h-5" /> }
    ];

    return (
        <>
            <SEO
                title="Client Portal - Never Miss a Deadline | ecomifyUSA"
                description="Free client portal for e-commerce entrepreneurs. Track deadlines, manage documents, and stay compliant across all US states. Prevent costly penalties with automated reminders."
            />
            <div className="min-h-screen bg-slate-50 font-sans">
                {/* Navigation */}
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                        <Logo />
                        <nav className="hidden md:flex items-center gap-8">
                            <Link href="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
                            <Link href="/pricing" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Pricing</Link>
                            <Link href="/services" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Services</Link>
                            <Link href="/login" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Login</Link>
                            <Link href="/signup">
                                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20">Sign Up Free</Button>
                            </Link>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="pt-32 pb-20 bg-slate-50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/4"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center max-w-4xl mx-auto">
                            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-2 rounded-full text-red-700 text-sm font-medium mb-8">
                                <AlertTriangle className="w-4 h-4" />
                                <span>Late filing penalties cost businesses $2.3M annually</span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-8 tracking-tight leading-[1.1]">
                                Never Miss a <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                                    Deadline
                                </span> Again
                            </h1>

                            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                                Join 500+ entrepreneurs who eliminated compliance stress with our free client portal.
                                Track deadlines, manage documents, and get peace of mind knowing you're always compliant.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                                <Link href="/signup">
                                    <Button
                                        size="lg"
                                        className="bg-blue-600 hover:bg-blue-700 px-10 py-7 text-xl rounded-xl shadow-xl shadow-blue-600/20 transition-all hover:scale-105 font-bold"
                                    >
                                        Create Free Account <ArrowRight className="ml-2 h-6 w-6" />
                                    </Button>
                                </Link>
                                <Link href="#features">
                                    <Button size="lg" variant="outline" className="px-10 py-7 text-xl rounded-xl border-slate-200 hover:bg-white bg-white/50 backdrop-blur-sm">
                                        See Features
                                    </Button>
                                </Link>
                            </div>

                            {/* Trust indicators */}
                            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-500">
                                <div className="flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-green-500" />
                                    <span>Bank-level security</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    <span>Free forever</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-green-500" />
                                    <span>Setup in 2 minutes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, i) => (
                                <div key={i} className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:shadow-lg transition-all duration-300">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600">
                                        {stat.icon}
                                    </div>
                                    <p className="text-3xl font-bold text-slate-900 mb-1">{stat.number}</p>
                                    <p className="text-sm text-slate-600">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-slate-900 mb-4">Everything You Need to Stay Compliant</h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                Our portal gives you complete visibility and control over your business compliance requirements.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, i) => (
                                <Card key={i} className="bg-white border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <CardHeader>
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                                            {feature.icon}
                                        </div>
                                        <CardTitle className="text-xl text-slate-900">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-slate-900 mb-4">Peace of Mind, Guaranteed</h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                See how our portal has transformed compliance management for entrepreneurs just like you.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, i) => (
                                <Card key={i} className="bg-slate-50 border-slate-200 hover:shadow-xl transition-all duration-300">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-1 mb-4">
                                            {[...Array(testimonial.rating)].map((_, j) => (
                                                <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <p className="text-slate-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                                        <div>
                                            <p className="font-semibold text-slate-900">{testimonial.name}</p>
                                            <p className="text-sm text-slate-600">{testimonial.company}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
                    <div className="max-w-4xl mx-auto px-4 text-center text-white">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-8">
                            <Heart className="w-4 h-4" /> Join 500+ Stress-Free Entrepreneurs
                        </div>
                        <h2 className="text-4xl font-bold mb-6">Start Your Free Account Today</h2>
                        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                            Don't let compliance stress hold your business back. Get organized, stay compliant, and focus on what matters most - growing your empire.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/signup">
                                <Button
                                    size="lg"
                                    className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-7 text-xl rounded-xl shadow-xl transition-all hover:scale-105 font-bold"
                                >
                                    Create Free Account <ArrowRight className="ml-2 h-6 w-6" />
                                </Button>
                            </Link>
                            <Link href="/pricing">
                                <Button size="lg" variant="outline" className="px-10 py-7 text-xl rounded-xl border-white/30 text-white hover:bg-white/10 bg-transparent">
                                    View Premium Features
                                </Button>
                            </Link>
                        </div>
                        <p className="text-sm text-blue-200 mt-6">
                            No credit card required • Setup takes 2 minutes • Cancel anytime
                        </p>
                    </div>
                </section>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}