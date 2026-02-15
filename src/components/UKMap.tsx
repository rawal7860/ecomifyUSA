import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export const UKMap = () => {
    const [hovered, setHovered] = useState < string | null > (null);
    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf2LOGK6eY5rxr-RVUwC1vvCPNTFr1HmnbbKCYSa1nfL9m4AA/viewform";

    // These paths are simplified from authentic GeoJSON data for the UK
    const regions = [
        {
            id: 'Scotland',
            d: "M48.2,1.3c-0.9,0.5-2.2,1.8-2.5,2.7c-0.3,0.9-0.9,1.5-1.9,1.9c-2.3,0.9-2.4,1-1.8,2.8c0.4,1.1,0.2,2-0.8,3.6 c-0.7,1.1-0.8,1.6-0.5,2.6c0.3,1.3,0.2,1.5-1.4,2.9c-2.3,1.9-2.3,1.9-2,3.3c0.1,0.8,0,2.1-0.4,2.8c-1.1,2.3,0.2,4.8,2.7,5.5 c2.5,0.7,5.5-0.2,7.3-2.1c1.8-1.9,1.8-1.9,3.7,0.1c1.9,2,3.7,2.1,5.6,0.2c0.9-0.9,1.6-1.1,2.8-0.6c1,0.5,2.4,0.3,4.2-0.6 c1.3-0.6,2.6-0.9,3-0.7c0.3,0.2,0,1.3-0.8,2.4c-1.1,1.5-1.2,2.4-0.1,3.4c0.7,0.6,1.4,1.8,1.5,2.7c0.2,1.5,2.3,3.3,4.2,3.3 c2.1,0,3.3-1.3,2.5-2.7c-0.4-0.8-0.3-1.6,0.3-2c0.5-0.4,1.8,0.1,2.9,1.1c1.8,1.7,2.5,1.8,3.9,0.3c1.3-1.4,1.3-1.6-0.3-4.1 c-0.8-1.4-1.1-2.4-0.7-2.6c1.1-0.5,1-1.8-0.2-2.7c-1.1-0.9-1.2-1.3-0.2-2.1c0.9-0.8,0.9-1,0-2.3c-1.2-1.8-0.4-3.5,1.5-3.5 c0.8,0,1.6-0.5,2.3-1.5c1-1.3,1-1.5-0.1-3.2c-0.8-1.2-1.2-2.3-0.8-2.6c0.4-0.3,2.2,0.6,3.9,2.1c2.4,2.1,3,2.3,3.7,0.7 c1.2-2.9-1.8-7.5-5.5-8.5c-1-0.3-1.3-0.7-1.1-1.3c0.4-0.9-2.4-4-4-4.5C51.6-0.5,49.8,0.4,48.2,1.3z",
            color: "#005EB8"
        },
        {
            id: 'England',
            d: "M63.6,32.2c-1.5,0.4-2.8,1.7-2.8,2.9c0,0.8-0.4,1.4-0.8,1.4c-0.4,0-0.8,1-0.8,2.2c0,1.2-0.4,2.2-0.8,2.2 c-0.4,0-0.8,0.6-0.8,1.3c0,0.7-0.7,1.8-1.5,2.4c-1.6,1.2-1.5,2.5,0.4,3.5c1,0.6,2.2,2,2.6,3.1c0.5,1.5,0.9,1.7,2,0.9 c1.2-0.8,1.3-0.7,1.7,0.9c0.2,1,1.1,2.8,2,3.9c1.6,2.1,1.7,2.1,2.6,0.2c0.5-1.1,1.3-2,1.8-2s1.4,0.9,2,2.1 c1.1,2.3,1.3,2.4,4,1.6c1.5-0.4,3.3-0.3,4,0.2c1.3,1,7.2,1.1,7.2,0.1c0-0.6-1.5-1.3-3.3-1.5c-2.3-0.2-3.3-0.7-3.3-1.5 c0-0.5,0.9-1,2-1.1s2.1-0.6,2.1-1.3s1.2-2,2.7-3.1c1.7-1.3,2.7-2.7,2.7-3.7c0-1.7-1.9-4.8-3.1-4.8c-0.4,0-0.8-1-0.8-2.2 c0-1.2-0.7-2.7-1.5-3.3c-1.6-1.2-1.5-4.1,0.1-5.1c0.8-0.5,0.8-1.1,0-1.4c-1-0.3-1-0.4,0-1c0.7-0.4,0.6-0.7-0.5-1.2 c-0.8-0.4-1.8-1.5-2.2-2.4c-0.4-1.2-1-1.7-2.3-1.7C65.3,31.2,64.4,32,63.6,32.2z",
            color: "#CE1126"
        },
        {
            id: 'Wales',
            d: "M57.6,41.9c-1,1-1,1.3,0.1,2.4c1,1,1.1,1.5,0.4,2.6c-0.6,1-0.6,1.4,0.1,2.4c0.8,1.1,0.7,1.3-0.6,1.8 c-1.3,0.5-1.4,0.9-0.5,1.8c0.7,0.7,0.9,1.8,0.5,3c-0.6,1.7-0.5,1.8,1.1,0.7c1-0.7,2.4-0.9,3.1-0.5c1.4,0.9,2-0.1,1-1.8 c-0.7-1.1-0.5-1.8,0.5-2.5c1.2-0.8,1.3-1.1,0.4-2.2c-0.8-1-0.8-1.4-0.1-2.4c0.7-1,0.7-1.5,0-2.4 C62.8,40.1,62.1,39.9,57.6,41.9z",
            color: "#00AD36"
        },
        {
            id: 'N. Ireland',
            d: "M36,19c-1,0.5-1.4,1.4-1.1,2.6c0.3,0.9,0.1,2-0.4,2.5c-0.6,0.6-0.8,2-0.4,3.2c0.3,1.3,0.1,2.2-0.5,2.7 c-1.2,1-1.2,1.3,0,2.3c1,0.8,1.3,1.8,1.3,4.2c0,2.1,0.2,2.8,1.1,2.8c1,0,1.3-0.7,1.3-2.8c0-1.7,0.4-2.8,1-2.8 c0.5,0,1-1,1-2.2c0-1.2,0.4-2.2,0.8-2.2c0.4,0,0.8-0.9,0.8-2c0-1.1,0.4-2,0.8-2c0.4,0,0.8-0.7,0.8-1.5s-0.5-1.8-1.1-2.1 c-0.6-0.3-1.1-1.3-1.1-2.4c0-1.1-0.4-2-0.8-2.1C38.3,17.1,37.1,18.4,36,19z",
            color: "#f59e0b"
        }
    ];

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="relative">
                {/* We use a standard viewBox for geographic paths */}
                <svg viewBox="0 0 100 80" className="w-full max-w-[320px] drop-shadow-lg">
                    {regions.map((reg) => (
                        <path
                            key={reg.id}
                            d={reg.d}
                            fill={hovered === reg.id ? reg.color : "#f1f5f9"}
                            stroke={hovered === reg.id ? "#fff" : "#cbd5e1"}
                            strokeWidth={hovered === reg.id ? "0.5" : "0.2"}
                            className="transition-all duration-300 cursor-pointer"
                            onMouseEnter={() => setHovered(reg.id)}
                            onMouseLeave={() => setHovered(null)}
                        />
                    ))}
                </svg>
            </div>

            <div className="w-full max-w-sm p-6 bg-white border border-slate-200 rounded-xl shadow-lg">
                <h4 className="text-2xl font-bold text-slate-900 mb-2">
                    {hovered || "Select UK Region"}
                </h4>
                {hovered ? (
                    <div className="space-y-4">
                        <p className="text-slate-600 text-sm">
                            Official formation in <strong>{hovered}</strong> for £100. Includes Articles of Association and HMRC setup.
                        </p>
                        <a href={FORM_URL} target="_blank" rel="noreferrer">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">Register Now</Button>
                        </a>
                    </div>
                ) : (
                    <p className="text-slate-400 italic text-sm">Hover over the map to view details.</p>
                )}
            </div>
        </div>
    );
};