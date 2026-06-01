import { useEffect, useState } from "react";

interface ComplianceRingProps {
  /** 0–100 */
  score: number;
  label: string;
  sublabel: string;
}

// Calm semantic color by score band.
function bandColor(score: number): string {
  if (score >= 80) return "#1F6B4A"; // verify green — healthy
  if (score >= 50) return "#B98A2E"; // gold — in progress
  return "#D97706"; // amber — needs attention
}

/**
 * Animated compliance/progress ring — the dashboard showpiece.
 * The arc and the number animate up on mount; the global prefers-reduced-motion
 * backstop in globals.css neutralizes the motion for users who opt out.
 */
export default function ComplianceRing({ score, label, sublabel }: ComplianceRingProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Defer a frame so the CSS transition animates from 0 → score.
    const id = requestAnimationFrame(() => setProgress(clamped));
    return () => cancelAnimationFrame(id);
  }, [clamped]);

  const size = 132;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const color = bandColor(clamped);

  return (
    <div className="flex items-center gap-6">
      <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" role="img" aria-label={`${label}: ${clamped} percent`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#E4E0D6"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-3xl font-bold" style={{ color }}>{clamped}</span>
          <span className="text-[10px] uppercase tracking-widest text-slate-400">score</span>
        </div>
      </div>
      <div>
        <p className="text-lg font-bold text-slate-900">{label}</p>
        <p className="text-sm text-slate-500 max-w-xs">{sublabel}</p>
      </div>
    </div>
  );
}
