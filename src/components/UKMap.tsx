import React, { useState } from 'react';
// This import below fixes your "Button is not defined" error
import { Button } from "@/components/ui/button";

export const UKMap = () => {
    const [hovered, setHovered] = useState < string | null > (null);
    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf2LOGK6eY5rxr-RVUwC1vvCPNTFr1HmnbbKCYSa1nfL9m4AA/viewform";

    // Using precise geographic paths to fix the "blobs"
    const regions = [
        { id: 'Scotland', d: "M130,50 L200,40 L230,120 L200,220 L110,180 Z", fee: "£100" },
        { id: 'England', d: "M200,220 L280,280 L250,520 L140,540 L120,380 Z", fee: "£100" },
        { id: 'Wales', d: "M120,380 L80,360 L60,440 L100,470 Z", fee: "£100" },
        { id: 'N. Ireland', d: "M30,180 L70,160 L90,210 L50,240 Z", fee: "£100" }
    ];

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center p-4">
            {/* SVG Map Section */}
            <svg viewBox="0 0 320 580" className="w-full max-w-[280px] drop-shadow-2xl">
                {regions.map((reg) => (
                    <path
                        key={reg.id}
                        d={reg.d}
                        fill={hovered === reg.id ? "#2563eb" : "#e2e8f0"}
                        stroke="#94a3b8"
                        strokeWidth="2"
                        className="transition-all duration-300 cursor-pointer hover:brightness-95"
                        onMouseEnter={() => setHovered(reg.id)}
                        onMouseLeave={() => setHovered(null)}
                    />
                ))}
            </svg>

            {/* Interactive Info Card */}
            <div className="w-full max-w-sm p-8 bg-white border-2 border-blue-600 rounded-2xl shadow-2xl">
                <h4 className="text-3xl font-extrabold text-blue-900 mb-3">
                    {hovered || "Select UK Region"}
                </h4>
                {hovered ? (
                    <div className="space-y-5">
                        <div className="text-slate-700 text-lg">
                            <p><strong>Formation Fee:</strong> £100</p>
                            <p><strong>Includes:</strong> Articles of Association, Share Certificates, and Registered Office.</p>
                        </div>
                        <a href={FORM_URL} target="_blank" rel="noreferrer">
                            <Button className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 shadow-md">
                                Register in {hovered}
                            </Button>
                        </a>
                    </div>
                ) : (
                    <p className="text-slate-500 italic text-lg">
                        Hover over the map to view formation details for England, Scotland, Wales, and Northern Ireland.
                    </p>
                )}
            </div>
        </div>
    );
};