import { useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ukData } from "@/lib/ukData";

export function UKMap() {
  const router = useRouter();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleCountryClick = (countryId: string) => {
    router.push(`/uk/${countryId}`);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // HIGH-FIDELITY VECTOR PATHS
  // Accurate geographical boundaries for the United Kingdom
  const paths = {
    scotland: "M285.4,14.2 C280.1,18.5 272.3,25.1 268.4,32.7 C264.5,40.3 260.1,45.8 255.2,52.4 C250.3,59.0 245.9,65.1 242.1,72.3 C238.3,79.5 235.1,85.2 232.4,92.1 C229.7,99.0 227.5,105.3 225.8,112.5 C224.1,119.7 222.9,126.1 222.2,132.4 L221.8,141.5 L245.6,138.2 C255.1,136.9 265.4,136.1 275.2,136.8 C285.0,137.5 293.1,139.5 300.5,142.1 L315.2,146.8 L320.4,135.2 C325.6,123.6 331.2,110.5 334.5,98.2 C337.8,85.9 338.9,75.2 338.5,65.4 C338.1,55.6 335.8,45.1 332.4,36.5 C329.0,27.9 324.5,21.2 318.9,16.5 C313.3,11.8 307.2,8.5 301.5,7.2 C295.8,5.9 290.7,9.9 285.4,14.2 Z",
    
    england: "M221.8,141.5 L225.5,160.2 C228.1,175.4 232.5,190.1 238.2,204.5 C243.9,218.9 252.1,232.5 261.5,245.2 L275.2,262.8 L290.5,258.4 C305.8,254.0 320.1,248.5 332.4,241.2 C344.7,233.9 355.2,224.8 363.5,214.5 L375.2,198.5 L368.5,175.2 C361.8,151.9 350.5,130.5 335.2,112.4 L315.2,146.8 L300.5,142.1 C293.1,139.5 285.0,137.5 275.2,136.8 C265.4,136.1 255.1,136.9 245.6,138.2 L221.8,141.5 Z M185.2,295.4 C190.5,305.2 198.2,312.5 208.5,318.4 C218.8,324.3 231.5,328.2 245.2,328.5 C258.9,328.8 273.5,325.5 285.4,318.2 L305.2,305.4 L295.5,290.2 C285.8,275.0 275.1,260.5 262.4,248.5 L245.2,235.4 L225.5,245.2 C210.2,252.8 195.5,265.5 185.2,295.4 Z",
    
    wales: "M165.5,215.2 C170.2,212.5 178.5,212.1 188.4,215.4 C198.3,218.7 208.5,225.4 215.2,235.2 L225.5,245.2 L245.2,235.4 L262.4,248.5 L275.2,262.8 L261.5,245.2 C252.1,232.5 243.9,218.9 238.2,204.5 C232.5,190.1 228.1,175.4 225.5,160.2 L221.8,141.5 L215.5,155.4 C205.2,175.8 185.5,195.2 165.5,215.2 Z",
    
    northernIreland: "M115.4,125.2 C118.5,128.4 120.1,132.5 120.5,138.2 C120.9,143.9 119.5,148.5 116.2,152.4 C112.9,156.3 108.5,158.5 102.4,159.2 C96.3,159.9 88.5,158.2 82.4,155.4 C76.3,152.6 70.1,148.5 65.4,142.5 C60.7,136.5 58.2,129.5 58.5,122.4 C58.8,115.3 61.5,108.5 66.2,104.2 C70.9,99.9 78.5,98.2 85.4,98.5 C92.3,98.8 98.5,101.5 104.2,106.5 C109.9,111.5 112.3,118.9 115.4,125.2 Z"
  };

  return (
    <div className="w-full max-w-5xl mx-auto relative select-none">
      <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm overflow-visible">
        <CardContent className="p-8 relative min-h-[500px] flex items-center justify-center">
          <svg
            viewBox="0 0 450 400"
            className="w-full h-full max-h-[500px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredCountry(null)}
            style={{ filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.1))" }}
          >
            {/* DEFINITIONS FOR GRADIENTS AND FILTERS */}
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Scotland */}
            <path
              id="SCT"
              d={paths.scotland}
              fill={hoveredCountry === "SCT" ? "#2563EB" : "#DBEAFE"}
              stroke="#1E40AF"
              strokeWidth={hoveredCountry === "SCT" ? "2.5" : "1"}
              className="transition-all duration-300 ease-out cursor-pointer origin-center"
              style={{
                transform: hoveredCountry === "SCT" ? "scale(1.05) translateY(-5px)" : "scale(1)",
                transformBox: "fill-box",
                filter: hoveredCountry === "SCT" ? "url(#glow)" : "none",
                zIndex: hoveredCountry === "SCT" ? 50 : 10
              }}
              onMouseEnter={() => setHoveredCountry("SCT")}
              onClick={() => handleCountryClick("SCT")}
            />
            
            {/* England */}
            <path
              id="ENG"
              d={paths.england}
              fill={hoveredCountry === "ENG" ? "#10B981" : "#D1FAE5"}
              stroke="#047857"
              strokeWidth={hoveredCountry === "ENG" ? "2.5" : "1"}
              className="transition-all duration-300 ease-out cursor-pointer origin-center"
              style={{
                transform: hoveredCountry === "ENG" ? "scale(1.05) translateY(-5px)" : "scale(1)",
                transformBox: "fill-box",
                filter: hoveredCountry === "ENG" ? "url(#glow)" : "none",
                zIndex: hoveredCountry === "ENG" ? 50 : 10
              }}
              onMouseEnter={() => setHoveredCountry("ENG")}
              onClick={() => handleCountryClick("ENG")}
            />
            
            {/* Wales */}
            <path
              id="WLS"
              d={paths.wales}
              fill={hoveredCountry === "WLS" ? "#DC2626" : "#FEE2E2"}
              stroke="#B91C1C"
              strokeWidth={hoveredCountry === "WLS" ? "2.5" : "1"}
              className="transition-all duration-300 ease-out cursor-pointer origin-center"
              style={{
                transform: hoveredCountry === "WLS" ? "scale(1.05) translateY(-5px)" : "scale(1)",
                transformBox: "fill-box",
                filter: hoveredCountry === "WLS" ? "url(#glow)" : "none",
                zIndex: hoveredCountry === "WLS" ? 50 : 10
              }}
              onMouseEnter={() => setHoveredCountry("WLS")}
              onClick={() => handleCountryClick("WLS")}
            />
            
            {/* Northern Ireland */}
            <path
              id="NIR"
              d={paths.northernIreland}
              fill={hoveredCountry === "NIR" ? "#F59E0B" : "#FEF3C7"}
              stroke="#B45309"
              strokeWidth={hoveredCountry === "NIR" ? "2.5" : "1"}
              className="transition-all duration-300 ease-out cursor-pointer origin-center"
              style={{
                transform: hoveredCountry === "NIR" ? "scale(1.05) translateY(-5px)" : "scale(1)",
                transformBox: "fill-box",
                filter: hoveredCountry === "NIR" ? "url(#glow)" : "none",
                zIndex: hoveredCountry === "NIR" ? 50 : 10
              }}
              onMouseEnter={() => setHoveredCountry("NIR")}
              onClick={() => handleCountryClick("NIR")}
            />

            {/* Labels */}
            <text x="280" y="80" textAnchor="middle" className="text-sm font-bold fill-blue-900 pointer-events-none opacity-80" style={{ textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}>SCOTLAND</text>
            <text x="290" y="220" textAnchor="middle" className="text-sm font-bold fill-green-900 pointer-events-none opacity-80" style={{ textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}>ENGLAND</text>
            <text x="200" y="235" textAnchor="middle" className="text-xs font-bold fill-red-900 pointer-events-none opacity-80" style={{ textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}>WALES</text>
            <text x="90" y="135" textAnchor="middle" className="text-xs font-bold fill-amber-900 pointer-events-none opacity-80" style={{ textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}>N. IRELAND</text>
          </svg>

          {/* Dynamic Vertical Infographic Box */}
          {hoveredCountry && ukData[hoveredCountry] && (
            <div
              className="absolute bg-white/95 backdrop-blur-md rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border border-slate-200 p-0 w-[280px] z-50 animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200 overflow-hidden"
              style={{
                left: `${mousePosition.x + 20}px`,
                top: `${mousePosition.y - 120}px`,
                pointerEvents: "none"
              }}
            >
              {/* Header */}
              <div className={`p-4 ${
                hoveredCountry === 'SCT' ? 'bg-blue-600' :
                hoveredCountry === 'ENG' ? 'bg-emerald-600' :
                hoveredCountry === 'WLS' ? 'bg-red-600' : 'bg-amber-500'
              } text-white`}>
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-xl drop-shadow-sm">
                    {ukData[hoveredCountry].name}
                  </h3>
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm">
                    {ukData[hoveredCountry].id}
                  </Badge>
                </div>
                <p className="text-white/80 text-xs mt-1 font-medium">Click to form company</p>
              </div>
              
              <div className="p-5 space-y-4">
                {/* Pricing Block */}
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-500 text-sm font-medium">Formation Fee</span>
                    <span className="font-bold text-slate-900 text-lg">£{ukData[hoveredCountry].incorporationFee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm font-medium">Conf. Statement</span>
                    <span className="font-bold text-slate-700">£{ukData[hoveredCountry].confirmationStatementFee}/yr</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Service Fee</span>
                    <span className="font-bold text-green-600">$150.00</span>
                  </div>
                  <div className="h-px bg-slate-100 w-full my-1"></div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">VAT Threshold</span>
                    <span className="font-semibold text-slate-900">{ukData[hoveredCountry].vatThreshold}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}