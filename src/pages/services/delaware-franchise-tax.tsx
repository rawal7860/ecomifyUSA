import { SEO } from "@/components/SEO";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, FileCheck, ShieldCheck, AlertTriangle, Calendar } from "lucide-react";

export default function DelawareFranchiseTaxPage() {
  return (
    <>
      <SEO 
        title="Delaware Franchise Tax Filing | Salestaxus"
        description="Expert, timely filing of Delaware Franchise Tax and annual reports to maintain good standing."
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-6">
              <FileCheck className="h-10 w-10 text-amber-600" />
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-4">Delaware Franchise Tax</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Expert, timely filing of Delaware Franchise Tax and annual reports to maintain good standing.
            </p>
          </div>

          <Card className="mb-12 border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
                Don't Risk Penalties or Loss of Good Standing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 leading-relaxed">
                Delaware requires all LLCs and corporations to file annual franchise tax and annual reports by <strong>March 1st</strong>. 
                Missing this deadline results in $200 penalties, interest charges, and potential loss of good standing status.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">What We Handle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Franchise Tax Calculation</h3>
                  <p className="text-slate-600 text-sm">We determine the correct tax amount based on your entity type and authorized shares method.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Annual Report Filing</h3>
                  <p className="text-slate-600 text-sm">Complete and submit your Delaware Annual Report to the Division of Corporations.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Payment Processing</h3>
                  <p className="text-slate-600 text-sm">We handle the payment of franchise tax and filing fees directly to the state.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Good Standing Certificate</h3>
                  <p className="text-slate-600 text-sm">Obtain an official Certificate of Good Standing after filing (required for banking, loans, etc.).</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-12 border-blue-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Calendar className="h-6 w-6 text-blue-600" />
                Annual Service Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-slate-50 rounded-lg border-2 border-blue-300">
                  <h3 className="font-bold text-lg mb-2">LLC Filing</h3>
                  <p className="text-4xl font-bold text-blue-600 mb-2">$250</p>
                  <p className="text-sm text-slate-600">Includes $300 state franchise tax</p>
                </div>
                <div className="text-center p-6 bg-slate-50 rounded-lg border-2 border-blue-300">
                  <h3 className="font-bold text-lg mb-2">Corporation Filing</h3>
                  <p className="text-4xl font-bold text-blue-600 mb-2">$350</p>
                  <p className="text-sm text-slate-600">Tax calculated based on shares</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center bg-gradient-to-r from-amber-50 to-blue-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Avoid Late Penalties</h2>
            <p className="text-slate-600 mb-6">Let us handle your Delaware filing before the March 1st deadline</p>
            <Link href="/signup">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 px-12 py-6 text-lg">
                File Now
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}