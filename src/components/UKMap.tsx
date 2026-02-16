import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Authentic UK TopoJSON from a reliable CDN
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-kingdom/uk-countries.json";

// Regional data for your Salestaxus LLC services
const ukData = {
    "England": { id: "ENG", name: "England", fee: "£100", service: "$150", address: "London / Manchester" },
    "Scotland": { id: "SCT", name: "Scotland", fee: "£100", service: "$150", address: "Edinburgh / Glasgow" },
    "Wales": { id: "WLS", name: "Wales", fee: "£100", service: "$150", address: "Cardiff" },
    "Northern Ireland": { id: "NIR", name: "Northern Ireland", fee: "£100", service: "$150", address: "Belfast" }
};

export function UKMap() {
    const [hoveredRegion, setHoveredRegion] = useState < string | null > (null);
    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf2LOGK6eY5rxr-RVUwC1vvCPNTFr1HmnbbKCYSa1nfL9m4AA/viewform";

    return (
        <div className="w-full max-w-4xl mx-auto relative select-none">
            <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0 relative">
                    <ComposableMap
                        // UK Projection: Centered at 2 degrees West, 54 degrees North
                        projection="geoMercator"
                        projectionConfig={{
                            rotate: [2, -54, 0],
                            scale: 2500
                        }}
                        style={{ width: "100%", height: "auto" }}
                    >
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const name = geo.properties.name;
                                    const isHovered = hoveredRegion === name;

                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onMouseEnter={() => setHoveredRegion(name)}
                                            onMouseLeave={() => setHoveredRegion(null)}
                                            onClick={() => window.open(FORM_URL, '_blank')}
                                            data-tooltip-id="uk-tooltip"
                                            data-tooltip-content={name}
                                            style={{
                                                default: {
                                                    fill: "#F1F5F9",
                                                    stroke: "#94A3B8",
                                                    strokeWidth: 0.5,
                                                    outline: "none",
                                                },
                                                hover: {
                                                    fill: "#2563EB",
                                                    stroke: "#1E40AF",
                                                    strokeWidth: 1,
                                                    outline: "none",
                                                    cursor: "pointer"
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
                            const info = ukData[content as keyof typeof ukData];
                            if (!info) return null;

                            return (
                                <div className="bg-white rounded-lg shadow-2xl border border-slate-200 p-4 min-w-[280px] text-left animate-in fade-in zoom-in-95 duration-200">
                                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
                                        <h3 className="font-bold text-lg text-slate-900">{info.name}</h3>
                                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                            {info.id}
                                        </Badge>
                                    </div>

                                    <div className="space-y-2.5 text-sm">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500">Official Fee</span>
                                            <span className="font-semibold text-slate-900">{info.fee}</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500">Service Fee</span>
                                            <span className="font-semibold text-green-600">{info.service}</span>
                                        </div>

                                        <div className="border-t border-dashed border-slate-200 my-2"></div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500">Registered Office</span>
                                            <span className="font-medium text-slate-700">{info.address}</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500">Compliance</span>
                                            <span className="font-medium text-slate-700 text-xs">HMRC & Companies House</span>
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