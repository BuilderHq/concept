/* ============================================================
   ScrollStoryContext — Continuous scroll story driver
   Tracks scroll progress and emits section colour state
   so the page background morphs as one connected narrative
   ============================================================ */
import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";

export type StoryColour = "cream" | "teal" | "crimson" | "cream-dark";

interface ScrollStoryState {
  scrollY: number;
  scrollProgress: number; // 0–1 across full page
  activeSection: string;
  storyColour: StoryColour;
}

const ScrollStoryContext = createContext<ScrollStoryState>({
  scrollY: 0,
  scrollProgress: 0,
  activeSection: "home",
  storyColour: "cream",
});

export function useScrollStory() {
  return useContext(ScrollStoryContext);
}

export function ScrollStoryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ScrollStoryState>({
    scrollY: 0,
    scrollProgress: 0,
    activeSection: "home",
    storyColour: "cream",
  });

  useEffect(() => {
    let raf: number;
    let ticking = false;

    const getActiveSection = (y: number): { section: string; colour: StoryColour } => {
      const sections = [
        { id: "home",        colour: "teal"   as StoryColour },
        { id: "about",       colour: "cream"  as StoryColour },
        { id: "stats",       colour: "cream"  as StoryColour },
        { id: "flavours",    colour: "cream"  as StoryColour },
        { id: "ingredients", colour: "cream-dark" as StoryColour },
        { id: "story",       colour: "cream"  as StoryColour },
        { id: "gallery",     colour: "cream"  as StoryColour },
        { id: "partnership", colour: "cream"  as StoryColour },
        { id: "contact",     colour: "crimson" as StoryColour },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            return { section: sections[i].id, colour: sections[i].colour };
          }
        }
      }
      return { section: "home", colour: "teal" };
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(() => {
          const y = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const progress = maxScroll > 0 ? y / maxScroll : 0;
          const { section, colour } = getActiveSection(y);

          setState({ scrollY: y, scrollProgress: progress, activeSection: section, storyColour: colour });
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ScrollStoryContext.Provider value={state}>
      {children}
    </ScrollStoryContext.Provider>
  );
}
