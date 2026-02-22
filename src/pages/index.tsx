import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="flex items-center justify-between px-6 py-4 border-b">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white font-bold">S</span>
                    </div>
                    <span className="text-xl font-bold text-blue-600">Salestaxus LLC</span>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost">Sign In</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
                </div>
            </nav>

            {/* Hero Section - Changed background to bg-blue-50 for readability */}
            <section className="relative py-20 px-6 bg-blue-50">
                <div className="max-w-4xl mx-auto text-center">
                    <Badge variant="secondary" className="mb-6 bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-none px-4 py-1">
                        <Star className="w-4 h-4 fill-current mr-2" />
                        5.0 Rated on Fiverr
                    </Badge>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 mb-6 tracking-tight">
                        Global Business Formation <br />
                        <span className="text-slate-700">Made Simple.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Expert assistance for USA LLC & UK Limited company registration, tax compliance,
                        and registered agent services for international entrepreneurs.
                    </p>
                </div>
            </section>
        </div>
    );
}