import { Shield, Check } from "lucide-react";

export default function Logo({ className = "h-6 w-6" }) {
    return (
        <div className="flex items-center gap-2">
            <div className="relative">
                <Shield className={`${className} text-blue-600`} />
                <Check className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="flex font-bold text-xl tracking-tight">
                <span className="text-blue-600">ecomify</span>
                <span className="text-slate-900">USA</span>
            </div>
        </div>
    );
}