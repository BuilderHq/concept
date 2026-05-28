/* ============================================================
   FlavourFlood — Star Moment 2
   Editorial crimson wash floods up from the bottom on
   Flavours entry. Slower and more considered than before.
   Thin cream leading edge line + centred wordmark reveal.
   ============================================================ */
import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "flooding" | "holding" | "receding" | "done";

export default function FlavourFlood() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const triggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          setPhase("flooding");
          setTimeout(() => setPhase("holding"),  1200);
          setTimeout(() => setPhase("receding"), 2400);
          setTimeout(() => setPhase("done"),     3600);
        }
      },
      { threshold: 0.3 }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  const isActive = phase !== "idle" && phase !== "done";

  // Panel height: flood up, hold full, then drain down
  const panelHeight =
    phase === "flooding" || phase === "holding" ? "100%" :
    phase === "receding" ? "0%" : "0%";

  const wordmarkVisible = phase === "holding" || phase === "receding";

  return (
    <>
      <div
        ref={sentinelRef}
        style={{ position: "absolute", top: "20%", left: 0, width: "1px", height: "1px", pointerEvents: "none" }}
      />

      {isActive && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            pointerEvents: "none",
            display: "flex",
            alignItems: "flex-end",
            overflow: "hidden",
          }}
        >
          {/* Flood panel — grows from bottom */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: panelHeight,
              background: "var(--crimson)",
              transition:
                phase === "flooding"
                  ? "height 1.15s cubic-bezier(0.77,0,0.175,1)"
                  : phase === "receding"
                  ? "height 1.1s cubic-bezier(0.77,0,0.175,1)"
                  : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              willChange: "height",
            }}
          >
            {/* Thin cream leading edge at top of panel */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: "rgba(247,232,216,0.45)",
              }}
            />

            {/* Centred wordmark */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3rem, 11vw, 9.5rem)",
                  color: "var(--cream)",
                  letterSpacing: "0.06em",
                  lineHeight: 1,
                  opacity: wordmarkVisible ? 1 : 0,
                  transform: wordmarkVisible ? "translateY(0)" : "translateY(18px)",
                  transition: "opacity 0.45s var(--ease-out), transform 0.45s var(--ease-out)",
                  userSelect: "none",
                }}
              >
                FLAVOURS
              </div>
              {/* Underline that draws in */}
              <div
                style={{
                  height: "1.5px",
                  background: "rgba(247,232,216,0.4)",
                  width: wordmarkVisible ? "clamp(3rem, 8vw, 6rem)" : "0",
                  transition: "width 0.55s var(--ease-out) 0.15s",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
