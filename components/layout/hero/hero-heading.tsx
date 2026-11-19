"use client";

import { motion, type MotionValue } from "framer-motion";

type HeroHeadingProps = {
  reducedMotion: boolean;
  titleY: MotionValue<number>;
  titleOpacity: MotionValue<number>;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroHeading({
  reducedMotion,
  titleY,
  titleOpacity,
}: HeroHeadingProps) {
  return (
    <motion.div
      style={reducedMotion ? undefined : { y: titleY, opacity: titleOpacity }}
      className="pointer-events-none absolute bottom-[15%] left-0 right-0 z-20 flex flex-col items-center px-6 text-center md:bottom-[14%]"
    >
      {/* etikett */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease }}
        className="mb-5 flex items-center gap-4"
      >
        <span className="h-px w-7 bg-white/30" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#A7C8E7] sm:text-xs">
          The world, in perspective
        </span>
        <span className="h-px w-7 bg-white/30" />
      </motion.div>

      {/* rubrik */}
      <motion.h1
        initial={reducedMotion ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.65, ease }}
        className="font-heading text-[clamp(3.5rem,11vw,10rem)] font-bold leading-[0.95] tracking-[-0.065em] text-white drop-shadow-[0_12px_35px_rgba(0,0,0,0.4)]"
      >
        Worldscope<span className="text-[#8CB9E2]">.</span>
      </motion.h1>

      {/* ingress */}
      <motion.p
        initial={reducedMotion ? false : { opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.95, ease }}
        className="mt-7 max-w-xl font-sans text-base leading-relaxed text-white/65 sm:text-lg md:text-xl"
      >
        Every country has a story.
        <br className="hidden sm:block" />{" "}
        <span className="text-white/95">
          Discover the world through its data.
        </span>
      </motion.p>
    </motion.div>
  );
}
