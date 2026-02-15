import React, { useState } from 'react';

// Using a named export to match your index.tsx import { UKMap }
export const UKMap = () => {
    const [hovered, setHovered] = useState < string | null > (null);

    const regions = [
        { id: 'Scotland', d: "M150,50 L250,50 L270,150 L230,250 L130,200 Z" },
        { id: 'England', d: "M230,250 L330,300 L300,500 L200,550 L170,400 Z" },
        { id: 'Wales', d: "M170,400 L130,380 L110,450 L150,480 Z" },
        { id: 'N. Ireland', d: "M70,200 L110,180 L130,220 L90,250 Z" }
    ];

    return (
        <div className="flex flex-col md:flex-row gap-8 p-10 bg-white rounded-xl border border-gray-200 shadow-sm">
            <svg viewBox="0 0 400 600" className="w-full max-w-[300px] h-auto">
                {regions.map((region) => (
                    <path
                        key={region.id}
                        d={region.d}
                        fill={hovered === region.id ? "#2563eb" : "#e2e8f0"}
                        stroke="#94a3b8"
                        strokeWidth="2"
                        className="transition-all duration-300 cursor-pointer hover:scale-[1.05] origin-center"
                        onMouseEnter={() => setHovered(region.id)}
                        onMouseLeave={() => setHovered(null)}
                    />
                ))}
            </svg>
            <div className="w-64 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-blue-900 mb-2">{hovered || "Select a UK Region"}</h3>
                {hovered && (
                    <div className="text-sm space-y-2 text-blue-800">
                        <p><strong>Formation:</strong> £100</p>
                        <p><strong>Compliance:</strong> HMRC & Co. House</p>
                        <p><strong>VAT Threshold:</strong> £90,000</p>
                    </div>
                )}
            </div>
        </div>
    );
};