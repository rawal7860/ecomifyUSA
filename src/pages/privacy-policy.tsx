import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Building2, ArrowLeft, Shield, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import Logo from "@/components/Logo";

export default function PrivacyPolicyPage() {
    const router = useRouter();

    return (
        <>
            <SEO title="Privacy Policy - Salestaxus LLC" description="Your privacy is important to us. Learn how we collect and protect your information." />
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
                                <Shield className="w-10 h-10 text-blue-600" />
                                <h1 className="text-4xl font-bold text-slate-900">Privacy Policy</h1>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-slate-600 mb-8 pb-8 border-b">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Last Updated: February 2025</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    <a href="mailto:support@salestaxus.com" className="hover:text-blue-600">support@salestaxus.com</a>
                                </div>
                            </div>

                            <div className="prose prose-slate max-w-none">
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
                                <p className="text-slate-600 mb-6">
                                    Salestaxus LLC ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our business formation and tax compliance services.
                                </p>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">Personal Information</h3>
                                <p className="text-slate-600 mb-4">We may collect personal information that you voluntarily provide to us when you:</p>
                                <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
                                    <li>Register for an account</li>
                                    <li>Purchase our services</li>
                                    <li>Contact customer support</li>
                                    <li>Subscribe to our newsletter</li>
                                </ul>
                                <p className="text-slate-600 mb-6">This may include: name, email address, phone number, residential address, business name, EIN/ITIN, passport/ID documents, and payment information.</p>

                                <h3 className="text-lg font-semibold text-slate-900 mb-2">Automatically Collected Information</h3>
                                <p className="text-slate-600 mb-6">When you visit our website, we may automatically collect certain information about your device and browsing activity, including IP address, browser type, pages visited, and time spent on pages.</p>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
                                <p className="text-slate-600 mb-4">We use the information we collect to:</p>
                                <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
                                    <li>Provide and maintain our services</li>
                                    <li>Process transactions and send related information</li>
                                    <li>Send administrative information (updates, security alerts)</li>
                                    <li>Respond to your comments, questions, and requests</li>
                                    <li>Monitor and analyze trends, usage, and activities</li>
                                    <li>Comply with legal obligations (IRS, state tax authorities)</li>
                                </ul>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Information Sharing and Disclosure</h2>
                                <p className="text-slate-600 mb-6">We do not sell, trade, or rent your personal information to third parties. We may share information with:</p>
                                <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
                                    <li><strong>Government Authorities:</strong> IRS, state tax departments, Secretary of State offices (required for filings)</li>
                                    <li><strong>Service Providers:</strong> Payment processors, registered agents, tax software providers (TaxJar, etc.)</li>
                                    <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                                </ul>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Security</h2>
                                <p className="text-slate-600 mb-6">We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. International Data Transfers</h2>
                                <p className="text-slate-600 mb-6">As we serve international clients, your information may be transferred to and processed in the United States. By using our services, you consent to this transfer.</p>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Your Rights</h2>
                                <p className="text-slate-600 mb-4">Depending on your location, you may have the right to:</p>
                                <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
                                    <li>Access your personal information</li>
                                    <li>Correct inaccurate information</li>
                                    <li>Request deletion of your information</li>
                                    <li>Opt-out of marketing communications</li>
                                </ul>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Cookies and Tracking</h2>
                                <p className="text-slate-600 mb-6">We use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie settings through your browser preferences.</p>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Children's Privacy</h2>
                                <p className="text-slate-600 mb-6">Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.</p>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Changes to This Policy</h2>
                                <p className="text-slate-600 mb-6">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.</p>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Contact Us</h2>
                                <p className="text-slate-600 mb-6">If you have any questions about this Privacy Policy, please contact us at:</p>
                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                    <p className="text-slate-700 mb-2"><strong>Email:</strong> support@salestaxus.com</p>
                                    <p className="text-slate-700 mb-2"><strong>WhatsApp:</strong> +1 (307) 218-0376</p>
                                    <p className="text-slate-700"><strong>Address:</strong> 30 North Gould Street, Ste R, Sheridan, WY 82801</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}