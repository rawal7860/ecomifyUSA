import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Building2, ArrowLeft, CheckCircle2, MapPin, DollarSign, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Logo from "@/components/Logo";

// US States with Formation Fees
const usStates = [
    { name: "Wyoming", code: "WY", fee: 100 },
    { name: "Delaware", code: "DE", fee: 90 },
    { name: "Colorado", code: "CO", fee: 50 },
    { name: "Nevada", code: "NV", fee: 425 },
    { name: "New Mexico", code: "NM", fee: 50 },
    { name: "Florida", code: "FL", fee: 125 },
    { name: "Texas", code: "TX", fee: 300 },
    { name: "Arizona", code: "AZ", fee: 50 },
    { name: "California", code: "CA", fee: 70 },
    { name: "New York", code: "NY", fee: 200 },
    { name: "Illinois", code: "IL", fee: 150 },
    { name: "Ohio", code: "OH", fee: 99 },
    { name: "Georgia", code: "GA", fee: 100 },
    { name: "North Carolina", code: "NC", fee: 125 },
    { name: "Washington", code: "WA", fee: 180 },
    { name: "Oregon", code: "OR", fee: 100 },
    { name: "Michigan", code: "MI", fee: 50 },
    { name: "Pennsylvania", code: "PA", fee: 125 },
    { name: "New Jersey", code: "NJ", fee: 125 },
    { name: "Virginia", code: "VA", fee: 100 },
    { name: "Massachusetts", code: "MA", fee: 500 },
    { name: "Tennessee", code: "TN", fee: 300 },
    { name: "Indiana", code: "IN", fee: 95 },
    { name: "Missouri", code: "MO", fee: 50 },
    { name: "Maryland", code: "MD", fee: 100 },
    { name: "Wisconsin", code: "WI", fee: 130 },
    { name: "Minnesota", code: "MN", fee: 155 },
    { name: "South Carolina", code: "SC", fee: 110 },
    { name: "Alabama", code: "AL", fee: 200 },
    { name: "Louisiana", code: "LA", fee: 100 },
    { name: "Kentucky", code: "KY", fee: 40 },
    { name: "Oklahoma", code: "OK", fee: 100 },
    { name: "Connecticut", code: "CT", fee: 120 },
    { name: "Iowa", code: "IA", fee: 50 },
    { name: "Mississippi", code: "MS", fee: 50 },
    { name: "Arkansas", code: "AR", fee: 45 },
    { name: "Kansas", code: "KS", fee: 160 },
    { name: "Utah", code: "UT", fee: 54 },
    { name: "Idaho", code: "ID", fee: 100 },
    { name: "Hawaii", code: "HI", fee: 50 },
    { name: "New Hampshire", code: "NH", fee: 100 },
    { name: "Maine", code: "ME", fee: 175 },
    { name: "Montana", code: "MT", fee: 70 },
    { name: "Rhode Island", code: "RI", fee: 150 },
    { name: "West Virginia", code: "WV", fee: 100 },
    { name: "Nebraska", code: "NE", fee: 100 },
    { name: "South Dakota", code: "SD", fee: 150 },
    { name: "North Dakota", code: "ND", fee: 135 },
    { name: "Alaska", code: "AK", fee: 250 },
    { name: "Vermont", code: "VT", fee: 125 },
    { name: "District of Columbia", code: "DC", fee: 220 },
];

const serviceFee = 150; // Your service fee

