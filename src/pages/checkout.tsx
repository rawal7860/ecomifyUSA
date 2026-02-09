import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { TrustBadge } from "@/components/TrustBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OrderData {
  state: string;
  stateCode: string;
  entityType: string;
  addons: string[];
  total: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    businessName: string;
  };
}

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("pendingOrder");
    if (stored) {
      setOrderData(JSON.parse(stored));
    } else {
      router.push("/");
    }
  }, [router]);

  const handlePayment = async () => {
    if (!orderData) return;

    setProcessing(true);

    try {
      // Call API to create Stripe invoice
      const response = await fetch("/api/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail: orderData.customer.email,
          customerName: orderData.customer.fullName,
          amount: orderData.total,
          description: `LLC Formation - ${orderData.state} (${orderData.entityType})`,
          metadata: {
            state: orderData.stateCode,
            entityType: orderData.entityType,
            businessName: orderData.customer.businessName,
            phone: orderData.customer.phone,
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        sessionStorage.removeItem("pendingOrder");
        
        toast({
          title: "Invoice Sent Successfully!",
          description: "Check your email for the Stripe invoice. You'll receive a confirmation once payment is complete.",
        });

        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      } else {
        throw new Error(data.error || "Failed to create invoice");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Failed to process payment. Please try again.",
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
            <h2 className="text-2xl font-bold mb-2">Invoice Sent!</h2>
            <p className="text-slate-600 mb-6">
              We've sent a Stripe invoice to <strong>{orderData.customer.email}</strong>. 
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
        description="Complete your LLC formation order"
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Order</CardTitle>
                  <CardDescription>Confirm your LLC formation details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Business Information</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-slate-600">Business Name:</span> <strong>{orderData.customer.businessName}</strong></p>
                      <p><span className="text-slate-600">State:</span> <strong>{orderData.state}</strong></p>
                      <p><span className="text-slate-600">Entity Type:</span> <strong>{orderData.entityType}</strong></p>
                    </div>
                  </div>

                  {orderData.addons.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">Additional Services</h3>
                      <ul className="space-y-1 text-sm">
                        {orderData.addons.map((addon, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            {addon}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Contact Information</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-slate-600">Name:</span> <strong>{orderData.customer.fullName}</strong></p>
                      <p><span className="text-slate-600">Email:</span> <strong>{orderData.customer.email}</strong></p>
                      <p><span className="text-slate-600">Phone:</span> <strong>{orderData.customer.phone}</strong></p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">How Payment Works</h3>
                      <ol className="space-y-2 text-sm text-slate-700">
                        <li>1. We'll send a Stripe invoice to your email</li>
                        <li>2. Click the secure payment link in the email</li>
                        <li>3. Complete payment through Stripe's secure portal</li>
                        <li>4. We'll begin processing your LLC formation immediately</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <TrustBadge />

              <Card>
                <CardHeader>
                  <CardTitle>Order Total</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-6 bg-slate-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">${orderData.total}</p>
                    <p className="text-sm text-slate-600 mt-1">One-time payment</p>
                  </div>
                  <Button
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={handlePayment}
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Sending Invoice...
                      </>
                    ) : (
                      "Send Stripe Invoice"
                    )}
                  </Button>
                  <p className="text-xs text-center text-slate-500">
                    By proceeding, you agree to receive a Stripe invoice via email
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