import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import {
    Shield, Lock, CheckCircle2, ArrowRight,
    MessageCircle, Star, Clock, Zap, ChevronDown
} from "lucide-react";
import { authService } from "@/services/authService";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

const SERVICES = [
    { value: "Wyoming LLC", label: "Wyoming LLC Formation", price: 197, badge: "Most Popular" },
    { value: "Wyoming LLC + Compliance", label: "Wyoming LLC + Annual Compliance", price: 297, badge: "Best Value" },
    { value: "Delaware LLC", label: "Delaware LLC Formation", price: 347, badge: null },
    { value: "Sales Tax Filing", label: "Sales Tax Filing", price: null, badge: null },
    { value: "Tax Exemption Certificates", label: "Tax Exemption Certificates", price: null, badge: null },
    { value: "Annual Report Filing", label: "Annual Report Filing", price: null, badge: null },
    { value: "Other", label: "Other / Custom Service", price: null, badge: null },
];

const COUNTRIES = [
    "United Kingdom", "Pakistan", "India", "UAE", "Saudi Arabia",
    "China", "Bangladesh", "Nigeria", "Canada", "Australia",
    "Germany", "France", "Turkey", "Egypt", "South Africa",
    "Brazil", "Mexico", "Indonesia", "Malaysia", "Philippines",
    "United States", "Other",
];

const WHATSAPP_NUMBER = "13072180376";

interface FormData {
    fullName: string;
    email: string;
    whatsapp: string;
    country: string;
    service: string;
    notes: string;
    createAccount: boolean;
    password: string;
}

