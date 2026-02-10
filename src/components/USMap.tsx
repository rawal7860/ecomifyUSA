import { useState } from "react";
import { useRouter } from "next/router";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { stateData } from "@/lib/stateData";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export function USMap() {
  const router = useRouter();
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const handleStateClick = (geo: any) => {
    const stateCode = geo.properties.name; // This map uses full names, we map to codes
    const entry = Object.values(stateData).find(s => s.name === stateCode);
    if (entry) {
      router.push(`/state/${entry.id}`);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto relative select-none">
      <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0 relative">
          <ComposableMap projection="geoAlbersUsa">
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateName = geo.properties.name;
                  const stateInfo = Object.values(stateData).find(s => s.name === stateName);
                  const isHovered = hoveredState === stateName;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => setHoveredState(stateName)}
                      onMouseLeave={() => setHoveredState(null)}
                      onClick={() => handleStateClick(geo)}
                      data-tooltip-id="state-tooltip"
                      data-tooltip-content={stateName}
                      style={{
                        default: {
                          fill: "#DBEAFE", // blue-100
                          stroke: "#3B82F6", // blue-500
                          strokeWidth: 0.75,
                          outline: "none",
                          pointerEvents: "visiblePainted",
                          willChange: "transform",
                          WebkitBackfaceVisibility: "hidden",
                          backfaceVisibility: "hidden",
                          transition: "all 0.2s ease-out",
                        },
                        hover: {
                          fill: "#2563EB", // blue-600
                          stroke: "#1E40AF", // blue-800
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

          {/* Custom Tooltip / Infographic Box */}
          <Tooltip
            id="state-tooltip"
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
              const stateInfo = Object.values(stateData).find(s => s.name === content);
              if (!stateInfo) return null;

              return (
                <div className="bg-white rounded-lg shadow-2xl border border-slate-200 p-4 min-w-[280px] text-left animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
                    <h3 className="font-bold text-lg text-slate-900">{stateInfo.name}</h3>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {stateInfo.id}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Formation Fee</span>
                      <span className="font-semibold text-slate-900">${stateInfo.formationFee}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Service Fee</span>
                      <span className="font-semibold text-green-600">$150.00</span>
                    </div>

                    <div className="border-t border-dashed border-slate-200 my-2"></div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Sales Tax</span>
                      <span className="font-medium text-slate-700">{stateInfo.salesTax}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Income Tax</span>
                      <span className="font-medium text-slate-700">{stateInfo.incomeTax}</span>
                    </div>

                    {stateInfo.franchiseTax !== "None" && (
                      <div className="flex justify-between items-start pt-1">
                        <span className="text-slate-500 whitespace-nowrap mr-2">Franchise Tax</span>
                        <span className="font-medium text-slate-700 text-right text-xs leading-tight">
                          {stateInfo.franchiseTax}
                        </span>
                      </div>
                    )}
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