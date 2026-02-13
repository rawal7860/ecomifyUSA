import { useState } from "react";
import { useRouter } from "next/router";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ukData } from "@/lib/ukData";

// Using world-atlas which includes UK data with proper boundaries
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

export function UKMap() {
  const router = useRouter();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  // Map ISO codes to our data keys
  const isoToKey: Record<string, string> = {
    "826": "england", // UK ISO code
    "SCT": "scotland",
    "WLS": "wales", 
    "NIR": "northernireland"
  };

  const handleCountryClick = (geo: any) => {
    const isoCode = geo.id || geo.properties.iso_a3;
    const countryKey = isoToKey[isoCode];
    if (countryKey && ukData[countryKey]) {
      router.push(`/uk/${countryKey}`);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto relative select-none">
      <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0 relative">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              center: [-2, 54],
              scale: 2200
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies
                  .filter((geo) => {
                    // Filter to only UK countries
                    const isoCode = geo.id || geo.properties.iso_a3;
                    return isoCode === "826"; // UK ISO code
                  })
                  .map((geo) => {
                    const isoCode = geo.id || geo.properties.iso_a3;
                    const countryKey = isoToKey[isoCode] || "england";
                    const countryInfo = ukData[countryKey];
                    const isHovered = hoveredCountry === countryKey;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => setHoveredCountry(countryKey)}
                        onMouseLeave={() => setHoveredCountry(null)}
                        onClick={() => handleCountryClick(geo)}
                        data-tooltip-id="uk-tooltip"
                        data-tooltip-content={countryKey}
                        style={{
                          default: {
                            fill: "#DBEAFE",
                            stroke: "#3B82F6",
                            strokeWidth: 0.75,
                            outline: "none",
                            pointerEvents: "visiblePainted",
                            willChange: "transform",
                            WebkitBackfaceVisibility: "hidden",
                            backfaceVisibility: "hidden",
                            transition: "all 0.2s ease-out",
                          },
                          hover: {
                            fill: "#2563EB",
                            stroke: "#1E40AF",
                            strokeWidth: 1.5,
                            outline: "none",
                            transform: "scale(1.05)",
                            transformOrigin: "center",
                            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))",
                            zIndex: 50,
                          },
                          pressed: {
                            fill: "#1E40AF",
                            stroke: "#1E3A8A",
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
              }
            </Geographies>
          </ComposableMap>

          <Tooltip
            id="uk-tooltip"
            place="right"
            float
            style={{
              backgroundColor: "transparent",
              padding: 0,
              opacity: 1,
              zIndex: 100,
            }}
            render={({ content }) => {
              if (!content) return null;
              const countryInfo = ukData[content];
              if (!countryInfo) return null;

              return (
                <div className="bg-white rounded-lg shadow-2xl border border-slate-200 p-4 min-w-[280px] text-left animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
                    <h3 className="font-bold text-lg text-slate-900 capitalize">{content.replace('-', ' ')}</h3>
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
                </div>
              );
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}