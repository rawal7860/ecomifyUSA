import { SEO } from "@/components/SEO";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Shield, Lock, Eye } from "lucide-react";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy - ecomifyUSA"
        description="Learn how ecomifyUSA protects your personal information and privacy"
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
              <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
              <p className="text-slate-600 text-lg">Your privacy is our priority</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6">
                  <Shield className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Data Protection</h3>
                  <p className="text-sm text-slate-600">Your information is encrypted and securely stored</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Lock className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-lg mb-2">No Selling</h3>
                  <p className="text-sm text-slate-600">We never sell your data to third parties</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Eye className="w-8 h-8 text-indigo-600 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Transparency</h3>
                  <p className="text-sm text-slate-600">Clear disclosure of how we use your data</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
                <div className="space-y-3 text-slate-600">
                  <p>We collect the following types of information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Personal Information:</strong> Name, email, phone number, address</li>
                    <li><strong>Business Information:</strong> Business name, EIN, state of formation</li>
                    <li><strong>Payment Information:</strong> Credit card details (processed by Stripe, not stored by us)</li>
                    <li><strong>Usage Data:</strong> IP address, browser type, pages visited, time spent</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
                <div className="space-y-3 text-slate-600">
                  <p>We use your information to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Process your orders and provide our services</li>
                    <li>Communicate with you about your orders and services</li>
                    <li>Send you important updates and notifications</li>
                    <li>Improve our website and services</li>
                    <li>Comply with legal obligations</li>
                    <li>Prevent fraud and ensure security</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Information Sharing</h2>
                <div className="space-y-3 text-slate-600">
                  <p>We may share your information with:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Government Agencies:</strong> When required for LLC formation and tax filings</li>
                    <li><strong>Service Providers:</strong> Stripe (payments), Supabase (data storage), email providers</li>
                    <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                  </ul>
                  <p className="font-medium">We NEVER sell your personal information to third parties.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Data Security</h2>
                <div className="space-y-3 text-slate-600">
                  <p>We protect your data using:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>SSL/TLS encryption for all data transmission</li>
                    <li>Secure cloud storage with Supabase</li>
                    <li>Regular security audits and updates</li>
                    <li>Access controls and authentication</li>
                    <li>PCI-DSS compliant payment processing (Stripe)</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Your Rights</h2>
                <div className="space-y-3 text-slate-600">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your data (subject to legal obligations)</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Export your data</li>
                  </ul>
                  <p>To exercise these rights, email us at <a href="mailto:support@ecomifyusa.com" className="text-blue-600 hover:underline">support@ecomifyusa.com</a></p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Cookies and Tracking</h2>
                <div className="space-y-3 text-slate-600">
                  <p>We use cookies and similar technologies to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Remember your preferences and settings</li>
                    <li>Analyze website traffic and usage patterns</li>
                    <li>Improve user experience</li>
                  </ul>
                  <p>You can disable cookies in your browser settings, but some features may not work properly.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Data Retention</h2>
                <div className="space-y-3 text-slate-600">
                  <p>We retain your information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>For as long as you have an active account</li>
                    <li>For 7 years after service completion (IRS requirement)</li>
                    <li>As required by law or legal obligations</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Children's Privacy</h2>
                <div className="space-y-3 text-slate-600">
                  <p>Our services are not intended for individuals under 18. We do not knowingly collect personal information from children.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Changes to This Policy</h2>
                <div className="space-y-3 text-slate-600">
                  <p>We may update this policy from time to time. We will notify you of significant changes via email or website notice.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Contact Us</h2>
                <div className="space-y-3 text-slate-600">
                  <p>For privacy-related questions:</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="font-medium text-blue-900 mb-2">Contact Information</p>
                    <p>Email: <a href="mailto:support@ecomifyusa.com" className="text-blue-600 hover:underline">support@ecomifyusa.com</a></p>
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