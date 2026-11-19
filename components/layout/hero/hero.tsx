"use client";

import { useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

import { HeroScene } from "./hero-scene";
import { HeroHeading } from "./hero-heading";
import { HeroDetails } from "./hero-details";
import { GlowDivider } from "./glow-divider";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const [scrollOffset, setScrollOffset] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rotation = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 0.4]);

  const globeY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const globeScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -65]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.8, 0.3]);

  useMotionValueEvent(rotation, "change", (value) => {
    if (!reducedMotion) setScrollOffset(value);
  });

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#0a162a] text-white"
    >
      <HeroScene
        reducedMotion={reducedMotion}
        scrollOffset={scrollOffset}
        globeY={globeY}
        globeScale={globeScale}
        glowOpacity={glowOpacity}
      />

      <HeroHeading
        reducedMotion={reducedMotion}
        titleY={titleY}
        titleOpacity={titleOpacity}
      />

      <HeroDetails reducedMotion={reducedMotion} />

      <div className="absolute inset-x-0 bottom-0 z-30">
        <GlowDivider />
      </div>
    </section>
  );
}
