import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export const UKMap = () => {
    const [selected, setSelected] = useState < string | null > (null);
    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf2LOGK6eY5rxr-RVUwC1vvCPNTFr1HmnbbKCYSa1nfL9m4AA/viewform";

    const regions = [
        { name: "England", color: "bg-red-500" },
        { name: "Scotland", color: "bg-blue-600" },
        { name: "Wales", color: "bg-green-600" },
        { name: "N. Ireland", color: "bg-orange-500" }
    ];

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center w-full">

                {/* Visual Region Indicator */}
                <div className="flex flex-wrap justify-center gap-4">
                    {regions.map((reg) => (
                        <div
                            key={reg.name}
                            className={`w-32 h-32 rounded-2xl flex flex-col items-center justify-center text-white font-bold transition-all duration-300 shadow-lg ${selected === reg.name ? `${reg.color} scale-110 ring-4 ring-offset-2 ring-slate-200` : 'bg-slate-100 text-slate-400'
                                }`}
                        >
                            <span className="text-xs uppercase tracking-widest mb-1 opacity-80">Region</span>
                            <span className="text-sm text-center px-2">{reg.name}</span>
                        </div>
                    ))}
                </div>

                {/* Selection Interface */}
                <div className="space-y-6">
                    <h4 className="text-3xl font-black text-slate-900 tracking-tight">UK Formation</h4>
                    <p className="text-slate-500 text-lg">Select a territory to begin your registration:</p>

                    <div className="grid grid-cols-2 gap-3">
                        {regions.map((reg) => (
                            <button
                                key={reg.name}
                                onClick={() => setSelected(reg.name)}
                                className={`p-4 rounded-xl border-2 transition-all font-bold text-lg ${selected === reg.name
                                        ? "border-blue-600 bg-blue-50 text-blue-700"
                                        : "border-slate-100 hover:border-blue-300 text-slate-600"
                                    }`}
                            >
                                {reg.name}
                            </button>
                        ))}
                    </div>

                    {selected ? (
                        <div className="p-6 bg-slate-900 rounded-2xl text-white animate-in slide-in-from-top-4 duration-300">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h5 className="font-bold text-xl">{selected} Registration</h5>
                                    <p className="text-slate-400 text-sm">Official Companies House Filing</p>
                                </div>
                                <span className="text-3xl font-black text-blue-400">£100</span>
                            </div>
                            <a href={FORM_URL} target="_blank" rel="noreferrer">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-14 text-lg shadow-lg">
                                    Start Filing in {selected}
                                </Button>
                            </a>
                        </div>
                    ) : (
                        <div className="p-10 border-2 border-dashed border-slate-100 rounded-2xl text-center text-slate-300">
                            <p className="italic">Choose a region to view details and pricing.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};