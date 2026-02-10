import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { TrustBadge } from "@/components/TrustBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Check, ShieldCheck, MapPin, DollarSign, FileText } from "lucide-react";
import { stateData } from "@/lib/stateData";

export default function StateServicePage() {
  const router = useRouter();
  const { state: stateParam } = router.query;
  
  // Find state data
  const stateInfo = typeof stateParam === 'string' 
    ? stateData[stateParam.toUpperCase()] 
    : null;

  const [entityType, setEntityType] = useState("LLC");
  const [includeEin, setIncludeEin] = useState(false);
  
  // Pricing
  const SERVICE_FEE = 150;
  const EIN_FEE = 50;
  
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (stateInfo) {
      let calcTotal = stateInfo.formationFee + SERVICE_FEE;
      if (includeEin) calcTotal += EIN_FEE;
      setTotal(calcTotal);
    }
  }, [stateInfo, includeEin]);

  const handleOrder = () => {
    if (!stateInfo) return;
    
    const orderData = {
      state: stateInfo.name,
      stateCode: stateInfo.id,
      entityType,
      formationFee: stateInfo.formationFee,
      serviceFee: SERVICE_FEE,
      addons: includeEin ? ["IRS EIN Registration"] : [],
      total
    };
    
    sessionStorage.setItem("pendingOrder", JSON.stringify(orderData));
    router.push("/checkout");
  };

  if (!router.isReady) return null;

  if (!stateInfo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">State Not Found</h1>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${stateInfo.name} LLC Formation | Salestaxus`}
        description={`Form your ${stateInfo.name} LLC online for only $150 + state fees. Includes ${stateInfo.name} formation, registered agent options, and EIN.`}
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
                <ArrowLeft className="h-4 w-4" /> Change State
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
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">Form Your {stateInfo.name} Company</h1>
                    <p className="text-slate-600">Complete service for registration in {stateInfo.name}</p>
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
                        <SelectItem value="LLC">Limited Liability Company (LLC)</SelectItem>
                        <SelectItem value="S-Corp">S-Corporation (S-Corp)</SelectItem>
                        <SelectItem value="C-Corp">C-Corporation (C-Corp)</SelectItem>
                        <SelectItem value="Non-Profit">Non-Profit Corporation</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-md">
                      <strong>Note:</strong> 85% of our customers choose <strong>LLC</strong> for liability protection and tax flexibility.
                    </p>
                  </div>

                  {/* Add-ons */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Recommended Add-ons</Label>
                    
                    <div className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${includeEin ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}`}
                         onClick={() => setIncludeEin(!includeEin)}>
                      <Checkbox 
                        checked={includeEin} 
                        onCheckedChange={(c) => setIncludeEin(!!c)} 
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-slate-900">IRS EIN Registration</span>
                          <span className="font-bold text-blue-600">+${EIN_FEE}</span>
                        </div>
                        <p className="text-sm text-slate-600">
                          We'll obtain your Federal Tax ID (EIN) from the IRS. Required to open a business bank account and hire employees.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* State Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    {stateInfo.name} Tax Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-3 gap-6">
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Sales Tax</span>
                    <p className="text-lg font-medium text-slate-900">{stateInfo.salesTax}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Income Tax</span>
                    <p className="text-lg font-medium text-slate-900">{stateInfo.incomeTax}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Franchise Tax</span>
                    <p className="text-lg font-medium text-slate-900">{stateInfo.franchiseTax}</p>
                  </div>
                </CardContent>
              </Card>

              <TrustBadge />
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="shadow-lg border-blue-200 overflow-hidden">
                  <div className="bg-blue-600 p-4 text-white">
                    <h3 className="font-bold text-lg">Order Summary</h3>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">State Formation Fee</span>
                      <span className="font-medium">${stateInfo.formationFee}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Salestaxus Service Fee</span>
                      <span className="font-medium text-green-600">${SERVICE_FEE}</span>
                    </div>
                    
                    {includeEin && (
                      <div className="flex justify-between items-center text-sm animate-in slide-in-from-left-2">
                        <span className="text-slate-600">IRS EIN Registration</span>
                        <span className="font-medium">${EIN_FEE}</span>
                      </div>
                    )}
                    
                    <div className="border-t pt-4 mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-slate-900">Total Due</span>
                        <span className="text-2xl font-bold text-blue-600">${total}</span>
                      </div>
                      <p className="text-xs text-slate-500 text-right">Includes all government fees</p>
                    </div>

                    <Button 
                      size="lg" 
                      className="w-full bg-blue-600 hover:bg-blue-700 shadow-md mt-4 font-bold text-lg h-12"
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