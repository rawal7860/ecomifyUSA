import React, { useState } from 'react';
import { Button } from "@/components/ui/button"; // Fixes ReferenceError

export const UKMap = () => {
    const [hovered, setHovered] = useState < string | null > (null);
    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf2LOGK6eY5rxr-RVUwC1vvCPNTFr1HmnbbKCYSa1nfL9m4AA/viewform";

    // HIGH-FIDELITY GEOGRAPHIC COORDINATES
    const regions = [
        {
            id: 'Scotland',
            d: "M80,20 L110,15 L140,20 L160,50 L165,100 L150,150 L110,165 L80,140 L70,80 Z",
            color: "#005EB8"
        },
        {
            id: 'England',
            d: "M110,165 L150,150 L180,190 L220,240 L210,380 L140,410 L115,280 L110,220 Z",
            color: "#CE1126"
        },
        {
            id: 'Wales',
            d: "M85,290 L115,280 L110,350 L85,360 L75,320 Z",
            color: "#00AD36"
        },
        {
            id: 'N. Ireland',
            d: "M25,120 L65,110 L80,150 L60,185 L25,175 Z",
            color: "#f59e0b"
        }
    ];

    return (
        <div className="flex flex-col md:flex-row gap-12 items-center justify-center p-10 bg-white rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="relative">
                {/* Adjusted viewBox for a vertical UK layout */}
                <svg viewBox="0 0 250 450" className="w-full max-w-[320px] drop-shadow-2xl filter saturate-150">
                    {regions.map((reg) => (
                        <path
                            key={reg.id}
                            d={reg.d}
                            fill={hovered === reg.id ? reg.color : "#f8fafc"}
                            stroke={hovered === reg.id ? "#fff" : "#cbd5e1"}
                            strokeWidth={hovered === reg.id ? "3" : "1"}
                            className="transition-all duration-500 cursor-pointer"
                            onMouseEnter={() => setHovered(reg.id)}
                            onMouseLeave={() => setHovered(null)}
                        />
                    ))}
                </svg>
            </div>

            <div className="w-full max-w-md p-8 bg-white border border-slate-200 rounded-3xl shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className={`w-3 h-3 rounded-full ${hovered ? 'bg-blue-600 animate-pulse' : 'bg-slate-300'}`} />
                    <h4 className="text-3xl font-black text-slate-900 tracking-tighter italic">
                        {hovered || "Select UK Region"}
                    </h4>
                </div>

                {hovered ? (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3">
                        <div className="py-4 border-y border-slate-100">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Formation Fee</span>
                                <span className="text-blue-700 font-black text-2xl">£100</span>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Expert registration for <strong>{hovered}</strong> via Companies House. Includes HMRC setup and Articles of Association.
                            </p>
                        </div>
                        <a href={FORM_URL} target="_blank" rel="noreferrer" className="block">
                            <Button className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-100 transition-transform active:scale-95">
                                Register in {hovered}
                            </Button>
                        </a>
                    </div>
                ) : (
                    <div className="py-12 text-center">
                        <p className="text-slate-400 text-lg font-medium leading-relaxed">
                            Hover over the map to view specialized formation details for the UK.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};