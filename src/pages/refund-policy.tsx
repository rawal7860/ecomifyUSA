import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Building2, ArrowLeft, DollarSign, Mail, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export default function RefundPolicyPage() {
    const router = useRouter();

    return (
        <>
            <SEO title="Refund Policy - ecomifyUSA" description="Our refund and cancellation policy for business formation and tax services." />
            <div className="min-h-screen bg-slate-50">
                {/* Header */}
                <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                        <Link href="/" className="hover:opacity-80 transition-opacity">
                            <Logo />
                        </Link>
                        <Button variant="ghost" onClick={() => router.push("/")} className="gap-2">
                            <ArrowLeft className="w-4 h-4" /> Back to Home
                        </Button>
                    </div>
                </header>

                <div className="max-w-4xl mx-auto px-4 py-16">
                    <Card className="border-0 shadow-lg">
                        <CardContent className="p-8 md:p-12">
                            <div className="flex items-center gap-3 mb-6">
                                <DollarSign className="w-10 h-10 text-blue-600" />
                                <h1 className="text-4xl font-bold text-slate-900">Refund & Cancellation Policy</h1>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-slate-600 mb-8 pb-8 border-b">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Last Updated: February 2025</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    <a href="mailto:support@ecomifyusa.com" className="hover:text-blue-600">support@ecomifyusa.com</a>
                                </div>
                            </div>

                            <div className="prose prose-slate max-w-none">
                                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
                                    <p className="text-blue-800 font-semibold">
                                        We stand behind our services with a satisfaction guarantee. However, due to the nature of government filings, some fees are non-refundable once work has begun.
                                    </p>
                                </div>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Service Fee Refunds</h2>

                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                                        <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5" /> Eligible for Refund
                                        </h3>
                                        <ul className="text-green-700 text-sm space-y-2">
                                            <li>• Service not yet started (within 24 hours)</li>
                                            <li>• Duplicate payment or billing error</li>
                                            <li>• Service cannot be completed due to our error</li>
                                            <li>• Client requests cancellation before filing</li>
                                        </ul>
                                    </div>

                                    <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                                        <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                                            <DollarSign className="w-5 h-5" /> Non-Refundable
                                        </h3>
                                        <ul className="text-red-700 text-sm space-y-2">
                                            <li>• Government filing fees (once paid)</li>
                                            <li>• Services already completed</li>
                                            <li>• Government processing delays</li>
                                            <li>• Errors from incorrect client info</li>
                                        </ul>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Service-Specific Policies</h2>

                                <div className="space-y-4 mb-8">
                                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                        <h4 className="font-bold text-slate-900 mb-3">LLC/Company Formation</h4>
                                        <p className="text-slate-600 text-sm">
                                            <strong className="text-green-600">Refundable:</strong> Service fee if cancelled before filing submission.<br />
                                            <strong className="text-red-600">Non-Refundable:</strong> State filing fees once submitted to Secretary of State.
                                        </p>
                                    </div>

                                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                        <h4 className="font-bold text-slate-900 mb-3">EIN Acquisition</h4>
                                        <p className="text-slate-600 text-sm">
                                            <strong className="text-green-600">Refundable:</strong> Service fee if EIN not received within 45 days (non-US residents).<br />
                                            <strong className="text-red-600">Non-Refundable:</strong> Once EIN is issued by IRS.
                                        </p>
                                    </div>

                                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                        <h4 className="font-bold text-slate-900 mb-3">Sales Tax Registration</h4>
                                        <p className="text-slate-600 text-sm">
                                            <strong className="text-green-600">Refundable:</strong> Service fee if permit not received within 60 days.<br />
                                            <strong className="text-red-600">Non-Refundable:</strong> Once permit is issued by state.
                                        </p>
                                    </div>

                                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                        <h4 className="font-bold text-slate-900 mb-3">Tax Filing Services</h4>
                                        <p className="text-slate-600 text-sm">
                                            <strong className="text-green-600">Refundable:</strong> Service fee if filing not completed by deadline due to our error.<br />
                                            <strong className="text-red-600">Non-Refundable:</strong> Once return is filed with IRS/state.
                                        </p>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Refund Timeline</h2>
                                <p className="text-slate-600 mb-6">Approved refunds are processed within 5-10 business days to the original payment method. Bank processing times may vary.</p>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Government Delays</h2>
                                <p className="text-slate-600 mb-6">Processing times for government agencies (IRS, Secretary of State, tax departments) are beyond our control. Delays do not qualify for refunds. We provide current estimated processing times at the time of order.</p>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. How to Request a Refund</h2>
                                <p className="text-slate-600 mb-6">To request a refund, contact us within 30 days of service completion:</p>