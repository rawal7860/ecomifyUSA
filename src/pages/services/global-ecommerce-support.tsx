import { SEO } from "@/components/SEO";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, Globe2, ShieldCheck, FileCheck } from "lucide-react";

export default function GlobalEcommerceSupportPage() {
  return (
    <>
      <SEO 
        title="Global E-commerce Support | Salestaxus"
        description="Handling HMRC filings and providing tailored document approval support for international sellers."
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-100 rounded-full mb-6">
              <Globe2 className="h-10 w-10 text-cyan-600" />
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-4">Global E-commerce Support</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Handling HMRC filings and providing tailored document approval support for international sellers.
            </p>
          </div>

          <Card className="mb-12 bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Globe2 className="h-6 w-6 text-cyan-600" />
                Expand Beyond US Borders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 leading-relaxed">
                Selling on Amazon UK, eBay Europe, or other international marketplaces? We help you navigate VAT registration, 
                HMRC compliance, and document verification requirements across multiple countries.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">UK & EU Tax Compliance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">VAT Registration (UK/EU)</h3>
                  <p className="text-slate-600 text-sm">Register for VAT in the UK and EU countries where you exceed thresholds or store inventory.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">HMRC Filing Services</h3>
                  <p className="text-slate-600 text-sm">Quarterly or monthly Making Tax Digital (MTD) VAT returns filed directly with HMRC.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">OSS/IOSS Registration</h3>
                  <p className="text-slate-600 text-sm">One-Stop Shop and Import One-Stop Shop registration for simplified EU-wide VAT compliance.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Amazon UK/EU Compliance</h3>
                  <p className="text-slate-600 text-sm">Ensure your Amazon seller account meets all VAT requirements across European marketplaces.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileCheck className="h-6 w-6 text-cyan-600" />
                Document Approval Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Amazon Seller Verification</h3>
                  <p className="text-slate-600 text-sm">Prepare and submit documents for Amazon account verification (passport, utility bills, tax documents).</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Marketplace Compliance Reviews</h3>
                  <p className="text-slate-600 text-sm">Respond to eBay, Etsy, or other platform compliance requests with properly formatted documentation.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Import/Export Documentation</h3>
                  <p className="text-slate-600 text-sm">Customs declarations, commercial invoices, and certificates of origin for international shipments.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center bg-gradient-to-r from-cyan-50 to-blue-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Sell Globally with Confidence</h2>
            <p className="text-slate-600 mb-6">Custom pricing based on countries and transaction volume</p>
            <Link href="/signup">
              <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 px-12 py-6 text-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}