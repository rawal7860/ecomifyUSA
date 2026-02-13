import { useState } from "react";
import { useRouter } from "next/router";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ukData } from "@/lib/ukData";

// Using Natural Earth Admin 1 data (states/provinces level) for UK
// This is a reliable, widely-used geographic data source
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-kingdom/uk-countries.json";

export function UKMap() {
  const router = useRouter();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const handleCountryClick = (geo: any) => {
    const countryName = geo.properties.NAME_1 || geo.properties.name || geo.properties.NAME;
    // Map the geographic name to our data keys
    const nameMap: Record<string, string> = {
      "England": "ENGLAND",
      "Scotland": "SCOTLAND", 
      "Wales": "WALES",
      "Northern Ireland": "NORTHERN_IRELAND"
    };
    
    const dataKey = nameMap[countryName];
    const entry = dataKey ? ukData[dataKey] : null;
    
    if (entry) {
      router.push(`/uk/${entry.id}`);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto relative select-none">
      <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0 relative">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 2000,
              center: [-2, 54]
            }}
            style={{ width: "100%", height: "auto" }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.NAME_1 || geo.properties.name || geo.properties.NAME;
                  const nameMap: Record<string, string> = {
                    "England": "ENGLAND",
                    "Scotland": "SCOTLAND",
                    "Wales": "WALES", 
                    "Northern Ireland": "NORTHERN_IRELAND"
                  };
                  
                  const dataKey = nameMap[countryName];
                  const countryInfo = dataKey ? ukData[dataKey] : null;
                  const isHovered = hoveredCountry === countryName;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => setHoveredCountry(countryName)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      onClick={() => handleCountryClick(geo)}
                      data-tooltip-id="country-tooltip"
                      data-tooltip-content={countryName}
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
            id="country-tooltip"
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
              
              const nameMap: Record<string, string> = {
                "England": "ENGLAND",
                "Scotland": "SCOTLAND",
                "Wales": "WALES",
                "Northern Ireland": "NORTHERN_IRELAND"
              };
              
              const dataKey = nameMap[content];
              const countryInfo = dataKey ? ukData[dataKey] : null;
              
              if (!countryInfo) return null;

              return (
                <div className="bg-white rounded-lg shadow-2xl border border-slate-200 p-4 min-w-[280px] text-left animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
                    <h3 className="font-bold text-lg text-slate-900">{countryInfo.name}</h3>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {countryInfo.id.toUpperCase()}
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

                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">VAT Threshold</span>
                      <span className="font-medium text-slate-700">{countryInfo.vatThreshold}</span>
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