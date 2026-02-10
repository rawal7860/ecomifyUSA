import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { TrustBadge } from "@/components/TrustBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, ArrowLeft, CheckCircle2, Loader2, Mail, Phone, User, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface OrderData {
  state: string;
  stateCode: string;
  entityType: string;
  addons: string[];
  total: number;
  formationFee: number;
  serviceFee: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("pendingOrder");
    if (stored) {
      setOrderData(JSON.parse(stored));
    } else {
      router.push("/");
    }
  }, [router]);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderData) return;

    // Validation
    if (!fullName || !email || !phone || !address || !city || !state || !zipCode || !businessName || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      // Step 1: Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error("Failed to create user account");
      }

      // Step 2: Create/Update user profile
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
          id: authData.user.id,
          full_name: fullName,
          email: email,
          phone: phone,
          address: address,
          city: city,
          state: state,
          zip_code: zipCode,
          business_name: businessName,
          updated_at: new Date().toISOString(),
        });

      if (profileError) throw profileError;

      // Step 3: Create order record
      const { data: orderRecord, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: authData.user.id,
          state_code: orderData.stateCode,
          state_name: orderData.state,
          entity_type: orderData.entityType,
          formation_fee: orderData.formationFee,
          service_fee: orderData.serviceFee,
          addons: orderData.addons as any, // Cast to any to avoid Json type conflicts
          total_amount: orderData.total,
          status: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Step 4: Create and send Stripe invoice
      const invoiceResponse = await fetch("/api/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail: email,
          customerName: fullName,
          amount: orderData.total,
          description: `LLC Formation - ${orderData.state} (${orderData.entityType})`,
          metadata: {
            order_id: orderRecord.id,
            user_id: authData.user.id,
            state: orderData.stateCode,
            entityType: orderData.entityType,
            businessName: businessName,
            phone: phone,
            address: `${address}, ${city}, ${state} ${zipCode}`,
          },
        }),
      });

      const invoiceData = await invoiceResponse.json();

      if (!invoiceData.success) {
        throw new Error(invoiceData.error || "Failed to create invoice");
      }

      // Step 5: Update order with invoice ID
      await supabase
        .from("orders")
        .update({ stripe_invoice_id: invoiceData.invoiceId } as any) // Type assertion for newly added column
        .eq("id", orderRecord.id);

      // Success!
      setSuccess(true);
      sessionStorage.removeItem("pendingOrder");

      toast({
        title: "Account Created & Invoice Sent!",
        description: "Check your email for the Stripe invoice. Your account has been created successfully.",
      });

      // Auto-login the user
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Order Processing Error",
        description: error instanceof Error ? error.message : "Failed to process order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Account Created & Invoice Sent!</h2>
            <p className="text-slate-600 mb-6">
              We've created your account and sent a Stripe invoice to <strong>{email}</strong>.
              Please check your email and complete the payment.
            </p>
            <p className="text-sm text-slate-500">Redirecting to dashboard...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Checkout - Salestaxus LLC"
        description="Complete your LLC formation order and create your account"
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
              <Button variant="ghost" onClick={() => router.back()} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Complete Your Order</CardTitle>
                  <CardDescription>Create your account and we'll send a Stripe invoice to your email</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitOrder} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-600" />
                        Personal Information
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName">Full Name *</Label>
                          <Input
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="(555) 123-4567"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="password">Create Password *</Label>
                          <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min. 6 characters"
                            minLength={6}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Business Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-blue-600" />
                        Business Information
                      </h3>
                      <div>
                        <Label htmlFor="businessName">Business Name *</Label>
                        <Input
                          id="businessName"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="My Company LLC"
                          required
                        />
                      </div>
                    </div>

                    {/* Address Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        Residential Address
                      </h3>
                      <div>
                        <Label htmlFor="address">Street Address *</Label>
                        <Input
                          id="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="123 Main Street"
                          required
                        />
                      </div>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="New York"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="NY"
                            maxLength={2}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="zipCode">ZIP Code *</Label>
                          <Input
                            id="zipCode"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            placeholder="10001"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={processing}
                    >
                      {processing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Creating Account & Sending Invoice...
                        </>
                      ) : (
                        "Create Account & Send Invoice"
                      )}
                    </Button>

                    <p className="text-xs text-center text-slate-500">
                      By proceeding, you agree to create an account and receive a Stripe invoice via email
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-6">
              <TrustBadge />

              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">State</span>
                      <span className="font-semibold">{orderData.state}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Entity Type</span>
                      <span className="font-semibold">{orderData.entityType}</span>
                    </div>
                    <div className="border-t pt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Formation Fee</span>
                        <span>${orderData.formationFee}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Service Fee</span>
                        <span>${orderData.serviceFee}</span>
                      </div>
                      {orderData.addons.map((addon, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-slate-600">{addon}</span>
                          <span>Included</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-900">Total</span>
                        <span className="text-2xl font-bold text-blue-600">${orderData.total}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-slate-700">
                      <p className="font-semibold mb-1">How It Works</p>
                      <ol className="space-y-1 text-xs">
                        <li>1. Create your account</li>
                        <li>2. Receive Stripe invoice via email</li>
                        <li>3. Pay securely through Stripe</li>
                        <li>4. We process your LLC formation</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}