import { useState, type FormEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, ArrowRight, LoaderCircle, ShieldCheck } from "lucide-react";
import { getSalesTaxSupabase, PLATFORM_OPTIONS } from "@/lib/salestax";

export default function SalesTaxRegisterPage() {
  const [values, setValues] = useState({ full_name: "", email: "", password: "", company_name: "", platform: "Amazon FBA", phone: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState(false);
  const update = (key: keyof typeof values, value: string) => setValues((current) => ({ ...current, [key]: value }));

  const submit = async (event: FormEvent) => {
    event.preventDefault(); setError(""); setBusy(true);
    try {
      const supabase = getSalesTaxSupabase();
      const { data, error: authError } = await supabase.auth.signUp({ email: values.email.trim(), password: values.password, options: { data: { full_name: values.full_name, company_name: values.company_name } } });
      if (authError) throw authError;
      if (!data.user) throw new Error("Account creation could not be completed. Please try again.");
      const { error: profileError } = await supabase.from("salestax_clients").insert({ user_id: data.user.id, full_name: values.full_name.trim(), email: values.email.trim(), company_name: values.company_name.trim(), platform: values.platform, phone: values.phone.trim() });
      if (profileError) throw profileError;
      if (data.session) window.location.assign("/salestax/portal/dashboard");
      else setConfirmEmail(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to create your account.");
    } finally { setBusy(false); }
  };

  return <><Head><title>Create Portal Account | ecomifyUSA</title></Head><main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10"><div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-9"><Link href="/salestax" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-700"><ArrowLeft className="h-4 w-4" />Sales tax portal</Link><div className="mt-6 flex items-center gap-3"><div className="rounded-xl bg-blue-50 p-3 text-blue-700"><ShieldCheck className="h-6 w-6" /></div><div><h1 className="text-2xl font-black text-slate-900">Create your account</h1><p className="mt-1 text-sm text-slate-500">Set up your sales tax compliance workspace.</p></div></div>{confirmEmail ? <div className="mt-7 rounded-2xl border border-emerald-200 bg-emerald-50 p-5"><h2 className="font-bold text-emerald-900">Check your email to continue</h2><p className="mt-2 text-sm leading-6 text-emerald-800">Your account is registered. Confirm your email, then sign in to access your dashboard.</p><Link className="mt-4 inline-flex items-center gap-2 font-bold text-emerald-900" href="/salestax/portal/login">Go to login <ArrowRight className="h-4 w-4" /></Link></div> : <form onSubmit={submit} className="mt-7 space-y-4">
    <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-slate-700">Full name<input required autoComplete="name" value={values.full_name} onChange={(e) => update("full_name", e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-3 font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label><label className="text-sm font-semibold text-slate-700">Company name<input required autoComplete="organization" value={values.company_name} onChange={(e) => update("company_name", e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-3 font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label></div>
    <label className="block text-sm font-semibold text-slate-700">Email address<input required type="email" autoComplete="email" value={values.email} onChange={(e) => update("email", e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-3 font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label>
    <label className="block text-sm font-semibold text-slate-700">Password<input required minLength={8} type="password" autoComplete="new-password" value={values.password} onChange={(e) => update("password", e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-3 font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /><span className="mt-1 block text-xs font-normal text-slate-400">Use at least 8 characters.</span></label>
    <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-slate-700">Selling platform<select value={values.platform} onChange={(e) => update("platform", e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 font-normal outline-none focus:border-blue-500">{PLATFORM_OPTIONS.map((item) => <option key={item}>{item}</option>)}</select></label><label className="text-sm font-semibold text-slate-700">Phone / WhatsApp<input type="tel" autoComplete="tel" value={values.phone} onChange={(e) => update("phone", e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-3 font-normal outline-none focus:border-blue-500" /></label></div>
    {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-60">{busy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}Create account <ArrowRight className="h-4 w-4" /></button>
  </form>}<p className="mt-6 text-center text-sm text-slate-500">Already registered? <Link href="/salestax/portal/login" className="font-bold text-blue-700 hover:text-blue-800">Sign in</Link></p></div></main></>;
}
