// components/Logo.tsx
import { ShoppingCart, Shield } from "lucide-react";

export default function Logo({ className = "h-7 w-7" }) {
    return (
        <div className="flex items-center gap-2">
            {/* Icon */}
            <div className="relative">
                <Shield className={`${className} text-blue-600`} />
                <ShoppingCart className="w-4 h-4 text-blue-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            {/* Text */}
            <div className="flex font-bold text-xl tracking-tight">
                <span className="text-blue-600">ecomify</span>
                <span className="text-slate-900">USA</span>
            </div>
        </div>
    );
}