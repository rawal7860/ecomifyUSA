import Link from "next/link";
import { Building2, Mail, Phone, Globe, MapPin } from "lucide-react";
import Logo from "@/components/Logo";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

                    {/* Column 1: Company Info */}
                    <div className="lg:col-span-2">
                        <div className="mb-4">
                            <Logo dark />
                        </div>
                        <p className="text-sm leading-relaxed mb-6 max-w-sm">
                            Leading US & UK business registration agency providing compliance
                            solutions for freelancers and entrepreneurs worldwide.
                        </p>
                        <div className="flex gap-3">
                            <a href="mailto:support@ecomifyusa.com" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                                <Mail className="w-5 h-5" />
                            </a>
                            <a href="https://wa.me/13072180376" target="_blank" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                                <Phone className="w-5 h-5" />
                            </a>
                            <a href="/" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                                <Globe className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Services */}
                    <div>
                        <h5 className="text-white font-bold mb-4">Services</h5>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/services" className="hover:text-white transition-colors">USA LLC Formation</Link></li>
                            <li><Link href="/services" className="hover:text-white transition-colors">UK Limited Company</Link></li>
                            <li><Link href="/services" className="hover:text-white transition-colors">Sales Tax Compliance</Link></li>
                            <li><Link href="/services" className="hover:text-white transition-colors">Delaware Franchise Tax</Link></li>
                            <li><Link href="/services" className="hover:text-white transition-colors">Tax Exemption</Link></li>
                            <li><Link href="/services" className="hover:text-white transition-colors">IRS Tax Filing</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div>
                        <h5 className="text-white font-bold mb-4">Quick Links</h5>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="/which-state" className="hover:text-white transition-colors">Which State?</Link></li>
                            <li><Link href="/us-residents" className="hover:text-white transition-colors">US Sellers</Link></li>
                            <li><Link href="/case-studies" className="hover:text-white transition-colors">About / Case Studies</Link></li>
                            <li><Link href="/checkout" className="hover:text-white transition-colors">Get Started</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h5 className="text-white font-bold mb-4">Contact</h5>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <a href="mailto:support@ecomifyusa.com" className="hover:text-white transition-colors">support@ecomifyusa.com</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <a href="https://wa.me/13072180376" target="_blank" className="hover:text-white transition-colors">+1 (307) 218-0376</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <span>30 North Gould St, Ste R<br />Sheridan, WY 82801</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-slate-500">
                        © {new Date().getFullYear()} ecomifyUSA. All rights reserved.
                    </div>
                    <div className="flex gap-6 text-sm flex-wrap justify-center">
                        <Link href="/privacy-policy" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms-of-service" className="text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/refund-policy" className="text-slate-500 hover:text-white transition-colors">Refund Policy</Link>
                        <Link href="/payment-policy" className="text-slate-500 hover:text-white transition-colors">Payment Policy</Link>
                        <Link href="/delivery-policy" className="text-slate-500 hover:text-white transition-colors">Delivery Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}