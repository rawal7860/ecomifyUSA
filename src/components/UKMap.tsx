import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export const UKMap = () => {
    const [selectedRegion, setSelectedRegion] = useState < string | null > (null);
    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf2LOGK6eY5rxr-RVUwC1vvCPNTFr1HmnbbKCYSa1nfL9m4AA/viewform";

    const regions = [
        { name: "England", fee: "£100" },
        { name: "Scotland", fee: "£100" },
        { name: "Wales", fee: "£100" },
        { name: "N. Ireland", fee: "£100" }
    ];

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">

                {/* Professional Static Map Image */}
                <div className="relative flex justify-center">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/United_Kingdom_adm_location_map.svg/400px-United_Kingdom_adm_location_map.svg.png"
                        alt="UK Map"
                        className="w-full max-w-[300px] h-auto drop-shadow-2xl"
                    />
                </div>

                {/* Selection Interface */}
                <div className="space-y-6">
                    <h4 className="text-3xl font-black text-slate-900 tracking-tight">UK Formation</h4>
                    <p className="text-slate-500">Select your registration region:</p>

                    <div className="grid grid-cols-2 gap-3">
                        {regions.map((reg) => (
                            <button
                                key={reg.name}
                                onClick={() => setSelectedRegion(reg.name)}
                                className={`p-4 rounded-xl border-2 transition-all font-bold ${selectedRegion === reg.name
                                        ? "border-blue-600 bg-blue-50 text-blue-700"
                                        : "border-slate-100 hover:border-blue-300 text-slate-600"
                                    }`}
                            >
                                {reg.name}
                            </button>
                        ))}
                    </div>

                    {selectedRegion && (
                        <div className="p-6 bg-blue-600 rounded-2xl text-white animate-in slide-in-from-top-2">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-bold text-lg">{selectedRegion} LLC</span>
                                <span className="text-2xl font-black">£100</span>
                            </div>
                            <a href={FORM_URL} target="_blank" rel="noreferrer">
                                <Button className="w-full bg-white text-blue-600 hover:bg-slate-100 font-bold h-12">
                                    Register Now
                                </Button>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};