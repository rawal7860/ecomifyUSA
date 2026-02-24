// components/Logo.tsx
import { Building2 } from "lucide-react";

export default function Logo({ className = "h-7 w-7" }) {
    return (
        <div className="flex items-center gap-2">
            {/* Icon with USA colors */}
            <div className="relative">
                <Building2 className={`${className} text-blue-600`} />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-white to-blue-600 rounded-full"></div>
            </div>
            {/* Text */}
            <div className="flex font-bold text-xl tracking-tight">
                <span className="text-blue-600">ecomify</span>
                <span className="text-slate-900">USA</span>
            </div>
        </div>
    );
}