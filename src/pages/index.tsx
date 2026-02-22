import React from 'react';

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
                    <button className="px-4 py-2 text-sm font-medium">Sign In</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">Get Started</button>
                </div>
            </nav>

            {/* Hero Section - ONLY CHANGED BACKGROUND COLOR HERE */}
            <section className="relative py-20 px-6 bg-slate-50">
                <div className="max-w-4xl">
                    <div className="inline-flex items-center bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
                        ★ 5.0 Rated on Fiverr
                    </div>

                    <h1 className="text-6xl font-extrabold text-slate-900 mb-6">
                        Global Business Formation <br />
                        Made Simple.
                    </h1>

                    <p className="text-lg text-slate-600 mb-10 max-w-2xl">
                        Expert assistance for USA LLC & UK Limited company registration, tax compliance,
                        and registered agent services for international entrepreneurs.
                    </p>
                </div>
            </section>
        </div>
    );
}