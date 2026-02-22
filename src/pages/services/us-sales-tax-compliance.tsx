import { SEO } from "@/components/SEO";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, FileText, ShieldCheck, DollarSign, Calendar } from "lucide-react";

export default function USSalesTaxCompliancePage() {
  return (
    <>
      <SEO 
        title="US Sales Tax Compliance | Salestaxus"
        description="Professional preparation, registration, and filing of monthly, quarterly, or yearly US sales tax returns across multiple states."
      />

      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl text-blue-900 flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
              Salestaxus LLC
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16 max-w-5xl">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <FileText className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-4">US Sales Tax Compliance</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Preparation, registration, and filing of monthly, quarterly, or yearly US sales tax returns across multiple states.
            </p>
          </div>

          {/* What's Included */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">What's Included</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Multi-State Registration</h3>
                  <p className="text-slate-600 text-sm">We register your business for sales tax permits in all required states based on economic nexus thresholds.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Monthly/Quarterly/Annual Filing</h3>
                  <p className="text-slate-600 text-sm">Choose your filing frequency. We handle all calculations, exemptions, and submissions to state tax authorities.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Compliance Monitoring</h3>
                  <p className="text-slate-600 text-sm">We track changing sales tax laws and notify you of new nexus obligations or rate changes.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Audit Support</h3>
                  <p className="text-slate-600 text-sm">Full documentation and representation if your business is selected for a sales tax audit.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card className="mb-12 border-blue-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-2xl flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-blue-600" />
                Transparent Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-slate-50 rounded-lg">
                  <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Monthly Filing</h3>
                  <p className="text-3xl font-bold text-blue-600 mb-2">$150<span className="text-sm text-slate-500">/state</span></p>
                  <p className="text-sm text-slate-600">Per state, per month</p>
                </div>
                <div className="text-center p-6 bg-slate-50 rounded-lg">
                  <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Quarterly Filing</h3>
                  <p className="text-3xl font-bold text-blue-600 mb-2">$120<span className="text-sm text-slate-500">/state</span></p>
                  <p className="text-sm text-slate-600">Per state, per quarter</p>
                </div>
                <div className="text-center p-6 bg-slate-50 rounded-lg">
                  <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Annual Filing</h3>
                  <p className="text-3xl font-bold text-blue-600 mb-2">$300<span className="text-sm text-slate-500">/state</span></p>
                  <p className="text-sm text-slate-600">Per state, per year</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Link href="/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-12 py-6 text-lg">
                Get Started Today
              </Button>
            </Link>
            <p className="text-sm text-slate-500 mt-4">Free consultation • No hidden fees</p>
          </div>
        </main>
      </div>
    </>
  );
}