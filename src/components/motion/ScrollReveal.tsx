import { useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Global scroll-reveal driver. Mounted once in _app — it watches for any element
 * with the `.ec-reveal` class across every page and reveals it on scroll-in
 * (or if already scrolled past). Re-scans after client-side route changes.
 *
 * Add motion to any element by giving it: `ec-reveal ec-reveal-up` (or -fade / -scale).
 */
export default function ScrollReveal() {
  const router = useRouter();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const scan = () => {
      const els = Array.from(
        document.querySelectorAll<HTMLElement>(".ec-reveal:not(.ec-reveal-in)"),
      );
      if (!els.length) return;
      if (typeof IntersectionObserver === "undefined") {
        els.forEach((el) => el.classList.add("ec-reveal-in"));
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
              entry.target.classList.add("ec-reveal-in");
              observer?.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
      els.forEach((el) => observer?.observe(el));
    };

    scan();

    const onRouteChange = () => {
      observer?.disconnect();
      observer = null;
      // Let the new page paint before scanning its elements.
      window.setTimeout(scan, 60);
    };
    router.events.on("routeChangeComplete", onRouteChange);

    return () => {
      observer?.disconnect();
      router.events.off("routeChangeComplete", onRouteChange);
    };
  }, [router.events]);

  return null;
}
