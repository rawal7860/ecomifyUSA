import { SEO } from "@/components/SEO";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, FileText, Scale, AlertCircle } from "lucide-react";
import Footer from "@/components/Footer";

export default function TermsOfServicePage() {
  return (
    <>
      <SEO
        title="Terms of Service - ecomifyUSA"
        description="Read the terms and conditions for using ecomifyUSA services"
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
              <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
              <p className="text-slate-600 text-lg">Please read these terms carefully before using our services</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6">
                  <FileText className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Clear Terms</h3>
                  <p className="text-sm text-slate-600">No hidden clauses or confusing legal jargon</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Scale className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Fair Practices</h3>
                  <p className="text-sm text-slate-600">We treat all customers equally and fairly</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <AlertCircle className="w-8 h-8 text-indigo-600 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Your Responsibilities</h3>
                  <p className="text-sm text-slate-600">Understand your obligations as a client</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
                <div className="space-y-3 text-slate-600">
                  <p>By accessing and using ecomifyUSA services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Services Provided</h2>
                <div className="space-y-3 text-slate-600">
                  <p>ecomifyUSA provides:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>US LLC formation and registration services</li>
                    <li>UK Limited Company formation</li>
                    <li>EIN (Employer Identification Number) acquisition</li>
                    <li>Sales tax compliance and filing</li>
                    <li>Delaware Franchise Tax filing</li>
                    <li>Tax exemption certificates</li>
                    <li>Business consulting and support</li>
                  </ul>
                  <p className="font-medium">We act as your authorized agent to file documents with government agencies.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Your Responsibilities</h2>
                <div className="space-y-3 text-slate-600">
                  <p>You agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate and complete information</li>
                    <li>Respond to our requests in a timely manner</li>
                    <li>Pay all fees and charges promptly</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Not use our services for illegal purposes</li>
                    <li>Maintain the confidentiality of your account credentials</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Fees and Payments</h2>
                <div className="space-y-3 text-slate-600">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All fees are listed on our website and are subject to change</li>
                    <li>Payment is due immediately upon placing an order</li>
                    <li>We accept payments via Stripe (credit cards, bank transfers)</li>
                    <li>State filing fees are separate from our service fees</li>
                    <li>Refunds are subject to our Refund Policy</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Service Timeline</h2>
                <div className="space-y-3 text-slate-600">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Processing times vary by state and service type</li>
                    <li>We provide estimated timelines, not guarantees</li>
                    <li>Delays may occur due to government processing times</li>
                    <li>Expedited services are available for additional fees</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Limitation of Liability</h2>
                <div className="space-y-3 text-slate-600">
                  <p>ecomifyUSA is not liable for:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Government agency errors or delays</li>
                    <li>Rejection of your application due to incomplete or inaccurate information</li>
                    <li>Changes in laws or regulations</li>
                    <li>Indirect, incidental, or consequential damages</li>
                  </ul>
                  <p className="font-medium">Our total liability is limited to the amount you paid for the service.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Intellectual Property</h2>
                <div className="space-y-3 text-slate-600">
                  <p>All content on ecomifyusa.com (text, graphics, logos, images) is owned by ecomifyUSA and protected by copyright laws. You may not copy, reproduce, or distribute our content without permission.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Privacy</h2>
                <div className="space-y-3 text-slate-600">
                  <p>Your use of our services is also governed by our <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Termination</h2>
                <div className="space-y-3 text-slate-600">
                  <p>We reserve the right to terminate or suspend your account if you:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Violate these Terms of Service</li>
                    <li>Provide false or misleading information</li>
                    <li>Engage in fraudulent activity</li>
                    <li>Fail to pay fees</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Governing Law</h2>
                <div className="space-y-3 text-slate-600">
                  <p>These terms are governed by the laws of Wyoming, USA. Any disputes will be resolved in the courts of Wyoming.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Changes to Terms</h2>
                <div className="space-y-3 text-slate-600">
                  <p>We may update these Terms of Service at any time. Continued use of our services after changes constitutes acceptance of the new terms.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Contact Us</h2>
                <div className="space-y-3 text-slate-600">
                  <p>For questions about these terms:</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="font-medium text-blue-900 mb-2">Contact Information</p>
                    <p>Email: <a href="mailto:support@ecomifyusa.com" className="text-blue-600 hover:underline">support@ecomifyusa.com</a></p>
                    <p>WhatsApp: <a href="https://wa.me/13072180376" target="_blank" className="text-blue-600 hover:underline">+1 (307) 218-0376</a></p>
                    <p>Address: 30 North Gould Street, Ste R, Sheridan, WY 82801</p>
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