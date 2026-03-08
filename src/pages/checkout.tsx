import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, ArrowLeft, CheckCircle2, Loader2, Mail, Phone, User, MapPin, Star, Award, Clock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { convertGBPtoUSD } from "@/lib/ukData";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

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
    
    // Account creation option
    const [createAccount, setCreateAccount] = useState(false);
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

        // Validation - Required fields
        if (!fullName || !email || !phone || !address || !city || !state || !zipCode || !businessName) {
            toast({
                title: "Missing Information",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        // If creating account, password is required
        if (createAccount && !password) {
            toast({
                title: "Password Required",
                description: "Please create a password for your account.",
                variant: "destructive",
            });
            return;
        }

        setProcessing(true);

        try {
            let userId: string | null = null;

            // Step 1: Create account ONLY if user wants to
            if (createAccount && password) {
                try {
                    // Try to sign in first (in case user already exists)
                    const signInResponse = await supabase.auth.signInWithPassword({
                        email,
                        password,
                    });

                    if (signInResponse.data?.user) {
                        userId = signInResponse.data.user.id;
                        toast({
                            title: "Welcome Back! 🎉",
                            description: "Using your existing account.",
                        });
                    } else if (signInResponse.error) {
                        // User doesn't exist - create new account
                        const signUpResponse = await supabase.auth.signUp({
                            email,
                            password,
                            options: {
                                data: {
                                    full_name: fullName,
                                    phone: phone,
                                },
                                emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
                            },
                        });

                        if (signUpResponse.error) {
                            if (signUpResponse.error.status === 422 || 
                                signUpResponse.error.message?.toLowerCase().includes("already")) {
                                toast({
                                    title: "⚠️ Account Exists",
                                    description: "This email is already registered. Please login instead.",
                                    variant: "default",
                                    duration: 4000,
                                });
                                setTimeout(() => {
                                    router.push("/login");
                                }, 3000);
                                setProcessing(false);
                                return;
                            } else {
                                throw new Error(signUpResponse.error.message);
                            }
                        }

                        if (signUpResponse.data?.user) {
                            userId = signUpResponse.data.user.id;
                            toast({
                                title: "Account Created! 🎉",
                                description: "Your account has been created successfully.",
                            });
                        }
                    }
                } catch (error: any) {
                    console.error("Account creation error:", error);
                    toast({
                        title: "⚠️ Account Creation Failed",
                        description: "Continuing as guest checkout.",
                        variant: "default",
                    });
                    // Continue with guest checkout
                    userId = null;
                }
            }

            // Step 2: Update/Create user profile (if account created)
            if (userId) {
                const { error: profileError } = await supabase
                    .from("profiles")
                    .upsert({
                        id: userId,
                        full_name: fullName,
                        phone: phone,
                        address: address,
                        city: city,
                        state: state,
                        zip_code: zipCode,
                        business_name: businessName,
                        updated_at: new Date().toISOString(),
                    });

                if (profileError) {
                    console.warn("Profile update warning:", profileError);
                }
            }

            // Step 3: Create order record (works with or without user_id)
            const isUKOrder = orderData.region === "UK";

            const orderInsert: any = {
                user_id: userId, // Can be null for guest checkout
                entity_type: orderData.entityType,
                service_type: orderData.entityType || "LLC Formation",
                business_name: businessName,
                state: orderData.state || orderData.country,
                service_fee: orderData.serviceFee || 0,
                addons: orderData.addons || [],
                amount: orderData.total || 0,
                status: "pending",
                // Guest checkout info
                customer_email: email,
                customer_name: fullName,
                customer_phone: phone,
                ...(isUKOrder ? {
                    state_code: orderData.countryCode,
                    state_name: orderData.country,
                    formation_fee: (orderData.incorporationFee || 0) + (orderData.confirmationStatementFee || 0),
                } : {
                    state_code: orderData.stateCode,
                    state_name: orderData.state,
                    formation_fee: orderData.formationFee || 0,
                })
            };

            const { data: orderRecord, error: orderError } = await supabase
                .from("orders")
                .insert(orderInsert)
                .select()
                .single();

            if (orderError) {
                console.error("Order Insert Error:", orderError);
                throw new Error("Failed to create order record in database.");
            }

            // Step 4: Mock Stripe invoice (remove when Stripe is configured)
            const invoiceData = {
                success: true,
                invoiceId: "in_mock_" + Date.now(),
            };

            // Step 5: Update order with invoice ID
            await supabase
                .from("orders")
                .update({ stripe_invoice_id: invoiceData.invoiceId })
                .eq("id", orderRecord.id);

            // Success!
            setSuccess(true);
            sessionStorage.removeItem("pendingOrder");

            toast({
                title: "Order Created Successfully! 🎉",
                description: createAccount 
                    ? "Check your email for the Stripe invoice and account details."
                    : "Check your email for the Stripe invoice.",
            });

            setTimeout(() => {
                if (userId) {
                    router.push("/dashboard");
                } else {
                    // For guest checkout, show order confirmation
                    router.push("/order-confirmation");
                }
            }, 3000);

        } catch (error: any) {
            console.error("Checkout error:", error);

            toast({
                title: "Order Processing Error",
                description: error?.message || "Failed to process order. Please try again.",
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
                        <h2 className="text-2xl font-bold mb-2">Order Created!</h2>
                        <p className="text-slate-600 mb-6">
                            We've created your order and sent a Stripe invoice to <strong>{email}</strong>.
                            Please check your email and complete the payment.
                        </p>
                        {createAccount ? (
                            <p className="text-sm text-slate-500">Redirecting to dashboard...</p>
                        ) : (
                            <p className="text-sm text-slate-500">
                                Want to track your order? <Link href="/login" className="text-blue-600 hover:underline">Create an account</Link>
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <>
            <SEO
                title="Checkout - ecomifyUSA"
                description="Complete your LLC formation order"
            />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="hover:opacity-80 transition-opacity">
                                <Logo />
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
                                    <CardDescription>Fill in your details and we'll send a Stripe invoice to your email</CardDescription>
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

                                        {/* Account Creation Option */}
                                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
                                            <div className="flex items-start gap-3">
                                                <input
                                                    type="checkbox"
                                                    id="createAccount"
                                                    checked={createAccount}
                                                    onChange={(e) => setCreateAccount(e.target.checked)}
                                                    className="mt-1 h-4 w-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500"
                                                />
                                                <div className="flex-1">
                                                    <Label htmlFor="createAccount" className="font-semibold text-slate-900 cursor-pointer">
                                                        Create an account to track your order
                                                    </Label>
                                                    <p className="text-sm text-slate-600 mt-1">
                                                        Optional: Create a password to access your dashboard and track order progress. 
                                                        You can still complete this order without an account.
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            {createAccount && (
                                                <div className="ml-7">
                                                    <Label htmlFor="password">Create Password</Label>
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        placeholder="Min. 6 characters"
                                                        minLength={6}
                                                        required={createAccount}
                                                    />
                                                    <p className="text-xs text-slate-500 mt-1">
                                                        Required when creating an account
                                                    </p>
                                                </div>
                                            )}
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
                                                    Processing Order...
                                                </>
                                            ) : (
                                                createAccount ? "Create Account & Place Order" : "Place Order as Guest"
                                            )}
                                        </Button>

                                        <p className="text-xs text-center text-slate-500">
                                            By proceeding, you agree to receive a Stripe invoice via email
                                        </p>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="space-y-6">
                            {/* Trust Bar */}
                            <Card className="bg-white border-slate-200">
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div className="flex flex-col items-center">
                                            <Star className="w-6 h-6 text-green-600 fill-green-600 mb-1" />
                                            <span className="font-bold text-slate-900 text-sm">5.0 Rating</span>
                                            <span className="text-xs text-slate-500">500+ Reviews</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <Shield className="w-6 h-6 text-blue-600 mb-1" />
                                            <span className="font-bold text-slate-900 text-sm">100% Safe</span>
                                            <span className="text-xs text-slate-500">Money Back</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <Clock className="w-6 h-6 text-indigo-600 mb-1" />
                                            <span className="font-bold text-slate-900 text-sm">24h Delivery</span>
                                            <span className="text-xs text-slate-500">Fast Track</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <Award className="w-6 h-6 text-blue-600 mb-1" />
                                            <span className="font-bold text-slate-900 text-sm">Top Rated</span>
                                            <span className="text-xs text-slate-500">Level 2</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

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
                                                <li>1. Fill in your details</li>
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

                <Footer />
            </div>
        </>
    );
}