import Link from "next/link";
import { SEO } from "@/components/SEO";
import { USMap } from "@/components/USMap";
import { UKMap } from "@/components/UKMap";
import { TrustBadge } from "@/components/TrustBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CheckCircle2, Star, ArrowRight, Shield, Clock, DollarSign, FileText } from "lucide-react";

export default function HomePage() {
    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf2LOGK6eY5rxr-RVUwC1vvCPNTFr1HmnbbKCYSa1nfL9m4AA/viewform";

    return (
        <>
            <SEO
                title="Salestaxus LLC - US & UK Business Formation"
                description="Join 300+ entrepreneurs. Expert LLC & LTD formation with 5.0 rated Fiverr excellence."
            />

            <div className="min-h-screen bg-slate-50">
                {/* Header */}
                <header className="bg-white border-b sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Building2 className="w-8 h-8 text-blue-600" />
                            <h1 className="text-xl font-bold">Salestaxus LLC</h1>
                        </div>
                        <a href={FORM_URL} target="_blank" rel="noreferrer">
                            <Button className="bg-blue-600 hover:bg-blue-700">Start Filing</Button>
                        </a>
                    </div>
                </header>

                {/* Hero */}
                <section className="max-w-7xl mx-auto px-4 py-16 text-center">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                        <Star className="w-4 h-4 fill-current" /> 5.0 Rating on Fiverr
                    </div>
                    <h2 className="text-5xl font-bold mb-6">Launch Your Global Business</h2>
                    <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                        Professional formation services for US LLCs and UK LTDs. Simple, fast, and secure.
                    </p>
                    <a href={FORM_URL} target="_blank" rel="noreferrer">
                        <Button size="lg" className="h-14 px-8 text-lg gap-2">
                            Start Your Journey <ArrowRight />
                        </Button>
                    </a>
                    <div className="mt-10"><TrustBadge /></div>
                </section>

                {/* US Map Section */}
                <section className="max-w-7xl mx-auto px-4 py-12">
                    <h3 className="text-3xl font-bold text-center mb-8">Select a US State</h3>
                    <Card className="shadow-xl"><CardContent className="p-6"><USMap /></CardContent></Card>
                </section>

                {/* UK Map Section */}
                <section className="max-w-7xl mx-auto px-4 py-12">
                    <h3 className="text-3xl font-bold text-center mb-8">Register UK Company</h3>
                    <Card className="shadow-xl border-emerald-100"><CardContent className="p-6"><UKMap /></CardContent></Card>
                </section>

                {/* Footer */}
                <footer className="bg-slate-900 text-white py-12 mt-20">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <p className="text-slate-400">© 2026 Salestaxus LLC. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}