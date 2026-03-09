import { SEO } from "@/components/SEO";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Lock, CheckCircle } from "lucide-react";
import Footer from "@/components/Footer";

export default function PaymentPolicyPage() {
  return (
    <>
      <SEO
        title="Payment Policy - ecomifyUSA"
        description="Learn about our secure payment methods and billing practices"
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
              <h1 className="text-4xl font-bold text-slate-900 mb-4">Payment Policy</h1>
              <p className="text-slate-600 text-lg">Secure, transparent, and flexible payment options</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6">
                  <CreditCard className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Multiple Methods</h3>
                  <p className="text-sm text-slate-600">Credit cards, debit cards, and bank transfers accepted</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Lock className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Secure Processing</h3>
                  <p className="text-sm text-slate-600">PCI-DSS compliant payments through Stripe</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <CheckCircle className="w-8 h-8 text-indigo-600 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Instant Confirmation</h3>
                  <p className="text-sm text-slate-600">Get email confirmation immediately after payment</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Payment Methods</h2>
                <div className="space-y-3 text-slate-600">
                  <p>We accept the following payment methods through Stripe:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Credit Cards:</strong> Visa, Mastercard, American Express, Discover</li>
                    <li><strong>Debit Cards:</strong> All major debit cards</li>
                    <li><strong>Bank Transfers:</strong> ACH transfers (US customers)</li>
                    <li><strong>Digital Wallets:</strong> Apple Pay, Google Pay</li>
                  </ul>
                  <p className="font-medium">We do NOT accept: Cash, checks, cryptocurrency, or PayPal.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Payment Processing</h2>
                <div className="space-y-3 text-slate-600">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All payments are processed through <strong>Stripe</strong>, a secure PCI-DSS Level 1 certified payment processor</li>
                    <li>We do NOT store your credit card information on our servers</li>
                    <li>Payment is required at the time of order placement</li>
                    <li>You will receive a Stripe invoice via email after checkout</li>
                    <li>Complete payment through the secure Stripe invoice link</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Pricing Structure</h2>
                <div className="space-y-3 text-slate-600">
                  <p>Our pricing includes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Service Fee:</strong> Our professional fee for handling your formation/filing</li>
                    <li><strong>State Filing Fee:</strong> Official government fee (varies by state)</li>
                    <li><strong>Add-on Services:</strong> Optional extras (expedited processing, registered agent, etc.)</li>
                  </ul>
                  <p>All fees are clearly displayed during checkout. No hidden charges.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. When Payment is Due</h2>
                <div className="space-y-3 text-slate-600">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Payment is due <strong>immediately upon order placement</strong></li>
                    <li>Work begins after payment is received</li>
                    <li>For recurring services (annual filings), payment is due on the anniversary date</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Failed Payments</h2>
                <div className="space-y-3 text-slate-600">
                  <p>If your payment fails:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You will receive an email notification</li>
                    <li>Your order will be placed on hold</li>
                    <li>You have 7 days to complete payment</li>
                    <li>After 7 days, the order may be cancelled</li>
                  </ul>
                  <p>Common reasons for payment failure: Insufficient funds, expired card, incorrect billing address, bank decline.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Currency</h2>
                <div className="space-y-3 text-slate-600">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All prices are in <strong>USD (US Dollars)</strong></li>
                    <li>For UK services, prices may be shown in GBP but charged in USD equivalent</li>
                    <li>Your bank may charge currency conversion fees</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Invoices and Receipts</h2>
                <div className="space-y-3 text-slate-600">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You will receive a Stripe invoice via email immediately after checkout</li>
                    <li>After payment, you will receive a receipt from Stripe</li>
                    <li>You can download invoices from your Stripe dashboard</li>
                    <li>For account holders, invoices are also available in your ecomifyUSA dashboard</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Refunds</h2>
                <div className="space-y-3 text-slate-600">
                  <p>Refunds are processed according to our <Link href="/refund-policy" className="text-blue-600 hover:underline">Refund Policy</Link>.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Refunds are issued to the original payment method</li>
                    <li>Processing time: 5-7 business days</li>
                    <li>State filing fees are non-refundable</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Security</h2>
                <div className="space-y-3 text-slate-600">
                  <p>Your payment security is our priority:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>SSL/TLS encryption for all transactions</li>
                    <li>PCI-DSS Level 1 compliance (Stripe)</li>
                    <li>3D Secure authentication for supported cards</li>
                    <li>Fraud detection and prevention systems</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Contact Us</h2>
                <div className="space-y-3 text-slate-600">
                  <p>For payment-related questions:</p>
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