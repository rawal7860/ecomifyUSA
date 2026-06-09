import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { TrustBadge } from "@/components/TrustBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Check, ShieldCheck, Building2, FileText, CheckCircle, DollarSign } from "lucide-react";
import { ukData, convertGBPtoUSD, GBP_TO_USD } from "@/lib/ukData";

export default function UKServicePage() {
  const router = useRouter();
  const { country: countryParam } = router.query;
  
  const countryInfo = typeof countryParam === 'string' 
    ? ukData[countryParam.toUpperCase()] 
    : null;

  const [entityType, setEntityType] = useState("Limited Company");
  const [includeVAT, setIncludeVAT] = useState(false);
  const [includeAnnualFiling, setIncludeAnnualFiling] = useState(false);
  
  // Pricing in GBP
  const SERVICE_FEE_GBP = 150;
  const VAT_REGISTRATION_GBP = 75;
  const ANNUAL_FILING_GBP = 200;
  
  // Convert to USD
  const SERVICE_FEE_USD = convertGBPtoUSD(SERVICE_FEE_GBP);
  const VAT_REGISTRATION_USD = convertGBPtoUSD(VAT_REGISTRATION_GBP);
  const ANNUAL_FILING_USD = convertGBPtoUSD(ANNUAL_FILING_GBP);
  
  const [totalGBP, setTotalGBP] = useState(0);
  const [totalUSD, setTotalUSD] = useState(0);

  useEffect(() => {
    if (countryInfo) {
      let calcTotalGBP = countryInfo.formationFee + countryInfo.confirmationStatementFee + SERVICE_FEE_GBP;
      if (includeVAT) calcTotalGBP += VAT_REGISTRATION_GBP;
      if (includeAnnualFiling) calcTotalGBP += ANNUAL_FILING_GBP;
      
      setTotalGBP(calcTotalGBP);
      setTotalUSD(convertGBPtoUSD(calcTotalGBP));
    }
  }, [countryInfo, includeVAT, includeAnnualFiling]);

  const handleOrder = () => {
    if (!countryInfo) return;
    
    const orderData = {
      country: countryInfo.name,
      countryCode: countryInfo.id,
      region: "UK",
      entityType,
      formationFee: countryInfo.formationFee,
      confirmationStatementFee: countryInfo.confirmationStatementFee,
      serviceFee: SERVICE_FEE_GBP,
      addons: [
        ...(includeVAT ? ["HMRC VAT Registration"] : []),
        ...(includeAnnualFiling ? ["Annual Tax Filing (CT600)"] : [])
      ],
      totalGBP,
      totalUSD,
      currency: "USD" // We bill in USD
    };
    
    sessionStorage.setItem("pendingOrder", JSON.stringify(orderData));
    router.push("/checkout");
  };

  if (!router.isReady) return null;

  if (!countryInfo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Country Not Found</h1>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${countryInfo.name} Company Formation | Salestaxus`}
        description={`Form your ${countryInfo.name} Limited Company with Companies House. Includes incorporation, registered office, HMRC compliance, and annual filing services.`}
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
                <ArrowLeft className="h-4 w-4" /> Change Country
              </Button>
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-10">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column - Service Configurator */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <Building2 className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">Form Your {countryInfo.name} Company</h1>
                    <p className="text-slate-600">Complete Companies House registration for {countryInfo.name}</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Entity Type Selection */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Select Entity Type</Label>
                    <Select value={entityType} onValueChange={setEntityType}>
                      <SelectTrigger className="w-full h-12">
                        <SelectValue placeholder="Select Entity Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Limited Company">Limited Company (Ltd)</SelectItem>
                        <SelectItem value="Limited Liability Partnership">Limited Liability Partnership (LLP)</SelectItem>
                        <SelectItem value="Public Limited Company">Public Limited Company (PLC)</SelectItem>
                        <SelectItem value="Community Interest Company">Community Interest Company (CIC)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-md">
                      <strong>Note:</strong> Most entrepreneurs choose <strong>Limited Company</strong> for liability protection and tax efficiency.
                    </p>
                  </div>

                  {/* Add-ons */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">HMRC Compliance Services</Label>
                    
                    <div className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${includeVAT ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200 hover:border-emerald-300'}`}
                         onClick={() => setIncludeVAT(!includeVAT)}>
                      <Checkbox 
                        checked={includeVAT} 
                        onCheckedChange={(c) => setIncludeVAT(!!c)} 
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-slate-900">HMRC VAT Registration</span>
                          <span className="font-bold text-emerald-600">+£{VAT_REGISTRATION_GBP} (${VAT_REGISTRATION_USD})</span>
                        </div>
                        <p className="text-sm text-slate-600">
                          We'll register your company for VAT with HMRC. Required if your turnover exceeds £{countryInfo.vatThreshold}.
                        </p>
                      </div>
                    </div>

                    <div className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${includeAnnualFiling ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200 hover:border-emerald-300'}`}
                         onClick={() => setIncludeAnnualFiling(!includeAnnualFiling)}>
                      <Checkbox 
                        checked={includeAnnualFiling} 
                        onCheckedChange={(c) => setIncludeAnnualFiling(!!c)} 
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-slate-900">Annual Tax Filing (CT600)</span>
                          <span className="font-bold text-emerald-600">+£{ANNUAL_FILING_GBP} (${ANNUAL_FILING_USD})</span>
                        </div>
                        <p className="text-sm text-slate-600">
                          Expert handling of Corporation Tax returns (CT600) and micro-entity accounts. Ideal for non-resident company directors.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* HMRC Compliance Expertise Section */}
              <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                    HMRC Compliance Expertise
                  </CardTitle>
                  <CardDescription>Expert tax filing for UK companies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Non-Resident Director Filings</h4>
                      <p className="text-sm text-slate-600">Specialized experience handling tax compliance for non-UK resident company directors and international businesses.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Micro-Entity Accounts</h4>
                      <p className="text-sm text-slate-600">Streamlined accounting for small companies under the micro-entity threshold. Simplified reporting with full HMRC compliance.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Corporation Tax (CT600)</h4>
                      <p className="text-sm text-slate-600">Complete preparation and filing of annual Corporation Tax returns with Companies House and HMRC.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Confirmation Statements</h4>
                      <p className="text-sm text-slate-600">Annual confirmation statement filing to keep your company in good standing with Companies House.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* UK Tax Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-emerald-600" />
                    {countryInfo.name} Tax Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">VAT Threshold</span>
                    <p className="text-lg font-medium text-slate-900">{countryInfo.vatThreshold}</p>
                    <p className="text-xs text-slate-500 mt-1">Registration required above this amount</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Corporation Tax</span>
                    <p className="text-lg font-medium text-slate-900">19%</p>
                    <p className="text-xs text-slate-500 mt-1">Main rate for UK companies</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Filing Deadline</span>
                    <p className="text-lg font-medium text-slate-900">12 months</p>
                    <p className="text-xs text-slate-500 mt-1">After accounting period ends</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Confirmation Statement</span>
                    <p className="text-lg font-medium text-slate-900">Annual</p>
                    <p className="text-xs text-slate-500 mt-1">Required every 12 months</p>
                  </div>
                </CardContent>
              </Card>

              <TrustBadge />
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="shadow-lg border-emerald-200 overflow-hidden">
                  <div className="bg-emerald-600 p-4 text-white">
                    <h3 className="font-bold text-lg">Order Summary</h3>
                    <p className="text-sm text-emerald-100">Prices shown in GBP & USD</p>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Formation Fee</span>
                      <span className="font-medium">£{countryInfo.formationFee} (${convertGBPtoUSD(countryInfo.formationFee)})</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Confirmation Statement</span>
                      <span className="font-medium">£{countryInfo.confirmationStatementFee} (${convertGBPtoUSD(countryInfo.confirmationStatementFee)})</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Salestaxus Service Fee</span>
                      <span className="font-medium text-emerald-600">£{SERVICE_FEE_GBP} (${SERVICE_FEE_USD})</span>
                    </div>
                    
                    {includeVAT && (
                      <div className="flex justify-between items-center text-sm animate-in slide-in-from-left-2">
                        <span className="text-slate-600">VAT Registration</span>
                        <span className="font-medium">£{VAT_REGISTRATION_GBP} (${VAT_REGISTRATION_USD})</span>
                      </div>
                    )}

                    {includeAnnualFiling && (
                      <div className="flex justify-between items-center text-sm animate-in slide-in-from-left-2">
                        <span className="text-slate-600">Annual Tax Filing</span>
                        <span className="font-medium">£{ANNUAL_FILING_GBP} (${ANNUAL_FILING_USD})</span>
                      </div>
                    )}
                    
                    <div className="border-t pt-4 mt-2 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-900">Total (GBP)</span>
                        <span className="text-xl font-bold text-slate-900">£{totalGBP}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-dashed">
                        <span className="text-sm text-slate-500">Exchange Rate</span>
                        <span className="text-sm font-medium text-slate-600">£1 = ${GBP_TO_USD}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-emerald-900 flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          Total (USD)
                        </span>
                        <span className="text-2xl font-bold text-emerald-600">${totalUSD}</span>
                      </div>
                      <p className="text-xs text-slate-500 text-right">Billed in USD to avoid exchange rate fluctuations</p>
                    </div>

                    <Button 
                      size="lg" 
                      className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-md mt-4 font-bold text-lg h-12"
                      onClick={handleOrder}
                    >
                      Proceed to Checkout
                    </Button>
                    
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-4">
                      <ShieldCheck className="h-3 w-3" />
                      <span>Secure Checkout • Money Back Guarantee</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}