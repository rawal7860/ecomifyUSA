import { useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ukData, convertGBPtoUSD } from "@/lib/ukData";

export function UKMap() {
  const router = useRouter();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleCountryClick = (countryId: string) => {
    router.push(`/uk/${countryId.toLowerCase()}`);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const SERVICE_FEE_GBP = 150;
  const SERVICE_FEE_USD = convertGBPtoUSD(SERVICE_FEE_GBP);

  return (
    <div className="w-full max-w-4xl mx-auto relative select-none" onMouseMove={handleMouseMove}>
      <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-8">
          <svg
            viewBox="0 0 600 800"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* England */}
            <path
              d="M 250 400 L 350 400 L 380 500 L 350 600 L 250 600 L 220 500 Z"
              className={`cursor-pointer transition-all duration-300 ${
                hoveredCountry === "ENG"
                  ? "fill-emerald-600 stroke-emerald-900 stroke-[3] scale-105 drop-shadow-2xl"
                  : "fill-emerald-100 stroke-emerald-500 stroke-2"
              }`}
              onMouseEnter={() => setHoveredCountry("ENG")}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => handleCountryClick("ENG")}
              style={{ transformOrigin: "300px 500px" }}
            />
            <text x="300" y="510" textAnchor="middle" className="text-2xl font-bold fill-emerald-800 pointer-events-none">
              England
            </text>

            {/* Scotland */}
            <path
              d="M 220 150 L 380 150 L 400 250 L 350 350 L 250 350 L 200 250 Z"
              className={`cursor-pointer transition-all duration-300 ${
                hoveredCountry === "SCT"
                  ? "fill-blue-600 stroke-blue-900 stroke-[3] scale-105 drop-shadow-2xl"
                  : "fill-blue-100 stroke-blue-500 stroke-2"
              }`}
              onMouseEnter={() => setHoveredCountry("SCT")}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => handleCountryClick("SCT")}
              style={{ transformOrigin: "300px 250px" }}
            />
            <text x="300" y="260" textAnchor="middle" className="text-2xl font-bold fill-blue-800 pointer-events-none">
              Scotland
            </text>

            {/* Wales */}
            <path
              d="M 120 450 L 220 430 L 250 500 L 220 570 L 120 550 L 100 500 Z"
              className={`cursor-pointer transition-all duration-300 ${
                hoveredCountry === "WLS"
                  ? "fill-red-600 stroke-red-900 stroke-[3] scale-105 drop-shadow-2xl"
                  : "fill-red-100 stroke-red-500 stroke-2"
              }`}
              onMouseEnter={() => setHoveredCountry("WLS")}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => handleCountryClick("WLS")}
              style={{ transformOrigin: "170px 500px" }}
            />
            <text x="170" y="510" textAnchor="middle" className="text-xl font-bold fill-red-800 pointer-events-none">
              Wales
            </text>

            {/* Northern Ireland */}
            <path
              d="M 50 250 L 150 250 L 170 320 L 150 390 L 50 390 L 30 320 Z"
              className={`cursor-pointer transition-all duration-300 ${
                hoveredCountry === "NIR"
                  ? "fill-amber-600 stroke-amber-900 stroke-[3] scale-105 drop-shadow-2xl"
                  : "fill-amber-100 stroke-amber-500 stroke-2"
              }`}
              onMouseEnter={() => setHoveredCountry("NIR")}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => handleCountryClick("NIR")}
              style={{ transformOrigin: "100px 320px" }}
            />
            <text x="100" y="315" textAnchor="middle" className="text-sm font-bold fill-amber-800 pointer-events-none">
              Northern
            </text>
            <text x="100" y="335" textAnchor="middle" className="text-sm font-bold fill-amber-800 pointer-events-none">
              Ireland
            </text>
          </svg>

          {/* Hover Tooltip */}
          {hoveredCountry && (
            <div
              className="fixed z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-200"
              style={{
                left: `${tooltipPosition.x + 20}px`,
                top: `${tooltipPosition.y - 100}px`,
              }}
            >
              <div className="bg-white rounded-lg shadow-2xl border border-slate-200 p-4 min-w-[300px]">
                {(() => {
                  const countryInfo = ukData[hoveredCountry];
                  if (!countryInfo) return null;

                  return (
                    <>
                      <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
                        <h3 className="font-bold text-lg text-slate-900">{countryInfo.name}</h3>
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                          {countryInfo.id}
                        </Badge>
                      </div>

                      <div className="space-y-2.5 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500">Incorporation Fee</span>
                          <span className="font-semibold text-slate-900">
                            £{countryInfo.incorporationFee} (${convertGBPtoUSD(countryInfo.incorporationFee)} USD)
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-slate-500">Confirmation Statement</span>
                          <span className="font-semibold text-slate-900">
                            £{countryInfo.confirmationStatementFee} (${convertGBPtoUSD(countryInfo.confirmationStatementFee)} USD)
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-slate-500">Service Fee</span>
                          <span className="font-semibold text-green-600">
                            £{SERVICE_FEE_GBP} (${SERVICE_FEE_USD} USD)
                          </span>
                        </div>

                        <div className="border-t border-dashed border-slate-200 my-2"></div>

                        <div className="flex justify-between items-center">
                          <span className="text-slate-500">VAT Threshold</span>
                          <span className="font-medium text-slate-700">{countryInfo.vatThreshold}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                        <span className="text-xs font-semibold text-emerald-600 flex items-center justify-center gap-1">
                          Click to Configure Service →
                        </span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}