import { useState, useEffect } from "react";
import {
  HeartsBackground,
  Intro,
  Counter,
  SectionDivider,
  Music,
  LoveDeclaration,
  Moments,
  Timeline,
  NavDots,
} from "./components";

const SECTION_IDS = ["s0", "s1", "s2", "s3", "s4", "s5"];

export default function App() {
  const [revealed, setRevealed] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const total = revealed ? 6 : 1;

  useEffect(() => {
    const handleScroll = () => {
      let closest = 0;
      let minDist = Infinity;
      SECTION_IDS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        const dist = Math.abs(el.getBoundingClientRect().top);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveSection(closest);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [revealed]);

  const scrollTo = (i: number) => {
    document.getElementById(SECTION_IDS[i])?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleReveal = () => {
    setRevealed(true);
    setTimeout(() => scrollTo(1), 120);
  };

  return (
    <>
      <HeartsBackground />
      <NavDots current={activeSection} total={total} onClick={scrollTo} />
      <Intro onReveal={handleReveal} />
      {revealed && (
        <>
          <SectionDivider />
          <Counter />
          <SectionDivider />
          <Music />
          <SectionDivider />
          <LoveDeclaration />
          <SectionDivider />
          <Moments />
          <SectionDivider />
          <Timeline />
        </>
      )}
    </>
  );
}
