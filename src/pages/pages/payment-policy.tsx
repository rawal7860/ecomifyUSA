import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Building2, ArrowLeft, CreditCard, Mail, Calendar, Shield, DollarSign, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export default function PaymentPolicyPage() {
    const router = useRouter();

    return (
        <>
            <SEO title="Payment Policy - ecomifyUSA" description="Payment methods, pricing, billing, and transaction security information." />
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
                                <CreditCard className="w-10 h-10 text-blue-600" />
                                <h1 className="text-4xl font-bold text-slate-900">Payment Policy</h1>
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
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Accepted Payment Methods</h2>
                                <p className="text-slate-600 mb-6">We accept secure payments through Stripe, supporting all major credit and debit cards:</p>
                                <div className="grid md:grid-cols-2 gap-4 mb-8">
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <h4 className="font-bold text-slate-900 mb-2">✅ Credit Cards</h4>
                                        <ul className="text-slate-600 text-sm space-y-1">
                                            <li>Visa</li>
                                            <li>Mastercard</li>
                                            <li>American Express</li>
                                            <li>Discover</li>
                                        </ul>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <h4 className="font-bold text-slate-900 mb-2">✅ Debit Cards</h4>
                                        <ul className="text-slate-600 text-sm space-y-1">
                                            <li>Visa Debit</li>
                                            <li>Mastercard Debit</li>
                                            <li>Bank Debit Cards</li>
                                        </ul>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Payment Timing</h2>
                                <p className="text-slate-600 mb-6">Payment is due at the time of order placement. Services begin upon payment confirmation.</p>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Currency</h2>
                                <p className="text-slate-600 mb-6">All prices are quoted and charged in <strong>USD (United States Dollars)</strong>. International customers may incur currency conversion fees charged by their bank.</p>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Pricing Structure</h2>
                                <p className="text-slate-600 mb-6">Our fees consist of two components:</p>

                                <div className="space-y-4 mb-8">
                                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                        <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                            <DollarSign className="w-5 h-5 text-blue-600" />
                                            Service Fees
                                        </h4>
                                        <p className="text-slate-600 text-sm">Our professional service charges for preparation, filing, and compliance work. These fees are quoted upfront and include all labor costs.</p>
                                    </div>

                                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                        <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                            <DollarSign className="w-5 h-5 text-green-600" />
                                            Government Fees
                                        </h4>
                                        <p className="text-slate-600 text-sm">State filing fees, franchise taxes, and official charges. These may be included in quoted price OR charged separately. Always check your order summary.</p>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Payment Security</h2>
                                <p className="text-slate-600 mb-6">We prioritize the security of your payment information:</p>
                                <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
                                    <li><strong>SSL Encryption:</strong> All transactions encrypted with 256-bit SSL</li>
                                    <li><strong>PCI-DSS Compliant:</strong> Stripe meets highest security standards</li>
                                    <li><strong>No Data Storage:</strong> We do not store your card information on our servers</li>
                                    <li><strong>3D Secure:</strong> Additional authentication for international cards</li>
                                    <li><strong>Fraud Protection:</strong> Automated monitoring for suspicious activity</li>
                                </ul>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Failed Payments</h2>
                                <p className="text-slate-600 mb-6">If your payment fails:</p>
                                <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
                                    <li>You will be notified via email immediately</li>
                                    <li>Services will be paused until payment is resolved</li>
                                    <li>You have 7 days to update payment information</li>
                                    <li>Orders may be cancelled after 7 days of non-payment</li>
                                </ul>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Contact Us</h2>
                                <p className="text-slate-600 mb-6">For payment questions or issues:</p>
                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                    <p className="text-slate-700 mb-2"><strong>Email:</strong> support@ecomifyusa.com</p>
                                    <p className="text-slate-700 mb-2"><strong>WhatsApp:</strong> +1 (307) 218-0376</p>
                                    <p className="text-slate-700"><strong>Response Time:</strong> 24-48 hours</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Footer />
            </div>
        </>
    );
}