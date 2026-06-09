import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Using the local file you saved in the public folder
const geoUrl = "/uk.json";

// Regional data mapping for Salestaxus LLC
const ukRegionData: Record<string, any> = {
    "England": { id: "ENG", formationFee: "£100", serviceFee: "$150", office: "London" },
    "Scotland": { id: "SCT", formationFee: "£100", serviceFee: "$150", office: "Edinburgh" },
    "Wales": { id: "WLS", formationFee: "£100", serviceFee: "$150", office: "Cardiff" },
    "Northern Ireland": { id: "NIR", formationFee: "£100", serviceFee: "$150", office: "Belfast" }
};

export function UKMap() {
    const [hoveredRegion, setHoveredRegion] = useState < string | null > (null);
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
                                    // Ensure this matches the property name in your uk.json (usually 'name' or 'areanm')
                                    const regionName = geo.properties.name || geo.properties.areanm;
                                    const isHovered = hoveredRegion === regionName;

                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onMouseEnter={() => setHoveredRegion(regionName)}
                                            onMouseLeave={() => setHoveredRegion(null)}
                                            onClick={() => window.open(FORM_URL, '_blank')}
                                            data-tooltip-id="uk-tooltip"
                                            data-tooltip-content={regionName}
                                            style={{
                                                default: {
                                                    fill: "#DBEAFE", // blue-100 to match US map
                                                    stroke: "#3B82F6",
                                                    strokeWidth: 0.5,
                                                    outline: "none",
                                                },
                                                hover: {
                                                    fill: "#2563EB", // blue-600
                                                    stroke: "#1E40AF",
                                                    strokeWidth: 1.5,
                                                    outline: "none",
                                                    cursor: "pointer",
                                                },
                                                pressed: {
                                                    fill: "#1E40AF",
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
                                            <span className="text-slate-500">Official Fee</span>
                                            <span className="font-semibold text-slate-900">{info.formationFee}</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500">Service Fee</span>
                                            <span className="font-semibold text-green-600">{info.serviceFee}</span>
                                        </div>

                                        <div className="border-t border-dashed border-slate-200 my-2"></div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500">Registered Office</span>
                                            <span className="font-medium text-slate-700">{info.office}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                                        <span className="text-xs font-semibold text-blue-600">
                                            Click to Start Registration →
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