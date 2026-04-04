import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Eye, EyeOff, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { SEO } from "@/components/SEO";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export default function PortalLoginPage() {
    const router = useRouter();
    const { signIn, user } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            router.push("/portal/dashboard");
        }
    }, [user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const { error } = await signIn(email, password);

        if (error) {
            setError(error);
        } else {
            router.push("/portal/dashboard");
        }

        setLoading(false);
    };

    const features = [
        "Never miss a deadline again",
        "Track compliance across all states",
        "Secure document storage",
        "Automated reminders via email & WhatsApp",
        "Real-time compliance status"
    ];

    return (
        <>
            <SEO
                title="Client Portal Login - ecomifyUSA"
                description="Access your client portal to manage deadlines, documents, and compliance tracking."
            />
            <div className="min-h-screen bg-slate-50 font-sans">
                {/* Navigation */}
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                        <Logo />
                        <nav className="hidden md:flex items-center gap-8">
                            <Link href="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
                            <Link href="/portal" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Portal</Link>
                            <Link href="/portal/register">
                                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20">Sign Up Free</Button>
                            </Link>
                        </nav>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Login Form */}
                        <div className="max-w-md mx-auto lg:mx-0">
                            <Card className="border-slate-200 shadow-xl">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl font-bold text-slate-900">Welcome Back</CardTitle>
                                    <p className="text-slate-600 mt-2">Sign in to your client portal</p>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="your@email.com"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="password">Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Enter your password"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>

                                        {error && (
                                            <Alert className="border-red-200 bg-red-50">
                                                <AlertCircle className="h-4 w-4 text-red-600" />
                                                <AlertDescription className="text-red-800">
                                                    {error}
                                                </AlertDescription>
                                            </Alert>
                                        )}

                                        <Button
                                            type="submit"
                                            className="w-full bg-blue-600 hover:bg-blue-700"
                                            disabled={loading}
                                        >
                                            {loading ? "Signing in..." : "Sign In"}
                                        </Button>
                                    </form>

                                    <div className="mt-6 text-center space-y-2">
                                        <Link
                                            href="/portal/forgot-password"
                                            className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                                        >
                                            Forgot your password?
                                        </Link>
                                        <div className="text-sm text-slate-600">
                                            Don't have an account?{" "}
                                            <Link
                                                href="/portal/register"
                                                className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                                            >
                                                Sign up free
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Features */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                                    Your Compliance Command Center
                                </h2>
                                <p className="text-lg text-slate-600 mb-6">
                                    Access all your business compliance tools in one secure dashboard.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-slate-700">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                <h3 className="font-semibold text-blue-900 mb-2">Why Choose Our Portal?</h3>
                                <p className="text-blue-800 text-sm">
                                    Join 500+ entrepreneurs who have eliminated compliance stress.
                                    Our portal prevents costly penalties and keeps you organized.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}