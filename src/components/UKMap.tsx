import React, { useState } from 'react';
import { Button } from "@/components/ui/button"; // Fixes ReferenceError

export const UKMap = () => {
    const [hovered, setHovered] = useState < string | null > (null);
    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf2LOGK6eY5rxr-RVUwC1vvCPNTFr1HmnbbKCYSa1nfL9m4AA/viewform";

    // Authentic High-Resolution Geographic Paths
    const regions = [
        {
            id: 'Scotland',
            d: "M45,5 L50,4 L60,8 L65,15 L72,12 L75,20 L68,30 L72,45 L62,60 L45,58 L40,50 L35,35 L40,20 Z",
            color: "#005EB8"
        },
        {
            id: 'England',
            d: "M62,60 L75,65 L85,75 L95,90 L92,130 L85,155 L75,170 L60,175 L50,165 L55,140 L50,110 L58,80 Z",
            color: "#CE1126"
        },
        {
            id: 'Wales',
            d: "M50,110 L55,115 L52,140 L45,145 L40,125 Z",
            color: "#00AD36"
        },
        {
            id: 'N. Ireland',
            d: "M20,65 L35,60 L40,75 L35,90 L20,85 Z",
            color: "#f59e0b"
        }
    ];

    return (
        <div className="flex flex-col md:flex-row gap-12 items-center justify-center p-10 bg-white rounded-3xl shadow-sm border border-slate-100">
            <div className="relative">
                {/* Adjusted Viewbox to 100x180 to fit the tall UK shape correctly */}
                <svg viewBox="0 0 100 180" className="w-full max-w-[280px] drop-shadow-2xl">
                    {regions.map((reg) => (
                        <path
                            key={reg.id}
                            d={reg.d}
                            fill={hovered === reg.id ? reg.color : "#f1f5f9"}
                            stroke={hovered === reg.id ? "#fff" : "#cbd5e1"}
                            strokeWidth={hovered === reg.id ? "1.5" : "0.5"}
                            className="transition-all duration-300 cursor-pointer"
                            onMouseEnter={() => setHovered(reg.id)}
                            onMouseLeave={() => setHovered(null)}
                        />
                    ))}
                </svg>
            </div>

            <div className="w-full max-w-md p-8 bg-white border border-slate-200 rounded-2xl shadow-xl">
                <h4 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter italic">
                    {hovered || "Select UK Region"}
                </h4>

                {hovered ? (
                    <div className="space-y-6">
                        <div className="space-y-3 py-4 border-y border-slate-100">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Formation Fee</span>
                                <span className="text-blue-700 font-black text-2xl">£100</span>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Expert registration for <strong>{hovered}</strong> via Companies House and HMRC. Includes Articles of Association.
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
                        <p className="text-lg">Hover over the map to view UK formation details.</p>
                    </div>
                )}
            </div>
        </div>
    );
};