import { Globe, Star } from "lucide-react";

export default function Logo({ className = "h-6 w-6" }) {
    return (
        <div className="flex items-center gap-2">
            {/* Icon */}
            <div className="relative">
                <Globe className={`${className} text-blue-600`} />
                <div className="absolute top-0 right-0 flex gap-0.5">
                    <Star className="w-2.5 h-2.5 text-red-600 fill-red-600" />
                    <Star className="w-2.5 h-2.5 text-red-600 fill-red-600" />
                </div>
            </div>
            {/* Text */}
            <div className="flex font-bold text-xl tracking-tight">
                <span className="text-blue-600">ecomify</span>
                <span className="text-slate-900">USA</span>
            </div>
        </div>
    );
}