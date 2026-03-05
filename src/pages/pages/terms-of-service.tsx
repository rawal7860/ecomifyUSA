import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Building2, ArrowLeft, FileText, Mail, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export default function TermsOfServicePage() {
    const router = useRouter();

    return (
        <>
            <SEO title="Terms of Service - ecomifyUSA" description="Terms and conditions for using ecomifyUSA services." />
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
                                <FileText className="w-10 h-10 text-blue-600" />
                                <h1 className="text-4xl font-bold text-slate-900">Terms of Service</h1>
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
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Agreement to Terms</h2>
                                <p className="text-slate-600 mb-6">
                                    By accessing or using ecomifyUSA's website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
                                </p>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Services</h2>
                                <p className="text-slate-600 mb-6">ecomifyUSA provides business formation and tax compliance services, including but not limited to:</p>
                                <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
                                    <li>US LLC and Corporation formation</li>
                                    <li>UK Limited Company formation</li>
                                    <li>EIN/ITIN acquisition</li>
                                    <li>Sales tax registration and compliance</li>
                                    <li>Delaware Franchise Tax filing</li>
                                    <li>IRS tax return preparation (Forms 1120, 5472)</li>
                                    <li>Registered Agent services</li>
                                </ul>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Client Responsibilities</h2>
                                <p className="text-slate-600 mb-6">You agree to:</p>
                                <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
                                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> Provide accurate, complete, and current information</li>
                                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> Respond promptly to requests for additional documentation</li>
                                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> Review all filings before submission when applicable</li>
                                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> Maintain the security of your account credentials</li>
                                    <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> Notify us immediately of any unauthorized access</li>
                                </ul>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Fees and Payment</h2>
                                <p className="text-slate-600 mb-6">All fees are quoted in USD unless otherwise stated. Payment is due at the time of service unless otherwise agreed. Fees include:</p>
                                <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
                                    <li><strong>Service Fees:</strong> Our professional service charges</li>
                                    <li><strong>Government Fees:</strong> State filing fees, franchise taxes (paid directly by client or reimbursed)</li>
                                </ul>
                                <p className="text-slate-600 mb-6">We accept payments via Stripe (credit/debit cards). All transactions are secure and encrypted.</p>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. No Legal or Tax Advice Disclaimer</h2>
                                <div className="bg-amber-50 border-l-4 border-amber-600 p-6 mb-8">
                                    <p className="text-amber-800">
                                        <strong>Important:</strong> ecomifyUSA is not a law firm or CPA firm. We provide document preparation and filing services based on information you provide. Our services do not constitute legal or tax advice. You should consult with a qualified attorney or CPA for advice specific to your situation.
                                    </p>
                                </div>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Processing Times</h2>
                                <p className="text-slate-600 mb-6">We provide estimated processing times based on current government processing speeds. However, we cannot guarantee specific timelines as they are controlled by government agencies (IRS, Secretary of State, etc.). Delays beyond our control do not qualify for refunds.</p>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Accuracy of Information</h2>
                                <p className="text-slate-600 mb-6">You are responsible for the accuracy of information provided to us. We are not liable for errors, omissions, or delays caused by incorrect information provided by you. Amendments due to client errors may incur additional fees.</p>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Limitation of Liability</h2>
                                <p className="text-slate-600 mb-6">
                                    To the maximum extent permitted by law, ecomifyUSA shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities. Our total liability shall not exceed the amount you paid for the specific service giving rise to the claim.
                                </p>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Governing Law</h2>
                                <p className="text-slate-600 mb-6">These Terms shall be governed by and construed in accordance with the laws of the State of Wyoming, United States, without regard to its conflict of law provisions.</p>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Contact Us</h2>
                                <p className="text-slate-600 mb-6">For questions about these Terms of Service, please contact us:</p>
                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                    <p className="text-slate-700 mb-2"><strong>Email:</strong> support@ecomifyusa.com</p>
                                    <p className="text-slate-700 mb-2"><strong>WhatsApp:</strong> +1 (307) 218-0376</p>
                                    <p className="text-slate-700"><strong>Address:</strong> 30 North Gould Street, Ste R, Sheridan, WY 82801</p>
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