/* ============================================================
   Home — Immersive Scroll Story
   One continuous canvas. SectionTransition fixed layer morphs
   bg colour as you scroll. All section backgrounds transparent.
   Star moments are woven into the scroll — not layered on top.
   ============================================================ */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HeadlineStamp from "@/components/HeadlineStamp";
import AboutSection from "@/components/AboutSection";
import StatsStrip from "@/components/StatsStrip";
import FlavoursSection from "@/components/FlavoursSection";
import FlavourFlood from "@/components/FlavourFlood";
import MarqueeStrip from "@/components/MarqueeStrip";
import IngredientStillLife from "@/components/IngredientStillLife";
import StorySection from "@/components/StorySection";
import MarqueeGallery from "@/components/MarqueeGallery";
import PartnershipSection from "@/components/PartnershipSection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";
import SectionTransition from "@/components/SectionTransition";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        cursor: "none",
        position: "relative",
      }}
    >
      {/* Fixed background colour morph layer — sits behind everything */}
      <SectionTransition />

      {/* Custom cursor — single instance, no other overlays */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* ── SECTION 1: Hero — cinematic pinned image ── */}
      <HeroSection />

      {/* ── STAR MOMENT 1: Headline stamp as you leave the hero ── */}
      <HeadlineStamp />

      {/* ── SECTION 2: About — editorial split with parallax ── */}
      <AboutSection />

      {/* ── Stats strip — transparent, morph layer shows through ── */}
      <StatsStrip />

      {/* ── SECTION 3: Flavours — horizontal drag shelf ──
          FlavourFlood fires the crimson wash star moment on entry.
          FlavoursSection carries id="flavours" for the morph layer. */}
      <div style={{ position: "relative" }}>
        <FlavourFlood />
        <FlavoursSection />
      </div>

      {/* ── Flavour name marquee ticker ── */}
      <MarqueeStrip />

      {/* ── STAR MOMENT 3: Ingredient still-life build (id="ingredients") ── */}
      <IngredientStillLife />

      {/* ── SECTION 4: Story — dashed SVG path + numeral Y-rotation ── */}
      <StorySection />

      {/* ── SECTION 5: Gallery mosaic + spinning badge ── */}
      <MarqueeGallery />

      {/* ── SECTION 6: Partnership — word drop headline ── */}
      <PartnershipSection />

      {/* ── SECTION 7: Contact — crimson footer ── */}
      <ContactSection />
    </div>
  );
}
