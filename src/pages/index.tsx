import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    Building2, Star, ArrowRight, Shield, Clock,
    DollarSign, FileText, CheckCircle2, MapPin, ArrowRightCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { USMap } from "@/components/USMap";
import { UKMap } from "@/components/UKMap";

// --- SUB-COMPONENT: Checkout Section ---
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

            {/* 2. NEW BENTO GRID HERO SECTION */}
            <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 text-sm font-medium mb-6">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>Rated 5.0 on Fiverr & Trustpilot</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
                            Launch your global <br /> business in minutes.
                        </h1>
                        <p className="text-xl text-slate-600 mb-8">
                            We handle the LLC formation, tax IDs, and compliance.
                            You handle the growth.
                        </p>
                    </div>

                    {/* The Bento Grid */}
                    <div className="grid md:grid-cols-3 gap-6 auto-rows-[300px]">

                        {/* Large Box: Map/Visual */}
                        <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">USA & UK Coverage</h3>
                                <p className="text-slate-500">Form your company in Wyoming, Delaware, London, or anywhere in between.</p>
                                <Button className="mt-4 bg-slate-900 text-white">Explore States</Button>
                            </div>
                            {/* Abstract Map Background */}
                            <div className="absolute right-0 bottom-0 w-3/4 h-3/4 bg-blue-50 rounded-tl-3xl opacity-50 group-hover:scale-105 transition-transform duration-500">
                                <div className="w-full h-full opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center"></div>
                            </div>
                        </div>

                        {/* Tall Box: Speed */}
                        <div className="bg-blue-600 rounded-3xl p-8 shadow-xl shadow-blue-900/20 text-white flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                                    <Clock className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold mb-2">24-Hour<br />Processing</h3>
                                <p className="text-blue-100">Fast-track filing options available for urgent business needs.</p>
                            </div>
                            <div className="text-5xl font-bold opacity-20">01</div>
                        </div>

                        {/* Wide Box: Trust */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
                            <h3 className="text-5xl font-bold text-slate-900 mb-2">100%</h3>
                            <p className="text-slate-600 font-medium">Compliance Guarantee</p>
                            <p className="text-sm text-slate-400 mt-4">We handle IRS (SS-4) and HMRC filings so you stay legal.</p>
                        </div>

                        {/* Wide Box: Pricing */}
                        <div className="md:col-span-2 bg-slate-900 rounded-3xl p-8 shadow-sm text-white flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Transparent Pricing</h3>
                                <p className="text-slate-400">No hidden fees. State fees included.</p>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-green-400">$0/mo</div>
                                <div className="text-sm text-slate-500">after formation</div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 3. NEW TRUST BAR (Fiverr Social Proof) */}
            <div className="border-y border-slate-100 bg-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-80 grayscale hover:grayscale-0 transition-all duration-500">

                        {/* Fiverr Badge 1 */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center gap-1 text-green-600 font-bold text-lg">
                                <Star className="w-5 h-5 fill-green-600" /> 5.0 Rating
                            </div>
                            <span className="text-sm text-slate-500">Based on 500+ Reviews</span>
                        </div>

                        {/* Fiverr Badge 2 */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center gap-1 text-slate-800 font-bold text-lg">
                                <CheckCircle2 className="w-5 h-5 text-blue-600" /> Top Rated Seller
                            </div>
                            <span className="text-sm text-slate-500">Level 2 Status</span>
                        </div>

                        {/* Fiverr Badge 3 */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center gap-1 text-slate-800 font-bold text-lg">
                                <Clock className="w-5 h-5 text-blue-600" /> 24h Delivery
                            </div>
                            <span className="text-sm text-slate-500">Fast Turnaround</span>
                        </div>

                        {/* Fiverr Badge 4 */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center gap-1 text-slate-800 font-bold text-lg">
                                <Shield className="w-5 h-5 text-blue-600" /> 100% Safe
                            </div>
                            <span className="text-sm text-slate-500">Money Back Guarantee</span>
                        </div>

                    </div>
                </div>
            </div>

            {/* 4. Our Specialized Services Section */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-slate-900 mb-3">Our Specialized Services</h2>
                        <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {/* US Sales Tax Compliance */}
                        <Link href="/services/us-sales-tax-compliance">
                            <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-t-4 border-blue-500 hover:-translate-y-1">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-slate-900">US Sales Tax Compliance</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        Preparation, registration, and filing of monthly, quarterly, or yearly US sales tax returns across multiple states.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* E-commerce Tax Exemptions */}
                        <Link href="/services/ecommerce-tax-exemptions">
                            <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-t-4 border-blue-500 hover:-translate-y-1">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-slate-900">E-commerce Tax Exemptions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        Streamlining the process to secure resale certificates for Amazon, Walmart, and Home Depot.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* LLC Formation & Structuring */}
                        <Link href="/services/llc-formation-structuring">
                            <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-t-4 border-blue-500 hover:-translate-y-1">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-slate-900">LLC Formation & Structuring</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        End-to-end US LLC formation for non-residents, including EIN acquisition and registered agent setup.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* Delaware Franchise Tax */}
                        <Link href="/services/delaware-franchise-tax">
                            <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-t-4 border-blue-500 hover:-translate-y-1">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-slate-900">Delaware Franchise Tax</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        Expert, timely filing of Delaware Franchise Tax and annual reports to maintain good standing.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* Income Tax & Cleanup */}
                        <Link href="/services/income-tax-cleanup">
                            <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-t-4 border-blue-500 hover:-translate-y-1">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-slate-900">Income Tax & Cleanup</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        Professional income tax preparation for corporations/LLCs and cleaning up prior year bookkeeping.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* Global E-commerce Support */}
                        <Link href="/services/global-ecommerce-support">
                            <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-t-4 border-blue-500 hover:-translate-y-1">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-slate-900">Global E-commerce Support</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        Handling HMRC filings and providing tailored document approval support for international sellers.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 5. Formation Services Section (Maps) */}
            <section className="py-16 bg-white">
                <main className="pt-24 pb-16 px-4">
                    {/* USA Interactive Map Section */}
                    <section className="max-w-6xl mx-auto mb-24">
                        <div className="flex items-center justify-between mb-8 px-4">
                            <div>
                                <h2 className="text-3xl font-bold">USA State Selection</h2>
                                <p className="text-slate-500">Select a state to view formation fees and compliance requirements.</p>
                            </div>
                        </div>
                        <USMap />
                    </section>

                    {/* UK Interactive Map Section */}
                    <section className="max-w-6xl mx-auto mb-12">
                        <div className="flex items-center justify-between mb-8 px-4">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900">United Kingdom Coverage</h2>
                                <p className="text-slate-500">Interactive data for England, Scotland, Wales, and Northern Ireland.</p>
                            </div>
                        </div>
                        <UKMap />
                    </section>

                    {/* THE NEW CHECKOUT SECTION */}
                    <CheckoutSection />

                    {/* Professional Features */}
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
            </section>

            {/* 6. NEW TESTIMONIALS SECTION (Social Proof) */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Trusted by Entrepreneurs Worldwide</h2>
                        <p className="text-slate-600">Don't just take our word for it. See what our Fiverr clients say.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Review 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex text-yellow-400 mb-4">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                            </div>
                            <p className="text-slate-700 mb-6 italic">"Absolutely amazing service! They handled my Wyoming LLC formation in less than 24 hours. The tax compliance advice was spot on."</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">JD</div>
                                <div>
                                    <div className="font-bold text-slate-900">John D.</div>
                                    <div className="text-xs text-slate-500">USA • LLC Formation</div>
                                </div>
                            </div>
                        </div>

                        {/* Review 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex text-yellow-400 mb-4">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                            </div>
                            <p className="text-slate-700 mb-6 italic">"I was worried about scams, but this seller is the real deal. Professional communication and my EIN came through instantly."</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600">SK</div>
                                <div>
                                    <div className="font-bold text-slate-900">Sarah K.</div>
                                    <div className="text-xs text-slate-500">UK • Tax Compliance</div>
                                </div>
                            </div>
                        </div>

                        {/* Review 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex text-yellow-400 mb-4">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                            </div>
                            <p className="text-slate-700 mb-6 italic">"Best investment for my business. The dashboard makes it so easy to track my documents. Highly recommended!"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600">MR</div>
                                <div>
                                    <div className="font-bold text-slate-900">Michael R.</div>
                                    <div className="text-xs text-slate-500">Canada • Registered Agent</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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