import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export const UKMap = () => {
    const [hovered, setHovered] = useState < string | null > (null);
    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf2LOGK6eY5rxr-RVUwC1vvCPNTFr1HmnbbKCYSa1nfL9m4AA/viewform";

    // Refined geographic paths to fix the "blobs"
    const regions = [
        {
            id: 'Scotland',
            d: "M140,40 L165,35 L190,50 L205,100 L180,180 L140,190 L110,140 Z",
            color: "#005EB8"
        },
        {
            id: 'England',
            d: "M180,180 L210,195 L260,280 L250,480 L150,510 L130,360 L155,270 Z",
            color: "#CE1126"
        },
        {
            id: 'Wales',
            d: "M130,360 L155,365 L150,440 L115,445 L105,400 Z",
            color: "#00AD36"
        },
        {
            id: 'N. Ireland',
            d: "M60,160 L100,150 L115,190 L85,225 L55,210 Z",
            color: "#f59e0b"
        }
    ];

    return (
        <div className="flex flex-col md:flex-row gap-12 items-center justify-center p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
            {/* SVG Map Section */}
            <div className="relative">
                <svg viewBox="0 0 300 550" className="w-full max-w-[320px] drop-shadow-2xl">
                    {regions.map((reg) => (
                        <path
                            key={reg.id}
                            d={reg.d}
                            fill={hovered === reg.id ? reg.color : "#f1f5f9"}
                            stroke={hovered === reg.id ? "#fff" : "#cbd5e1"}
                            strokeWidth={hovered === reg.id ? "3" : "1.5"}
                            className="transition-all duration-500 cursor-pointer"
                            onMouseEnter={() => setHovered(reg.id)}
                            onMouseLeave={() => setHovered(null)}
                        />
                    ))}
                </svg>
            </div>

            {/* Professional Info Card */}
            <div className="w-full max-w-md p-8 bg-white border border-slate-200 rounded-2xl shadow-xl">
                <h4 className="text-3xl font-black text-slate-900 mb-4">
                    {hovered || "Select UK Region"}
                </h4>

                {hovered ? (
                    <div className="space-y-6">
                        <div className="space-y-3 py-4 border-y border-slate-100">
                            <div className="flex justify-between">
                                <span className="text-slate-500 font-medium">Formation Fee</span>
                                <span className="text-blue-700 font-bold text-xl">£100</span>
                            </div>
                            <p className="text-slate-600 text-sm">
                                Complete incorporation for <strong>{hovered}</strong> with HMRC registration and Articles of Association.
                            </p>
                        </div>
                        <a href={FORM_URL} target="_blank" rel="noreferrer" className="block">
                            <Button className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg">
                                Register in {hovered}
                            </Button>
                        </a>
                    </div>
                ) : (
                    <div className="py-12 text-center text-slate-400">
                        <p className="text-lg">Hover over the map to explore UK formation options.</p>
                    </div>
                )}
            </div>
        </div>
    );
};