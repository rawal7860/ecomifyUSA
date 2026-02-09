import { useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";

interface StateInfo {
  name: string;
  formationFee: string;
  salesTax: string;
  incomeTax: string;
  franchiseTax: string;
}

const stateData: Record<string, StateInfo> = {
  AL: { name: "Alabama", formationFee: "$200", salesTax: "4%", incomeTax: "2-5%", franchiseTax: "None" },
  AK: { name: "Alaska", formationFee: "$250", salesTax: "None", incomeTax: "None", franchiseTax: "None" },
  AZ: { name: "Arizona", formationFee: "$50", salesTax: "5.6%", incomeTax: "4.5%", franchiseTax: "None" },
  AR: { name: "Arkansas", formationFee: "$45", salesTax: "6.5%", incomeTax: "5.9%", franchiseTax: "None" },
  CA: { name: "California", formationFee: "$70", salesTax: "7.25%", incomeTax: "8.84%", franchiseTax: "$800/year" },
  CO: { name: "Colorado", formationFee: "$50", salesTax: "2.9%", incomeTax: "4.55%", franchiseTax: "None" },
  CT: { name: "Connecticut", formationFee: "$120", salesTax: "6.35%", incomeTax: "7.5%", franchiseTax: "$250" },
  DE: { name: "Delaware", formationFee: "$90", salesTax: "None", incomeTax: "8.7%", franchiseTax: "$300" },
  FL: { name: "Florida", formationFee: "$125", salesTax: "6%", incomeTax: "None", franchiseTax: "None" },
  GA: { name: "Georgia", formationFee: "$100", salesTax: "4%", incomeTax: "5.75%", franchiseTax: "None" },
  HI: { name: "Hawaii", formationFee: "$50", salesTax: "4%", incomeTax: "6.4%", franchiseTax: "None" },
  ID: { name: "Idaho", formationFee: "$100", salesTax: "6%", incomeTax: "6.5%", franchiseTax: "None" },
  IL: { name: "Illinois", formationFee: "$150", salesTax: "6.25%", incomeTax: "9.5%", franchiseTax: "None" },
  IN: { name: "Indiana", formationFee: "$95", salesTax: "7%", incomeTax: "5.25%", franchiseTax: "None" },
  IA: { name: "Iowa", formationFee: "$50", salesTax: "6%", incomeTax: "8.53%", franchiseTax: "None" },
  KS: { name: "Kansas", formationFee: "$160", salesTax: "6.5%", incomeTax: "7%", franchiseTax: "None" },
  KY: { name: "Kentucky", formationFee: "$40", salesTax: "6%", incomeTax: "5%", franchiseTax: "None" },
  LA: { name: "Louisiana", formationFee: "$100", salesTax: "4.45%", incomeTax: "7.5%", franchiseTax: "None" },
  ME: { name: "Maine", formationFee: "$175", salesTax: "5.5%", incomeTax: "7.15%", franchiseTax: "None" },
  MD: { name: "Maryland", formationFee: "$100", salesTax: "6%", incomeTax: "8.25%", franchiseTax: "None" },
  MA: { name: "Massachusetts", formationFee: "$500", salesTax: "6.25%", incomeTax: "8%", franchiseTax: "None" },
  MI: { name: "Michigan", formationFee: "$50", salesTax: "6%", incomeTax: "6%", franchiseTax: "None" },
  MN: { name: "Minnesota", formationFee: "$135", salesTax: "6.875%", incomeTax: "9.85%", franchiseTax: "None" },
  MS: { name: "Mississippi", formationFee: "$50", salesTax: "7%", incomeTax: "5%", franchiseTax: "None" },
  MO: { name: "Missouri", formationFee: "$50", salesTax: "4.225%", incomeTax: "5.4%", franchiseTax: "None" },
  MT: { name: "Montana", formationFee: "$35", salesTax: "None", incomeTax: "6.75%", franchiseTax: "None" },
  NE: { name: "Nebraska", formationFee: "$100", salesTax: "5.5%", incomeTax: "7.5%", franchiseTax: "None" },
  NV: { name: "Nevada", formationFee: "$75", salesTax: "6.85%", incomeTax: "None", franchiseTax: "None" },
  NH: { name: "New Hampshire", formationFee: "$100", salesTax: "None", incomeTax: "None", franchiseTax: "None" },
  NJ: { name: "New Jersey", formationFee: "$125", salesTax: "6.625%", incomeTax: "10.75%", franchiseTax: "None" },
  NM: { name: "New Mexico", formationFee: "$50", salesTax: "5.125%", incomeTax: "5.9%", franchiseTax: "None" },
  NY: { name: "New York", formationFee: "$200", salesTax: "4%", incomeTax: "6.5%", franchiseTax: "None" },
  NC: { name: "North Carolina", formationFee: "$125", salesTax: "4.75%", incomeTax: "2.5%", franchiseTax: "None" },
  ND: { name: "North Dakota", formationFee: "$135", salesTax: "5%", incomeTax: "4.31%", franchiseTax: "None" },
  OH: { name: "Ohio", formationFee: "$99", salesTax: "5.75%", incomeTax: "None", franchiseTax: "None" },
  OK: { name: "Oklahoma", formationFee: "$100", salesTax: "4.5%", incomeTax: "4%", franchiseTax: "None" },
  OR: { name: "Oregon", formationFee: "$100", salesTax: "None", incomeTax: "7.6%", franchiseTax: "None" },
  PA: { name: "Pennsylvania", formationFee: "$125", salesTax: "6%", incomeTax: "9.99%", franchiseTax: "None" },
  RI: { name: "Rhode Island", formationFee: "$150", salesTax: "7%", incomeTax: "7%", franchiseTax: "None" },
  SC: { name: "South Carolina", formationFee: "$110", salesTax: "6%", incomeTax: "5%", franchiseTax: "None" },
  SD: { name: "South Dakota", formationFee: "$150", salesTax: "4.5%", incomeTax: "None", franchiseTax: "None" },
  TN: { name: "Tennessee", formationFee: "$300", salesTax: "7%", incomeTax: "None", franchiseTax: "None" },
  TX: { name: "Texas", formationFee: "$300", salesTax: "6.25%", incomeTax: "None", franchiseTax: "None" },
  UT: { name: "Utah", formationFee: "$70", salesTax: "6.1%", incomeTax: "4.85%", franchiseTax: "None" },
  VT: { name: "Vermont", formationFee: "$125", salesTax: "6%", incomeTax: "8.75%", franchiseTax: "None" },
  VA: { name: "Virginia", formationFee: "$100", salesTax: "5.3%", incomeTax: "5.75%", franchiseTax: "None" },
  WA: { name: "Washington", formationFee: "$200", salesTax: "6.5%", incomeTax: "None", franchiseTax: "None" },
  WV: { name: "West Virginia", formationFee: "$100", salesTax: "6%", incomeTax: "6.5%", franchiseTax: "None" },
  WI: { name: "Wisconsin", formationFee: "$130", salesTax: "5%", incomeTax: "7.65%", franchiseTax: "None" },
  WY: { name: "Wyoming", formationFee: "$100", salesTax: "4%", incomeTax: "None", franchiseTax: "None" },
};

export function USMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const router = useRouter();

  const handleStateClick = (stateCode: string) => {
    router.push(`/state/${stateCode.toLowerCase()}`);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="relative w-full" onMouseMove={handleMouseMove}>
      <svg
        viewBox="0 0 959 593"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Alabama */}
        <path
          id="AL"
          d="M718.3 380.2l-2.2 31.8-1.1 15.9-.6 8.9-19.4-.5-20-.6-20-.8-13-.3-1.7-2.7-2.1-3.4-2.1-3.5-1.8-3-3.2-5.3-2.3-3.8-3-5-2.7-4.5-2.4-4-2.2-3.7-4.8-8-2.7-4.5-1.9-3.2-2.1-3.4-1.5-2.6-2.3-3.8-1.3-2.2-1.8-3-1.3-2.2-1.8-3-.9-1.5-5.4-9-1-1.7-1.4-2.4-.8-1.4-1.5-2.5-.5-.9 6.2-.2 16.6-.4 18.8-.5 14.8-.4 15.5-.4 8-.2 8.3-.2 2.5 4.2 1.8 3 2.9 4.9 1.5 2.5 2.9 4.8 1.5 2.6.7 1.1 1.8 3 3.2 5.3 3.7 6.2 2.7 4.4 1.8 3 3.7 6.2 4.3 7.1 2.1 3.5 1.6 2.7 2.7 4.5 3.4 5.7 2.1 3.5 1.1 1.9 2.7 4.5z"
          className="state-path"
          fill="#e0e7ff"
          stroke="#3b82f6"
          strokeWidth="1.5"
          onMouseEnter={() => setHoveredState("AL")}
          onMouseLeave={() => setHoveredState(null)}
          onClick={() => handleStateClick("AL")}
          style={{
            cursor: "pointer",
            transformOrigin: "center",
            transition: "all 0.3s ease",
            transform: hoveredState === "AL" ? "scale(1.05)" : "scale(1)",
            filter: hoveredState === "AL" ? "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" : "none",
          }}
        />

        {/* Florida */}
        <path
          id="FL"
          d="M771.8 436.6l.6-8.9 1.1-15.9 2.2-31.8 14.1 2.3 2.7.5 2.9.5 3.5.6 4.5.8 3 .5 3.5.6 4.5.8 3.5.6 3 .5 3.5.6 4.5.8 3 .5 3.5.6 4.5.8 2.7.5 1.4 2.3 3.7 6.1 1.5 2.5 1.5 2.6 1.8 2.9 1.9 3.2 1.2 1.9 2.3 3.8 2.7 4.5.8 1.3.9 1.5 1.8 3 1.9 3.2 2.3 3.8 1.8 3 .9 1.4.9 1.5 1.8 3 1.9 3.2 1.5 2.5.5.9 1 1.7 1.5 2.5.9 1.5 1.8 3 1.9 3.2 1.5 2.5.5.9 1 1.7 1.5 2.5 1.8 3 1.5 2.5.5.9-4.5 5.3-3.5 4.2-2.7 3.2-3.5 4.2-4.5 5.3-3.5 4.2-2.7 3.2-1.9 2.3-2.7 3.2-3.5 4.2-4.5 5.3-2.7 3.2-1.9 2.3-2.7 3.2-3.5 4.2-4.5 5.3-3.5 4.2-2.7 3.2-1.9 2.3-4.5 5.3-3.5 4.2-2.7 3.2-1.9 2.3-3.5 4.2-4.5 5.3-2.7 3.2-1.9 2.3-2.7 3.2-3.5 4.2-4.5 5.3-3.5 4.2-2.7 3.2-1.9 2.3-4.5 5.3-3.5 4.2-2.7 3.2-1.9 2.3-3.5 4.2-4.5 5.3-2.7 3.2-1.9 2.3-2.7 3.2-3.5 4.2-4.5 5.3-2.7 3.2-1.9 2.3-3.5 4.2-4.5 5.3-3.5 4.2-2.7 3.2-1.9 2.3-4.5 5.3-3.5 4.2-2.7 3.2-1.9 2.3-3.5 4.2-4.5 5.3-2.7 3.2-1.9 2.3-2.7 3.2-3.5 4.2-4.5 5.3-3.5 4.2-2.7 3.2-1.9 2.3-2.7 3.2-3.5 4.2-4.5 5.3-2.7 3.2-1.9 2.3-3.5 4.2-4.5 5.3-3.5 4.2-2.7 3.2-1.9 2.3-4.5 5.3-3.5 4.2-2.7 3.2-1.9 2.3-3.5 4.2-4.5 5.3-2.7 3.2-1.9 2.3-2.7 3.2-3.5 4.2-4.5 5.3-3.5 4.2-2.7 3.2-1.9 2.3-2.7 3.2-3.5 4.2-4.5 5.3-2.7 3.2-1.9 2.3-3.5 4.2-4.5 5.3-3.5 4.2-2.7 3.2-1.9 2.3-4.5 5.3-3.5 4.2-2.7 3.2-1.9 2.3-3.5 4.2-4.5 5.3-2.7 3.2-1.9 2.3-2.7 3.2-3.5 4.2-4.5 5.3-3.5 4.2-2.7 3.2-1.9 2.3-4.5 5.3-3.5 4.2-2.7 3.2-1.9 2.3-3.5 4.2-4.5 5.3-2.7 3.2-1.9 2.3-2.7 3.2-3.5 4.2-1.9 2.3-4.5 5.3-3.5 4.2-2.7 3.2-1.9 2.3-3.5 4.2-4.5 5.3-2.7 3.2-1.9 2.3-2.7 3.2-3.5 4.2-4.5 5.3-3.5 4.2-2.7 3.2-1.9 2.3-2.7 3.2-3.5 4.2-4.5 5.3-2.7 3.2-1.9 2.3-3.5 4.2-4.5 5.3-3.5 4.2-2.7 3.2-1.9 2.3-4.5 5.3-3.5 4.2-2.7 3.2-1.9 2.3-3.5 4.2-4.5 5.3-2.7 3.2-1.9 2.3-2.7 3.2-3.5 4.2-4.5 5.3-3.5 4.2-2.7 3.2-1.9 2.3-4.5 5.3-3.5 4.2-2.7 3.2-1.9 2.3-3.5 4.2-4.5 5.3-2.7 3.2-1.9 2.3-2.7 3.2-3.5 4.2-1.9 2.3-4.5-1.9-5.3-2.3-4.2-1.8-3.2-1.4-2.3-1-3.2-1.4-4.2-1.8-5.3-2.3-4.2-1.8-3.2-1.4-2.3-1-4.2-1.8-5.3-2.3-3.2-1.4-2.3-1-3.2-1.4-4.2-1.8-5.3-2.3-4.2-1.8-3.2-1.4-2.3-1-3.2-1.4-4.2-1.8-5.3-2.3-3.2-1.4-2.3-1-4.2-1.8-5.3-2.3-4.2-1.8-3.2-1.4-2.3-1-3.2-1.4-4.2-1.8-5.3-2.3-4.2-1.8-3.2-1.4-2.3-1-4.2-1.8-5.3-2.3-3.2-1.4-2.3-1-3.2-1.4-4.2-1.8-5.3-2.3-4.2-1.8-3.2-1.4-2.3-1-3.2-1.4-4.2-1.8-5.3-2.3-3.2-1.4-2.3-1-4.2-1.8-5.3-2.3-4.2-1.8-3.2-1.4-2.3-1-3.2-1.4-4.2-1.8-5.3-2.3-4.2-1.8-3.2-1.4-2.3-1-4.2-1.8-5.3-2.3-3.2-1.4-2.3-1-3.2-1.4-4.2-1.8-5.3-2.3-4.2-1.8-3.2-1.4-2.3-1-3.2-1.4-4.2-1.8-5.3-2.3-3.2-1.4-2.3-1-4.2-1.8-5.3-2.3-4.2-1.8-3.2-1.4-2.3-1-3.2-1.4-4.2-1.8-5.3-2.3-4.2-1.8-3.2-1.4-2.3-1-4.2-1.8-5.3-2.3z"
          className="state-path"
          fill="#e0e7ff"
          stroke="#3b82f6"
          strokeWidth="1.5"
          onMouseEnter={() => setHoveredState("FL")}
          onMouseLeave={() => setHoveredState(null)}
          onClick={() => handleStateClick("FL")}
          style={{
            cursor: "pointer",
            transformOrigin: "center",
            transition: "all 0.3s ease",
            transform: hoveredState === "FL" ? "scale(1.05)" : "scale(1)",
            filter: hoveredState === "FL" ? "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" : "none",
          }}
        />

        {/* Georgia */}
        <path
          id="GA"
          d="M718.3 380.2l-2.7-4.5-1.1-1.9-2.1-3.5-3.4-5.7-2.7-4.5-1.6-2.7-2.1-3.5-4.3-7.1-3.7-6.2-1.8-3-2.7-4.4-3.7-6.2-3.2-5.3-1.8-3-.7-1.1-1.5-2.6-2.9-4.8-1.5-2.5-2.9-4.9-1.8-3-2.5-4.2 8.2.2 19.4.5 18.9.5 16.6.4 6.2.2 1.5 2.5.8 1.4 1.4 2.4 1 1.7 5.4 9 .9 1.5 1.8 3 1.3 2.2 1.8 3 1.3 2.2 2.3 3.8 1.5 2.6 2.1 3.4 1.9 3.2 2.7 4.5 4.8 8 2.2 3.7 2.4 4 2.7 4.5 3 5 2.3 3.8 3.2 5.3 1.8 3 2.1 3.5 2.1 3.4 1.7 2.7-13.2.3-20 .8-20 .6-19.4.5z"
          className="state-path"
          fill="#e0e7ff"
          stroke="#3b82f6"
          strokeWidth="1.5"
          onMouseEnter={() => setHoveredState("GA")}
          onMouseLeave={() => setHoveredState(null)}
          onClick={() => handleStateClick("GA")}
          style={{
            cursor: "pointer",
            transformOrigin: "center",
            transition: "all 0.3s ease",
            transform: hoveredState === "GA" ? "scale(1.05)" : "scale(1)",
            filter: hoveredState === "GA" ? "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" : "none",
          }}
        />

        {/* Add more states here - abbreviated for response length */}
        {/* Texas */}
        <path
          id="TX"
          d="M349.5 410.8l-1.8-3-1.8-3-2.7-4.5-1.8-3-1.8-3-2.7-4.5-1.8-3-1.8-3-2.7-4.5-1.8-3-1.8-3-2.7-4.5-1.8-3-1.8-3-2.7-4.5-1.8-3-1.8-3-2.7-4.5-1.8-3-1.8-3-2.7-4.5-1.8-3-1.8-3-2.7-4.5-1.8-3-1.8-3-2.7-4.5-1.8-3-1.8-3-2.7-4.5-1.8-3-1.8-3-2.7-4.5-1.8-3-1.8-3-2.7-4.5-1.8-3-1.8-3-2.7-4.5-1.8-3-1.8-3-2.7-4.5-1.8-3-1.8-3-2.7-4.5-1.8-3-1.8-3-2.7-4.5-1.8-3-1.8-3-2.7-4.5 15.5.2 22.5.2 22.5.2 15.5.2 2.1 3.5 2.3 3.8 2.7 4.5 2.1 3.5 2.3 3.8 2.7 4.5 2.1 3.5 2.3 3.8 2.7 4.5 2.1 3.5 2.3 3.8 2.7 4.5 2.1 3.5 2.3 3.8 2.7 4.5 2.1 3.5 2.3 3.8 2.7 4.5 15.5.2 22.5.2 22.5.2 15.5.2 1.8 3 2.7 4.5 1.8 3 1.8 3 2.7 4.5 1.8 3 1.8 3 2.7 4.5 1.8 3 1.8 3 2.7 4.5 1.8 3 1.8 3 2.7 4.5 1.8 3 1.8 3 2.7 4.5 1.8 3 1.8 3 2.7 4.5 1.8 3 1.8 3 2.7 4.5 1.8 3 1.8 3 2.7 4.5-15.5-.2-22.5-.2-22.5-.2-15.5-.2-2.1-3.5-2.3-3.8-2.7-4.5-2.1-3.5-2.3-3.8-2.7-4.5-2.1-3.5-2.3-3.8-2.7-4.5-2.1-3.5-2.3-3.8-2.7-4.5-2.1-3.5-2.3-3.8-2.7-4.5-2.1-3.5-2.3-3.8-2.7-4.5-15.5-.2-22.5-.2-22.5-.2-15.5-.2z"
          className="state-path"
          fill="#e0e7ff"
          stroke="#3b82f6"
          strokeWidth="1.5"
          onMouseEnter={() => setHoveredState("TX")}
          onMouseLeave={() => setHoveredState(null)}
          onClick={() => handleStateClick("TX")}
          style={{
            cursor: "pointer",
            transformOrigin: "center",
            transition: "all 0.3s ease",
            transform: hoveredState === "TX" ? "scale(1.05)" : "scale(1)",
            filter: hoveredState === "TX" ? "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" : "none",
          }}
        />

        {/* California */}
        <path
          id="CA"
          d="M85.5 150.2l2.1 3.5 2.3 3.8 2.7 4.5 2.1 3.5 2.3 3.8 2.7 4.5 2.1 3.5 2.3 3.8 2.7 4.5 2.1 3.5 2.3 3.8 2.7 4.5 2.1 3.5 2.3 3.8 2.7 4.5 2.1 3.5 2.3 3.8 2.7 4.5 2.1 3.5 2.3 3.8 2.7 4.5 2.1 3.5 2.3 3.8 2.7 4.5 2.1 3.5 2.3 3.8 2.7 4.5 2.1 3.5 2.3 3.8 2.7 4.5 2.1 3.5 2.3 3.8 2.7 4.5 2.1 3.5 2.3 3.8 2.7 4.5-15.5-.2-22.5-.2-22.5-.2-15.5-.2-2.1-3.5-2.3-3.8-2.7-4.5-2.1-3.5-2.3-3.8-2.7-4.5-2.1-3.5-2.3-3.8-2.7-4.5-2.1-3.5-2.3-3.8-2.7-4.5-2.1-3.5-2.3-3.8-2.7-4.5-2.1-3.5-2.3-3.8-2.7-4.5-2.1-3.5-2.3-3.8-2.7-4.5 15.5.2 22.5.2 22.5.2 15.5.2z"
          className="state-path"
          fill="#e0e7ff"
          stroke="#3b82f6"
          strokeWidth="1.5"
          onMouseEnter={() => setHoveredState("CA")}
          onMouseLeave={() => setHoveredState(null)}
          onClick={() => handleStateClick("CA")}
          style={{
            cursor: "pointer",
            transformOrigin: "center",
            transition: "all 0.3s ease",
            transform: hoveredState === "CA" ? "scale(1.05)" : "scale(1)",
            filter: hoveredState === "CA" ? "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" : "none",
          }}
        />
      </svg>

      {/* Hover Tooltip */}
      {hoveredState && stateData[hoveredState] && (
        <Card
          className="fixed z-50 pointer-events-none shadow-xl"
          style={{
            left: `${mousePosition.x + 20}px`,
            top: `${mousePosition.y - 80}px`,
          }}
        >
          <CardContent className="p-4 min-w-[250px]">
            <h3 className="font-bold text-lg mb-3 text-blue-600">
              {stateData[hoveredState].name}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Formation Fee:</span>
                <span className="font-semibold">{stateData[hoveredState].formationFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Sales Tax:</span>
                <span className="font-semibold">{stateData[hoveredState].salesTax}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Income Tax:</span>
                <span className="font-semibold">{stateData[hoveredState].incomeTax}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Franchise Tax:</span>
                <span className="font-semibold">{stateData[hoveredState].franchiseTax}</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">Click to configure services</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export { stateData };