import { useState, type FormEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, ArrowRight, LoaderCircle, LockKeyhole } from "lucide-react";
import { getSalesTaxSupabase } from "@/lib/salestax";

export default function SalesTaxLoginPage() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setBusy(true); setError("");
    try { const { error: authError } = await getSalesTaxSupabase().auth.signInWithPassword({ email: email.trim(), password }); if (authError) throw authError; window.location.assign("/salestax/portal/dashboard"); }
    catch (loginError) { setError(loginError instanceof Error ? loginError.message : "Unable to sign in."); }
    finally { setBusy(false); }
  };
  return <><Head><title>Client Login | ecomifyUSA</title></Head><main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10"><div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 md:p-9"><Link href="/salestax" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-700"><ArrowLeft className="h-4 w-4" />Sales tax portal</Link><div className="mt-7 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><LockKeyhole className="h-6 w-6" /></div><h1 className="mt-5 text-2xl font-black text-slate-900">Welcome back</h1><p className="mt-2 text-sm text-slate-500">Sign in to manage your sales tax filings.</p><form onSubmit={submit} className="mt-7 space-y-4"><label className="block text-sm font-semibold text-slate-700">Email address<input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-3 font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label><label className="block text-sm font-semibold text-slate-700">Password<input required type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-3 font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label>{error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white hover:bg-blue-700 disabled:opacity-60">{busy && <LoaderCircle className="h-4 w-4 animate-spin" />}Sign in <ArrowRight className="h-4 w-4" /></button></form><p className="mt-6 text-center text-sm text-slate-500">New to ecomifyUSA? <Link href="/salestax/portal/register" className="font-bold text-blue-700">Create an account</Link></p></div></main></>;
}
