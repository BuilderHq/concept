/* ============================================================
   MarqueeStrip — Flavour name ticker
   Transparent background — colour morph canvas bleeds through.
   Two rows in opposite directions, crimson text on the canvas.
   ============================================================ */

const ITEMS_TOP = [
  "MANGO PASSION FRUIT", "·", "PISTACHIO CRUNCH", "·",
  "DARK CHOCOLATE", "·", "LAVENDER HONEY", "·",
  "RASPBERRY MOCHI", "·", "TOFFEE CARAMEL", "·",
  "LEMON CHEESECAKE", "·", "PLOMBIÈRE VANILLA", "·",
];

const ITEMS_BOTTOM = [
  "HANDCRAFTED DAILY", "·", "NATURAL INGREDIENTS", "·",
  "SMALL BATCH", "·", "NO ARTIFICIAL FLAVOURS", "·",
  "SINGLE ORIGIN", "·", "COLD PRESSED", "·",
  "MADE WITH INTENTION", "·",
];

interface RowProps {
  items: string[];
  reverse?: boolean;
  speed?: string;
}

function MarqueeRow({ items, reverse = false, speed = "32s" }: RowProps) {
  const doubled = [...items, ...items];
  return (
    <div
      style={{
        overflow: "hidden",
        padding: "0.55rem 0",
        borderTop: "1px solid rgba(140,26,26,0.14)",
        borderBottom: "1px solid rgba(140,26,26,0.14)",
        background: "transparent",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `marquee-scroll ${speed} linear infinite ${reverse ? "reverse" : ""}`,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: item === "·" ? "var(--font-body)" : "var(--font-display)",
              fontSize: item === "·" ? "0.6rem" : "clamp(0.85rem, 1.5vw, 1.1rem)",
              letterSpacing: item === "·" ? "0" : "0.12em",
              color: "var(--crimson)",
              opacity: item === "·" ? 0.3 : 0.8,
              whiteSpace: "nowrap",
              padding: "0 1.2rem",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeStrip() {
  return (
    <div style={{ background: "transparent" }}>
      <MarqueeRow items={ITEMS_TOP} speed="36s" />
      <MarqueeRow items={ITEMS_BOTTOM} reverse speed="28s" />
    </div>
  );
}
