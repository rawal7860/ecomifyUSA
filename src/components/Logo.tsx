import Link from "next/link";
import { Building2 } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
        <Building2 className="w-6 h-6 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-slate-900 leading-none">ecomifyUSA</span>
        <span className="text-[10px] text-slate-500 leading-none">Business Formation</span>
      </div>
    </Link>
  );
}