import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Building2, ArrowLeft, Truck, Mail, Calendar, Shield, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

export default function DeliveryPolicyPage() {
    const router = useRouter();

    return (
        <>
            <SEO title="Delivery Policy - Salestaxus LLC" description="Document delivery methods, processing times, and shipping information." />
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

                <div className="max-w-4xl mx-auto px-4 py-16">
                    <Card className="border-0 shadow-lg">
                        <CardContent className="p-8 md:p-12">
                            <div className="flex items-center gap-3 mb-6">
                                <Truck className="w-10 h-10 text-blue-600" />
                                <h1 className="text-4xl font-bold text-slate-900">Delivery Policy</h1>
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
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Document Delivery Methods</h2>
                                <p className="text-slate-600 mb-6">We offer two delivery methods for your documents:</p>
                                
                                <div className="space-y-4 mb-8">
                                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                        <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                            <FileText className="w-5 h-5 text-blue-600" />
                                            Digital Delivery (Standard - Free)
                                        </h4>
                                        <p className="text-slate-600 text-sm mb-3">All documents delivered via email and available in your online dashboard.</p>
                                        <ul className="text-slate-600 text-sm space-y-1">
                                            <li>✅ PDF format (printable)</li>
                                            <li>✅ Instant access upon completion</li>
                                            <li>✅ Secure cloud storage</li>
                                            <li>✅ Available worldwide</li>
                                        </ul>
                                    </div>

                                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                        <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                            <Truck className="w-5 h-5 text-green-600" />
                                            Physical Delivery (Optional - Additional Fee)
                                        </h4>
                                        <p className="text-slate-600 text-sm mb-3">Hard copies mailed to your address via courier service.</p>
                                        <ul className="text-slate-600 text-sm space-y-1">
                                            <li>✅ Certified copies available</li>
                                            <li>✅ Company seal (if applicable)</li>
                                            <li>✅ Tracking number provided</li>
                                            <li>✅ International shipping available</li>
                                        </ul>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Processing Times</h2>
                                <p className="text-slate-600 mb-6">Estimated processing times vary by service and government agency:</p>
                                
                                <div className="overflow-x-auto mb-8">
                                    <table className="w-full text-sm">
                                        <thead className="bg-slate-100">
                                            <tr>
                                                <th className="px-4 py-3 text-left font-semibold text-slate-900">Service</th>
                                                <th className="px-4 py-3 text-left font-semibold text-slate-900">Estimated Time</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200">
                                            <tr>
                                                <td className="px-4 py-3 text-slate-600">Wyoming LLC Formation</td>
                                                <td className="px-4 py-3 text-slate-600">1-3 business days</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-slate-600">Delaware LLC Formation</td>
                                                <td className="px-4 py-3 text-slate-600">1-5 business days</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-slate-600">UK Limited Company</td>
                                                <td className="px-4 py-3 text-slate-600">24-48 hours</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-slate-600">EIN (Non-US Residents)</td>
                                                <td className="px-4 py-3 text-slate-600">15-30 business days</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-slate-600">Sales Tax Permit</td>
                                                <td className="px-4 py-3 text-slate-600">2-6 weeks</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-slate-600">Delaware Franchise Tax</td>
                                                <td className="px-4 py-3 text-slate-600">3-5 business days</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="bg-amber-50 border-l-4 border-amber-600 p-6 mb-8">
                                    <p className="text-amber-800">
                                        <strong>Important:</strong> These are estimates based on current government processing times. Delays by IRS, Secretary of State, or tax authorities are beyond our control and do not qualify for refunds.
                                    </p>
                                </div>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Digital Delivery Details</h2>
                                <p className="text-slate-600 mb-6">For digital delivery:</p>
                                <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
                                    <li>Documents sent to email address on file</li>
                                    <li>Also available in your online dashboard</li>
                                    <li>PDF format (compatible with all devices)</li>
                                    <li>Digitally signed/sealed where applicable</li>
                                    <li>Download and print as needed</li>
                                </ul>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Physical Shipping Details</h2>
                                <p className="text-slate-600 mb-6">For physical delivery:</p>
                                
                                <div className="grid md:grid-cols-2 gap-4 mb-8">
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <h4 className="font-bold text-slate-900 mb-2">📦 US Shipping</h4>
                                        <ul className="text-slate-600 text-sm space-y-1">
                                            <li>USPS Priority Mail</li>
                                            <li>3-5 business days</li>
                                            <li>Tracking included</li>
                                            <li>Signature required (optional)</li>
                                        </ul>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <h4 className="font-bold text-slate-900 mb-2">🌍 International Shipping</h4>
                                        <ul className="text-slate-600 text-sm space-y-1">
                                            <li>DHL/FedEx Express</li>
                                            <li>5-10 business days</li>
                                            <li>Tracking included</li>
                                            <li>Customs fees may apply</li>
                                        </ul>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Shipping Costs</h2>
                                <p className="text-slate-600 mb-6">Physical delivery fees:</p>
                                <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
                                    <li><strong>Domestic (US):</strong> $25-50 depending on service</li>
                                    <li><strong>International:</strong> $75-150 depending on destination</li>
                                    <li><strong>Express Shipping:</strong> Available for additional fee</li>
                                    <li><strong>Customs/Duties:</strong> Client's responsibility for international orders</li>
                                </ul>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Delivery Address</h2>
                                <p className="text-slate-600 mb-6">Documents will be sent to the address provided during checkout. To change delivery address:</p>
                                <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
                                    <li>Contact us before documents are shipped</li>
                                    <li>Address changes after shipping may incur additional fees</li>
                                    <li>We are not responsible for undeliverable addresses</li>
                                </ul>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Lost or Damaged Documents</h2>
                                <p className="text-slate-600 mb-6">If documents are lost or damaged in transit:</p>
                                <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
                                    <li>Contact us within 30 days of expected delivery</li>
                                    <li>We will request tracking investigation</li>
                                    <li>Replacement documents sent at no charge</li>
                                    <li>Government re-filing fees may apply for certified copies</li>
                                </ul>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Tracking Your Order</h2>
                                <p className="text-slate-600 mb-6">You can track your order status:</p>
                                <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
                                    <li>Check your online dashboard</li>
                                    <li>Email notifications at each stage</li>
                                    <li>Tracking number provided for physical shipments</li>
                                    <li>Contact support for status updates</li>
                                </ul>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">9. International Clients</h2>
                                <p className="text-slate-600 mb-6">For international clients:</p>
                                <ul className="list-disc list-inside text-slate-600 mb-6 space-y-2">
                                    <li>Digital delivery recommended (faster, no customs)</li>
                                    <li>Physical shipping available to most countries</li>
                                    <li>Customs/duties are client's responsibility</li>
                                    <li>Some countries may have import restrictions</li>
                                    <li>Tracking provided for all international shipments</li>
                                </ul>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Contact Us</h2>
                                <p className="text-slate-600 mb-6">For delivery questions or issues:</p>
                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                    <p className="text-slate-700 mb-2"><strong>Email:</strong> support@salestaxus.com</p>
                                    <p className="text-slate-700 mb-2"><strong>WhatsApp:</strong> +1 (307) 218-0376</p>
                                    <p className="text-slate-700"><strong>Response Time:</strong> 24-48 hours</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}