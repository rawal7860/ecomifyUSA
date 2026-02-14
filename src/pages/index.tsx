import Link from "next/link";
import { SEO } from "@/components/SEO";
import { USMap } from "@/components/USMap";
import { UKMap } from "@/components/UKMap"; // Fixed manual component
import { TrustBadge } from "@/components/TrustBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CheckCircle2, Star, ArrowRight, Shield, Clock, DollarSign, FileText } from "lucide-react";

export default function HomePage() {
    return (
        <>
            <SEO
                title="Salestaxus LLC - Professional Business Formation Services"
                description="Trusted by 300+ entrepreneurs. Fast LLC formation in the US and UK with expert guidance, transparent pricing, and dedicated support."
            />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Building2 className="w-8 h-8 text-blue-600" />
                                <h1 className="text-2xl font-bold text-slate-900">Salestaxus LLC</h1>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link href="/login">
                                    <Button variant="ghost">Sign In</Button>
                                </Link>
                                <Link href="/signup">
                                    <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <Star className="w-4 h-4 fill-current" />
                            5.0 Rating on Fiverr (Shazik)
                        </div>

                        <h2 className="text-5xl font-bold text-slate-900 leading-tight mb-6">
                            Global Business Formation Made Simple
                        </h2>

                        <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
                            Join 340+ entrepreneurs who trust Salestaxus LLC for fast, reliable, and affordable business formation in the **United States** and **United Kingdom**.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link href="/signup">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 gap-2">
                                    Get Started Today
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button size="lg" variant="outline">
                                    Client Dashboard
                                </Button>
                            </Link>
                        </div>

                        <div className="max-w-2xl mx-auto">
                            <TrustBadge />
                        </div>
                    </div>
                </section>

                {/* Interactive US Map Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-12">
                        <h3 className="text-4xl font-bold text-slate-900 mb-4">Select a US State</h3>
                        <p className="text-xl text-slate-600">Choose a state to view formation fees and configure your LLC</p>
                    </div>

                    <Card className="border-blue-200 shadow-xl overflow-hidden bg-white">
                        <CardContent className="p-8">
                            <USMap />
                        </CardContent>
                    </Card>
                </section>

                {/* Interactive UK Map Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-slate-50 border-y border-slate-200">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <Building2 className="w-4 h-4" />
                            UK Company Formation
                        </div>
                        <h3 className="text-4xl font-bold text-slate-900 mb-4">Register Your UK Company</h3>
                        <p className="text-xl text-slate-600">HMRC & Companies House registration for England, Scotland, Wales, and NI</p>
                    </div>

                    <div className="flex justify-center">
                        <Card className="border-emerald-200 shadow-xl max-w-5xl w-full bg-white">
                            <CardContent className="p-8">
                                <UKMap />
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Features Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h3 className="text-3xl font-bold text-slate-900 mb-12">Expertise Across Borders</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card>
                            <CardContent className="pt-6">
                                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                                <h4 className="font-bold text-xl mb-2">HMRC & IRS Experts</h4>
                                <p className="text-slate-600">Specialized in CT600 tax filing and non-resident LLC compliance.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <Clock className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                                <h4 className="font-bold text-xl mb-2">24/48 Hour Setup</h4>
                                <p className="text-slate-600">Fast incorporation and EIN processing to get you trading quickly.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                                <h4 className="font-bold text-xl mb-2">Transparent Invoicing</h4>
                                <p className="text-slate-600">All fees in USD. One clear invoice via Stripe with no hidden costs.</p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <Card className="bg-slate-900 border-none text-white overflow-hidden relative">
                        <CardContent className="py-16 text-center z-10">
                            <h3 className="text-4xl font-bold mb-4">Launch Your Global Business</h3>
                            <p className="text-xl mb-8 text-slate-300">Form your entity in the US or UK with a trusted expert.</p>
                            <Link href="/signup">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 gap-2">
                                    Create Account & Get Started
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </section>

                {/* Footer */}
                <footer className="bg-white border-t border-slate-200 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <Building2 className="w-6 h-6 text-blue-600" />
                            <span className="text-xl font-bold text-slate-900">Salestaxus LLC</span>
                        </div>
                        <p className="text-slate-500 mb-8 max-w-md mx-auto">
                            Professional business formation and tax compliance services. Owned and operated by Shazik (Fiverr Pro).
                        </p>
                        <div className="border-t border-slate-100 pt-8 text-slate-400 text-sm">
                            <p>&copy; 2026 Salestaxus LLC. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}