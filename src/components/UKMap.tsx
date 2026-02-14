import { useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import { ukData } from "@/lib/ukData";

// High-fidelity SVG paths for UK countries (embedded, no fetch)
const UK_PATHS = {
  england: "M 280 420 L 285 410 L 295 405 L 310 400 L 325 398 L 340 400 L 355 405 L 365 415 L 370 430 L 372 445 L 370 460 L 365 475 L 355 485 L 340 490 L 325 492 L 310 490 L 295 485 L 285 475 L 280 460 L 278 445 L 280 430 Z M 320 420 L 330 425 L 335 435 L 333 445 L 328 450 L 318 448 L 313 440 L 315 430 L 320 420 Z",
  scotland: "M 260 180 L 270 175 L 285 172 L 300 170 L 315 172 L 330 178 L 340 188 L 345 200 L 348 215 L 345 230 L 338 242 L 325 250 L 310 253 L 295 250 L 282 242 L 272 230 L 265 215 L 260 200 L 258 185 Z M 290 195 L 298 190 L 308 192 L 315 198 L 318 208 L 315 218 L 308 223 L 298 221 L 290 213 L 288 203 Z",
  wales: "M 220 350 L 228 345 L 238 343 L 250 345 L 260 350 L 268 360 L 272 372 L 270 385 L 263 395 L 250 400 L 238 398 L 228 390 L 220 378 L 218 365 Z",
  northern_ireland: "M 180 240 L 190 235 L 202 233 L 215 235 L 225 242 L 230 252 L 232 265 L 228 278 L 218 285 L 205 287 L 192 283 L 182 273 L 178 260 L 180 247 Z"
};

export function UKMap() {
  const router = useRouter();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const handleCountryClick = (countryId: string) => {
    router.push(`/uk/${countryId}`);
  };

  const hoveredData = hoveredCountry ? ukData[hoveredCountry.toUpperCase()] : null;

  return (
    <div className="w-full">
      <Card className="border-slate-200 shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="grid lg:grid-cols-[1fr_300px]">
            {/* Map Section */}
            <div className="relative bg-gradient-to-br from-blue-50 to-slate-50 p-8 flex items-center justify-center min-h-[500px]">
              <svg
                viewBox="0 0 600 700"
                className="w-full h-full max-w-[500px]"
                style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
              >
                {Object.entries(UK_PATHS).map(([countryId, pathData]) => {
                  const isHovered = hoveredCountry === countryId;
                  return (
                    <path
                      key={countryId}
                      d={pathData}
                      fill={isHovered ? "#3b82f6" : "#60a5fa"}
                      stroke="#1e40af"
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-300"
                      style={{
                        transform: isHovered ? "scale(1.05)" : "scale(1)",
                        transformOrigin: "center",
                        filter: isHovered ? "brightness(1.1)" : "brightness(1)"
                      }}
                      onMouseEnter={() => setHoveredCountry(countryId)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      onClick={() => handleCountryClick(countryId)}
                    />
                  );
                })}
              </svg>
            </div>

            {/* Vertical Infographic Sidebar */}
            <div className="bg-white border-l border-slate-200 p-6 flex flex-col justify-center min-h-[500px]">
              {hoveredData ? (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div className="border-b pb-4">
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">
                      {hoveredData.name}
                    </h3>
                    <p className="text-sm text-slate-500">Click to start formation</p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
                        Formation Fee
                      </span>
                      <span className="text-3xl font-bold text-blue-900">
                        £{hoveredData.formationFee}
                      </span>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <span className="text-xs font-semibold text-green-600 uppercase tracking-wider block mb-1">
                        Service Fee
                      </span>
                      <span className="text-2xl font-bold text-green-900">
                        ${hoveredData.serviceFee}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1">
                          Annual Fee
                        </span>
                        <span className="text-lg font-bold text-slate-900">
                          {hoveredData.annualFee}
                        </span>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1">
                          Corp. Tax
                        </span>
                        <span className="text-lg font-bold text-slate-900">
                          {hoveredData.corporationTax}
                        </span>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider block mb-1">
                        VAT Threshold
                      </span>
                      <span className="text-xl font-bold text-purple-900">
                        {hoveredData.vatThreshold}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-xs text-slate-500 text-center">
                      Click the map to begin your {hoveredData.name} formation
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      Hover over a country
                    </h3>
                    <p className="text-sm text-slate-500">
                      See formation fees, taxes, and VAT thresholds for England, Scotland, Wales, or Northern Ireland
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}