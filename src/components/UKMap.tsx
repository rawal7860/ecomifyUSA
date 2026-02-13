import { useState } from "react";
import { useRouter } from "next/router";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ukData } from "@/lib/ukData";

// Using actual UK TopoJSON data from Natural Earth
const UK_GEO_URL = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-kingdom/uk-countries.json";

export function UKMap() {
  const router = useRouter();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const handleCountryClick = (geo: any) => {
    const countryName = geo.properties.NAME_1 || geo.properties.name;
    const entry = Object.values(ukData).find(c => 
      c.name.toLowerCase() === countryName.toLowerCase() ||
      countryName.toLowerCase().includes(c.name.toLowerCase())
    );
    if (entry) {
      router.push(`/uk/${entry.id}`);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto relative select-none">
      <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-8 relative">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 2800,
              center: [-2, 54.5]
            }}
            style={{ width: "100%", height: "600px" }}
          >
            <Geographies geography={UK_GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.NAME_1 || geo.properties.name || "";
                  const isHovered = hoveredCountry === countryName;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => setHoveredCountry(countryName)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      onClick={() => handleCountryClick(geo)}
                      style={{
                        default: {
                          fill: "#DBEAFE",
                          stroke: "#3B82F6",
                          strokeWidth: 0.75,
                          outline: "none",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        },
                        hover: {
                          fill: "#2563EB",
                          stroke: "#1E40AF",
                          strokeWidth: 1.5,
                          outline: "none",
                          filter: "drop-shadow(0 8px 16px rgba(37, 99, 235, 0.4))",
                          cursor: "pointer",
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

          {/* Vertical Infographic Box */}
          {hoveredCountry && ukData[hoveredCountry.toLowerCase()] && (
            <div className="absolute top-8 right-8 z-50 animate-in slide-in-from-right-4 duration-300">
              <div className="bg-white rounded-lg shadow-2xl border-2 border-blue-200 p-5 min-w-[300px]">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200">
                  <h3 className="font-bold text-xl text-slate-900">
                    {ukData[hoveredCountry.toLowerCase()].name}
                  </h3>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-sm px-3">
                    UK
                  </Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Formation Fee</span>
                    <span className="font-bold text-slate-900">£{ukData[hoveredCountry.toLowerCase()].formationFee}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Annual Confirmation</span>
                    <span className="font-semibold text-slate-700">£50/year</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Service Fee</span>
                    <span className="font-semibold text-green-600">$150.00</span>
                  </div>

                  <div className="border-t border-dashed border-slate-200 my-3"></div>

                  <div className="flex justify-between items-start">
                    <span className="text-slate-600 font-medium">VAT Threshold</span>
                    <span className="font-semibold text-slate-700 text-right">£90,000</span>
                  </div>

                  <div className="flex justify-between items-start">
                    <span className="text-slate-600 font-medium">Corporation Tax</span>
                    <span className="font-semibold text-slate-700 text-right">19%</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200 text-center">
                  <span className="text-xs font-semibold text-blue-600 flex items-center justify-center gap-1.5">
                    Click to Start Formation →
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