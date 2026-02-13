import { useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ukCountryData } from "@/lib/ukData";

export function UKMap() {
  const router = useRouter();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const handleCountryClick = (countryId: string) => {
    router.push(`/uk/${countryId}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto relative select-none">
      <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm overflow-visible">
        <CardContent className="p-8 relative">
          <svg
            viewBox="0 0 600 800"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Scotland */}
            <g
              onMouseEnter={() => setHoveredCountry("scotland")}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => handleCountryClick("scotland")}
              className="cursor-pointer transition-all duration-300 origin-center"
              style={{
                transform: hoveredCountry === "scotland" ? "scale(1.05)" : "scale(1)",
                filter: hoveredCountry === "scotland" ? "drop-shadow(0 8px 12px rgba(0,0,0,0.3))" : "none",
              }}
            >
              <path
                d="M 300,50 L 380,80 L 420,140 L 400,200 L 350,240 L 280,250 L 220,240 L 180,200 L 170,140 L 210,80 Z"
                fill={hoveredCountry === "scotland" ? "#3B82F6" : "#DBEAFE"}
                stroke="#2563EB"
                strokeWidth="2"
              />
              <text
                x="300"
                y="165"
                textAnchor="middle"
                className="font-bold text-2xl pointer-events-none"
                fill={hoveredCountry === "scotland" ? "#FFFFFF" : "#1E40AF"}
              >
                Scotland
              </text>
            </g>

            {/* Northern Ireland */}
            <g
              onMouseEnter={() => setHoveredCountry("northern-ireland")}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => handleCountryClick("northern-ireland")}
              className="cursor-pointer transition-all duration-300 origin-center"
              style={{
                transform: hoveredCountry === "northern-ireland" ? "scale(1.05)" : "scale(1)",
                filter: hoveredCountry === "northern-ireland" ? "drop-shadow(0 8px 12px rgba(0,0,0,0.3))" : "none",
              }}
            >
              <path
                d="M 80,280 L 140,260 L 180,280 L 190,340 L 160,380 L 100,390 L 60,360 L 50,310 Z"
                fill={hoveredCountry === "northern-ireland" ? "#F59E0B" : "#FEF3C7"}
                stroke="#D97706"
                strokeWidth="2"
              />
              <text
                x="120"
                y="325"
                textAnchor="middle"
                className="font-semibold text-sm pointer-events-none"
                fill={hoveredCountry === "northern-ireland" ? "#FFFFFF" : "#92400E"}
              >
                Northern
              </text>
              <text
                x="120"
                y="345"
                textAnchor="middle"
                className="font-semibold text-sm pointer-events-none"
                fill={hoveredCountry === "northern-ireland" ? "#FFFFFF" : "#92400E"}
              >
                Ireland
              </text>
            </g>

            {/* Wales */}
            <g
              onMouseEnter={() => setHoveredCountry("wales")}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => handleCountryClick("wales")}
              className="cursor-pointer transition-all duration-300 origin-center"
              style={{
                transform: hoveredCountry === "wales" ? "scale(1.05)" : "scale(1)",
                filter: hoveredCountry === "wales" ? "drop-shadow(0 8px 12px rgba(0,0,0,0.3))" : "none",
              }}
            >
              <path
                d="M 180,380 L 240,360 L 280,400 L 270,480 L 220,520 L 160,510 L 130,470 L 140,420 Z"
                fill={hoveredCountry === "wales" ? "#EF4444" : "#FEE2E2"}
                stroke="#DC2626"
                strokeWidth="2"
              />
              <text
                x="205"
                y="450"
                textAnchor="middle"
                className="font-bold text-2xl pointer-events-none"
                fill={hoveredCountry === "wales" ? "#FFFFFF" : "#991B1B"}
              >
                Wales
              </text>
            </g>

            {/* England */}
            <g
              onMouseEnter={() => setHoveredCountry("england")}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => handleCountryClick("england")}
              className="cursor-pointer transition-all duration-300 origin-center"
              style={{
                transform: hoveredCountry === "england" ? "scale(1.05)" : "scale(1)",
                filter: hoveredCountry === "england" ? "drop-shadow(0 8px 12px rgba(0,0,0,0.3))" : "none",
              }}
            >
              <path
                d="M 220,260 L 350,260 L 420,300 L 450,380 L 440,480 L 400,580 L 320,650 L 240,670 L 180,640 L 160,580 L 180,520 L 220,480 L 270,450 L 280,380 Z"
                fill={hoveredCountry === "england" ? "#10B981" : "#D1FAE5"}
                stroke="#059669"
                strokeWidth="2"
              />
              <text
                x="300"
                y="470"
                textAnchor="middle"
                className="font-bold text-3xl pointer-events-none"
                fill={hoveredCountry === "england" ? "#FFFFFF" : "#065F46"}
              >
                England
              </text>
            </g>
          </svg>

          {/* Vertical Infographic Box - Positioned to the right */}
          {hoveredCountry && (
            <div
              className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 ml-8 animate-in slide-in-from-left-4 fade-in duration-300 z-50"
              style={{ minWidth: "320px" }}
            >
              <div className="bg-white rounded-xl shadow-2xl border-2 border-emerald-200 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-5 text-white">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-xl">
                      {ukCountryData[hoveredCountry].name}
                    </h3>
                    <Badge className="bg-white/20 text-white border-white/40">
                      {ukCountryData[hoveredCountry].id.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-emerald-100 text-sm">Companies House Registration</p>
                </div>

                {/* Pricing Details */}
                <div className="p-5 space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <span className="text-slate-600 font-medium">Incorporation Fee</span>
                      <span className="font-bold text-lg text-slate-900">
                        £{ukCountryData[hoveredCountry].incorporationFee}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <span className="text-slate-600 font-medium">Confirmation Statement</span>
                      <span className="font-bold text-lg text-slate-900">
                        £{ukCountryData[hoveredCountry].confirmationStatementFee}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <span className="text-slate-600 font-medium">Service Fee</span>
                      <span className="font-bold text-lg text-emerald-600">$150.00</span>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-3 space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">VAT Threshold</span>
                        <span className="font-semibold text-slate-700">
                          £{ukCountryData[hoveredCountry].vatThreshold.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Corporation Tax</span>
                        <span className="font-semibold text-slate-700">
                          {ukCountryData[hoveredCountry].corporationTax}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-3 border-t border-slate-200">
                    <div className="text-center">
                      <span className="text-sm font-bold text-emerald-600 flex items-center justify-center gap-2">
                        <span className="animate-pulse">→</span>
                        Click to Configure Service
                        <span className="animate-pulse">←</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}