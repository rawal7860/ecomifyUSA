import { useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ukData } from "@/lib/ukData";

export function UKMap() {
  const router = useRouter();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const handleCountryClick = (countryId: string) => {
    router.push(`/uk/${countryId}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto relative select-none">
      <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm overflow-visible">
        <CardContent className="p-8 relative min-h-[600px] flex items-center justify-center">
          <svg
            viewBox="0 0 800 1000"
            className="w-full h-full max-w-3xl drop-shadow-2xl"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.1))" }}
          >
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Scotland - High Fidelity Path */}
            <g
              onMouseEnter={() => setHoveredCountry("SCT")}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => handleCountryClick("SCT")}
              className="cursor-pointer transition-all duration-500 ease-out origin-[400px_300px]"
              style={{
                transform: hoveredCountry === "SCT" ? "scale(1.05) translateY(-10px)" : "scale(1)",
                zIndex: hoveredCountry === "SCT" ? 50 : 10,
              }}
            >
              <path
                d="M 380,50 C 400,60 420,80 430,100 C 450,120 480,110 500,140 C 510,160 500,190 480,210 C 460,230 450,250 440,270 C 420,280 400,280 380,290 L 320,280 C 300,270 280,260 260,240 C 250,220 240,200 250,180 C 260,160 280,140 300,120 C 320,100 340,80 380,50 Z"
                fill={hoveredCountry === "SCT" ? "#3B82F6" : "#EFF6FF"}
                stroke="#2563EB"
                strokeWidth={hoveredCountry === "SCT" ? "3" : "1.5"}
                className="transition-colors duration-300"
              />
              <text
                x="380"
                y="180"
                textAnchor="middle"
                className="font-bold text-3xl pointer-events-none tracking-wider font-sans"
                fill={hoveredCountry === "SCT" ? "#FFFFFF" : "#1E40AF"}
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
              >
                SCOTLAND
              </text>
            </g>

            {/* Northern Ireland - High Fidelity Path */}
            <g
              onMouseEnter={() => setHoveredCountry("NIR")}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => handleCountryClick("NIR")}
              className="cursor-pointer transition-all duration-500 ease-out origin-[180px_350px]"
              style={{
                transform: hoveredCountry === "NIR" ? "scale(1.05) translateX(-10px)" : "scale(1)",
                zIndex: hoveredCountry === "NIR" ? 50 : 10,
              }}
            >
              <path
                d="M 150,320 C 170,310 190,320 200,340 C 210,360 200,380 190,400 C 180,410 160,420 140,410 C 120,400 110,380 110,360 C 120,340 130,330 150,320 Z"
                fill={hoveredCountry === "NIR" ? "#F59E0B" : "#FFFBEB"}
                stroke="#D97706"
                strokeWidth={hoveredCountry === "NIR" ? "3" : "1.5"}
                className="transition-colors duration-300"
              />
              <text
                x="160"
                y="375"
                textAnchor="middle"
                className="font-bold text-sm pointer-events-none tracking-wide font-sans"
                fill={hoveredCountry === "NIR" ? "#FFFFFF" : "#92400E"}
              >
                N. IRELAND
              </text>
            </g>

            {/* Wales - High Fidelity Path */}
            <g
              onMouseEnter={() => setHoveredCountry("WLS")}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => handleCountryClick("WLS")}
              className="cursor-pointer transition-all duration-500 ease-out origin-[300px_550px]"
              style={{
                transform: hoveredCountry === "WLS" ? "scale(1.05) translateX(-10px)" : "scale(1)",
                zIndex: hoveredCountry === "WLS" ? 50 : 10,
              }}
            >
              <path
                d="M 280,480 C 300,470 320,490 330,510 L 340,560 C 330,590 310,610 280,620 C 250,610 230,580 240,550 C 250,520 260,500 280,480 Z"
                fill={hoveredCountry === "WLS" ? "#EF4444" : "#FEF2F2"}
                stroke="#DC2626"
                strokeWidth={hoveredCountry === "WLS" ? "3" : "1.5"}
                className="transition-colors duration-300"
              />
              <text
                x="290"
                y="560"
                textAnchor="middle"
                className="font-bold text-xl pointer-events-none tracking-wider font-sans"
                fill={hoveredCountry === "WLS" ? "#FFFFFF" : "#991B1B"}
              >
                WALES
              </text>
            </g>

            {/* England - High Fidelity Path */}
            <g
              onMouseEnter={() => setHoveredCountry("ENG")}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => handleCountryClick("ENG")}
              className="cursor-pointer transition-all duration-500 ease-out origin-[450px_600px]"
              style={{
                transform: hoveredCountry === "ENG" ? "scale(1.05)" : "scale(1)",
                zIndex: hoveredCountry === "ENG" ? 40 : 5,
              }}
            >
              <path
                d="M 320,280 L 380,290 C 420,300 450,320 480,350 C 520,380 540,420 530,480 C 520,540 500,600 450,650 C 400,680 350,680 300,660 C 280,640 320,620 340,560 L 330,510 C 320,490 300,470 280,480 C 260,460 280,420 300,380 C 310,340 315,310 320,280 Z"
                fill={hoveredCountry === "ENG" ? "#10B981" : "#ECFDF5"}
                stroke="#059669"
                strokeWidth={hoveredCountry === "ENG" ? "3" : "1.5"}
                className="transition-colors duration-300"
              />
              <text
                x="420"
                y="500"
                textAnchor="middle"
                className="font-bold text-4xl pointer-events-none tracking-widest font-sans"
                fill={hoveredCountry === "ENG" ? "#FFFFFF" : "#065F46"}
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
              >
                ENGLAND
              </text>
            </g>
          </svg>

          {/* Vertical Infographic Box */}
          {hoveredCountry && ukData[hoveredCountry] && (
            <div
              className="absolute top-1/4 right-0 transform translate-x-4 animate-in slide-in-from-left-8 fade-in duration-300 z-50 w-80"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-200 overflow-hidden ring-1 ring-slate-100">
                {/* Header */}
                <div className={`p-6 text-white bg-gradient-to-br ${
                  hoveredCountry === 'ENG' ? 'from-emerald-500 to-emerald-700' :
                  hoveredCountry === 'SCT' ? 'from-blue-500 to-blue-700' :
                  hoveredCountry === 'WLS' ? 'from-red-500 to-red-700' :
                  'from-amber-400 to-amber-600'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-2xl tracking-tight">
                      {ukData[hoveredCountry].name}
                    </h3>
                    <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">
                      {ukData[hoveredCountry].id}
                    </Badge>
                  </div>
                  <p className="text-white/90 text-sm font-medium">Companies House Jurisdiction</p>
                </div>

                {/* Pricing Details */}
                <div className="p-6 space-y-5">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center group">
                      <span className="text-slate-500 font-medium group-hover:text-slate-700 transition-colors">Formation Fee</span>
                      <div className="text-right">
                        <span className="block font-bold text-xl text-slate-900">
                          £{ukData[hoveredCountry].incorporationFee}
                        </span>
                        <span className="text-xs text-slate-400">One-time fee</span>
                      </div>
                    </div>

                    <div className="h-px bg-slate-100" />

                    <div className="flex justify-between items-center group">
                      <span className="text-slate-500 font-medium group-hover:text-slate-700 transition-colors">Conf. Statement</span>
                      <span className="font-bold text-lg text-slate-700">
                        £{ukData[hoveredCountry].confirmationStatementFee}
                      </span>
                    </div>

                    <div className="flex justify-between items-center group">
                      <span className="text-slate-500 font-medium group-hover:text-slate-700 transition-colors">VAT Threshold</span>
                      <Badge variant="outline" className="border-slate-200 text-slate-700 bg-slate-50">
                        {ukData[hoveredCountry].vatThreshold}
                      </Badge>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-4 mt-2">
                    <div className="w-full bg-slate-900 text-white py-3 px-4 rounded-lg font-semibold text-center text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 flex items-center justify-center gap-2 group">
                      Start Formation
                      <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </div>
                    <p className="text-center text-xs text-slate-400 mt-3">
                      Instant Stripe Invoice • Secure Checkout
                    </p>
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