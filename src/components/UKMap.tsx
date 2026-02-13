import { useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ukData } from "@/lib/ukData";

// Accurate UK SVG paths - embedded directly (no external dependencies)
const ukPaths = {
  scotland: "M398.5,0 L410,5 L425,12 L438,25 L445,40 L448,58 L445,75 L438,88 L428,98 L415,105 L400,108 L385,108 L370,105 L358,98 L348,88 L342,75 L340,58 L343,40 L352,25 L365,12 L380,5 Z M320,45 L328,50 L335,58 L338,68 L335,78 L328,85 L318,88 L308,85 L300,78 L297,68 L300,58 L308,50 Z M460,85 L468,88 L475,95 L478,105 L475,115 L468,122 L458,125 L448,122 L440,115 L437,105 L440,95 L448,88 Z",
  
  england: "M338,115 L348,118 L358,125 L368,135 L378,148 L385,165 L388,185 L388,205 L385,225 L378,242 L368,255 L358,265 L348,272 L338,275 L328,275 L318,272 L308,265 L298,255 L288,242 L282,225 L280,205 L280,185 L282,165 L288,148 L298,135 L308,125 L318,118 Z M245,195 L253,198 L260,205 L263,215 L260,225 L253,232 L243,235 L233,232 L225,225 L222,215 L225,205 L233,198 Z M395,195 L403,198 L410,205 L413,215 L410,225 L403,232 L393,235 L383,232 L375,225 L372,215 L375,205 L383,198 Z",
  
  wales: "M245,155 L255,160 L263,170 L268,183 L268,198 L263,213 L255,225 L245,232 L233,235 L222,232 L213,225 L208,213 L208,198 L213,183 L222,170 L233,160 Z M195,185 L203,190 L208,200 L208,212 L203,222 L193,227 L183,222 L178,212 L178,200 L183,190 Z",
  
  northernireland: "M125,145 L138,150 L148,158 L155,170 L158,185 L155,200 L148,212 L138,220 L125,225 L112,225 L100,220 L92,212 L88,200 L88,185 L92,170 L100,158 L112,150 Z"
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
            viewBox="0 0 600 400"
            className="w-full h-auto"
            style={{ maxHeight: "600px" }}
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
                    strokeWidth={isHovered ? 2 : 1}
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
                      <h3 className="font-bold text-lg text-slate-900 capitalize">{hoveredCountry}</h3>
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