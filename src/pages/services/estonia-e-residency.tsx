import { SEO } from "@/components/SEO";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, Globe2, ShieldCheck, CalendarDays, Clock3 } from "lucide-react";
import Footer from "@/components/Footer";

export default function EstoniaEResidencyPage() {
  return (
    <>
      <SEO
        title="Estonia e-Residency & OÜ Formation | ecomifyUSA"
        description="Launch your EU business remotely with Estonia e-Residency, OÜ formation, VAT registration, and digital EU market access."
      />

      <div className="relative min-h-screen bg-slate-50 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ opacity: 0.07 }}>
          <svg viewBox="0 0 1200 1000" className="w-full h-full">
            <path d="M120 280 L180 220 L250 200 L310 180 L380 190 L430 210 L490 200 L540 220 L620 200 L680 210 L740 250 L780 290 L810 340 L840 420 L860 520 L850 620 L800 700 L720 760 L630 780 L560 760 L510 720 L470 680 L430 640 L390 620 L340 600 L290 560 L250 520 L220 470 L200 420 L180 360 Z" fill="none" stroke="#cbd5e1" strokeWidth="4" />
            <path d="M390 130 L430 90 L470 80 L500 90 L520 120 L520 170 L500 210 L460 210 L430 190 Z" fill="none" stroke="#cbd5e1" strokeWidth="4" />
            <path d="M480 110 L520 100 L560 110 L590 130 L610 160 L620 190 L620 230 L600 260 L560 260 L520 240 L500 210 Z" fill="none" stroke="#cbd5e1" strokeWidth="4" />
            <path d="M260 380 L300 330 L340 310 L380 310 L420 340 L430 380 L420 420 L380 450 L340 450 L300 430 Z" fill="none" stroke="#cbd5e1" strokeWidth="4" />
            <path d="M520 310 L560 290 L610 290 L660 310 L680 340 L690 380 L680 420 L650 450 L620 460 L580 450 L550 420 L530 380 Z" fill="none" stroke="#cbd5e1" strokeWidth="4" />
            <path d="M560 370 L600 350 L640 340 L680 350 L700 380 L700 420 L680 460 L640 470 L600 460 L560 430 Z" fill="#60a5fa" stroke="#60a5fa" strokeWidth="2" className="estonia-pulse" />
            <path d="M560 390 L590 380 L610 390 L620 410 L610 430 L590 440 L570 430 Z" fill="#93c5fd" stroke="#93c5fd" strokeWidth="2" />
            <path d="M560 430 L590 420 L610 430 L620 450 L610 470 L590 480 L570 470 Z" fill="#93c5fd" stroke="#93c5fd" strokeWidth="2" />
            <path d="M320 420 L360 390 L410 380 L450 390 L470 420 L470 450 L450 480 L410 500 L360 500 L330 480 Z" fill="none" stroke="#cbd5e1" strokeWidth="4" />
            <path d="M520 450 L560 430 L610 430 L640 450 L650 480 L640 510 L610 530 L570 520 L540 490 Z" fill="none" stroke="#cbd5e1" strokeWidth="4" />
            <path d="M380 540 L420 520 L460 510 L500 510 L530 540 L540 580 L520 620 L480 640 L430 640 L400 620 Z" fill="none" stroke="#cbd5e1" strokeWidth="4" />
            <path d="M240 520 L280 500 L320 490 L360 500 L380 530 L380 560 L360 590 L320 600 L280 590 L250 560 Z" fill="none" stroke="#cbd5e1" strokeWidth="4" />
            <circle cx="320" cy="500" r="10" fill="#0ea5e9" />
            <circle cx="180" cy="440" r="10" fill="#0ea5e9" />
            <circle cx="620" cy="430" r="10" fill="#0ea5e9" />
            <circle cx="560" cy="400" r="10" fill="#0ea5e9" />
            <circle cx="430" cy="460" r="10" fill="#0ea5e9" />
            <path d="M520 370 L530 360 L540 370 L530 380 Z" fill="#fff" opacity="0.7" />
          </svg>
        </div>

        <header className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                <ArrowLeft className="w-4 h-4" /> Back to Services
              </Link>
              <h1 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Launch Your EU Business Remotely with Estonia e-Residency
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/checkout">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Order Estonia Package</Button>
              </Link>
              <a
                href="https://wa.me/13072180376?text=Hi%2C%20I'm%20interested%20in%20Estonia%20e-Residency%20and%20O%C3%9C%20formation."
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-16 space-y-20">
          <section className="grid gap-10 lg:grid-cols-[1.5fr_1fr] items-start">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">Estonia e-Residency</p>
              <p className="text-lg text-slate-700 leading-8">
                Estonia e-Residency gives international entrepreneurs a secure digital identity from a trusted EU government. With your digital ID, you can form an Estonian OÜ company, sign documents online, register for EU VAT, and access the European business ecosystem without ever visiting Estonia.
              </p>
              <p className="text-lg text-slate-700 leading-8">
                Estonia is the best EU jurisdiction for remote founders because its company registration is fast, fully digital, low cost, and built for global business. The Estonian e-Residency program is ideal for digital nomads, SaaS founders, consultants, and ecommerce sellers seeking a stable EU presence.
              </p>
            </div>

            <Card className="bg-slate-900 text-white p-8">
              <CardHeader>
                <CardTitle className="text-2xl">Why Estonia is the top EU choice</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-200">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-blue-400 mt-1" />
                  <div>
                    <p className="font-semibold">EU legal gateway</p>
                    <p className="text-sm text-slate-300">Estonia is an EU member state with a business-friendly company law regime and modern e-services.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe2 className="w-6 h-6 text-blue-400 mt-1" />
                  <div>
                    <p className="font-semibold">100% digital process</p>
                    <p className="text-sm text-slate-300">Apply entirely online, receive your secure digital ID, and form an OÜ company without travel.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CalendarDays className="w-6 h-6 text-blue-400 mt-1" />
                  <div>
                    <p className="font-semibold">Fast setup</p>
                    <p className="text-sm text-slate-300">Most e-Residency applications and OÜ formations complete in weeks, not months.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <p className="font-semibold">Built for remote founders</p>
                    <p className="text-sm text-slate-300">Estonia is designed for international entrepreneurs who want an EU business identity from anywhere in the world.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900">Benefits of Estonia e-Residency + OÜ</h2>
              <p className="mt-3 text-slate-600">Everything you need to start an EU company with remote access, low maintenance, and a future-ready digital structure.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { title: "100% online process", desc: "Apply for e-Residency, sign documents digitally, and register your OÜ without stepping foot in Estonia." },
                { title: "EU market access", desc: "Establish a legal EU business entity that can trade across the bloc and register for EU VAT." },
                { title: "Digital nomad friendly", desc: "Keep your business moving with a secure Estonian digital ID that works from anywhere." },
                { title: "Low maintenance costs", desc: "Estonia OÜ companies have lean ongoing costs, no mandatory physical office, and simple annual reporting." },
                { title: "EU VAT capable", desc: "Register your OÜ for VAT and sell to European customers with valid invoices and compliance in place." },
                { title: "Access to EU banking", desc: "Estonia e-Residency unlocks eligibility for EU-friendly fintech and banking partners." },
              ].map((benefit) => (
                <Card key={benefit.title} className="border-slate-200 p-6 hover:border-blue-200 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-900">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-600">{benefit.desc}</CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="grid lg:grid-cols-[1fr_0.9fr] gap-10 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">What is e-Residency?</h2>
              <p className="text-slate-700 leading-8">
                Estonia e-Residency is a government-issued digital identity program that gives non-residents secure access to Estonia's online business services. It is not citizenship or tax residency — it is a digital key to Estonia's business ecosystem.
              </p>
              <ul className="space-y-4 text-slate-600">
                <li className="flex gap-3"><span className="mt-1 text-blue-600">•</span> The Estonian government issues a secure digital ID card with electronic authentication and digital signing.</li>
                <li className="flex gap-3"><span className="mt-1 text-blue-600">•</span> Anyone from outside the EU can apply, including entrepreneurs, freelancers, founders, and digital nomads.</li>
                <li className="flex gap-3"><span className="mt-1 text-blue-600">•</span> It enables company formation, access to e-services, document signing, EU VAT registration, and safer international business operations.</li>
                <li className="flex gap-3"><span className="mt-1 text-blue-600">•</span> With e-Residency, your OÜ company can open accounts with EU-compatible banking and fintech providers.</li>
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Who can apply?</h3>
              <p className="text-slate-700 leading-7 mb-4">
                Applicants must be at least 18 years old and able to pass a background check. The program is open to entrepreneurs from anywhere in the world who want a digital European business identity.
              </p>
              <div className="space-y-4 text-slate-600">
                <p><strong>Great fit for:</strong></p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Remote founders and freelancers</li>
                  <li>SaaS and software companies</li>
                  <li>Consultants selling services to EU clients</li>
                  <li>Ecommerce sellers targeting European customers</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900">Our services and pricing</h2>
              <p className="mt-3 text-slate-600">Choose the package that matches your launch plan, or book the full EU setup bundle.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { title: "e-Residency Application Assistance", price: "$149", detail: "We guide your application, verify documents, and help you prepare for card pickup at your chosen Estonian embassy or pickup point." },
                { title: "Estonia OÜ Formation", price: "$297 + €190 state fee", detail: "Full company formation service including articles of association, registration, and Estonian address support." },
                { title: "EU VAT Registration", price: "$199", detail: "Register your Estonian OÜ for EU VAT so you can issue VAT-compliant invoices and sell across Europe." },
                { title: "Complete EU Package", price: "$597 + €190 state fee", detail: "e-Residency + OÜ formation + VAT registration bundled for the fastest, lowest-risk launch." },
                { title: "Annual accounts filing", price: "$299/year", detail: "Estonian annual report preparation and filing so your OÜ stays compliant with local accounting rules." },
                { title: "Monthly VAT filing", price: "$99/month", detail: "Recurring VAT return preparation and submission for EU sales, keeping your business compliant month after month." },
              ].map((item) => (
                <Card key={item.title} className="border-slate-200 p-6">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-900">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-slate-600">
                    <div className="text-2xl font-semibold text-blue-600">{item.price}</div>
                    <p>{item.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-slate-900">How the process works</h2>
              <p className="mt-3 text-slate-600">A clear step-by-step path from digital ID to EU-ready company.</p>
            </div>
            <div className="lg:col-span-3 grid gap-4">
              {[
                { step: "1", title: "Apply for e-Residency", desc: "We help you complete your Estonian e-Residency application and submit documents online." },
                { step: "2", title: "Receive digital ID card", desc: "Pick up your secure Estonian ID card at a regional embassy or partner pickup point." },
                { step: "3", title: "Form OÜ company", desc: "We register your Estonian OÜ, prepare articles, and secure a registered address." },
                { step: "4", title: "Register for VAT", desc: "We handle EU VAT registration for your new OÜ so you can legally sell inside the European Union." },
                { step: "5", title: "Start selling in EU", desc: "Launch products or services across EU markets with compliant invoicing and bookkeeping support." },
              ].map((item) => (
                <div key={item.step} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white text-lg font-bold mb-4">{item.step}</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-900 text-white rounded-3xl p-10 grid gap-10 lg:grid-cols-[1fr_0.9fr] items-center">
            <div>
              <h2 className="text-3xl font-bold">Ready to start your Estonia EU business?</h2>
              <p className="mt-4 text-slate-300 leading-7">Book the complete setup or choose the support package that fits your launch timeline. We handle the paperwork so you can focus on growth.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Link href="/checkout">
                <Button className="bg-blue-500 hover:bg-blue-600">Go to Checkout</Button>
              </Link>
              <a
                href="https://wa.me/13072180376?text=Hello%2C%20I%20want%20help%20with%20Estonia%20e-Residency%20and%20O%C3%9C%20formation."
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="outline" className="border-white text-white hover:bg-white/10">WhatsApp Support</Button>
              </a>
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently asked questions</h2>
              <div className="space-y-4">
                {[
                  {
                    q: "How long does it take?",
                    a: "Estonia e-Residency applications usually take 1-3 weeks to process. OÜ formation can be completed within the same month once your digital ID card is issued and you provide signed documents."
                  },
                  {
                    q: "Do I need to visit Estonia?",
                    a: "No. You do not need to live in or travel to Estonia to form an OÜ. The only possible visit is to pick up your physical e-Residency card from a partner pickup location or embassy, depending on your country."
                  },
                  {
                    q: "Can I open an EU bank account?",
                    a: "Yes, many Estonian e-Residents qualify for EU-friendly banking and fintech services. We guide you toward banking partners that accept e-Residency companies and provide the right paperwork."
                  },
                  {
                    q: "Is it legitimate?",
                    a: "Absolutely. Estonia e-Residency is a government program run by the Estonian Ministry of Economic Affairs and Communications. It is a fully legal way to establish a digital EU company and operate across European markets."
                  },
                ].map((faq) => (
                  <div key={faq.q} className="rounded-3xl border border-slate-200 p-6">
                    <h3 className="text-xl font-semibold text-slate-900">{faq.q}</h3>
                    <p className="mt-3 text-slate-600 leading-7">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <style jsx>{`
          .estonia-pulse {
            animation: estoniaPulse 2.8s ease-in-out infinite;
            transform-origin: center center;
          }

          @keyframes estoniaPulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.08);
            }
          }
        `}</style>
      </div>
    </>
  );
}
