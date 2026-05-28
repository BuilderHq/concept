/* ============================================================
   NumeralReveal — Star Moment 4
   Oversized 3D numerals rotate into view on Y-axis as
   the user scrolls to each story beat. Like a sign being
   turned to face you — one clean confident gesture.
   ============================================================ */
import { useEffect, useRef, useState } from "react";

interface NumeralRevealProps {
  numeral: string;
  size?: string;
}

export default function NumeralReveal({ numeral, size = "clamp(8rem, 22vw, 18rem)" }: NumeralRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        perspective: "800px",
        display: "inline-block",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: size,
          lineHeight: 1,
          color: "var(--crimson-bright, #C41E3A)",
          textShadow: `
            2px 2px 0 #7a1515,
            4px 4px 0 #6a1212,
            6px 6px 0 #5a0f0f,
            8px 8px 0 #4a0c0c,
            10px 10px 0 #3a0909,
            12px 12px 16px rgba(140,26,26,0.3)
          `,
          transform: revealed ? "rotateY(0deg)" : "rotateY(-90deg)",
          opacity: revealed ? 1 : 0,
          transition: revealed
            ? "transform 0.8s cubic-bezier(0.23,1,0.32,1), opacity 0.4s var(--ease-out)"
            : "none",
          transformOrigin: "left center",
          willChange: "transform, opacity",
          display: "block",
        }}
      >
        {numeral}
      </div>
    </div>
  );
}
