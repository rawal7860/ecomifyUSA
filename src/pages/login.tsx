import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { authService } from "@/services/authService";
import { CheckCircle2, Building2, Star, Info } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (router.query.message) {
      setMessage(router.query.message as string);
    }
  }, [router.query]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await authService.signIn(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Sign In - Salestaxus LLC"
        description="Sign in to your Salestaxus LLC account to manage your business formation orders and account details."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Trust Sidebar */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Building2 className="w-12 h-12 text-blue-600" />
                <h1 className="text-4xl font-bold text-slate-900">Salestaxus LLC</h1>
              </div>
              <p className="text-xl text-slate-600">Your trusted partner in business formation</p>
            </div>

            <Card className="border-blue-200 bg-white/80 backdrop-blur">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-slate-700">5.0 Rating on Fiverr</span>
                </div>
                
                <div className="space-y-3">
                  <p className="text-2xl font-bold text-slate-900">Join 300+ entrepreneurs</p>
                  <p className="text-slate-600">who trust Salestaxus LLC for their business needs</p>
                </div>

                <div className="space-y-2 pt-4">
                  {[
                    "Fast LLC formation in all 50 states",
                    "Expert guidance every step of the way",
                    "Transparent pricing, no hidden fees",
                    "Dedicated support team"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Login Form */}
          <Card className="border-slate-200 shadow-xl">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-bold text-slate-900">Welcome Back</CardTitle>
              <CardDescription className="text-slate-600">
                Sign in to access your dashboard
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {message && (
                  <Alert className="border-blue-200 bg-blue-50">
                    <Info className="w-4 h-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">{message}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      href="/reset-password" 
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4">
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>

                <p className="text-sm text-center text-slate-600">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Create Account
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>

          {/* Mobile Trust Badge */}
          <div className="lg:hidden">
            <Card className="border-blue-200 bg-white/80 backdrop-blur">
              <CardContent className="pt-6 text-center space-y-3">
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="font-semibold text-slate-900">Trusted by 300+ entrepreneurs</p>
                <p className="text-sm text-slate-600">5.0 Rating on Fiverr</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}