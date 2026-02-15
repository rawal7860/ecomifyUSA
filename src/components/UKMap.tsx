import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export const UKMap = () => {
    const [hovered, setHovered] = useState < string | null > (null);
    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf2LOGK6eY5rxr-RVUwC1vvCPNTFr1HmnbbKCYSa1nfL9m4AA/viewform";

    // HIGH-DEFINITION GEOGRAPHIC PATHS
    const regions = [
        {
            id: 'Scotland',
            d: "M118,20 L135,15 L155,25 L165,65 L155,100 L165,135 L145,160 L105,155 L90,120 L100,60 Z",
            color: "#005EB8"
        },
        {
            id: 'England',
            d: "M145,160 L170,175 L215,225 L210,380 L135,410 L115,290 L135,220 Z",
            color: "#CE1126"
        },
        {
            id: 'Wales',
            d: "M115,290 L135,295 L125,355 L100,360 L90,320 Z",
            color: "#00AD36"
        },
        {
            id: 'N. Ireland',
            d: "M55,125 L85,115 L100,150 L80,185 L55,175 Z",
            color: "#f59e0b"
        }
    ];

    return (
        <div className="flex flex-col md:flex-row gap-12 items-center justify-center p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
            <div className="relative">
                {/* VIEWBOX ADJUSTED FOR REAL PROPORTIONS */}
                <svg viewBox="0 0 250 450" className="w-full max-w-[300px] drop-shadow-2xl">
                    {regions.map((reg) => (
                        <path
                            key={reg.id}
                            d={reg.d}
                            fill={hovered === reg.id ? reg.color : "#f1f5f9"}
                            stroke={hovered === reg.id ? "#fff" : "#cbd5e1"}
                            strokeWidth={hovered === reg.id ? "2.5" : "1"}
                            className="transition-all duration-300 cursor-pointer"
                            onMouseEnter={() => setHovered(reg.id)}
                            onMouseLeave={() => setHovered(null)}
                        />
                    ))}
                </svg>
            </div>

            <div className="w-full max-w-md p-8 bg-white border border-slate-200 rounded-2xl shadow-xl">
                <h4 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                    {hovered || "Select UK Region"}
                </h4>

                {hovered ? (
                    <div className="space-y-6">
                        <div className="space-y-3 py-4 border-y border-slate-100">
                            <div className="flex justify-between">
                                <span className="text-slate-500 font-medium text-lg">Formation Fee</span>
                                <span className="text-blue-700 font-bold text-2xl">£100</span>
                            </div>
                            <p className="text-slate-600">
                                Official registration for <strong>{hovered}</strong> through Companies House and HMRC.
                            </p>
                        </div>
                        <a href={FORM_URL} target="_blank" rel="noreferrer" className="block">
                            <Button className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg transition-transform active:scale-95">
                                Register in {hovered}
                            </Button>
                        </a>
                    </div>
                ) : (
                    <div className="py-12 text-center text-slate-400">
                        <p className="text-lg italic">Hover over the map to view formation details for England, Scotland, Wales, and Northern Ireland.</p>
                    </div>
                )}
            </div>
        </div>
    );
};