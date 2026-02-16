import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export const UKMap = () => {
    const [selectedRegion, setSelectedRegion] = useState < string | null > (null);
    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf2LOGK6eY5rxr-RVUwC1vvCPNTFr1HmnbbKCYSa1nfL9m4AA/viewform";

    // This is the same technique used in your USA map
    const regions = [
        { id: 'england', name: "England", x: 55, y: 65, width: 35, height: 45, color: "bg-red-500" },
        { id: 'scotland', name: "Scotland", x: 40, y: 20, width: 25, height: 30, color: "bg-blue-600" },
        { id: 'wales', name: "Wales", x: 30, y: 65, width: 15, height: 20, color: "bg-green-600" },
        { id: 'ni', name: "N. Ireland", x: 20, y: 40, width: 15, height: 15, color: "bg-orange-500" }
    ];

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg border border-slate-100 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Register Your UK Company</h3>
            <p className="text-slate-600 mb-6">Select a region to view formation details</p>

            {/* UK Map with Interactive Regions */}
            <div className="relative w-full max-w-md h-[400px] bg-[url('https://i.imgur.com/8X1q6kO.png')] bg-contain bg-no-repeat">
                {regions.map((region) => (
                    <div
                        key={region.id}
                        className={`absolute rounded-md transition-all duration-300 cursor-pointer
              ${selectedRegion === region.id ? 'scale-110 ring-4 ring-blue-500' : 'opacity-90 hover:opacity-100'}`}
                        style={{
                            left: `${region.x}%`,
                            top: `${region.y}%`,
                            width: `${region.width}%`,
                            height: `${region.height}%`,
                            backgroundColor: selectedRegion === region.id ? 'rgba(59, 130, 246, 0.3)' : 'rgba(0, 0, 0, 0.1)'
                        }}
                        onClick={() => setSelectedRegion(region.name)}
                    >
                        <div className={`w-full h-full flex items-center justify-center text-white font-bold
              ${selectedRegion === region.id ? 'text-lg' : 'text-sm'}`}>
                            {selectedRegion === region.id ? region.name : ''}
                        </div>
                    </div>
                ))}
            </div>

            {/* Info Panel */}
            <div className="w-full max-w-md mt-8 p-6 bg-white border border-slate-200 rounded-xl shadow-md">
                {selectedRegion ? (
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 font-medium">Formation Fee</span>
                                <span className="text-blue-700 font-bold text-2xl">£100</span>
                            </div>
                            <p className="text-slate-600">
                                Official registration for <strong>{selectedRegion}</strong> via Companies House.
                                Includes HMRC registration and Articles of Association.
                            </p>
                        </div>

                        <a href={FORM_URL} target="_blank" rel="noreferrer">
                            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-bold">
                                Register in {selectedRegion}
                            </Button>
                        </a>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-slate-400 text-lg">Select a region on the map to view formation details</p>
                    </div>
                )}
            </div>
        </div>
    );
};