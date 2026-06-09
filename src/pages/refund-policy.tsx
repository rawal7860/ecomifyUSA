import { SEO } from "@/components/SEO";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Clock, DollarSign } from "lucide-react";
import Footer from "@/components/Footer";

export default function RefundPolicyPage() {
  return (
    <>
      <SEO
        title="Refund Policy - ecomifyUSA"
        description="Understand our refund policy for LLC formation and tax compliance services"
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
              <h1 className="text-4xl font-bold text-slate-900 mb-4">Refund Policy</h1>
              <p className="text-slate-600 text-lg">Fair and transparent refund terms for all our services</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6">
                  <Shield className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-lg mb-2">100% Guarantee</h3>
                  <p className="text-sm text-slate-600">Full refund if we cannot deliver the promised service</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Clock className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-lg mb-2">30-Day Window</h3>
                  <p className="text-sm text-slate-600">Request refunds within 30 days of service completion</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <DollarSign className="w-8 h-8 text-indigo-600 mb-3" />
                  <h3 className="font-bold text-lg mb-2">State Fees Non-Refundable</h3>
                  <p className="text-sm text-slate-600">Official government fees cannot be refunded once paid</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Refund Eligibility</h2>
                <div className="space-y-3 text-slate-600">
                  <p>You are eligible for a full refund if:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>We are unable to complete the service you paid for</li>
                    <li>There is a significant delay (over 60 days) due to our error</li>
                    <li>You cancel within 24 hours of placing the order (before work begins)</li>
                    <li>We make an error that cannot be corrected</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Non-Refundable Items</h2>
                <div className="space-y-3 text-slate-600">
                  <p>The following are non-refundable:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>State Filing Fees:</strong> Official government fees paid to state agencies</li>
                    <li><strong>Completed Services:</strong> Services that have been fully delivered</li>
                    <li><strong>Third-Party Costs:</strong> Registered agent fees, expedited processing fees</li>
                    <li><strong>Consultation Fees:</strong> Time spent on consultation calls or meetings</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Refund Process</h2>
                <div className="space-y-3 text-slate-600">
                  <p>To request a refund:</p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Email us at <a href="mailto:support@ecomifyusa.com" className="text-blue-600 hover:underline">support@ecomifyusa.com</a> with your order number</li>
                    <li>Explain the reason for your refund request</li>
                    <li>We will review your request within 2-3 business days</li>
                    <li>If approved, refunds are processed within 5-7 business days</li>
                    <li>Refunds are issued to the original payment method</li>
                  </ol>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Partial Refunds</h2>
                <div className="space-y-3 text-slate-600">
                  <p>Partial refunds may be issued when:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Some services have been completed but not all</li>
                    <li>You cancel mid-process after work has begun</li>
                    <li>We have incurred costs on your behalf (state fees, registered agent setup)</li>
                  </ul>
                  <p>Partial refund amount = Total paid - (State fees + Work completed + Third-party costs)</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Chargebacks</h2>
                <div className="space-y-3 text-slate-600">
                  <p>Please contact us before filing a chargeback. Chargebacks:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Delay the resolution process</li>
                    <li>May result in suspension of services</li>
                    <li>Incur additional fees that may be passed to you</li>
                  </ul>
                  <p>We are committed to resolving all issues fairly and quickly.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Contact Us</h2>
                <div className="space-y-3 text-slate-600">
                  <p>For refund inquiries or questions about this policy:</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="font-medium text-blue-900 mb-2">Contact Information</p>
                    <p>Email: <a href="mailto:support@ecomifyusa.com" className="text-blue-600 hover:underline">support@ecomifyusa.com</a></p>
                    <p>WhatsApp: <a href="https://wa.me/13072180376" target="_blank" className="text-blue-600 hover:underline">+1 (307) 218-0376</a></p>
                    <p>Business Hours: Monday - Friday, 9 AM - 6 PM EST</p>
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