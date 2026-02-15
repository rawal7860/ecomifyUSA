import React, { useState } from 'react';
// This line below is what was missing and caused the "Button is not defined" error
import { Button } from "@/components/ui/button";

export const UKMap = () => {
    const [hovered, setHovered] = useState < string | null > (null);
    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf2LOGK6eY5rxr-RVUwC1vvCPNTFr1HmnbbKCYSa1nfL9m4AA/viewform";

    const regions = [
        { id: 'Scotland', d: "M100,50 L200,50 L220,150 L180,250 L80,200 Z" },
        { id: 'England', d: "M180,250 L280,300 L250,500 L150,550 L120,400 Z" },
        { id: 'Wales', d: "M120,400 L80,380 L60,450 L100,480 Z" },
        { id: 'N. Ireland', d: "M20,200 L60,180 L80,220 L40,250 Z" }
    ];

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            <svg viewBox="0 0 350 600" className="w-full max-w-[280px] drop-shadow-lg">
                {regions.map((reg) => (
                    <path
                        key={reg.id}
                        d={reg.d}
                        fill={hovered === reg.id ? "#2563eb" : "#cbd5e1"}
                        className="transition-all duration-300 cursor-pointer hover:scale-105 origin-center"
                        onMouseEnter={() => setHovered(reg.id)}
                        onMouseLeave={() => setHovered(null)}
                    />
                ))}
            </svg>

            <div className="w-full max-w-sm p-6 bg-white border-2 border-blue-500 rounded-xl shadow-lg">
                <h4 className="text-2xl font-bold text-blue-900 mb-2">{hovered || "Select UK Region"}</h4>
                {hovered ? (
                    <div className="space-y-4">
                        <div className="text-slate-600">
                            <p><strong>Official Fee:</strong> £100</p>
                            <p><strong>VAT Threshold:</strong> £90,000</p>
                            <p><strong>Includes:</strong> HMRC Registration & Articles of Association.</p>
                        </div>
                        <a href={FORM_URL} target="_blank" rel="noreferrer">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">Register in {hovered}</Button>
                        </a>
                    </div>
                ) : (
                    <p className="text-slate-400 italic">Hover over the map to view UK formation details.</p>
                )}
            </div>
        </div>
    );
};