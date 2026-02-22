import { SEO } from "@/components/SEO";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, Building2, ShieldCheck, Globe } from "lucide-react";

export default function LLCFormationStructuringPage() {
  return (
    <>
      <SEO 
        title="LLC Formation & Structuring | Salestaxus"
        description="End-to-end US LLC formation for non-residents, including EIN acquisition and registered agent setup."
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
              <Building2 className="h-10 w-10 text-purple-600" />
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-4">LLC Formation & Structuring</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              End-to-end US LLC formation for non-residents, including EIN acquisition and registered agent setup.
            </p>
          </div>

          <Card className="mb-12 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Globe className="h-6 w-6 text-purple-600" />
                Perfect for International Entrepreneurs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 leading-relaxed">
                We specialize in helping non-US residents establish legitimate business entities in the United States. 
                Our service removes barriers like physical presence requirements, complex paperwork, and IRS navigation.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Complete Formation Package</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">State Selection Consultation</h3>
                  <p className="text-slate-600 text-sm">We help you choose the best state for your LLC based on tax benefits, fees, and compliance requirements.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Articles of Organization Filing</h3>
                  <p className="text-slate-600 text-sm">Complete preparation and submission of formation documents to the state.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">EIN Acquisition (IRS Tax ID)</h3>
                  <p className="text-slate-600 text-sm">We obtain your Federal Employer Identification Number from the IRS - required to open US bank accounts.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Registered Agent Service (1 Year)</h3>
                  <p className="text-slate-600 text-sm">Professional registered agent to receive legal documents on behalf of your LLC.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Operating Agreement</h3>
                  <p className="text-slate-600 text-sm">Custom operating agreement tailored to your business structure and ownership.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Start Your US Business Today</h2>
            <p className="text-slate-600 mb-6">Full formation package starting at $150 + state fees</p>
            <Link href="/">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 px-12 py-6 text-lg">
                Choose Your State
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}