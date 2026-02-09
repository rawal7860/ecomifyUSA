import { useState } from "react";
import { useRouter } from "next/router";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Card, CardContent } from "@/components/ui/card";

interface StateInfo {
  name: string;
  formationFee: string;
  salesTax: string;
  incomeTax: string;
  franchiseTax: string;
}

const stateData: Record<string, StateInfo> = {
  AL: { name: "Alabama", formationFee: "$200", salesTax: "4%", incomeTax: "2-5%", franchiseTax: "None" },
  AK: { name: "Alaska", formationFee: "$250", salesTax: "None", incomeTax: "None", franchiseTax: "None" },
  AZ: { name: "Arizona", formationFee: "$50", salesTax: "5.6%", incomeTax: "4.5%", franchiseTax: "None" },
  AR: { name: "Arkansas", formationFee: "$45", salesTax: "6.5%", incomeTax: "5.9%", franchiseTax: "None" },
  CA: { name: "California", formationFee: "$70", salesTax: "7.25%", incomeTax: "8.84%", franchiseTax: "$800/year" },
  CO: { name: "Colorado", formationFee: "$50", salesTax: "2.9%", incomeTax: "4.55%", franchiseTax: "None" },
  CT: { name: "Connecticut", formationFee: "$120", salesTax: "6.35%", incomeTax: "7.5%", franchiseTax: "$250" },
  DE: { name: "Delaware", formationFee: "$90", salesTax: "None", incomeTax: "8.7%", franchiseTax: "$300" },
  FL: { name: "Florida", formationFee: "$125", salesTax: "6%", incomeTax: "None", franchiseTax: "None" },
  GA: { name: "Georgia", formationFee: "$100", salesTax: "4%", incomeTax: "5.75%", franchiseTax: "None" },
  HI: { name: "Hawaii", formationFee: "$50", salesTax: "4%", incomeTax: "6.4%", franchiseTax: "None" },
  ID: { name: "Idaho", formationFee: "$100", salesTax: "6%", incomeTax: "6.5%", franchiseTax: "None" },
  IL: { name: "Illinois", formationFee: "$150", salesTax: "6.25%", incomeTax: "9.5%", franchiseTax: "None" },
  IN: { name: "Indiana", formationFee: "$95", salesTax: "7%", incomeTax: "5.25%", franchiseTax: "None" },
  IA: { name: "Iowa", formationFee: "$50", salesTax: "6%", incomeTax: "8.53%", franchiseTax: "None" },
  KS: { name: "Kansas", formationFee: "$160", salesTax: "6.5%", incomeTax: "7%", franchiseTax: "None" },
  KY: { name: "Kentucky", formationFee: "$40", salesTax: "6%", incomeTax: "5%", franchiseTax: "None" },
  LA: { name: "Louisiana", formationFee: "$100", salesTax: "4.45%", incomeTax: "7.5%", franchiseTax: "None" },
  ME: { name: "Maine", formationFee: "$175", salesTax: "5.5%", incomeTax: "7.15%", franchiseTax: "None" },
  MD: { name: "Maryland", formationFee: "$100", salesTax: "6%", incomeTax: "8.25%", franchiseTax: "None" },
  MA: { name: "Massachusetts", formationFee: "$500", salesTax: "6.25%", incomeTax: "8%", franchiseTax: "None" },
  MI: { name: "Michigan", formationFee: "$50", salesTax: "6%", incomeTax: "6%", franchiseTax: "None" },
  MN: { name: "Minnesota", formationFee: "$135", salesTax: "6.875%", incomeTax: "9.85%", franchiseTax: "None" },
  MS: { name: "Mississippi", formationFee: "$50", salesTax: "7%", incomeTax: "5%", franchiseTax: "None" },
  MO: { name: "Missouri", formationFee: "$50", salesTax: "4.225%", incomeTax: "5.4%", franchiseTax: "None" },
  MT: { name: "Montana", formationFee: "$35", salesTax: "None", incomeTax: "6.75%", franchiseTax: "None" },
  NE: { name: "Nebraska", formationFee: "$100", salesTax: "5.5%", incomeTax: "7.5%", franchiseTax: "None" },
  NV: { name: "Nevada", formationFee: "$75", salesTax: "6.85%", incomeTax: "None", franchiseTax: "None" },
  NH: { name: "New Hampshire", formationFee: "$100", salesTax: "None", incomeTax: "None", franchiseTax: "None" },
  NJ: { name: "New Jersey", formationFee: "$125", salesTax: "6.625%", incomeTax: "10.75%", franchiseTax: "None" },
  NM: { name: "New Mexico", formationFee: "$50", salesTax: "5.125%", incomeTax: "5.9%", franchiseTax: "None" },
  NY: { name: "New York", formationFee: "$200", salesTax: "4%", incomeTax: "6.5%", franchiseTax: "None" },
  NC: { name: "North Carolina", formationFee: "$125", salesTax: "4.75%", incomeTax: "2.5%", franchiseTax: "None" },
  ND: { name: "North Dakota", formationFee: "$135", salesTax: "5%", incomeTax: "4.31%", franchiseTax: "None" },
  OH: { name: "Ohio", formationFee: "$99", salesTax: "5.75%", incomeTax: "None", franchiseTax: "None" },
  OK: { name: "Oklahoma", formationFee: "$100", salesTax: "4.5%", incomeTax: "4%", franchiseTax: "None" },
  OR: { name: "Oregon", formationFee: "$100", salesTax: "None", incomeTax: "7.6%", franchiseTax: "None" },
  PA: { name: "Pennsylvania", formationFee: "$125", salesTax: "6%", incomeTax: "9.99%", franchiseTax: "None" },
  RI: { name: "Rhode Island", formationFee: "$150", salesTax: "7%", incomeTax: "7%", franchiseTax: "None" },
  SC: { name: "South Carolina", formationFee: "$110", salesTax: "6%", incomeTax: "5%", franchiseTax: "None" },
  SD: { name: "South Dakota", formationFee: "$150", salesTax: "4.5%", incomeTax: "None", franchiseTax: "None" },
  TN: { name: "Tennessee", formationFee: "$300", salesTax: "7%", incomeTax: "None", franchiseTax: "None" },
  TX: { name: "Texas", formationFee: "$300", salesTax: "6.25%", incomeTax: "None", franchiseTax: "None" },
  UT: { name: "Utah", formationFee: "$70", salesTax: "6.1%", incomeTax: "4.85%", franchiseTax: "None" },
  VT: { name: "Vermont", formationFee: "$125", salesTax: "6%", incomeTax: "8.75%", franchiseTax: "None" },
  VA: { name: "Virginia", formationFee: "$100", salesTax: "5.3%", incomeTax: "5.75%", franchiseTax: "None" },
  WA: { name: "Washington", formationFee: "$200", salesTax: "6.5%", incomeTax: "None", franchiseTax: "None" },
  WV: { name: "West Virginia", formationFee: "$100", salesTax: "6%", incomeTax: "6.5%", franchiseTax: "None" },
  WI: { name: "Wisconsin", formationFee: "$130", salesTax: "5%", incomeTax: "7.65%", franchiseTax: "None" },
  WY: { name: "Wyoming", formationFee: "$100", salesTax: "4%", incomeTax: "None", franchiseTax: "None" },
};

