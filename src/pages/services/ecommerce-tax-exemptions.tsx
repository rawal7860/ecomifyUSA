import { SEO } from "@/components/SEO";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, ShoppingCart, ShieldCheck, Package } from "lucide-react";

export default function EcommerceTaxExemptionsPage() {
  return (
    <>
      <SEO 
        title="E-commerce Tax Exemptions | Salestaxus"
        description="Streamlining the process to secure resale certificates for Amazon, Walmart, and Home Depot."
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <ShoppingCart className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-4">E-commerce Tax Exemptions</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Streamlining the process to secure resale certificates for Amazon, Walmart, and Home Depot.
            </p>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Supported Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <Package className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Amazon</h3>
                  <p className="text-sm text-slate-600">FBA and Seller Central resale certificates</p>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <Package className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Walmart</h3>
                  <p className="text-sm text-slate-600">Marketplace seller exemption certificates</p>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <Package className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Home Depot</h3>
                  <p className="text-sm text-slate-600">Pro and commercial account exemptions</p>
                </div>
              </div>
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
                  <h3 className="font-semibold text-slate-900">State-by-State Resale Certificates</h3>
                  <p className="text-slate-600 text-sm">We obtain valid resale certificates in all states where you have nexus or inventory.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Platform Submission</h3>
                  <p className="text-slate-600 text-sm">We upload and manage certificates directly in Amazon Seller Central, Walmart Marketplace, etc.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Renewal Management</h3>
                  <p className="text-slate-600 text-sm">Track expiration dates and renew certificates before they lapse to avoid sales tax collection issues.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to Save on Sales Tax?</h2>
            <p className="text-slate-600 mb-6">Starting at $200 per state</p>
            <Link href="/signup">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 px-12 py-6 text-lg">
                Get Your Certificates
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}