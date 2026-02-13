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
import { convertGBPtoUSD } from "@/lib/ukData";

interface OrderData {
  state?: string;
  stateCode?: string;
  country?: string;
  countryCode?: string;
  region?: string;
  entityType: string;
  addons: string[];
  total: number;
  totalGBP?: number;
  totalUSD?: number;
  formationFee?: number;
  serviceFee: number;
  incorporationFee?: number;
  confirmationStatementFee?: number;
  currency?: string;
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
      // Step 1: Check if user already exists
      const { data: existingUser } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      let userId: string;

      if (existingUser?.user) {
        // User already exists and password is correct - use existing account
        userId = existingUser.user.id;
        
        toast({
          title: "Existing Account Found",
          description: "Using your existing account to process this order.",
        });
      } else {
        // User doesn't exist or password is wrong - try to create new account
        try {
          // Try to sign up the user
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
                phone: phone,
              },
              emailRedirectTo: undefined,
              // @ts-expect-error - Supabase type definition missing email_confirm but it is supported by API
              email_confirm: false, 
            },
          });

          if (authError) {
            // Handle specific rate limit error
            if (authError.message?.includes("rate limit") || authError.status === 429) {
              toast({
                title: "Setting up your account...",
                description: "Please wait a moment while we process your request. This may take a few seconds.",
              });
              
              // Wait 3 seconds and retry once
              await new Promise(resolve => setTimeout(resolve, 3000));
              
              const { data: retryData, error: retryError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                  data: {
                    full_name: fullName,
                    phone: phone,
                  },
                  emailRedirectTo: undefined,
                  // @ts-expect-error - Supabase type definition missing email_confirm but it is supported by API
                  email_confirm: false, 
                },
              });

              if (retryError) {
                toast({
                  title: "Account Setup Issue",
                  description: "We're experiencing high traffic. Please try again in a few minutes, or contact support if this persists.",
                  variant: "destructive",
                });
                setProcessing(false);
                return;
              }

              if (!retryData.user) {
                throw new Error("Failed to create user account after retry");
              }

              userId = retryData.user.id;
            } else if (authError.message?.includes("already registered") || authError.message?.includes("already exists")) {
              // Handle "user already exists" error - try to login instead
              toast({
                title: "Account Already Exists",
                description: "An account with this email already exists. Please use the correct password or reset your password.",
                variant: "destructive",
              });
              setProcessing(false);
              return;
            } else {
              throw authError;
            }
          } else {
            if (!authData.user) {
              throw new Error("Failed to create user account");
            }
            userId = authData.user.id;
          }
        } catch (signupError) {
          console.error("Signup error:", signupError);
          throw signupError;
        }
      }

      // Step 2: Update user profile (trigger handles creation)
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          phone: phone,
          address: address,
          city: city,
          state: state,
          zip_code: zipCode,
          business_name: businessName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      // Profile update errors are non-critical (trigger creates basic profile)
      if (profileError) {
        console.warn("Profile update warning:", profileError);
      }

      // Step 3: Create order record (handle both US and UK)
      const isUKOrder = orderData.region === "UK";
      
      const orderInsert = {
        user_id: userId,
        entity_type: orderData.entityType,
        service_fee: orderData.serviceFee,
        addons: orderData.addons as any,
        total_amount: orderData.total,
        status: "pending",
        ...(isUKOrder ? {
          state_code: orderData.countryCode,
          state_name: orderData.country,
          formation_fee: (orderData.incorporationFee || 0) + (orderData.confirmationStatementFee || 0),
        } : {
          state_code: orderData.stateCode,
          state_name: orderData.state,
          formation_fee: orderData.formationFee,
        })
      };

      const { data: orderRecord, error: orderError } = await supabase
        .from("orders")
        .insert(orderInsert as any)
        .select()
        .single();

      if (orderError) throw orderError;

      // Step 4: Create and send Stripe invoice
      const invoiceDescription = isUKOrder
        ? `UK Company Formation - ${orderData.country} (${orderData.entityType})`
        : `LLC Formation - ${orderData.state} (${orderData.entityType})`;

      const invoiceResponse = await fetch("/api/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail: email,
          customerName: fullName,
          amount: orderData.total,
          description: invoiceDescription,
          metadata: {
            order_id: orderRecord.id,
            user_id: userId,
            region: isUKOrder ? "UK" : "US",
            location: isUKOrder ? orderData.country : orderData.state,
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
        .update({ stripe_invoice_id: invoiceData.invoiceId } as any)
        .eq("id", orderRecord.id);

      // Success!
      setSuccess(true);
      sessionStorage.removeItem("pendingOrder");

      toast({
        title: "Account Created & Invoice Sent!",
        description: "Check your email for the Stripe invoice. Your account has been created successfully.",
      });

      // Auto-login the user if they're not already logged in
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        await supabase.auth.signInWithPassword({
          email,
          password,
        });
      }

      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (error) {
      console.error("Checkout error:", error);
      
      let errorMessage = "Failed to process order. Please try again.";
      
      if (error instanceof Error) {
        if (error.message.includes("rate limit")) {
          errorMessage = "Too many requests. Please wait a few minutes before trying again.";
        } else if (error.message.includes("already registered")) {
          errorMessage = "This email is already registered. Please login instead.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Order Processing Error",
        description: errorMessage,
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
                    {orderData.region === "UK" ? (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Country</span>
                          <span className="font-semibold">{orderData.country}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Region</span>
                          <span className="font-semibold">United Kingdom</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">State</span>
                        <span className="font-semibold">{orderData.state}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Entity Type</span>
                      <span className="font-semibold">{orderData.entityType}</span>
                    </div>
                    <div className="border-t pt-3 space-y-2">
                      {orderData.region === "UK" ? (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Incorporation Fee</span>
                            <span>${convertGBPtoUSD(orderData.incorporationFee || 0)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Confirmation Statement</span>
                            <span>${convertGBPtoUSD(orderData.confirmationStatementFee || 0)}</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Formation Fee</span>
                          <span>${orderData.formationFee}</span>
                        </div>
                      )}
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
                        <span className="font-semibold text-slate-900">Total (USD)</span>
                        <span className="text-2xl font-bold text-blue-600">${orderData.total}</span>
                      </div>
                      {orderData.region === "UK" && orderData.totalGBP && (
                        <p className="text-xs text-slate-500 text-right mt-1">
                          Approx. £{orderData.totalGBP} GBP
                        </p>
                      )}
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