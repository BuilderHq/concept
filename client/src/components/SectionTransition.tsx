/* ============================================================
   SectionTransition — Scroll-driven background colour morph
   + Ink Bleed overlay for the crimson contact section entrance.

   The fixed bg layer lerps between section colours as you scroll.
   When approaching the contact section, a radial SVG ink-bleed
   overlay expands from the bottom-left corner, giving the crimson
   a dramatic organic entrance instead of a flat colour swap.
   ============================================================ */
import { useEffect, useRef, useState } from "react";

const SECTION_MAP: Array<{ id: string; colour: string; threshold?: number }> = [
  { id: "home",        colour: "#0F0000" },
  { id: "about",       colour: "#F7E8D8" },
  { id: "stats",       colour: "#EDD8C0" },
  { id: "flavours",    colour: "#F7E8D8" },
  { id: "ingredients", colour: "#EDD8C0" },
  { id: "story",       colour: "#F7E8D8" },
  { id: "gallery",     colour: "#EDD8C0" },
  { id: "partnership", colour: "#F7E8D8" },
  { id: "contact",     colour: "#8C1A1A", threshold: 0.85 },
];

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}
function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");
}
function lerpColour(from: string, to: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(from);
  const [r2, g2, b2] = hexToRgb(to);
  return rgbToHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
}
function colourDistance(a: string, b: string): number {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  return Math.sqrt((r2 - r1) ** 2 + (g2 - g1) ** 2 + (b2 - b1) ** 2);
}

export default function SectionTransition() {
  const bgRef = useRef<HTMLDivElement>(null);
  // inkProgress: 0 = invisible, 1 = fully covering screen
  const [inkProgress, setInkProgress] = useState(0);
  const inkRaf = useRef<number>(0);
  const inkTarget = useRef(0);
  const inkCurrent = useRef(0);

  useEffect(() => {
    // Smooth scroll for all internal anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  useEffect(() => {
    let raf: number;
    let current = "#0F0000";
    let target = "#0F0000";

    const getTarget = (): string => {
      for (let i = SECTION_MAP.length - 1; i >= 0; i--) {
        const section = SECTION_MAP[i];
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const t = section.threshold ?? 0.45;
          if (rect.top <= window.innerHeight * t) return section.colour;
        }
      }
      return SECTION_MAP[0].colour;
    };

    // Ink bleed: track how far into the contact section we are (0–1)
    const getInkTarget = (): number => {
      const el = document.getElementById("contact");
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Start bleeding when contact top is at 90% of viewport
      // Fully covered when contact top reaches 10% of viewport
      const start = vh * 0.9;
      const end = vh * 0.1;
      if (rect.top >= start) return 0;
      if (rect.top <= end) return 1;
      return (start - rect.top) / (start - end);
    };

    const tick = () => {
      target = getTarget();
      if (current !== target) {
        const dist = colourDistance(current, target);
        // Very slow for cream→crimson, normal for small shifts
        const speed = dist > 100 ? 0.008 : dist > 40 ? 0.025 : 0.042;
        current = lerpColour(current, target, speed);
        if (colourDistance(current, target) < 1) current = target;
        if (bgRef.current) bgRef.current.style.backgroundColor = current;
      }

      // Ink bleed lerp
      inkTarget.current = getInkTarget();
      const diff = inkTarget.current - inkCurrent.current;
      if (Math.abs(diff) > 0.001) {
        inkCurrent.current += diff * 0.06;
        setInkProgress(inkCurrent.current);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Ink bleed: a radial gradient that grows from bottom-left corner
  // r goes from 0 to ~141vmax (diagonal of the screen) as inkProgress → 1
  const maxR = 160; // vmax units — enough to cover any screen diagonal
  const r = inkProgress * maxR;
  // Opacity: fade in the ink layer as it grows, fade out the bg lerp
  // Once ink covers the screen, the bg underneath is irrelevant
  const inkOpacity = Math.min(1, inkProgress * 1.4);

  return (
    <>
      {/* Base background — lerps between section colours */}
      <div
        ref={bgRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -2,
          backgroundColor: "#0F0000",
          pointerEvents: "none",
        }}
      />

      {/* Ink bleed overlay — only active near contact section */}
      {inkProgress > 0.005 && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
            pointerEvents: "none",
            opacity: inkOpacity,
            // Radial gradient expanding from bottom-left corner
            background: `radial-gradient(circle ${r}vmax at 0% 100%, #8C1A1A 0%, #8C1A1A 55%, transparent 100%)`,
            transition: "opacity 0ms",
            willChange: "background",
          }}
        />
      )}
    </>
  );
}
