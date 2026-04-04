import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { SEO } from "@/components/SEO";

const faqs = [
  {
    q: "Can I get an EIN without an SSN or ITIN?",
    a: "Yes. Non-US residents without an SSN or ITIN can still obtain an EIN by faxing Form SS-4 directly to the IRS.",
  },
  {
    q: "How long does the IRS fax method take?",
    a: "The IRS typically processes faxed SS-4 applications within 4–8 weeks, though the official window is up to 45 business days.",
  },
  {
    q: "Do I need an EIN to open a Mercury or Wise account?",
    a: "Yes. Mercury requires an EIN and your LLC formation documents. Wise Business and Payoneer also strongly prefer an EIN for US account features.",
  },
  {
    q: "Can I use my EIN for Amazon FBA?",
    a: "Absolutely. Amazon requires an EIN for US seller accounts when you register as a business entity.",
  },
];

export default function EINGuide() {
  return (
    <>
      <SEO
        title="How to Get an EIN as a Non-US Resident | ecomifyUSA"
        description="Step-by-step guide to getting a US EIN (Employer Identification Number) as a non-US resident using the IRS fax method."
      />
      <div className="min-h-screen bg-white font-sans">
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <Logo />
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/case-studies" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Case Studies</Link>
              <Link href="/pricing" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Pricing</Link>
              <Link href="/blog" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Blog</Link>
              <Link href="/checkout">
                <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
              </Link>
            </nav>
          </div>
        </header>

        <article className="max-w-3xl mx-auto px-4 py-16">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-slate-600">EIN for non-US residents</span>
          </nav>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-700 rounded-full">EIN Guide</span>
            <span className="text-xs text-slate-400">For international sellers · 5 min read</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            How to get an EIN as a non-US resident
          </h1>
          <p className="text-xl text-slate-500 mb-10 leading-relaxed">
            An EIN is the IRS-issued tax ID number for your US LLC. Without one, you can't open a US bank account or sell on Amazon as a business.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-2xl p-6 mb-10">
            <div className="font-bold text-blue-900 mb-1">Quick facts</div>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Method for non-residents: IRS fax (Form SS-4)</li>
              <li>• Typical processing time: 15–30 business days</li>
              <li>• Cost: Free</li>
              <li>• SSN or ITIN required: No</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why you need an EIN</h2>
          <div className="space-y-3 mb-8">
            {[
              { title: "US bank account", desc: "Mercury, Relay, and most US business banks require an EIN." },
              { title: "Amazon & Walmart seller accounts", desc: "Both marketplaces require an EIN for business entities." },
              { title: "Payment processors", desc: "Stripe, PayPal Business require an EIN." },
              { title: "IRS tax filings", desc: "Your LLC must file using the EIN." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{item.title}</div>
                  <div className="text-slate-600 text-sm mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-4">The IRS fax method: step by step</h2>
          <div className="space-y-4 mb-8">
            {[
              {
                step: "1",
                title: "Form your LLC first",
                desc: "You must have a registered LLC before applying for an EIN.",
              },
              {
                step: "2",
                title: "Download Form SS-4",
                desc: "Download IRS Form SS-4 from irs.gov.",
              },
              {
                step: "3",
                title: "Complete the form",
                desc: "Fill in your LLC's legal name, address, state of formation, and responsible party details.",
              },
              {
                step: "4",
                title: "Fax to the IRS",
                desc: "Fax your completed SS-4 to +1 855-641-6935.",
              },
              {
                step: "5",
                title: "Wait for the IRS to fax back",
                desc: "The IRS will fax your EIN confirmation letter back.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{item.title}</div>
                  <div className="text-slate-600 mt-1">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3 mb-12">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-5 bg-white">
                <div className="font-semibold text-slate-800 text-sm mb-2">{faq.q}</div>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-8">
            <div className="text-sm font-semibold text-slate-500 mb-4">Related guides</div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/pricing" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                <ArrowRight className="w-4 h-4" /> View our pricing
              </Link>
            </div>
          </div>
        </article>

        <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-indigo-700">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-2xl font-bold mb-3">Get your EIN in 15–30 days — handled for you</h2>
            <p className="text-blue-100 mb-6">
              We prepare, review, and fax your SS-4 so you can focus on building your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/checkout">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-5 rounded-xl font-bold">
                  Get Started <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a href="https://wa.me/13072180376?text=Hi%2C%20I%20need%20an%20EIN%20for%20my%20US%20LLC." target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-5 rounded-xl">
                  <Phone className="mr-2 w-4 h-4" /> Ask on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}