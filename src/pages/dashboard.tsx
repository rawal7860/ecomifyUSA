import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/integrations/supabase/client";
import { authService } from "@/services/authService";
import { SEO } from "@/components/SEO";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import {
  Building2, FileText, DollarSign, Clock, CheckCircle2,
  AlertCircle, Download, Mail, Phone, LogOut, User, Package
} from "lucide-react";

interface Order {
  id: string;
  order_number: string;
  service_type: string;
  business_name: string;
  state: string;
  status: string;
  amount: number;
  payment_status: string;
  created_at: string;
  notes?: string;
}

interface Profile {
  full_name: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  business_name?: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const checkAuthAndFetchData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/login");
        return;
      }

      setUserEmail(session.user.email || "");

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (ordersError) {
        console.error("Error fetching orders:", ordersError);
      } else {
        setOrders(ordersData || []);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await authService.signOut();
    router.push("/");
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "bg-green-100 text-green-700 border-green-200";
      case "paid": return "bg-blue-100 text-blue-700 border-blue-200";
      case "pending": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid": return "bg-green-100 text-green-700";
      case "unpaid": return "bg-red-100 text-red-700";
      case "refunded": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Client Dashboard - ecomifyUSA"
        description="Manage your LLC formation orders and track your business setup progress."
      />
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600 hidden sm:block">{userEmail}</span>
              <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Logout
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Welcome back, {profile?.full_name || "there"}! 👋
            </h1>
            <p className="text-slate-600">Track your orders and manage your business formation journey.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Total Orders</p>
                    <p className="text-3xl font-bold text-slate-900">{orders.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Completed</p>
                    <p className="text-3xl font-bold text-slate-900">
                      {orders.filter(o => o.status === "completed").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Total Spent</p>
                    <p className="text-3xl font-bold text-slate-900">
                      ${orders.reduce((sum, o) => sum + Number(o.amount), 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {profile && (
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" /> Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Full Name</p>
                    <p className="font-semibold text-slate-900">{profile.full_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Email</p>
                    <p className="font-semibold text-slate-900">{userEmail}</p>
                  </div>
                  {profile.phone && (
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Phone</p>
                      <p className="font-semibold text-slate-900">{profile.phone}</p>
                    </div>
                  )}
                  {profile.business_name && (
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Business Name</p>
                      <p className="font-semibold text-slate-900">{profile.business_name}</p>
                    </div>
                  )}
                  {profile.address && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-slate-500 mb-1">Address</p>
                      <p className="font-semibold text-slate-900">
                        {profile.address}, {profile.city}, {profile.state} {profile.zip_code}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FileText className="w-5 h-5" /> Your Orders
                </span>
                <Link href="/checkout">
                  <Button size="sm">New Order</Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">No Orders Yet</h3>
                  <p className="text-slate-600 mb-6">Start your business formation journey today!</p>
                  <Link href="/checkout">
                    <Button>Place Your First Order</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-slate-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-sm text-slate-500">Order #{order.order_number}</p>
                          <h4 className="text-lg font-semibold text-slate-900 mt-1">{order.business_name}</h4>
                          <p className="text-sm text-slate-600 mt-1">{order.service_type} • {order.state}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          <p className="text-xl font-bold text-slate-900 mt-2">${Number(order.amount).toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(order.created_at).toLocaleDateString()}
                          </span>
                          <Badge className={getPaymentStatusColor(order.payment_status)}>
                            {order.payment_status}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                      {order.notes && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-slate-700">
                            <strong>Notes:</strong> {order.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <Mail className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Need Help?</h3>
                <p className="text-slate-600 mb-4">Our support team is ready to assist you.</p>
                <a href="mailto:support@ecomifyusa.com">
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    Email Support
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <Phone className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">WhatsApp Support</h3>
                <p className="text-slate-600 mb-4">Chat with us instantly on WhatsApp.</p>
                <a href="https://wa.me/13072180376" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">
                    Chat on WhatsApp
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}