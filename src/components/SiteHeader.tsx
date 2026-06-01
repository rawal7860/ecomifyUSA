import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

/**
 * Unified sticky site header (paper bar, hairline border, gold CTA).
 * Used on pages that need consistent top chrome.
 */
export default function SiteHeader() {
  return (
    <header className="bg-paper/85 backdrop-blur-md sticky top-0 z-50 border-b border-hairline">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Logo />
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          <Link href="/pricing" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Pricing</Link>
          <Link href="/which-state" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Which State?</Link>
          <Link href="/services" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Services</Link>
          <Link href="/blog" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Blog</Link>
          <Link href="/checkout?service=Wyoming%20LLC">
            <Button className="bg-gold hover:bg-gold-bright text-white">Get Started</Button>
          </Link>
        </nav>
        <div className="md:hidden">
          <Link href="/checkout?service=Wyoming%20LLC">
            <Button size="sm" className="bg-gold hover:bg-gold-bright text-white">Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