export default function StateFormationPage() {
    const router = useRouter();
    const { state } = router.query;
    const [selectedState, setSelectedState] = useState("CO"); // Default Colorado
    const [entityType, setEntityType] = useState("LLC");
    const [einAddon, setEinAddon] = useState(false);

    // Load state from URL parameter
    useEffect(() => {
        if (state && typeof state === "string") {
            const stateUpper = state.toUpperCase();
            const foundState = usStates.find(s => s.code === stateUpper || s.name.toLowerCase() === state.toLowerCase());
            if (foundState) {
                setSelectedState(foundState.code);
            }
        }
    }, [state]);

    const currentState = usStates.find(s => s.code === selectedState) || usStates[0];
    const total = currentState.fee + serviceFee + (einAddon ? 50 : 0);

    const handleStateChange = (stateCode: string) => {
        setSelectedState(stateCode);
        // Update URL without reload
        router.push(`/state/${stateCode.toLowerCase()}`, undefined, { shallow: true });
    };

    const handleProceedToCheckout = () => {
        // Save order data to sessionStorage
        const orderData = {
            state: currentState.name,
            stateCode: currentState.code,
            formationFee: currentState.fee,
            serviceFee: serviceFee,
            entityType: entityType,
            addons: einAddon ? ["IRS EIN Registration"] : [],
            total: total,
            region: "US",
        };
        sessionStorage.setItem("pendingOrder", JSON.stringify(orderData));
        router.push("/checkout");
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <Logo />
                    </Link>
                    <Button variant="ghost" onClick={() => router.back()} className="gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl">Form Your {currentState.name} Company</CardTitle>
                                        <p className="text-slate-600 text-sm">Complete service for registration in {currentState.name}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* State Selector */}
                                <div className="space-y-2">
                                    <Label htmlFor="state-selector" className="text-slate-900 font-semibold">
                                        Select Another State *
                                    </Label>
                                    <Select value={selectedState} onValueChange={handleStateChange}>
                                        <SelectTrigger id="state-selector" className="w-full">
                                            <SelectValue placeholder="Choose a state" />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[300px]">
                                            {usStates.map((state) => (
                                                <SelectItem key={state.code} value={state.code}>
                                                    {state.name} (${state.fee})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-slate-500">
                                        Formation fees vary by state. Select the best state for your business.
                                    </p>
                                </div>

                                {/* Entity Type */}
                                <div className="space-y-2">
                                    <Label htmlFor="entity-type" className="text-slate-900 font-semibold">
                                        Select Entity Type *
                                    </Label>
                                    <Select value={entityType} onValueChange={setEntityType}>
                                        <SelectTrigger id="entity-type" className="w-full">
                                            <SelectValue placeholder="Choose entity type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="LLC">Limited Liability Company (LLC)</SelectItem>
                                            <SelectItem value="Corporation">C Corporation</SelectItem>
                                            <SelectItem value="S-Corp">S Corporation</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                        <div className="flex items-start gap-2">
                                            <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <p className="text-xs text-blue-800">
                                                <strong>Note:</strong> 85% of our customers choose <strong>LLC</strong> for liability protection and tax flexibility.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Add-ons */}
                                <div className="space-y-4">
                                    <Label className="text-slate-900 font-semibold">Recommended Add-ons</Label>
                                    
                                    <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                                        <div className="flex items-start gap-3">
                                            <Checkbox 
                                                id="ein-addon" 
                                                checked={einAddon}
                                                onCheckedChange={(checked) => setEinAddon(checked as boolean)}
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <Label htmlFor="ein-addon" className="font-semibold text-slate-900 cursor-pointer">
                                                        IRS EIN Registration
                                                    </Label>
                                                    <span className="text-blue-600 font-bold">+$50</span>
                                                </div>
                                                <p className="text-sm text-slate-600 mt-1">
                                                    We'll obtain your Federal Tax ID (EIN) from the IRS. Required to open a business bank account and hire employees.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-6">
                        <Card className="sticky top-24">
                            <CardHeader className="bg-blue-600 text-white">
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">State</span>
                                        <span className="font-semibold">{currentState.name}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">Entity Type</span>
                                        <span className="font-semibold">{entityType}</span>
                                    </div>
                                    <div className="border-t pt-3 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-600">State Formation Fee</span>
                                            <span className="font-semibold">${currentState.fee}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-600">ecomifyUSA Service Fee</span>
                                            <span className="font-semibold text-green-600">${serviceFee}</span>
                                        </div>
                                        {einAddon && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600">IRS EIN Registration</span>
                                                <span className="font-semibold">+$50</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="border-t pt-3">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-slate-900 text-lg">Total Due</span>
                                            <span className="text-2xl font-bold text-blue-600">${total}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 text-right mt-1">
                                            Includes all government fees
                                        </p>
                                    </div>
                                </div>

                                <Button 
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
                                    onClick={handleProceedToCheckout}
                                >
                                    Proceed to Checkout
                                </Button>

                                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                    <span>Secure Checkout</span>
                                    <span>•</span>
                                    <span>Money Back Guarantee</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Trust Card */}
                        <Card className="bg-blue-50 border-blue-200">
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <div className="text-sm text-slate-700">
                                        <p className="font-semibold mb-1">What's Included</p>
                                        <ul className="space-y-1 text-xs">
                                            <li>✓ Name Availability Check</li>
                                            <li>✓ Articles of Organization</li>
                                            <li>✓ Registered Agent (1st Year)</li>
                                            <li>✓ Operating Agreement</li>
                                            <li>✓ Filing Expedited Processing</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}