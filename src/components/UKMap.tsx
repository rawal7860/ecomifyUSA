import { useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ukData } from "@/lib/ukData";

// High-fidelity SVG paths for UK countries (coordinates scaled for 800x1000 viewBox)
const UK_PATHS = {
  ENGLAND: "M450,650 L480,640 L510,630 L530,610 L540,580 L545,550 L540,520 L530,490 L515,470 L500,460 L480,455 L460,460 L445,475 L435,495 L430,520 L425,545 L420,570 L415,595 L410,620 L415,640 L425,655 L435,665 L445,670 L450,650 Z M480,455 L490,445 L500,430 L505,410 L500,390 L490,375 L475,365 L460,360 L445,365 L435,380 L430,400 L435,420 L445,435 L460,445 L475,450 L480,455 Z",
  SCOTLAND: "M380,180 L395,170 L410,165 L425,170 L440,180 L450,195 L455,215 L455,235 L450,255 L440,270 L425,280 L410,285 L395,285 L380,280 L370,270 L365,255 L365,235 L370,215 L375,195 L380,180 Z M410,140 L420,130 L430,125 L440,130 L445,140 L445,155 L440,165 L430,170 L420,170 L410,165 L405,155 L405,145 L410,140 Z M460,200 L470,190 L480,185 L490,190 L495,200 L495,215 L490,225 L480,230 L470,230 L460,225 L455,215 L455,205 L460,200 Z",
  WALES: "M320,450 L335,440 L350,435 L365,440 L375,450 L380,465 L380,485 L375,505 L365,520 L350,530 L335,535 L320,530 L310,520 L305,505 L305,485 L310,465 L315,455 L320,450 Z M340,410 L350,400 L360,395 L370,400 L375,410 L375,425 L370,435 L360,440 L350,440 L340,435 L335,425 L335,415 L340,410 Z",
  NORTHERN_IRELAND: "M220,320 L235,310 L250,305 L265,310 L275,320 L280,335 L280,355 L275,370 L265,380 L250,385 L235,385 L220,380 L210,370 L205,355 L205,335 L210,320 L215,315 L220,320 Z"
};

interface CountryInfo {
  id: string;
  name: string;
  formationFee: number;
  annualConfirmationFee: number;
  corporationTax: string;
  vatThreshold: string;
  currency: string;
}

export function UKMap() {
  const router = useRouter();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const handleCountryClick = (countryKey: string) => {
    const country = ukData[countryKey];
    if (country) {
      router.push(`/uk/${country.id}`);
    }
  };

  const getCountryInfo = (countryKey: string): CountryInfo | null => {
    return ukData[countryKey] || null;
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="grid lg:grid-cols-[1fr,320px] gap-0">
            {/* Map Section */}
            <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 p-8">
              <svg
                viewBox="0 0 800 1000"
                className="w-full h-auto"
                style={{ maxHeight: "600px" }}
              >
                {/* England */}
                <path
                  d={UK_PATHS.ENGLAND}
                  fill={hoveredCountry === "ENGLAND" ? "#2563EB" : "#DBEAFE"}
                  stroke="#3B82F6"
                  strokeWidth="2"
                  className="transition-all duration-200 cursor-pointer"
                  style={{
                    transform: hoveredCountry === "ENGLAND" ? "scale(1.05)" : "scale(1)",
                    transformOrigin: "center",
                    filter: hoveredCountry === "ENGLAND" ? "drop-shadow(0 4px 12px rgba(37,99,235,0.4))" : "none"
                  }}
                  onMouseEnter={() => setHoveredCountry("ENGLAND")}
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={() => handleCountryClick("ENGLAND")}
                />

                {/* Scotland */}
                <path
                  d={UK_PATHS.SCOTLAND}
                  fill={hoveredCountry === "SCOTLAND" ? "#2563EB" : "#DBEAFE"}
                  stroke="#3B82F6"
                  strokeWidth="2"
                  className="transition-all duration-200 cursor-pointer"
                  style={{
                    transform: hoveredCountry === "SCOTLAND" ? "scale(1.05)" : "scale(1)",
                    transformOrigin: "center",
                    filter: hoveredCountry === "SCOTLAND" ? "drop-shadow(0 4px 12px rgba(37,99,235,0.4))" : "none"
                  }}
                  onMouseEnter={() => setHoveredCountry("SCOTLAND")}
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={() => handleCountryClick("SCOTLAND")}
                />

                {/* Wales */}
                <path
                  d={UK_PATHS.WALES}
                  fill={hoveredCountry === "WALES" ? "#2563EB" : "#DBEAFE"}
                  stroke="#3B82F6"
                  strokeWidth="2"
                  className="transition-all duration-200 cursor-pointer"
                  style={{
                    transform: hoveredCountry === "WALES" ? "scale(1.05)" : "scale(1)",
                    transformOrigin: "center",
                    filter: hoveredCountry === "WALES" ? "drop-shadow(0 4px 12px rgba(37,99,235,0.4))" : "none"
                  }}
                  onMouseEnter={() => setHoveredCountry("WALES")}
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={() => handleCountryClick("WALES")}
                />

                {/* Northern Ireland */}
                <path
                  d={UK_PATHS.NORTHERN_IRELAND}
                  fill={hoveredCountry === "NORTHERN_IRELAND" ? "#2563EB" : "#DBEAFE"}
                  stroke="#3B82F6"
                  strokeWidth="2"
                  className="transition-all duration-200 cursor-pointer"
                  style={{
                    transform: hoveredCountry === "NORTHERN_IRELAND" ? "scale(1.05)" : "scale(1)",
                    transformOrigin: "center",
                    filter: hoveredCountry === "NORTHERN_IRELAND" ? "drop-shadow(0 4px 12px rgba(37,99,235,0.4))" : "none"
                  }}
                  onMouseEnter={() => setHoveredCountry("NORTHERN_IRELAND")}
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={() => handleCountryClick("NORTHERN_IRELAND")}
                />
              </svg>
            </div>

            {/* Vertical Infographic Sidebar */}
            <div className="bg-white border-l border-slate-200 p-6 flex flex-col justify-center">
              {hoveredCountry ? (
                (() => {
                  const country = getCountryInfo(hoveredCountry);
                  if (!country) return null;

                  return (
                    <div className="animate-in slide-in-from-right duration-200">
                      <div className="mb-6">
                        <Badge variant="secondary" className="mb-2 bg-blue-100 text-blue-700">
                          {country.id.toUpperCase()}
                        </Badge>
                        <h3 className="text-2xl font-bold text-slate-900 mb-1">{country.name}</h3>
                        <p className="text-sm text-slate-500">Click to configure service</p>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-slate-50 rounded-lg p-4">
                          <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
                            Formation Fee
                          </div>
                          <div className="text-2xl font-bold text-slate-900">
                            £{country.formationFee}
                          </div>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-4">
                          <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
                            Service Fee
                          </div>
                          <div className="text-2xl font-bold text-green-600">
                            $150.00
                          </div>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-4">
                          <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
                            VAT Threshold
                          </div>
                          <div className="text-xl font-bold text-slate-900">
                            {country.vatThreshold}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-200 space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-600">Annual Fee</span>
                            <span className="font-semibold text-slate-900">£{country.annualConfirmationFee}/yr</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-600">Corporation Tax</span>
                            <span className="font-semibold text-slate-900">{country.corporationTax}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="text-center text-slate-400">
                  <p className="text-sm mb-2">Hover over a country</p>
                  <p className="text-xs">to see details</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}