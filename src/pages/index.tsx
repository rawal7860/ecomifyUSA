import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CheckCircle2, Star, ArrowRight, Shield, Clock, DollarSign } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <SEO 
        title="Salestaxus LLC - Professional Business Formation Services"
        description="Trusted by 300+ entrepreneurs. Fast LLC formation in all 50 states with expert guidance, transparent pricing, and dedicated support."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building2 className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-slate-900">Salestaxus LLC</h1>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                <Star className="w-4 h-4 fill-current" />
                5.0 Rating on Fiverr
              </div>
              
              <h2 className="text-5xl font-bold text-slate-900 leading-tight">
                Start Your Business Journey with Confidence
              </h2>
              
              <p className="text-xl text-slate-600">
                Join 300+ entrepreneurs who trust Salestaxus LLC for fast, reliable, and affordable business formation services across all 50 states.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 gap-2">
                    Get Started Today
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline">
                    Sign In to Dashboard
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <Card className="border-blue-200 bg-white/80 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="font-semibold text-slate-700">5.0 / 5.0</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 mb-2">300+ Happy Clients</p>
                  <p className="text-slate-600">Trusted entrepreneurs building successful businesses</p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="font-bold text-2xl text-slate-900">24-48hrs</p>
                    <p className="text-sm text-slate-600">Fast Processing</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="font-bold text-2xl text-slate-900">100%</p>
                    <p className="text-sm text-slate-600">Satisfaction</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Salestaxus LLC?</h3>
            <p className="text-xl text-slate-600">Everything you need to start and grow your business</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Building2 className="w-8 h-8 text-blue-600" />,
                title: "All 50 States Coverage",
                description: "Form your LLC in any state with our comprehensive nationwide service"
              },
              {
                icon: <Clock className="w-8 h-8 text-green-600" />,
                title: "Fast Processing",
                description: "Get your business formed in as little as 24-48 hours with our expedited service"
              },
              {
                icon: <DollarSign className="w-8 h-8 text-purple-600" />,
                title: "Transparent Pricing",
                description: "No hidden fees. Clear, upfront pricing for all our services"
              },
              {
                icon: <Shield className="w-8 h-8 text-red-600" />,
                title: "Expert Guidance",
                description: "Dedicated support team to guide you through every step of the process"
              },
              {
                icon: <CheckCircle2 className="w-8 h-8 text-teal-600" />,
                title: "Compliance Assistance",
                description: "Stay compliant with ongoing support for annual reports and renewals"
              },
              {
                icon: <Star className="w-8 h-8 text-yellow-600" />,
                title: "5-Star Service",
                description: "Proven track record with hundreds of satisfied clients on Fiverr"
              }
            ].map((feature, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-none text-white">
            <CardContent className="py-12 text-center">
              <h3 className="text-3xl font-bold mb-4">Ready to Start Your Business?</h3>
              <p className="text-xl mb-8 text-blue-100">Join hundreds of entrepreneurs who chose Salestaxus LLC</p>
              <Link href="/signup">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 gap-2">
                  Create Your Account
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-6 h-6" />
                  <span className="text-xl font-bold">Salestaxus LLC</span>
                </div>
                <p className="text-slate-400">Professional business formation services you can trust</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><Link href="/signup" className="hover:text-white transition-colors">Get Started</Link></li>
                  <li><Link href="/login" className="hover:text-white transition-colors">Sign In</Link></li>
                  <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <p className="text-slate-400">
                  For support and inquiries, please contact us through your client dashboard or visit our Fiverr profile.
                </p>
              </div>
            </div>
            
            <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
              <p>&copy; 2026 Salestaxus LLC. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}