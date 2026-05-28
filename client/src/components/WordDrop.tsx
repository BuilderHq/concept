/* ============================================================
   WordDrop — Star Moment 5
   Partnership section headline words drop from above one
   at a time, each landing with a subtle bounce. Controlled
   and deliberate — not chaotic.
   ============================================================ */
import { useEffect, useRef, useState } from "react";

interface WordDropProps {
  lines: string[];
  colour?: string;
  fontSize?: string;
}

export default function WordDrop({
  lines,
  colour = "var(--crimson)",
  fontSize = "clamp(3.5rem, 10vw, 9rem)",
}: WordDropProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [droppedCount, setDroppedCount] = useState(0);
  const triggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          lines.forEach((_, i) => {
            setTimeout(() => {
              setDroppedCount(prev => prev + 1);
            }, i * 180);
          });
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [lines]);

  return (
    <div ref={ref} style={{ lineHeight: 0.9, overflow: "hidden" }}>
      {lines.map((line, i) => (
        <div
          key={i}
          style={{ overflow: "hidden", display: "block" }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize,
              color: colour,
              letterSpacing: "0.01em",
              display: "block",
              opacity: i < droppedCount ? 1 : 0,
              transform: i < droppedCount ? "translateY(0)" : "translateY(-100%)",
              transition:
                i < droppedCount
                  ? `opacity 0.01s, transform 0.55s cubic-bezier(0.34,1.56,0.64,1)`
                  : "none",
              willChange: "transform, opacity",
            }}
          >
            {line}
          </div>
        </div>
      ))}
    </div>
  );
}