export default function CheckoutPage() {
    const router = useRouter();
    const { service: queryService } = router.query;

    const defaultService = SERVICES.find(s => s.value === queryService) ? queryService as string : "";

    const [form, setForm] = useState<FormData>({
        fullName: "",
        email: "",
        whatsapp: "",
        country: "",
        service: defaultService,
        notes: "",
        createAccount: false,
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [orderNumber, setOrderNumber] = useState("");

    const selectedService = SERVICES.find(s => s.value === form.service);

    const set = (field: keyof FormData, value: string | boolean) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setError("");
    };

    const validate = () => {
        if (!form.fullName.trim()) return setError("Please enter your full name."), false;
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) return setError("Please enter a valid email address."), false;
        if (!form.whatsapp.trim()) return setError("Please enter your WhatsApp number."), false;
        if (!form.country) return setError("Please select your country."), false;
        if (!form.service) return setError("Please select a service."), false;
        if (form.createAccount && (!form.password || form.password.length < 6)) return setError("Password must be at least 6 characters."), false;
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        setError("");

        try {
            let userId: string | null = null;

            if (form.createAccount) {
                try {
                    const { data: existing } = await supabase
                        .from("profiles")
                        .select("id")
                        .eq("email", form.email)
                        .maybeSingle();

                    if (existing) {
                        setError("This email is already registered. Please log in instead.");
                        setLoading(false);
                        setTimeout(() => router.push("/login"), 2000);
                        return;
                    }

                    const authData = await authService.signUp(form.email, form.password, form.fullName);
                    userId = authData?.data?.user?.id || null;
                } catch {
                    // proceed as guest
                }
            }

            const num = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
            const amount = selectedService?.price ?? 0;

            const { data: order, error: orderError } = await supabase
                .from("orders")
                .insert({
                    user_id: userId,
                    order_number: num,
                    service_type: form.service,
                    business_name: form.fullName,
                    state: form.country,
                    status: "pending",
                    amount,
                    payment_status: "unpaid",
                    customer_email: form.email,
                    customer_name: form.fullName,
                    customer_phone: form.whatsapp,
                    notes: form.notes || null,
                })
                .select()
                .single();

            if (orderError) throw new Error("Failed to save order. Please try again.");

            if (amount > 0) {
                try {
                    await fetch("/api/create-invoice", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            customer_email: form.email,
                            customer_name: form.fullName,
                            amount,
                            description: form.service,
                            order_id: order.id,
                        }),
                    });
                } catch {
                    // non-blocking
                }
            }

            // Trigger WhatsApp message
            const msg = encodeURIComponent(
                `Hi, I just placed an order on ecomifyUSA!\n\n` +
                `📋 Order: ${num}\n` +
                `👤 Name: ${form.fullName}\n` +
                `📧 Email: ${form.email}\n` +
                `🌍 Country: ${form.country}\n` +
                `📦 Service: ${form.service}${amount ? ` ($${amount})` : ""}\n` +
                (form.notes ? `📝 Notes: ${form.notes}\n` : "") +
                `\nPlease confirm and let me know the next steps.`
            );
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");

            setOrderNumber(num);
            setSubmitted(true);
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEO
                title="Get Started — ecomifyUSA"
                description="Start your US LLC formation or compliance service. Fast, reliable, trusted by 500+ international sellers."
            />
            <div className="min-h-screen bg-slate-50 font-sans">

                {/* Nav */}
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                        <Logo />
                        <nav className="hidden md:flex items-center gap-8">
                            <Link href="/pricing" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Pricing</Link>
                            <Link href="/which-state" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Which State?</Link>
                            <Link href="/blog" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Blog</Link>
                        </nav>
                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20have%20a%20question%20about%20your%20services.`}
                            target="_blank" rel="noopener noreferrer"
                        >
                            <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 gap-2">
                                <MessageCircle className="w-4 h-4" /> WhatsApp Us
                            </Button>
                        </a>
                    </div>
                </header>

                {submitted ? (
                    /* ── Thank You Screen ── */
                    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-slate-900 mb-3">Order Received!</h1>
                        <p className="text-slate-500 text-lg mb-2">Order <span className="font-semibold text-slate-700">{orderNumber}</span></p>
                        <p className="text-slate-500 mb-8">
                            We've received your request and a WhatsApp conversation has been opened.
                            Our team typically responds within a few hours.
                        </p>
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 text-left space-y-3">
                            <p className="text-sm font-semibold text-slate-700 mb-4">What happens next?</p>
                            {[
                                { icon: "💬", text: "We'll confirm your order on WhatsApp shortly" },
                                { icon: "📧", text: "A Stripe payment invoice will be sent to your email" },
                                { icon: "⚡", text: "Processing begins as soon as payment is received" },
                                { icon: "✅", text: "Documents delivered within 24–72 hours" },
                            ].map((step, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <span className="text-lg">{step.icon}</span>
                                    <span className="text-sm text-slate-600">{step.text}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                target="_blank" rel="noopener noreferrer"
                            >
                                <Button className="bg-green-500 hover:bg-green-600 gap-2 px-6">
                                    <MessageCircle className="w-4 h-4" /> Open WhatsApp
                                </Button>
                            </a>
                            <Link href="/">
                                <Button variant="outline" className="px-6">Back to Home</Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* ── Order Form ── */
                    <div className="max-w-6xl mx-auto px-4 py-12">

                        {/* Page header */}
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-4">
                                <Zap className="w-3.5 h-3.5" /> 500+ happy clients worldwide
                            </div>
                            <h1 className="text-4xl font-bold text-slate-900 mb-2">Get Started</h1>
                            <p className="text-slate-500 text-lg">Fill in the form — we'll confirm via WhatsApp and send a payment link.</p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8 items-start">

                            {/* ── Left: Form ── */}
                            <div className="lg:col-span-2">
                                <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">

                                    {/* Contact details */}
                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                                            Your Details
                                        </h2>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                                                <Input
                                                    id="fullName"
                                                    value={form.fullName}
                                                    onChange={e => set("fullName", e.target.value)}
                                                    placeholder="Ahmed Khan"
                                                    className="h-11"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={form.email}
                                                    onChange={e => set("email", e.target.value)}
                                                    placeholder="ahmed@example.com"
                                                    className="h-11"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor="whatsapp">
                                                    WhatsApp Number <span className="text-red-500">*</span>
                                                    <span className="ml-1 text-xs text-slate-400 font-normal">(with country code)</span>
                                                </Label>
                                                <Input
                                                    id="whatsapp"
                                                    type="tel"
                                                    value={form.whatsapp}
                                                    onChange={e => set("whatsapp", e.target.value)}
                                                    placeholder="+44 7700 123456"
                                                    className="h-11"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor="country">Country <span className="text-red-500">*</span></Label>
                                                <div className="relative">
                                                    <select
                                                        id="country"
                                                        value={form.country}
                                                        onChange={e => set("country", e.target.value)}
                                                        className="w-full h-11 px-3 pr-10 border border-slate-300 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                                    >
                                                        <option value="">Select your country…</option>
                                                        {COUNTRIES.map(c => (
                                                            <option key={c} value={c}>{c}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Service selection */}
                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                                            Service
                                        </h2>
                                        <div className="space-y-2.5">
                                            {SERVICES.map(svc => (
                                                <label
                                                    key={svc.value}
                                                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                                        form.service === svc.value
                                                            ? "border-blue-500 bg-blue-50"
                                                            : "border-slate-200 hover:border-blue-200 bg-white"
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="radio"
                                                            name="service"
                                                            value={svc.value}
                                                            checked={form.service === svc.value}
                                                            onChange={() => set("service", svc.value)}
                                                            className="accent-blue-600 w-4 h-4"
                                                        />
                                                        <div>
                                                            <span className="font-medium text-slate-800 text-sm">{svc.label}</span>
                                                            {svc.badge && (
                                                                <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">{svc.badge}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <span className="font-bold text-slate-700 text-sm shrink-0">
                                                        {svc.price ? `$${svc.price}` : "Get quote"}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    <div className="space-y-1.5">
                                        <Label htmlFor="notes">Message / Notes <span className="text-slate-400 font-normal text-xs">(optional)</span></Label>
                                        <textarea
                                            id="notes"
                                            value={form.notes}
                                            onChange={e => set("notes", e.target.value)}
                                            rows={4}
                                            placeholder="Tell us about your business, any specific requirements, questions, or the state you're considering for your LLC…"
                                            className="w-full px-3 py-2.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                        />
                                    </div>

                                    {/* Create account */}
                                    <div className="border-t border-slate-100 pt-5">
                                        <div className="flex items-start gap-3">
                                            <Checkbox
                                                id="createAccount"
                                                checked={form.createAccount}
                                                onCheckedChange={v => set("createAccount", v as boolean)}
                                                className="mt-0.5"
                                            />
                                            <div>
                                                <label htmlFor="createAccount" className="text-sm font-medium text-slate-800 cursor-pointer">
                                                    Create a free account to track your order
                                                </label>
                                                <p className="text-xs text-slate-500 mt-0.5">Access your dashboard, order history, and document downloads</p>
                                            </div>
                                        </div>
                                        {form.createAccount && (
                                            <div className="mt-3 space-y-1.5">
                                                <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    value={form.password}
                                                    onChange={e => set("password", e.target.value)}
                                                    placeholder="Min. 6 characters"
                                                    className="h-11 max-w-xs"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {error && (
                                        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                                            {error}
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        size="lg"
                                        disabled={loading}
                                        className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-base rounded-xl shadow-lg shadow-blue-600/20"
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                                Submitting…
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Submit Order <ArrowRight className="w-5 h-5" />
                                            </span>
                                        )}
                                    </Button>
                                    <p className="text-center text-xs text-slate-400">
                                        By submitting you agree to our{" "}
                                        <Link href="/terms-of-service" className="underline hover:text-slate-600">Terms of Service</Link>
                                        {" "}and{" "}
                                        <Link href="/privacy-policy" className="underline hover:text-slate-600">Privacy Policy</Link>.
                                    </p>
                                </form>
                            </div>

                            {/* ── Right: Order Summary ── */}
                            <div className="lg:col-span-1 space-y-4">

                                {/* Summary card */}
                                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sticky top-24">
                                    <h3 className="font-semibold text-slate-900 mb-4 text-base">Order Summary</h3>

                                    {form.service ? (
                                        <div className="space-y-3 mb-4">
                                            <div className="flex items-start justify-between gap-2">
                                                <span className="text-sm text-slate-600 leading-snug">{selectedService?.label}</span>
                                                <span className="font-bold text-slate-800 text-sm shrink-0">
                                                    {selectedService?.price ? `$${selectedService.price}` : "Quote"}
                                                </span>
                                            </div>
                                            {selectedService?.badge && (
                                                <span className="inline-block text-xs bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full font-medium">
                                                    {selectedService.badge}
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-slate-400 mb-4">Select a service to see your total.</p>
                                    )}

                                    <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                                        <span className="font-semibold text-slate-800">Total</span>
                                        <span className="text-xl font-bold text-blue-600">
                                            {selectedService?.price ? `$${selectedService.price}` : selectedService ? "Custom" : "—"}
                                        </span>
                                    </div>

                                    {selectedService?.price && (
                                        <p className="text-xs text-slate-400 mt-2">
                                            Payment link sent via email after order confirmation.
                                        </p>
                                    )}

                                    {/* Trust */}
                                    <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5">
                                        {[
                                            { icon: <Shield className="w-4 h-4 text-green-600" />, text: "Secure & confidential" },
                                            { icon: <CheckCircle2 className="w-4 h-4 text-green-600" />, text: "Money-back guarantee" },
                                            { icon: <Clock className="w-4 h-4 text-green-600" />, text: "24–72 hr delivery" },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                                                {item.icon} {item.text}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Social proof */}
                                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white">
                                    <div className="flex items-center gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-sm text-blue-100 leading-relaxed mb-3">
                                        "Got my Wyoming LLC + EIN in 3 days. Best service for non-US sellers. Highly recommend!"
                                    </p>
                                    <p className="text-xs text-blue-200 font-medium">— Ahmed K., Amazon FBA seller 🇵🇰</p>
                                </div>

                                {/* WhatsApp shortcut */}
                                <a
                                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20have%20a%20question%20before%20ordering.`}
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-4 hover:bg-green-100 transition-colors"
                                >
                                    <MessageCircle className="w-5 h-5 text-green-600 shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-green-800">Have questions first?</p>
                                        <p className="text-xs text-green-600">WhatsApp us — reply in hours</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                <Footer />
            </div>
        </>
    );
}
