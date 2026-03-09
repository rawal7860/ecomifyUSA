import { ShoppingCart, Star } from "lucide-react";

export default function Logo({ className = "h-6 w-6" }) {
    return (
        <div className="flex items-center gap-2">
            <div className="relative">
                <ShoppingCart className={`${className} text-blue-600`} />
                <Star className="w-3 h-3 text-red-600 fill-red-600 absolute -top-1 -right-1" />
            </div>
            <div className="flex font-bold text-xl tracking-tight">
                <span className="text-blue-600">ecomify</span>
                <span className="text-slate-900">USA</span>
            </div>
        </div>
    );
}