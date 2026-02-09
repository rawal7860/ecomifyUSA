import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { authService } from "@/services/authService";
import { profileService } from "@/services/profileService";
import { orderService } from "@/services/orderService";
import { Building2, Package, User, LogOut, Plus, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Order = Database["public"]["Tables"]["orders"]["Row"];

function DashboardContent() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, in_progress: 0, completed: 0, cancelled: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [profileData, ordersData, statsData] = await Promise.all([
        profileService.getCurrentProfile(),
        orderService.getUserOrders(),
        orderService.getOrderStats(),
      ]);

      setProfile(profileData);
      setOrders(ordersData);
      setStats(statsData);
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Failed to sign out");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "in_progress":
        return <Clock className="w-5 h-5 text-blue-600" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <SEO 
        title="Client Dashboard - Salestaxus LLC"
        description="Manage your LLC formation orders and account details"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building2 className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-slate-900">Salestaxus LLC</h1>
              </div>
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome back, {profile?.full_name || "User"}!
            </h2>
            <p className="text-slate-600">Manage your business formation orders and account details</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Orders</CardDescription>
                <CardTitle className="text-3xl font-bold">{stats.total}</CardTitle>
              </CardHeader>
              <CardContent>
                <Package className="w-5 h-5 text-slate-400" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Pending</CardDescription>
                <CardTitle className="text-3xl font-bold text-yellow-600">{stats.pending}</CardTitle>
              </CardHeader>
              <CardContent>
                <AlertCircle className="w-5 h-5 text-yellow-400" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>In Progress</CardDescription>
                <CardTitle className="text-3xl font-bold text-blue-600">{stats.in_progress}</CardTitle>
              </CardHeader>
              <CardContent>
                <Clock className="w-5 h-5 text-blue-400" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Completed</CardDescription>
                <CardTitle className="text-3xl font-bold text-green-600">{stats.completed}</CardTitle>
              </CardHeader>
              <CardContent>
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Orders Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-900">Your Orders</h3>
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4" />
                  New Order
                </Button>
              </div>

              {orders.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600 mb-4">You haven&apos;t placed any orders yet</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Start Your First Order
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">{order.business_name}</CardTitle>
                            <CardDescription>
                              {order.service_type} • {order.state}
                            </CardDescription>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.replace("_", " ")}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-slate-600">
                            {getStatusIcon(order.status)}
                            <span>Ordered {formatDate(order.created_at)}</span>
                          </div>
                          <span className="font-semibold text-slate-900">
                            {formatCurrency(order.amount)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Account Details */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">Account Details</h3>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-blue-600" />
                    <CardTitle>Profile Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Full Name</p>
                    <p className="font-semibold text-slate-900">{profile?.full_name || "Not set"}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Email</p>
                    <p className="font-semibold text-slate-900 break-all">{profile?.email || "Not set"}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Member Since</p>
                    <p className="font-semibold text-slate-900">
                      {profile?.created_at ? formatDate(profile.created_at) : "Unknown"}
                    </p>
                  </div>

                  <Button variant="outline" className="w-full mt-4">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
                  <p className="text-sm text-blue-800 mb-4">
                    Our support team is here to assist you with your orders.
                  </p>
                  <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-100">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}