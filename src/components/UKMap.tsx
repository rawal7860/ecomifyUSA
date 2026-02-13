import { useState } from "react";
import { useRouter } from "next/router";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Card, CardContent } from "@/components/ui/card";
import { ukData } from "@/lib/ukData";

// Use TopoJSON with UK country subdivisions (England, Scotland, Wales, Northern Ireland)
const geoUrl = "https://cdn.jsdelivr.net/npm/uk-atlas@2/countries-10m.json";

export function UKMap() {
  const router = useRouter();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const handleCountryClick = (countryId: string) => {
    const countryData = ukData[countryId];
    if (countryData) {
      router.push(`/uk/${countryId.toLowerCase()}`);
    }
  };

  const getCountryData = (countryId: string) => {
    return ukData[countryId];
  };

  return (
    <div className="w-full">
      <Card className="border-2 border-blue-200 shadow-xl overflow-hidden">
        <CardContent className="p-0 relative">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 2400,
              center: [-2, 54.5]
            }}
            className="w-full h-[600px] bg-gradient-to-br from-blue-50 to-slate-100"
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.name;
                  const countryId = countryName?.toUpperCase();
                  const countryData = countryId ? getCountryData(countryId) : null;
                  const isHovered = hoveredCountry === countryId;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        if (countryId && countryData) {
                          setHoveredCountry(countryId);
                        }
                      }}
                      onMouseLeave={() => {
                        setHoveredCountry(null);
                      }}
                      onClick={() => {
                        if (countryId) {
                          handleCountryClick(countryId);
                        }
                      }}
                      style={{
                        default: {
                          fill: countryData ? "#3b82f6" : "#e2e8f0",
                          stroke: "#ffffff",
                          strokeWidth: 0.75,
                          outline: "none",
                          transition: "all 0.3s ease"
                        },
                        hover: {
                          fill: countryData ? "#2563eb" : "#cbd5e1",
                          stroke: "#1e40af",
                          strokeWidth: 1.5,
                          outline: "none",
                          cursor: countryData ? "pointer" : "default"
                        },
                        pressed: {
                          fill: "#1e40af",
                          stroke: "#1e3a8a",
                          strokeWidth: 1.5,
                          outline: "none"
                        }
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>

          {/* Hover Tooltip - Same as US Map */}
          {hoveredCountry && (() => {
            const data = getCountryData(hoveredCountry);
            if (!data) return null;

            return (
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-2xl border-2 border-blue-200 min-w-[280px] animate-in fade-in slide-in-from-top-2 duration-200">
                <h3 className="font-bold text-lg text-blue-900 mb-3 border-b border-blue-100 pb-2">
                  {data.name}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Formation Fee:</span>
                    <span className="font-bold text-blue-600">£{data.formationFee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Annual Fee:</span>
                    <span className="font-semibold text-slate-900">£{data.annualConfirmationFee}/yr</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Corporation Tax:</span>
                    <span className="font-semibold text-slate-900">{data.corporationTax}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">VAT Threshold:</span>
                    <span className="font-semibold text-slate-900">{data.vatThreshold}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Service Fee:</span>
                      <span className="font-bold text-green-600">$150</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 italic text-center">
                    Click to start your {data.name} formation
                  </p>
                </div>
              </div>
            );
          })()}
        </CardContent>
      </Card>
    </div>
  );
}