import { SEO } from "@/components/SEO";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, Mail, FileText } from "lucide-react";
import Footer from "@/components/Footer";

export default function DeliveryPolicyPage() {
  return (
    <>
      <SEO
        title="Delivery Policy - ecomifyUSA"
        description="Learn about our document delivery process and timelines"
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Link href="/">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
              </Button>
            </Link>

            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">Delivery Policy</h1>
              <p className="text-slate-600 text-lg">Fast, reliable delivery of your business documents</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6">
                  <Clock className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Fast Processing</h3>
                  <p className="text-sm text-slate-600">Most orders processed within 2-5 business days</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Mail className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Email Delivery</h3>
                  <p className="text-sm text-slate-600">All documents sent securely via email</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <FileText className="w-8 h-8 text-indigo-600 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Digital Format</h3>
                  <p className="text-sm text-slate-600">High-quality PDF documents ready to use</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Delivery Method</h2>
                <div className="space-y-3 text-slate-600">
                  <p>All documents are delivered electronically via email:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Email Delivery:</strong> PDF documents sent to your registered email address</li>
                    <li><strong>Dashboard Access:</strong> Account holders can download documents anytime from their dashboard</li>
                    <li><strong>Secure Storage:</strong> Documents stored securely in your account for 7 years</li>
                  </ul>
                  <p className="font-medium">We do NOT send physical documents by mail unless specifically requested (additional fees apply).</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Processing Timeline</h2>
                <div className="space-y-3 text-slate-600">
                  <p>Processing times vary by service type:</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                    <div>
                      <p className="font-semibold text-blue-900">LLC Formation</p>
                      <p className="text-sm">2-5 business days (standard) | 1-2 business days (expedited)</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">EIN Application</p>
                      <p className="text-sm">1-3 business days</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Sales Tax Registration</p>
                      <p className="text-sm">3-7 business days</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Delaware Franchise Tax</p>
                      <p className="text-sm">1-2 business days</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Tax Exemption Certificates</p>
                      <p className="text-sm">2-4 business days</p>
                    </div>
                  </div>
                  <p className="font-medium">Note: These are estimated timelines. Actual processing times may vary based on government agency workload.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. What You'll Receive</h2>
                <div className="space-y-3 text-slate-600">
                  <p>Your delivery package includes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Formation Documents:</strong> Articles of Organization, Certificate of Formation</li>
                    <li><strong>EIN Confirmation Letter:</strong> Official IRS letter with your tax ID number</li>
                    <li><strong>Operating Agreement:</strong> Customized for your LLC (if included in your package)</li>
                    <li><strong>Compliance Documents:</strong> Sales tax permits, tax exemption certificates (as applicable)</li>
                    <li><strong>Instructions:</strong> Step-by-step guide for next steps</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Order Tracking</h2>
                <div className="space-y-3 text-slate-600">
                  <p>Stay updated on your order status:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Email Updates:</strong> Receive notifications at each stage of processing</li>
                    <li><strong>WhatsApp Updates:</strong> Optional real-time updates via WhatsApp</li>
                    <li><strong>Dashboard Tracking:</strong> Account holders can view order status anytime</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Expedited Processing</h2>
                <div className="space-y-3 text-slate-600">
                  <p>Need your documents faster?</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Rush Processing:</strong> 1-2 business day delivery (additional $99)</li>
                    <li><strong>Same-Day Processing:</strong> Available for select services (additional $199)</li>
                    <li><strong>Priority Support:</strong> Dedicated account manager for expedited orders</li>
                  </ul>
                  <p>Expedited processing is subject to availability and may not be available in all states.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Delivery Delays</h2>
                <div className="space-y-3 text-slate-600">
                  <p>Delays may occur due to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Government agency backlogs or holidays</li>
                    <li>Incomplete or inaccurate information provided</li>
                    <li>Additional documentation requests from agencies</li>
                    <li>Payment processing delays</li>
                  </ul>
                  <p className="font-medium">We will notify you immediately if any delays occur and provide updated timelines.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Missing Documents</h2>
                <div className="space-y-3 text-slate-600">
                  <p>If you haven't received your documents:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Check your spam/junk folder</li>
                    <li>Verify your email address is correct in your account settings</li>
                    <li>Contact us at <a href="mailto:support@ecomifyusa.com" className="text-blue-600 hover:underline">support@ecomifyusa.com</a></li>
                    <li>We'll resend documents within 24 hours</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Physical Documents</h2>
                <div className="space-y-3 text-slate-600">
                  <p>Need physical copies?</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Certified Copies:</strong> Available upon request (additional $49 + shipping)</li>
                    <li><strong>Shipping Options:</strong> USPS Priority Mail, FedEx, UPS</li>
                    <li><strong>International Shipping:</strong> Available to most countries</li>
                    <li><strong>Delivery Time:</strong> 3-7 business days (domestic), 7-14 days (international)</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Document Security</h2>
                <div className="space-y-3 text-slate-600">
                  <p>Your documents are protected:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>SSL/TLS encryption for email transmission</li>
                    <li>Password-protected PDF files (optional)</li>
                    <li>Secure cloud storage with Supabase</li>
                    <li>Access controls and authentication</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Contact Us</h2>
                <div className="space-y-3 text-slate-600">
                  <p>For delivery-related questions:</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="font-medium text-blue-900 mb-2">Contact Information</p>
                    <p>Email: <a href="mailto:support@ecomifyusa.com" className="text-blue-600 hover:underline">support@ecomifyusa.com</a></p>
                    <p>WhatsApp: <a href="https://wa.me/13072180376" target="_blank" className="text-blue-600 hover:underline">+1 (307) 218-0376</a></p>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-8 text-center text-sm text-slate-500">
              <p>Last Updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}