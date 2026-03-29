// src/components/TrustBar.tsx

export default function TrustBar() {
    const reviews = [
        {
            initials: "AK", name: "Ahmed K.", flag: "🇵🇰",
            location: "Amazon FBA seller, Pakistan",
            text: "Got my Wyoming LLC + EIN in 3 days. Best service for non-US sellers. Highly recommend!",
            bg: "bg-blue-50", text_color: "text-blue-700"
        },
        {
            initials: "SM", name: "Sara M.", flag: "🇦🇪",
            location: "E-commerce founder, UAE",
            text: "Handled my sales tax compliance across 12 states. Zero stress, 100% accurate filing.",
            bg: "bg-green-50", text_color: "text-green-700"
        },
        {
            initials: "RJ", name: "Raj J.", flag: "🇮🇳",
            location: "Walmart seller, India",
            text: "Got tax exemption in 44 states with just my ITIN. Saved thousands. Game changer!",
            bg: "bg-yellow-50", text_color: "text-yellow-700"
        },
        {
            initials: "ML", name: "Ming L.", flag: "🇨🇳",
            location: "Amazon seller, China",
            text: "Delaware LLC formed remotely, no US travel needed. Professional and very responsive team.",
            bg: "bg-purple-50", text_color: "text-purple-700"
        },
    ];

    return (
        <section className="bg-gray-50 border-y border-gray-200 py-8 px-4">
            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-8 mb-6">
                {[
                    { num: "5.0", label: "Average rating", star: true },
                    { num: "500+", label: "Happy clients" },
                    { num: "50+", label: "Countries served" },
                    { num: "24h", label: "Avg. delivery" },
                ].map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                        {s.star && <span className="text-yellow-400 text-lg">★★★★★</span>}
                        <div>
                            <div className="text-xl font-semibold text-gray-900">{s.num}</div>
                            <div className="text-xs text-gray-500">{s.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Platform badges */}
            <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-3">Verified on</p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
                {[
                    { name: "Fiverr", rating: "Level 2 Seller", color: "bg-green-500" },
                    { name: "Trustpilot", rating: "Excellent", color: "bg-emerald-500" },
                    { name: "Google", rating: "5.0 rating", color: "bg-blue-500" },
                ].map((p, i) => (
                    <div key={i} className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white">
                        <div className={`w-5 h-5 ${p.color} rounded text-white text-xs flex items-center justify-center font-bold`}>
                            {p.name[0]}
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-gray-800">{p.name}</div>
                            <div className="text-xs text-yellow-500">★★★★★ <span className="text-gray-400">{p.rating}</span></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Review cards */}
            <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-3">What clients say</p>
            <div className="flex gap-4 overflow-x-auto pb-2 max-w-4xl mx-auto">
                {reviews.map((r, i) => (
                    <div key={i} className="min-w-[220px] bg-white border border-gray-100 rounded-xl p-4 flex-shrink-0">
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`w-8 h-8 rounded-full ${r.bg} ${r.text_color} flex items-center justify-center text-xs font-semibold`}>
                                {r.initials}
                            </div>
                            <div>
                                <div className="text-xs font-semibold text-gray-800">{r.name} {r.flag}</div>
                                <div className="text-xs text-gray-400">{r.location}</div>
                            </div>
                        </div>
                        <div className="text-yellow-400 text-xs mb-1">★★★★★</div>
                        <p className="text-xs text-gray-500 leading-relaxed">"{r.text}"</p>
                    </div>
                ))}
            </div>
        </section>
    );
}