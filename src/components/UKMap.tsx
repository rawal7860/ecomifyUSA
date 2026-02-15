import React, { useState } from 'react';
// This import fixes the "Button is not defined" error
import { Button } from "@/components/ui/button";

export const UKMap = () => {
    const [hovered, setHovered] = useState < string | null > (null);
    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf2LOGK6eY5rxr-RVUwC1vvCPNTFr1HmnbbKCYSa1nfL9m4AA/viewform";

    // Shortened geographic paths to prevent "Unterminated string" parser crashes
    const regions = [
        {
            id: 'Scotland',
            d: "M40,10 L55,5 L75,10 L85,30 L75,60 L85,80 L70,100 L45,95 L35,75 L38,40 Z",
            color: "#005EB8"
        },
        {
            id: 'England',
            d: "M70,100 L85,110 L110,130 L105,190 L95,240 L70,255 L55,240 L60,200 L55,160 L65,130 Z",
            color: "#CE1126"
        },
        {
            id: 'Wales',
            d: "M55,165 L62,170 L58,220 L48,230 L40,195 Z",
            color: "#00AD36"
        },
        {
            id: 'N. Ireland',
            d: "M5,115 L25,105 L35,135 L25,155 L5,145 Z",
            color: "#f59e0b"
        }
    ];

    return (
        <div className="flex flex-col md:flex-row gap-12 items-center justify-center p-10 bg-white rounded-3xl shadow-sm border border-slate-100">
            <div className="relative">
                {/* ViewBox adjusted for the tall, narrow UK silhouette */}
                <svg viewBox="0 0 120 270" className="w-full max-w-[280px] drop-shadow-2xl">
                    {regions.map((reg) => (
                        <path
                            key={reg.id}
                            d={reg.d}
                            fill={hovered === reg.id ? reg.color : "#f1f5f9"}
                            stroke={hovered === reg.id ? "#fff" : "#cbd5e1"}
                            strokeWidth={hovered === reg.id ? "2" : "0.5"}
                            className="transition-all duration-300 cursor-pointer"
                            onMouseEnter={() => setHovered(reg.id)}
                            onMouseLeave={() => setHovered(null)}
                        />
                    ))}
                </svg>
            </div>

            <div className="w-full max-w-md p-8 bg-white border border-slate-200 rounded-2xl shadow-xl">
                <h4 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">
                    {hovered || "Select UK Region"}
                </h4>

                {hovered ? (
                    <div className="space-y-6">
                        <div className="space-y-3 py-4 border-y border-slate-100">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 font-bold uppercase text-xs">Formation Fee</span>
                                <span className="text-blue-700 font-black text-2xl">£100</span>
                            </div>
                            <p className="text-slate-600 text-sm">
                                Official <strong>{hovered}</strong> registration via Companies House. Includes HMRC setup.
                            </p>
                        </div>
                        <a href={FORM_URL} target="_blank" rel="noreferrer" className="block">
                            <Button className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-xl transition-transform active:scale-95">
                                Register in {hovered}
                            </Button>
                        </a>
                    </div>
                ) : (
                    <div className="py-12 text-center text-slate-400">
                        <p className="text-lg">Select a country to start your UK formation.</p>
                    </div>
                )}
            </div>
        </div>
    );
};