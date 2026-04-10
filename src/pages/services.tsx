import { SEO } from "@/components/SEO";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, FileText, CheckCircle2, Globe, TrendingUp, Shield, ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  const services = [
    {
      icon: DollarSign,
      title: "US Sales Tax Compliance",
      price: "$500 setup + $150/mo",
      desc: "Technical implementation partner for TaxJar. Nexus audit, product mapping, API integration for custom e-commerce.",
      features: ["Nexus Audit & Configuration", "Product Taxability Mapping", "TaxJar API Integration", "CPA Hand-off Workflow"]
    },
    {
      icon: TrendingUp,
      title: "Delaware Franchise Tax",
      price: "$400 (includes IRS 1120)",
      desc: "Reduce your tax bill legally. We switch from Authorized Shares to Assumed Par Value Method to minimize taxes.",
      features: ["Tax Method Analysis", "Minimization to $400", "Annual Report Filing", "IRS Form 1120 + 5472"]
    },
    {
      icon: Shield,
      title: "Sales Tax Permit Recovery",
      price: "$500 (up to 4 states)",
      desc: "Lost portal logins from previous freelancer? We recover access, file delinquent returns, and cancel unwanted permits.",
      features: ["Account Recovery", "Compliance Audit", "Filing & Cleanup", "Ongoing Setup"]
    },
    {
      icon: CheckCircle2,
      title: "Amazon/Walmart Tax Exemption",
      price: "$275 (46 states)",
      desc: "Stop paying tax on wholesale purchases. We get you exempt in 44+ states even with ITIN (no SSN).",
      features: ["Document Verification", "State-by-State Applications", "Platform Integration", "Renewal Monitoring"]
    },
    {
      icon: FileText,
      title: "LLC Formation + EIN + Permits",
      price: "$400 (Wyoming + 4 states)",
      desc: "Complete US business setup for international entrepreneurs. Wyoming LLC, EIN without SSN, multi-state permits.",
      features: ["Wyoming LLC Formation", "EIN Acquisition (No SSN)", "4 State Sales Tax Permits", "Bank Account Docs"]
    },
    {
      icon: Globe,
      title: "IRS Tax Filing (Foreign-Owned)",
      price: "Contact for Quote",
      desc: "Form 1120 + Form 5472 compliance for foreign-owned US LLCs. Avoid $25,000+ penalties.",
      features: ["Form 1120 Preparation", "Form 5472 Preparation", "Financial Data Review", "Deadline Management"]
    },
    {
      icon: Globe,
      title: "Estonia e-Residency & OÜ Formation",
      price: "From $597 + €190 fee",
      desc: "Remote EU business setup with Estonia e-Residency, OÜ formation, and VAT registration support.",
      features: ["100% online e-Residency help", "Estonia OÜ company formation", "EU VAT registration support", "EU market-ready business structure"]
    }
  ];

  return (
    <>
      <SEO
        title="Services - ecomifyUSA"
        description="Complete US business formation and tax compliance services for international entrepreneurs."
      />
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <Logo />
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Button>
            </Link>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-slate-900 mb-4">Our Services</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to form, comply, and scale your US business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900">{service.title}</CardTitle>
                  <div className="text-2xl font-bold text-blue-600">{service.price}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-6">{service.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/checkout">
                    <Button className="w-full bg-slate-900 hover:bg-slate-800">Get Started</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Need a Custom Solution?</h3>
                <p className="text-slate-600 mb-6">
                  Every business is unique. If you do not see exactly what you need, contact us for a custom quote.
                </p>
                <a href="mailto:support@ecomifyusa.com">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    Contact Support
                  </Button>
                </a>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl">
                <h4 className="font-bold text-slate-900 mb-4">Why Choose ecomifyUSA?</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" /> 500+ International Clients
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" /> 5.0 Rating on Fiverr
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" /> 100% Legal Method
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" /> Non-US Resident Experts
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}