// US States TopoJSON URL
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export function USMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const router = useRouter();

  const handleStateClick = (stateCode: string) => {
    router.push(`/state/${stateCode.toLowerCase()}`);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="relative w-full" onMouseMove={handleMouseMove}>
      <ComposableMap
        projection="geoAlbersUsa"
        className="w-full h-auto"
        projectionConfig={{
          scale: 1000,
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateCode = geo.id;
              const isHovered = hoveredState === stateCode;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setHoveredState(stateCode)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() => handleStateClick(stateCode)}
                  style={{
                    default: {
                      fill: "#e0e7ff",
                      stroke: "#3b82f6",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    hover: {
                      fill: "#93c5fd",
                      stroke: "#3b82f6",
                      strokeWidth: 1,
                      outline: "none",
                      cursor: "pointer",
                      transform: "scale(1.05)",
                      filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))",
                    },
                    pressed: {
                      fill: "#60a5fa",
                      stroke: "#2563eb",
                      strokeWidth: 1,
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Hover Tooltip */}
      {hoveredState && stateData[hoveredState] && (
        <Card
          className="fixed z-50 pointer-events-none shadow-xl"
          style={{
            left: `${mousePosition.x + 20}px`,
            top: `${mousePosition.y - 80}px`,
          }}
        >
          <CardContent className="p-4 min-w-[250px]">
            <h3 className="font-bold text-lg mb-3 text-blue-600">
              {stateData[hoveredState].name}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Formation Fee:</span>
                <span className="font-semibold">{stateData[hoveredState].formationFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Sales Tax:</span>
                <span className="font-semibold">{stateData[hoveredState].salesTax}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Income Tax:</span>
                <span className="font-semibold">{stateData[hoveredState].incomeTax}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Franchise Tax:</span>
                <span className="font-semibold">{stateData[hoveredState].franchiseTax}</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">Click to configure services</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export { stateData };