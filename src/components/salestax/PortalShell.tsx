import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { CalendarDays, FileClock, LayoutDashboard, LogOut, MessageCircle, ShieldCheck, Download } from "lucide-react";
import { getSalesTaxSupabase } from "@/lib/salestax";

export function PortalShell({ children, title }: { children: ReactNode; title: string }) {
  const router = useRouter();
  const links = [
    { href: "/salestax/portal/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/salestax/portal/states", label: "My states", icon: ShieldCheck },
    { href: "/salestax/portal/filings", label: "Filing history", icon: FileClock },
  ];
  const signOut = async () => {
    await getSalesTaxSupabase().auth.signOut();
    await router.push("/salestax/portal/login");
  };
  return <div className="min-h-screen bg-slate-50 text-slate-900">
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white p-5 md:flex md:flex-col">
        <Link href="/salestax" className="mb-9 text-xl font-black tracking-tight text-slate-900">ecomify<span className="text-blue-600">USA</span><span className="mt-1 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Sales tax portal</span></Link>
        <nav className="space-y-1">{links.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${router.pathname === href ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}><Icon className="h-4 w-4" />{label}</Link>)}</nav>
        <div className="mt-auto space-y-3 border-t border-slate-100 pt-5">
          <a href="https://wa.me/13072180376" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-green-50 hover:text-green-700"><MessageCircle className="h-4 w-4" />Contact support</a>
          <button onClick={() => window.print()} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-600 hover:bg-slate-50"><Download className="h-4 w-4" />Download documents</button>
          <button onClick={signOut} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-500 hover:bg-slate-50"><LogOut className="h-4 w-4" />Sign out</button>
        </div>
      </aside>
      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur md:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div><div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Sales tax portal</div><h1 className="text-xl font-bold text-slate-900">{title}</h1></div>
            <Link href="/salestax/portal/dashboard" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden" aria-label="Dashboard"><CalendarDays className="h-5 w-5" /></Link>
          </div>
          <nav className="mx-auto mt-3 flex max-w-7xl gap-2 overflow-auto md:hidden">{links.map(({ href, label }) => <Link key={href} href={href} className="whitespace-nowrap rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">{label}</Link>)}<a href="https://wa.me/13072180376" target="_blank" rel="noreferrer" className="whitespace-nowrap rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-800">Contact support</a><button onClick={() => window.print()} className="whitespace-nowrap rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">Download documents</button><button onClick={signOut} className="whitespace-nowrap rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">Sign out</button></nav>
        </header>
        <div className="mx-auto max-w-7xl p-4 md:p-8">{children}</div>
      </main>
    </div>
  </div>;
}

export function LoadingPanel({ error }: { error?: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">{error || "Loading your sales tax account…"}</div>;
}
