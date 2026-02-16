import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// VERIFIED LINK: Returns valid TopoJSON nations data
const geoUrl = "https://cdn.jsdelivr.net/npm/uk-atlas@1/uk/nations-10m.json";

const ukRegionData: Record<string, any> = {
  "England": { id: "ENG", fee: "£100", service: "$150", office: "London" },
  "Scotland": { id: "SCT", fee: "£100", service: "$150", office: "Edinburgh" },
  "Wales": { id: "WLS", fee: "£100", service: "$150", office: "Cardiff" },
  "Northern Ireland": { id: "NIR", fee: "£100", service: "$150", office: "Belfast" }
};

export function UKMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf2LOGK6eY5rxr-RVUwC1vvCPNTFr1HmnbbKCYSa1nfL9m4AA/viewform";

  return (
    <div className="w-full max-w-4xl mx-auto relative select-none">
      <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0 relative">
          <ComposableMap 
            projection="geoMercator"
            projectionConfig={{
              rotate: [2, -54, 0], // UK centering coordinates
              scale: 2500
            }}
            style={{ width: "100%", height: "auto" }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  // Property name in this specific TopoJSON is 'name'
                  const regionName = geo.properties.name; 
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => setHovered(regionName)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => window.open(FORM_URL, '_blank')}
                      data-tooltip-id="uk-tooltip"
                      data-tooltip-content={regionName}
                      style={{
                        default: { 
                          fill: "#DBEAFE", 
                          stroke: "#3B82F6", 
                          strokeWidth: 0.5, 
                          outline: "none" 
                        },
                        hover: { 
                          fill: "#2563EB", 
                          stroke: "#1E40AF", 
                          strokeWidth: 1.5, 
                          outline: "none", 
                          cursor: "pointer" 
                        },
                        pressed: { 
                          fill: "#1E40AF", 
                          outline: "none" 
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
            style={{ backgroundColor: "transparent", padding: 0, zIndex: 100 }}
            render={({ content }) => {
              if (!content) return null;
              const info = ukRegionData[content];
              if (!info) return null;

              return (
                <div className="bg-white rounded-lg shadow-2xl border border-slate-200 p-4 min-w-[280px] text-left animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
                    <h3 className="font-bold text-lg text-slate-900">{content}</h3>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {info.id}
                    </Badge>
                  </div>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Formation Fee</span>
                      <span className="font-semibold text-slate-900">{info.fee}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Service Fee</span>
                      <span className="font-semibold text-green-600">{info.service}</span>
                    </div>
                    <div className="border-t border-dashed border-slate-200 my-2"></div>
                    <div className="flex justify-between items-center italic text-xs text-slate-500">
                      <span>Office: {info.office}</span>
                      <span className="text-blue-600 font-bold">Start Filing →</span>
                    </div>
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