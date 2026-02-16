import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    Building2, Star, ArrowRight, Shield, Clock,
    DollarSign, FileText, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { USMap } from "@/components/USMap";
import { UKMap } from "@/components/UKMap";

// --- SUB-COMPONENT: Checkout Section ---
// We define this outside the main function to avoid parsing errors
function CheckoutSection() {
    const router = useRouter();

    return (
        <div className="py-16 text-center bg-blue-50/50 rounded-3xl border border-blue-100 mt-12 mb-20 max-w-5xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Ready to establish your business presence?
            </h3>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Our automated system handles Articles of Organization, Registered Agent setup,
                and EIN/CRN filings instantly.
            </p>
            <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-7 text-xl rounded-full shadow-xl transition-all hover:scale-105 active:scale-95"
                onClick={() => router.push("/checkout")}
            >
                Proceed to Checkout <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-slate-500 font-medium">
                <span className="flex items-center gap-1"><Shield className="h-4 w-4 text-green-500" /> Secure SSL</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-green-500" /> Professional Billing</span>
            </div>
        </div>
    );
}

// --- MAIN PAGE COMPONENT ---
export default function HomePage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
            {/* 1. Header */}
            <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-blue-600">
                        <Building2 className="h-6 w-6" /> Salestaxus LLC
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
                    </div>
                </div>
            </header>

            <main className="pt-24 pb-16 px-4">
                {/* 2. Hero Section */}
                <section className="max-w-7xl mx-auto text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 border border-yellow-100 text-yellow-700 text-sm font-bold mb-6">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        5.0 Rated on Fiverr
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-transparent">
                        Global Business Formation <br />Made Simple.
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Expert assistance for USA LLC & UK Limited company registration,
                        tax compliance, and registered agent services for international entrepreneurs.
                    </p>
                </section>

                {/* 3. USA Interactive Map Section */}
                <section className="max-w-6xl mx-auto mb-24">
                    <div className="flex items-center justify-between mb-8 px-4">
                        <div>
                            <h2 className="text-3xl font-bold">USA State Selection</h2>
                            <p className="text-slate-500">Select a state to view formation fees and compliance requirements.</p>
                        </div>
                    </div>
                    <USMap />
                </section>

                {/* 4. UK Interactive Map Section */}
                <section className="max-w-6xl mx-auto mb-12">
                    <div className="flex items-center justify-between mb-8 px-4">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">United Kingdom Coverage</h2>
                            <p className="text-slate-500">Interactive data for England, Scotland, Wales, and Northern Ireland.</p>
                        </div>
                    </div>
                    <UKMap />
                </section>

                {/* 5. THE NEW CHECKOUT SECTION */}
                <CheckoutSection />

                {/* 6. Professional Features */}
                <section className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-20">
                    {[
                        { icon: <Clock className="h-6 w-6 text-blue-500" />, title: "24-Hour Processing", desc: "Fast-track filing options available for urgent business needs." },
                        { icon: <Shield className="h-6 w-6 text-blue-500" />, title: "Full Compliance", desc: "We handle IRS (SS-4) and HMRC filings so you stay 100% legal." },
                        { icon: <FileText className="h-6 w-6 text-blue-500" />, title: "Ready-to-Use Docs", desc: "Receive Articles, Operating Agreements, and EINs in your dashboard." }
                    ].map((feature, i) => (
                        <Card key={i} className="border-none shadow-md bg-white hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="mb-4">{feature.icon}</div>
                                <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </section>
            </main>

            {/* 7. Footer */}
            <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 font-bold text-white text-lg mb-4">
                            <Building2 className="h-5 w-5" /> Salestaxus LLC
                        </div>
                        <p className="max-w-xs text-sm leading-relaxed">
                            Leading US & UK business registration agency providing compliance
                            solutions for freelancers and entrepreneurs worldwide.
                        </p>
                    </div>
                    <div>
                        <h5 className="text-white font-bold mb-4">Services</h5>
                        <ul className="space-y-2 text-sm">
                            <li>USA LLC Formation</li>
                            <li>UK Limited Company</li>
                            <li>EIN & ITIN Support</li>
                            <li>Registered Agent Service</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-white font-bold mb-4">Legal</h5>
                        <ul className="space-y-2 text-sm">
                            <li>Privacy Policy</li>
                            <li>Terms of Service</li>
                            <li>Refund Policy</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}