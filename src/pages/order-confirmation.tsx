import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Mail, Clock, FileText, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const { order } = router.query;
  const [orderNumber, setOrderNumber] = useState<string>("");

  useEffect(() => {
    if (order) {
      setOrderNumber(order as string);
    }
  }, [order]);

  return (
    <>
      <SEO
        title="Order Confirmation - ecomifyUSA"
        description="Your order has been received. Check your email for payment instructions."
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Success Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Order Received!</h1>
              <p className="text-slate-600 text-lg">Thank you for choosing ecomifyUSA</p>
            </div>

            {/* Order Details Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-700 mb-1">Order Number</p>
                  <p className="text-2xl font-bold text-blue-900">{orderNumber}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">Check Your Email</p>
                      <p className="text-sm text-slate-600">We've sent you a Stripe invoice with payment instructions</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">Processing Timeline</p>
                      <p className="text-sm text-slate-600">We'll start processing immediately after payment is received</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">Updates</p>
                      <p className="text-sm text-slate-600">You'll receive email & WhatsApp updates throughout the process</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What's Next */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">1</div>
                    <div>
                      <p className="font-semibold text-slate-900">Complete Payment</p>
                      <p className="text-sm text-slate-600">Click the Stripe invoice link in your email and complete payment securely</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">2</div>
                    <div>
                      <p className="font-semibold text-slate-900">We Start Processing</p>
                      <p className="text-sm text-slate-600">Our team begins working on your LLC formation and documentation</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">3</div>
                    <div>
                      <p className="font-semibold text-slate-900">Receive Documents</p>
                      <p className="text-sm text-slate-600">Get your LLC documents, EIN, and compliance package via email</p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-0">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-2">Want to Track Your Order?</h3>
                <p className="text-blue-100 mb-6">Create an account to access your dashboard, view order status, and download documents anytime.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/signup">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto">
                      Create Account <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Support Info */}
            <div className="text-center mt-8 text-sm text-slate-600">
              <p>Need help? Contact us:</p>
              <p className="mt-2">
                <a href="mailto:support@ecomifyusa.com" className="text-blue-600 hover:underline">support@ecomifyusa.com</a>
                {" • "}
                <a href="https://wa.me/13072180376" target="_blank" className="text-green-600 hover:underline">WhatsApp +1 (307) 218-0376</a>
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}