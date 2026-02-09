import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { TrustBadge } from "@/components/TrustBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, ArrowLeft, DollarSign, Clock, Shield } from "lucide-react";
import { stateData } from "@/components/USMap";

const entityTypes = [
  { value: "llc", label: "Limited Liability Company (LLC)", baseFee: 299 },
  { value: "corporation", label: "Corporation (Inc)", baseFee: 399 },
  { value: "s-corp", label: "S-Corporation", baseFee: 449 },
  { value: "non-profit", label: "Non-Profit Organization", baseFee: 499 },
];

const addons = [
  { id: "ein", label: "IRS EIN (Tax ID Number)", price: 99, description: "Required for opening bank accounts and hiring employees" },
  { id: "operating-agreement", label: "Operating Agreement", price: 149, description: "Custom operating agreement for your business" },
  { id: "business-license", label: "Business License Research", price: 79, description: "We'll research required licenses for your industry" },
  { id: "annual-report", label: "First Year Annual Report", price: 199, description: "Stay compliant with annual reporting requirements" },
];

export default function StateConfigPage() {
  const router = useRouter();
  const { state } = router.query;
  const stateCode = typeof state === "string" ? state.toUpperCase() : "";
  const stateInfo = stateCode ? stateData[stateCode] : null;

  const [selectedEntity, setSelectedEntity] = useState<string>("");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
  });

  if (!stateInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <Card>
          <CardContent className="p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">State Not Found</h2>
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const calculateTotal = () => {
    const entityType = entityTypes.find(e => e.value === selectedEntity);
    const baseFee = entityType?.baseFee || 0;
    const addonsFee = selectedAddons.reduce((sum, addonId) => {
      const addon = addons.find(a => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);
    const stateFee = parseInt(stateInfo.formationFee.replace(/[^0-9]/g, "")) || 0;
    return baseFee + addonsFee + stateFee;
  };

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedEntity) {
      alert("Please select an entity type");
      return;
    }

    // Store order data in session storage for checkout page
    const orderData = {
      state: stateInfo.name,
      stateCode,
      entityType: entityTypes.find(e => e.value === selectedEntity)?.label,
      addons: selectedAddons.map(id => addons.find(a => a.id === id)?.label),
      total: calculateTotal(),
      customer: formData,
    };
    
    sessionStorage.setItem("pendingOrder", JSON.stringify(orderData));
    router.push("/checkout");
  };

  return (
    <>
      <SEO
        title={`LLC Formation in ${stateInfo.name} - Salestaxus LLC`}
        description={`Start your business in ${stateInfo.name}. Formation fee: ${stateInfo.formationFee}. Professional LLC formation services.`}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <Building2 className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-slate-900">Salestaxus LLC</h1>
              </Link>
              <Link href="/">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Map
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Configuration */}
            <div className="lg:col-span-2 space-y-6">
              {/* State Info */}
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-2xl">Form Your Business in {stateInfo.name}</CardTitle>
                  <CardDescription>Configure your LLC formation package</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <DollarSign className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="text-sm text-slate-600">State Filing Fee</p>
                        <p className="font-bold text-lg">{stateInfo.formationFee}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                      <Clock className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="text-sm text-slate-600">Processing Time</p>
                        <p className="font-bold text-lg">24-48 hours</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Sales Tax Rate</p>
                      <p className="font-semibold text-slate-900">{stateInfo.salesTax}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Income Tax Rate</p>
                      <p className="font-semibold text-slate-900">{stateInfo.incomeTax}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Franchise Tax</p>
                      <p className="font-semibold text-slate-900">{stateInfo.franchiseTax}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Entity Type Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Entity Type</CardTitle>
                  <CardDescription>Choose the business structure that fits your needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedEntity} onValueChange={setSelectedEntity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select entity type" />
                    </SelectTrigger>
                    <SelectContent>
                      {entityTypes.map((entity) => (
                        <SelectItem key={entity.value} value={entity.value}>
                          {entity.label} - ${entity.baseFee}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Add-ons */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Services</CardTitle>
                  <CardDescription>Enhance your formation package with these services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {addons.map((addon) => (
                    <div key={addon.id} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                      <Checkbox
                        id={addon.id}
                        checked={selectedAddons.includes(addon.id)}
                        onCheckedChange={() => handleAddonToggle(addon.id)}
                      />
                      <div className="flex-1">
                        <label htmlFor={addon.id} className="font-semibold text-slate-900 cursor-pointer">
                          {addon.label} - ${addon.price}
                        </label>
                        <p className="text-sm text-slate-600 mt-1">{addon.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Information</CardTitle>
                  <CardDescription>We'll use this to process your order</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        placeholder="Your LLC Name"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                      Proceed to Checkout - ${calculateTotal()}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trust Badge */}
              <TrustBadge />

              {/* Order Summary */}
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">State Filing Fee</span>
                    <span className="font-semibold">{stateInfo.formationFee}</span>
                  </div>
                  {selectedEntity && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Service Fee</span>
                      <span className="font-semibold">
                        ${entityTypes.find(e => e.value === selectedEntity)?.baseFee}
                      </span>
                    </div>
                  )}
                  {selectedAddons.map((addonId) => {
                    const addon = addons.find(a => a.id === addonId);
                    return addon ? (
                      <div key={addonId} className="flex justify-between text-sm">
                        <span className="text-slate-600">{addon.label}</span>
                        <span className="font-semibold">${addon.price}</span>
                      </div>
                    ) : null;
                  })}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-bold text-lg text-blue-600">${calculateTotal()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    What's Included
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Complete state filing and processing</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Registered agent service (first year)</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Articles of Organization preparation</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Compliance monitoring & reminders</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>24/7 customer support</span>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}