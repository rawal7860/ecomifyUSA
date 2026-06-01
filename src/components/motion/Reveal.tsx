import type { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms. */
  delayMs?: number;
  /** Animation flavor. */
  variant?: "up" | "fade" | "scale";
}

/**
 * Scroll-reveal wrapper: fades/slides content in when it enters the viewport.
 * Compositor-friendly (transform/opacity only) and reduced-motion safe — the
 * global prefers-reduced-motion rule in globals.css forces the content visible.
 */
export default function Reveal({ children, className = "", delayMs = 0, variant = "up" }: RevealProps) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "0px 0px -8% 0px" });
  return (
    <div
      ref={ref}
      className={`ec-reveal ec-reveal-${variant} ${inView ? "ec-reveal-in" : ""} ${className}`}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
