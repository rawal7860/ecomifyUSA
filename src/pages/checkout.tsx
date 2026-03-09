import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Lock, CheckCircle2 } from "lucide-react";
import { authService } from "@/services/authService";

interface CheckoutFormData {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  businessName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  notes: string;
  createAccount: boolean;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { state, service = "LLC Formation", amount = "299" } = router.query;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    businessName: "",
    address: "",
    city: "",
    state: (state as string) || "",
    zipCode: "",
    notes: "",
    createAccount: false
  });

  const handleInputChange = (field: keyof CheckoutFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.email || !formData.fullName || !formData.phone) {
      setError("Please fill in all required fields (Email, Name, Phone)");
      return false;
    }
    
    if (formData.createAccount && !formData.password) {
      setError("Password is required when creating an account");
      return false;
    }

    if (formData.createAccount && formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      let userId: string | null = null;

      // If user wants to create account
      if (formData.createAccount) {
        try {
          // Check if email already exists
          const { data: existingUser } = await supabase
            .from("profiles")
            .select("id")
            .eq("email", formData.email)
            .maybeSingle();

          if (existingUser) {
            setError("🎉 Welcome Back! This email is already registered. Please login instead.");
            setLoading(false);
            setTimeout(() => router.push("/login"), 2000);
            return;
          }

          // Create new account
          const authData = await authService.signUp(
            formData.email,
            formData.password,
            formData.fullName
          );

          if (authData.error) throw authData.error;
          
          userId = authData.user?.id || null;

          // Update profile with additional info
          if (userId) {
            await supabase
              .from("profiles")
              .update({
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zip_code: formData.zipCode,
                business_name: formData.businessName,
                is_guest: false
              })
              .eq("id", userId);
          }
        } catch (authError: any) {
          console.error("Account creation error:", authError);
          // Continue with guest checkout if account creation fails
          console.log("Proceeding with guest checkout...");
        }
      }

      // Generate order number
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Create order (works for both guest and registered users)
      const orderData: any = {
        user_id: userId,
        order_number: orderNumber,
        service_type: service as string,
        business_name: formData.businessName || formData.fullName,
        state: formData.state,
        status: "pending",
        amount: parseFloat(amount as string),
        payment_status: "unpaid",
        customer_email: formData.email,
        customer_name: formData.fullName,
        customer_phone: formData.phone,
        notes: formData.notes || null
      };

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert(orderData)
        .select()
        .single();

      if (orderError) {
        console.error("Order creation error:", orderError);
        throw new Error("Failed to create order. Please try again or contact support.");
      }

      console.log("✅ Order created:", order);

      // Call Stripe invoice API
      try {
        const invoiceResponse = await fetch("/api/create-invoice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer_email: formData.email,
            customer_name: formData.fullName,
            amount: parseFloat(amount as string),
            description: `${service} - ${formData.state || "Service"}`,
            order_id: order.id
          })
        });

        if (!invoiceResponse.ok) {
          console.error("Invoice API error:", await invoiceResponse.text());
        } else {
          console.log("✅ Invoice sent to:", formData.email);
        }
      } catch (invoiceError) {
        console.error("Invoice generation error:", invoiceError);
        // Don't block checkout if invoice fails
      }

      // Redirect based on account type
      if (userId && formData.createAccount) {
        router.push("/dashboard");
      } else {
        router.push(`/order-confirmation?order=${orderNumber}`);
      }

    } catch (err: any) {
      console.error("Checkout error:", err);
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Checkout - ecomifyUSA"
        description="Complete your LLC formation and tax compliance order"
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Complete Your Order</h1>
              <p className="text-slate-600">Secure checkout powered by ecomifyUSA</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left: Checkout Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact & Business Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Contact Information */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Contact Details</h3>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="fullName">Full Name *</Label>
                            <Input
                              id="fullName"
                              type="text"
                              value={formData.fullName}
                              onChange={(e) => handleInputChange("fullName", e.target.value)}
                              required
                              placeholder="John Doe"
                            />
                          </div>

                          <div>
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              required
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              required
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>

                          <div>
                            <Label htmlFor="businessName">Business Name</Label>
                            <Input
                              id="businessName"
                              type="text"
                              value={formData.businessName}
                              onChange={(e) => handleInputChange("businessName", e.target.value)}
                              placeholder="My Company LLC"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Address</h3>
                        
                        <div>
                          <Label htmlFor="address">Street Address</Label>
                          <Input
                            id="address"
                            type="text"
                            value={formData.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                            placeholder="123 Main St"
                          />
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              type="text"
                              value={formData.city}
                              onChange={(e) => handleInputChange("city", e.target.value)}
                              placeholder="New York"
                            />
                          </div>

                          <div>
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              type="text"
                              value={formData.state}
                              onChange={(e) => handleInputChange("state", e.target.value)}
                              placeholder="NY"
                            />
                          </div>

                          <div>
                            <Label htmlFor="zipCode">ZIP Code</Label>
                            <Input
                              id="zipCode"
                              type="text"
                              value={formData.zipCode}
                              onChange={(e) => handleInputChange("zipCode", e.target.value)}
                              placeholder="10001"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Additional Notes */}
                      <div>
                        <Label htmlFor="notes">Additional Notes (Optional)</Label>
                        <textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => handleInputChange("notes", e.target.value)}
                          className="w-full min-h-[100px] px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Any special requests or additional information..."
                        />
                      </div>

                      {/* Create Account Option */}
                      <div className="border-t pt-6">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="createAccount"
                            checked={formData.createAccount}
                            onCheckedChange={(checked) => handleInputChange("createAccount", checked as boolean)}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor="createAccount"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              Create an account to track your order
                            </label>
                            <p className="text-sm text-slate-500">
                              Get access to your dashboard, order history, and document downloads
                            </p>
                          </div>
                        </div>

                        {formData.createAccount && (
                          <div className="mt-4">
                            <Label htmlFor="password">Password *</Label>
                            <Input
                              id="password"
                              type="password"
                              value={formData.password}
                              onChange={(e) => handleInputChange("password", e.target.value)}
                              placeholder="Min. 6 characters"
                              minLength={6}
                            />
                          </div>
                        )}
                      </div>

                      {error && (
                        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
                          {error}
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={loading}
                      >
                        {loading ? "Processing..." : "Complete Order"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Right: Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Service</span>
                        <span className="font-medium">{service}</span>
                      </div>
                      {state && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">State</span>
                          <span className="font-medium">{state}</span>
                        </div>
                      )}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-blue-600">${amount}</span>
                      </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="border-t pt-4 space-y-3">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span>Secure Checkout</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Lock className="w-4 h-4 text-green-600" />
                        <span>Encrypted Payment</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>100% Money Back Guarantee</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm">
                      <p className="font-medium text-blue-900 mb-1">What happens next?</p>
                      <ul className="text-blue-700 space-y-1 text-xs">
                        <li>✓ You'll receive a Stripe invoice via email</li>
                        <li>✓ Complete payment securely through Stripe</li>
                        <li>✓ We'll start processing immediately</li>
                        <li>✓ Receive updates via email & WhatsApp</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}