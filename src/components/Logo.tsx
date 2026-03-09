import { Globe } from "lucide-react";

export default function Logo({ className = "h-6 w-6" }) {
    return (
        <div className="flex items-center gap-2">
            <Globe className={`${className} text-blue-600`} />
            <div className="flex font-bold text-xl tracking-tight">
                <span className="text-blue-600">ecomify</span>
                <span className="text-slate-900">USA</span>
            </div>
        </div>
    );
}