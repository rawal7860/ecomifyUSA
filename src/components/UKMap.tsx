import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export const UKMap = () => {
    const [hovered, setHovered] = useState < string | null > (null);
    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf2LOGK6eY5rxr-RVUwC1vvCPNTFr1HmnbbKCYSa1nfL9m4AA/viewform";

    const regions = [
        { id: 'Scotland', d: "M40,20 L80,15 L100,30 L90,80 L70,100 L40,90 Z", color: "#005EB8" },
        { id: 'England', d: "M70,100 L110,130 L100,220 L70,240 L50,210 L60,140 Z", color: "#CE1126" },
        { id: 'Wales', d: "M50,150 L70,155 L65,210 L45,220 L35,180 Z", color: "#00AD36" },
        { id: 'N. Ireland', d: "M5,100 L35,90 L45,130 L30,150 L5,140 Z", color: "#f59e0b" }
    ];

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center p-8 bg-white rounded-2xl shadow-lg border">
            <div className="relative">
                <svg viewBox="0 0 120 250" className="w-full max-w-[260px] drop-shadow-xl">
                    {regions.map((reg) => (
                        <path
                            key={reg.id}
                            d={reg.d}
                            fill={hovered === reg.id ? reg.color : "#f1f5f9"}
                            stroke="#cbd5e1"
                            strokeWidth="1"
                            className="transition-all duration-300 cursor-pointer"
                            onMouseEnter={() => setHovered(reg.id)}
                            onMouseLeave={() => setHovered(null)}
                        />
                    ))}
                </svg>
            </div>

            <div className="w-full max-w-sm p-6 bg-slate-50 rounded-xl border">
                <h4 className="text-2xl font-bold mb-4">{hovered || "Select UK Region"}</h4>
                {hovered ? (
                    <div className="space-y-4">
                        <p className="text-slate-600">Formation Fee: <strong>£100</strong></p>
                        <a href={FORM_URL} target="_blank" rel="noreferrer">
                            <Button className="w-full bg-blue-600">Register in {hovered}</Button>
                        </a>
                    </div>
                ) : (
                    <p className="text-slate-400 italic">Hover to view formation details.</p>
                )}
            </div>
        </div>
    );
};