import { SEO } from "@/components/SEO";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, Calculator, ShieldCheck, BookOpen } from "lucide-react";

export default function IncomeTaxCleanupPage() {
  return (
    <>
      <SEO 
        title="Income Tax & Cleanup | Salestaxus"
        description="Professional income tax preparation for corporations/LLCs and cleaning up prior year bookkeeping."
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
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-6">
              <Calculator className="h-10 w-10 text-indigo-600" />
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-4">Income Tax & Cleanup</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Professional income tax preparation for corporations/LLCs and cleaning up prior year bookkeeping.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader className="bg-indigo-50">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-indigo-600" />
                  Tax Preparation
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Form 1120 (C-Corp)</h3>
                    <p className="text-slate-600 text-sm">Complete corporate tax return preparation and filing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Form 1120-S (S-Corp)</h3>
                    <p className="text-slate-600 text-sm">S-Corporation returns with K-1 preparation for shareholders</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Form 1065 (Partnership/LLC)</h3>
                    <p className="text-slate-600 text-sm">Multi-member LLC and partnership tax returns</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900">State Income Tax Returns</h3>
                    <p className="text-slate-600 text-sm">Filing in all states where your business operates</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  Bookkeeping Cleanup
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Prior Year Catch-Up</h3>
                    <p className="text-slate-600 text-sm">Organize and categorize 1-3 years of missing bookkeeping</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Bank Reconciliation</h3>
                    <p className="text-slate-600 text-sm">Match all bank and credit card transactions to accounting records</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Financial Statements</h3>
                    <p className="text-slate-600 text-sm">Generate accurate P&L, balance sheet, and cash flow reports</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900">QuickBooks Setup</h3>
                    <p className="text-slate-600 text-sm">Configure or clean up your QuickBooks Online account</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-12 border-indigo-200">
            <CardHeader className="bg-indigo-50">
              <CardTitle className="text-2xl">Transparent Pricing</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                  <span className="font-semibold text-slate-900">Corporate Tax Return (1120/1120-S)</span>
                  <span className="text-2xl font-bold text-indigo-600">$800</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                  <span className="font-semibold text-slate-900">Partnership/LLC Return (1065)</span>
                  <span className="text-2xl font-bold text-indigo-600">$700</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                  <span className="font-semibold text-slate-900">Bookkeeping Cleanup (per year)</span>
                  <span className="text-2xl font-bold text-indigo-600">$500</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Get Your Books in Order</h2>
            <p className="text-slate-600 mb-6">Free consultation to assess your needs</p>
            <Link href="/signup">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 px-12 py-6 text-lg">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}