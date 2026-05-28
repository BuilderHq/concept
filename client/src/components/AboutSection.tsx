/* ============================================================
   AboutSection — Warm Organic Editorial
   Clean editorial split. Image parallax at 0.6x scroll speed.
   One unified reveal — no stacked independent effects.
   Background transparent — colour morph canvas shows through.
   ============================================================ */
import { useEffect, useRef } from "react";
import { useParallaxDepth } from "@/hooks/useParallaxDepth";
import { useMagneticButton } from "@/hooks/useMagneticButton";

const ABOUT_IMAGE = "/images/about-ingredients.jpg";

function useReveal(threshold = 0.18) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

export default function AboutSection() {
  const sectionRef = useReveal(0.08);
  const imgParallaxRef = useParallaxDepth<HTMLDivElement>(0.6);
  const ctaRef = useMagneticButton<HTMLAnchorElement>(0.55, 110);

  return (
    <section
      id="about"
      style={{
        background: "transparent",
        padding: "9rem 0 7rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <div
          ref={sectionRef}
          className="reveal about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "clamp(2rem, 5vw, 5rem)",
            alignItems: "start",
          }}
        >
          {/* Left — image with parallax depth */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            <div
              ref={imgParallaxRef}
              style={{ willChange: "transform" }}
            >
              <img
                src={ABOUT_IMAGE}
                alt="Artisan ice cream popsicles with fresh ingredients"
                style={{
                  width: "100%",
                  aspectRatio: "3/4",
                  objectFit: "cover",
                  display: "block",
                  transform: "scale(1.12)",
                  transformOrigin: "center center",
                }}
              />
            </div>

            {/* Crimson badge — bottom right of image */}
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                right: "-1rem",
                background: "var(--crimson)",
                color: "var(--cream)",
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "0.5rem 1rem",
                zIndex: 2,
              }}
            >
              Since 2015
            </div>
          </div>

          {/* Right — editorial text column */}
          <div style={{ paddingTop: "1rem" }}>
            <p className="section-label" style={{ marginBottom: "1.25rem" }}>
              About the brand
            </p>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 7vw, 6.5rem)",
                color: "var(--crimson)",
                lineHeight: 0.9,
                marginBottom: "2.5rem",
              }}
            >
              THIS IS THE
              <br />
              BRAND.
              <br />
              HE'LL WIN
              <br />
              OVER EVEN
              <br />
              THE SCEPTICS.
            </h2>

            <h3
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--crimson)",
                marginBottom: "1rem",
                lineHeight: 1.5,
              }}
            >
              Those who've tried it already know. Those who haven't — get ready.
            </h3>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                color: "var(--crimson)",
                opacity: 0.72,
                lineHeight: 1.8,
                marginBottom: "1.25rem",
              }}
            >
              Our goal is not just a frozen treat. That would be too simple. We
              want you to feel something when you take that first bite. It is
              difficult to do, but we do it.
            </p>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                color: "var(--crimson)",
                opacity: 0.72,
                lineHeight: 1.8,
                marginBottom: "3rem",
              }}
            >
              We source pistachios from a small farm in Sicily, Alphonso mangoes
              from India, and chocolate directly from Belgium. Every ingredient
              is chosen because it is the best — not because it is the easiest.
            </p>

            <a
              ref={ctaRef}
              href="#story"
              className="btn-outline-crimson"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector("#story");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ textDecoration: "none", display: "inline-flex", willChange: "transform" }}
            >
              Our Story
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
