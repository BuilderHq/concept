/* ============================================================
   HeadlineStamp — Star Moment 1
   Scroll-driven character-by-character reveal of the brand
   statement. Each letter draws in from below with staggered
   timing. Feels like ink being pressed onto the page.
   Background transparent — morph layer shows through.
   ============================================================ */
import { useEffect, useRef, useState } from "react";

const LINE1 = "CRAFTED";
const LINE2 = "WITH";
const LINE3 = "INTENTION.";

function SplitText({
  text,
  baseDelay,
  visible,
  size,
}: {
  text: string;
  baseDelay: number;
  visible: boolean;
  size: string;
}) {
  return (
    <div
      style={{
        fontFamily: "var(--font-display)",
        fontSize: size,
        color: "var(--cream)",
        lineHeight: 0.9,
        display: "flex",
        flexWrap: "nowrap",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(110%)",
            transition: visible
              ? `opacity 0.5s cubic-bezier(0.23,1,0.32,1) ${baseDelay + i * 28}ms,
                 transform 0.55s cubic-bezier(0.23,1,0.32,1) ${baseDelay + i * 28}ms`
              : "none",
            willChange: "transform, opacity",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}

export default function HeadlineStamp() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [bodyVisible, setBodyVisible] = useState(false);

  useEffect(() => {
    // Fire on page load — short delay lets the hero image paint first
    const t1 = setTimeout(() => setVisible(true), 200);
    const t2 = setTimeout(() => setBodyVisible(true), 950);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        padding: "7rem clamp(1.5rem, 4vw, 4rem) 6rem",
        background: "transparent",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Thin accent line — draws in from left */}
      <div
        style={{
          width: visible ? "4rem" : "0",
          height: "2px",
          background: "var(--cream)",
          marginBottom: "2.5rem",
          transition: "width 0.8s cubic-bezier(0.23,1,0.32,1) 0.1s",
          opacity: 0.4,
        }}
      />

      <div style={{ lineHeight: 0.9, marginBottom: "3rem" }}>
        <SplitText text={LINE1} baseDelay={80}  visible={visible} size="clamp(2.6rem, 10vw, 11rem)" />
        <SplitText text={LINE2} baseDelay={240} visible={visible} size="clamp(2.6rem, 10vw, 11rem)" />
        <SplitText text={LINE3} baseDelay={360} visible={visible} size="clamp(2.6rem, 10vw, 11rem)" />
      </div>

      {/* Body copy — fades in after headline completes */}
      <div
        className="headline-body-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          maxWidth: "680px",
          opacity: bodyVisible ? 1 : 0,
          transform: bodyVisible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.9s var(--ease-out), transform 0.9s var(--ease-out)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
            color: "var(--cream)",
            opacity: 0.7,
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          Every flavour is crafted from single-origin ingredients. The kind that make you close your eyes on the first bite.
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
            color: "var(--cream)",
            opacity: 0.7,
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          We believe ice cream should feel like a moment. That is the standard we hold ourselves to, every single day.
        </p>
      </div>
    </div>
  );
}
