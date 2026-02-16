import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

export const UKMap = () => {
    const [selectedRegion, setSelectedRegion] = useState < string | null > (null);
    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf2LOGK6eY5rxr-RVUwC1vvCPNTFr1HmnbbKCYSa1nfL9m4AA/viewform";

    const regions = [
        { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", color: "bg-red-500" },
        { name: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", color: "bg-blue-600" },
        { name: "Wales", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", color: "bg-green-600" },
        { name: "N. Ireland", flag: "🇬🇧", color: "bg-orange-500" }
    ];

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md border border-slate-200">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900">UK Company Formation</h2>
                <p className="text-slate-600 mt-2">Select your registration region</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {regions.map((region) => (
                    <div
                        key={region.name}
                        className={`border-2 rounded-xl p-6 hover:border-blue-400 transition-all cursor-pointer text-center ${selectedRegion === region.name ? 'border-blue-600 ring-4 ring-blue-100' : 'border-slate-200'
                            }`}
                        onClick={() => setSelectedRegion(region.name)}
                    >
                        <div className="text-5xl mb-2">{region.flag}</div>
                        <div className="font-bold text-slate-800">{region.name}</div>
                    </div>
                ))}
            </div>

            <div className="bg-blue-50 rounded-xl p-6 text-center">
                <div className="text-2xl font-bold text-blue-700 mb-2">£100</div>
                <p className="text-slate-600 mb-4">Official Companies House registration with HMRC setup</p>
                <a
                    href={FORM_URL}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Button className="bg-blue-600 hover:bg-blue-700 w-full h-12 text-lg">
                        Start Your UK Company Registration
                    </Button>
                </a>
            </div>
        </div>
    );
};