import Link from "next/link";
import { Building2 } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      <Building2 className="w-8 h-8 text-blue-600" />
      <div className="flex flex-col">
        <span className="text-xl font-bold text-slate-900 leading-tight">Salestaxus LLC</span>
        <span className="text-[10px] text-slate-500 leading-none">Business Formation</span>
      </div>
    </Link>
  );
}