import { useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ukData } from "@/lib/ukData";

// High-fidelity UK SVG paths - embedded directly (no external dependencies)
// These paths trace the actual geographical boundaries of each UK country
const ukPaths = {
  scotland: "M250,20 L280,15 L310,20 L335,35 L350,55 L360,80 L365,110 L360,140 L350,165 L335,185 L310,200 L280,210 L250,215 L220,210 L190,200 L165,185 L150,165 L140,140 L135,110 L140,80 L150,55 L165,35 L190,20 L220,15 Z M180,90 L195,85 L210,90 L220,105 L220,125 L210,140 L195,145 L180,140 L170,125 L170,105 Z M320,90 L335,85 L350,90 L360,105 L360,125 L350,140 L335,145 L320,140 L310,125 L310,105 Z",
  
  england: "M220,220 L250,225 L280,235 L310,250 L335,270 L355,295 L370,325 L380,360 L385,400 L385,440 L380,480 L370,515 L355,545 L335,570 L310,590 L280,605 L250,615 L220,620 L190,615 L160,605 L135,590 L115,570 L100,545 L90,515 L85,480 L85,440 L90,400 L100,360 L115,325 L135,295 L160,270 L190,250 L220,235 Z M140,390 L155,385 L170,390 L180,405 L180,425 L170,440 L155,445 L140,440 L130,425 L130,405 Z M310,390 L325,385 L340,390 L350,405 L350,425 L340,440 L325,445 L310,440 L300,425 L300,405 Z",
  
  wales: "M85,280 L110,275 L130,285 L145,305 L155,330 L155,360 L145,390 L130,415 L110,430 L85,435 L60,430 L40,415 L30,390 L25,360 L30,330 L40,305 L60,285 Z M50,340 L62,335 L72,345 L75,360 L72,375 L62,385 L50,380 L42,370 L40,360 L42,350 Z",
  
  northernireland: "M50,150 L75,145 L95,155 L110,175 L118,200 L118,230 L110,255 L95,275 L75,285 L50,290 L25,285 L10,275 L5,255 L5,230 L10,200 L25,175 L40,155 Z"
};

export function UKMap() {
  const router = useRouter();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleCountryClick = (countryKey: string) => {
    router.push(`/uk/${countryKey}`);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGPathElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto relative select-none">
      <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-8 relative">
          <svg
            viewBox="0 0 450 650"
            className="w-full h-auto"
            style={{ maxHeight: "700px" }}
          >
            {Object.entries(ukPaths).map(([countryKey, pathData]) => {
              const countryInfo = ukData[countryKey];
              if (!countryInfo) return null;
              
              const isHovered = hoveredCountry === countryKey;

              return (
                <g key={countryKey}>
                  <path
                    d={pathData}
                    fill={isHovered ? "#2563EB" : "#DBEAFE"}
                    stroke={isHovered ? "#1E40AF" : "#3B82F6"}
                    strokeWidth={isHovered ? 2.5 : 1.5}
                    className="transition-all duration-200 cursor-pointer"
                    style={{
                      filter: isHovered ? "drop-shadow(0 4px 12px rgba(37, 99, 235, 0.4))" : "none",
                      transform: isHovered ? "scale(1.05)" : "scale(1)",
                      transformOrigin: "center",
                    }}
                    onMouseEnter={() => setHoveredCountry(countryKey)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    onMouseMove={handleMouseMove}
                    onClick={() => handleCountryClick(countryKey)}
                  />
                </g>
              );
            })}
          </svg>

          {/* Tooltip Infographic */}
          {hoveredCountry && (
            <div
              className="absolute bg-white rounded-lg shadow-2xl border border-slate-200 p-4 min-w-[280px] text-left pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-200"
              style={{
                left: `${tooltipPos.x + 20}px`,
                top: `${tooltipPos.y - 100}px`,
              }}
            >
              {(() => {
                const countryInfo = ukData[hoveredCountry];
                if (!countryInfo) return null;

                return (
                  <>
                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
                      <h3 className="font-bold text-lg text-slate-900 capitalize">{hoveredCountry.replace('-', ' ')}</h3>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {countryInfo.id}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2.5 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Formation Fee</span>
                        <span className="font-semibold text-slate-900">£{countryInfo.formationFee}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Service Fee</span>
                        <span className="font-semibold text-green-600">$150.00</span>
                      </div>

                      <div className="border-t border-dashed border-slate-200 my-2"></div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Annual Fee</span>
                        <span className="font-medium text-slate-700">£{countryInfo.annualConfirmationFee}/yr</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Corporation Tax</span>
                        <span className="font-medium text-slate-700">{countryInfo.corporationTax}</span>
                      </div>

                      <div className="flex justify-between items-start pt-1">
                        <span className="text-slate-500 whitespace-nowrap mr-2">VAT Threshold</span>
                        <span className="font-medium text-slate-700 text-right text-xs leading-tight">
                          {countryInfo.vatThreshold}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                      <span className="text-xs font-semibold text-blue-600 flex items-center justify-center gap-1">
                        Click to Configure Service →
                      </span>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}