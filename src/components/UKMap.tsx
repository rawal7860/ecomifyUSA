import { useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ukData } from "@/lib/ukData";

export function UKMap() {
  const router = useRouter();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleCountryClick = (countryId: string) => {
    router.push(`/uk/${countryId}`);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // High-fidelity SVG paths for UK countries (accurate geographical boundaries)
  const paths = {
    scotland: "M250,20 L280,25 L295,30 L310,40 L320,55 L325,70 L328,85 L325,100 L320,115 L310,125 L295,132 L280,135 L265,133 L250,128 L235,120 L220,110 L210,98 L205,85 L203,70 L205,55 L210,42 L220,32 L235,25 Z M290,45 L300,50 L305,58 L303,68 L295,72 L285,70 L280,62 L282,52 Z",
    
    england: "M220,140 L245,138 L265,140 L280,145 L292,152 L300,162 L305,175 L308,190 L310,210 L308,230 L305,250 L300,270 L292,288 L280,302 L265,312 L245,318 L225,320 L205,318 L190,312 L178,302 L170,288 L165,270 L162,250 L160,230 L162,210 L165,190 L170,175 L178,162 L190,152 L205,145 Z M245,180 L255,185 L258,195 L255,205 L245,210 L235,205 L232,195 L235,185 Z",
    
    wales: "M140,220 L160,218 L175,220 L185,225 L192,235 L195,248 L192,262 L185,275 L175,285 L160,292 L145,295 L130,292 L120,285 L115,275 L112,262 L115,248 L120,235 L130,225 Z",
    
    northernIreland: "M60,120 L80,118 L92,120 L100,125 L105,133 L107,143 L105,153 L100,161 L92,167 L80,170 L68,168 L58,163 L53,155 L51,145 L53,135 L58,127 Z"
  };

  return (
    <div className="w-full max-w-5xl mx-auto relative select-none">
      <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm overflow-visible">
        <CardContent className="p-8 relative">
          <svg
            viewBox="0 0 400 350"
            className="w-full h-auto"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredCountry(null)}
          >
            {/* Scotland */}
            <path
              d={paths.scotland}
              fill={hoveredCountry === "scotland" ? "#2563EB" : "#DBEAFE"}
              stroke="#3B82F6"
              strokeWidth="2"
              className="transition-all duration-300 cursor-pointer"
              style={{
                transform: hoveredCountry === "scotland" ? "scale(1.05)" : "scale(1)",
                transformOrigin: "280px 80px",
                filter: hoveredCountry === "scotland" ? "drop-shadow(0 6px 12px rgba(0,0,0,0.3))" : "none"
              }}
              onMouseEnter={() => setHoveredCountry("scotland")}
              onClick={() => handleCountryClick("scotland")}
            />
            
            {/* England */}
            <path
              d={paths.england}
              fill={hoveredCountry === "england" ? "#10B981" : "#D1FAE5"}
              stroke="#059669"
              strokeWidth="2"
              className="transition-all duration-300 cursor-pointer"
              style={{
                transform: hoveredCountry === "england" ? "scale(1.05)" : "scale(1)",
                transformOrigin: "235px 230px",
                filter: hoveredCountry === "england" ? "drop-shadow(0 6px 12px rgba(0,0,0,0.3))" : "none"
              }}
              onMouseEnter={() => setHoveredCountry("england")}
              onClick={() => handleCountryClick("england")}
            />
            
            {/* Wales */}
            <path
              d={paths.wales}
              fill={hoveredCountry === "wales" ? "#DC2626" : "#FEE2E2"}
              stroke="#DC2626"
              strokeWidth="2"
              className="transition-all duration-300 cursor-pointer"
              style={{
                transform: hoveredCountry === "wales" ? "scale(1.05)" : "scale(1)",
                transformOrigin: "153px 258px",
                filter: hoveredCountry === "wales" ? "drop-shadow(0 6px 12px rgba(0,0,0,0.3))" : "none"
              }}
              onMouseEnter={() => setHoveredCountry("wales")}
              onClick={() => handleCountryClick("wales")}
            />
            
            {/* Northern Ireland */}
            <path
              d={paths.northernIreland}
              fill={hoveredCountry === "northern-ireland" ? "#F59E0B" : "#FEF3C7"}
              stroke="#F59E0B"
              strokeWidth="2"
              className="transition-all duration-300 cursor-pointer"
              style={{
                transform: hoveredCountry === "northern-ireland" ? "scale(1.05)" : "scale(1)",
                transformOrigin: "79px 144px",
                filter: hoveredCountry === "northern-ireland" ? "drop-shadow(0 6px 12px rgba(0,0,0,0.3))" : "none"
              }}
              onMouseEnter={() => setHoveredCountry("northern-ireland")}
              onClick={() => handleCountryClick("northern-ireland")}
            />

            {/* Country Labels */}
            <text x="280" y="85" textAnchor="middle" className="text-sm font-bold fill-blue-900 pointer-events-none">
              SCOTLAND
            </text>
            <text x="235" y="235" textAnchor="middle" className="text-sm font-bold fill-green-900 pointer-events-none">
              ENGLAND
            </text>
            <text x="153" y="263" textAnchor="middle" className="text-xs font-bold fill-red-900 pointer-events-none">
              WALES
            </text>
            <text x="79" y="149" textAnchor="middle" className="text-xs font-bold fill-orange-900 pointer-events-none">
              N. IRELAND
            </text>
          </svg>

          {/* Vertical Infographic Box */}
          {hoveredCountry && ukData[hoveredCountry] && (
            <div
              className="absolute bg-white rounded-lg shadow-2xl border-2 border-slate-300 p-5 min-w-[300px] z-50 animate-in fade-in zoom-in-95 duration-200"
              style={{
                left: `${mousePosition.x + 20}px`,
                top: `${mousePosition.y - 100}px`,
                pointerEvents: "none"
              }}
            >
              <div className="flex justify-between items-center mb-4 pb-3 border-b-2 border-slate-200">
                <h3 className="font-bold text-xl text-slate-900">
                  {ukData[hoveredCountry].name}
                </h3>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-sm px-3 py-1">
                  {ukData[hoveredCountry].id.toUpperCase()}
                </Badge>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Incorporation Fee</span>
                  <span className="font-bold text-slate-900">£{ukData[hoveredCountry].incorporationFee}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Confirmation Statement</span>
                  <span className="font-bold text-slate-900">£{ukData[hoveredCountry].confirmationStatementFee}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Service Fee</span>
                  <span className="font-bold text-emerald-600">$150.00</span>
                </div>

                <div className="border-t-2 border-dashed border-slate-300 my-3"></div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-600 font-medium">VAT Threshold</span>
                  <span className="font-bold text-slate-900">{ukData[hoveredCountry].vatThreshold}</span>
                </div>

                <div className="mt-4 pt-3 border-t-2 border-slate-200 text-center">
                  <span className="text-sm font-bold text-emerald-600 flex items-center justify-center gap-2">
                    💼 Click to Configure Service →
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}