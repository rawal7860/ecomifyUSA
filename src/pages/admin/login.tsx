import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { Eye, EyeOff, AlertCircle, Lock } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/Logo";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const result = await response.json();

    setLoading(false);

    if (!response.ok) {
      setError(result.error || "Unable to sign in");
      return;
    }

    router.push("/admin");
  };

  return (
    <>
      <SEO
        title="Admin Login - ecomifyUSA"
        description="Secure admin login for ecomifyUSA client portal management."
      />
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center">
            <Logo />
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="w-full max-w-3xl">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">Admin access</p>
                <h1 className="text-4xl font-bold text-slate-900">Admin Portal</h1>
                <p className="text-slate-600 leading-relaxed">
                  Use your admin password to securely manage clients, reminders, deadlines, and portal settings.
                </p>
                <div className="grid gap-4">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm text-slate-500">Quick actions</p>
                    <ul className="mt-4 space-y-3 text-slate-700">
                      <li>• View recent clients</li>
                      <li>• Track upcoming reminders</li>
                      <li>• Add clients and manage deadlines</li>
                      <li>• Send manual WhatsApp reminders</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Card className="border-slate-200 shadow-xl">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Lock className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-2xl">Admin Sign In</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Admin Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="Enter admin password"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {error && (
                      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                      </div>
                    )}

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>

                  <div className="mt-6 text-sm text-slate-600 text-center">
                    Need to create a new admin? Update <code>ADMIN_PASSWORD</code> in your environment.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (isAdminAuthenticated(ctx.req)) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
