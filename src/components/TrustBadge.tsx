import { Star, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function TrustBadge() {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-white p-3 rounded-full shadow-md">
            <Award className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg text-slate-900">Shazik from Fiverr</h3>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-slate-700 font-semibold mb-1">115+ Five-Star Reviews</p>
            <p className="text-slate-600 text-sm">
              Trusted by entrepreneurs nationwide for professional LLC formation services
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}