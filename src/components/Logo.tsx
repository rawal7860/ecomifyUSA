import { Building2 } from "lucide-react";

export default function Logo({ className = "h-6 w-6" }) {
    return (
        <div className="flex items-center gap-2">
            {/* Icon */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-1.5 rounded-lg">
                <Building2 className={`${className} text-white`} />
            </div>
            {/* Text */}
            <div className="flex font-bold text-xl tracking-tight">
                <span className="text-blue-600">ecomify</span>
                <span className="text-slate-900">USA</span>
            </div>
        </div>
    );
}