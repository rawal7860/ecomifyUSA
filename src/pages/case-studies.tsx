import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Building2, ArrowLeft, CheckCircle2, Star, Globe, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import Logo from "@/components/Logo";

export default function CaseStudiesPage() {
    const router = useRouter(); // ✅ Call useRouter at top level

    return (
        <>
            <SEO title="Client Success Stories - Salestaxus LLC" description="Real case studies from international entrepreneurs." />
            <div className="min-h-screen bg-slate-50">
                {/* Header */}
                <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-blue-600">
                            <Building2 className="h-6 w-6" /> Salestaxus LLC
                        </Link>
                        <Button variant="ghost" onClick={() => router.push("/")} className="gap-2">
                            <ArrowLeft className="w-4 h-4" /> Back to Home
                        </Button>
                    </div>
                </header>

                <div className="max-w-5xl mx-auto px-4 py-16">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-slate-900 mb-4">Client Success Stories</h1>
                        <p className="text-xl text-slate-600">Real problems. Real solutions. Real results.</p>
                    </div>

                    <div className="space-y-12">
                        {/* Case Study 1 */}
                        <Card className="overflow-hidden border-0 shadow-lg">
                            <div className="bg-blue-600 p-8 text-white">
                                <div className="flex items-center gap-2 mb-4">
                                    <Globe className="w-6 h-6" />
                                    <span className="font-semibold opacity-90">Italian Biotech Company</span>
                                </div>
                                <h2 className="text-3xl font-bold mb-2">US Expansion & TaxJar API Integration</h2>
                                <p className="opacity-90">Custom e-commerce platform requiring complex nexus setup.</p>
                            </div>
                            <CardContent className="p-8">
                                <div className="grid md:grid-cols-3 gap-8 mb-8">
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">Challenge</h4>
                                        <p className="text-slate-600 text-sm">Physical nexus in GA & FL, custom API platform, complex product taxability (DNA kits).</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">Solution</h4>
                                        <p className="text-slate-600 text-sm">TaxJar Professional API integration, SKU mapping, CPA hand-off workflow.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">Result</h4>
                                        <p className="text-slate-600 text-sm">Fully automated from Day 1. Scalable for thousands of transactions.</p>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                    <div className="flex text-yellow-400 mb-4">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                                    </div>
                                    <p className="text-slate-700 italic mb-4">"This structure makes sense, and the 'technical implementation partner' role is exactly what we need alongside our CPA."</p>
                                    <p className="font-bold text-slate-900">— [Client Name], MAGISNAT</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Case Study 2 */}
                        <Card className="overflow-hidden border-0 shadow-lg">
                            <div className="bg-slate-900 p-8 text-white">
                                <div className="flex items-center gap-2 mb-4">
                                    <TrendingUp className="w-6 h-6" />
                                    <span className="font-semibold opacity-90">SaaS Startup (Delaware C-Corp)</span>
                                </div>
                                <h2 className="text-3xl font-bold mb-2">$100K → $450 Franchise Tax Reduction</h2>
                                <p className="opacity-90">Minimizing Delaware taxes using Assumed Par Value Method.</p>
                            </div>
                            <CardContent className="p-8">
                                <div className="grid md:grid-cols-3 gap-8 mb-8">
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">Challenge</h4>
                                        <p className="text-slate-600 text-sm">Received $100,000 franchise tax notice due to high authorized shares.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">Solution</h4>
                                        <p className="text-slate-600 text-sm">Switched to Assumed Par Value Method. Filed Annual Report.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">Result</h4>
                                        <p className="text-slate-600 text-sm">$99,550 tax savings. Brought back to good standing.</p>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                    <div className="flex text-yellow-400 mb-4">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                                    </div>
                                    <p className="text-slate-700 italic mb-4">"We got a $100k tax notice. Shazlk reviewed our documents, switched the calculation method, and reduced it to $450. Incredible savings."</p>
                                    <p className="font-bold text-slate-900">— [Client Name], Accelertrain</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Case Study 3 */}
                        <Card className="overflow-hidden border-0 shadow-lg">
                            <div className="bg-blue-600 p-8 text-white">
                                <div className="flex items-center gap-2 mb-4">
                                    <Shield className="w-6 h-6" />
                                    <span className="font-semibold opacity-90">Mexican Entrepreneur</span>
                                </div>
                                <h2 className="text-3xl font-bold mb-2">Recovering Lost State Portal Logins</h2>
                                <p className="opacity-90">Regaining control after previous freelancer disappeared.</p>
                            </div>
                            <CardContent className="p-8">
                                <div className="grid md:grid-cols-3 gap-8 mb-8">
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">Challenge</h4>
                                        <p className="text-slate-600 text-sm">Lost access to 9 state portals. Louisiana penalty charged. Couldn't file.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">Solution</h4>
                                        <p className="text-slate-600 text-sm">Contacted each state department. Verified identity. Recovered access.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">Result</h4>
                                        <p className="text-slate-600 text-sm">All 9 portals recovered. Penalty resolved. 6 unwanted permits cancelled.</p>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                    <div className="flex text-yellow-400 mb-4">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                                    </div>
                                    <p className="text-slate-700 italic mb-4">"My previous freelancer disappeared. Shazlk recovered every single portal and cleaned up my Louisiana penalty. Now I have full control."</p>
                                    <p className="font-bold text-slate-900">— [Client Name], Trade Connect Global LLC</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-16 text-center">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to write your success story?</h3>
                        <Link href="/checkout">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">Start Your Formation</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}