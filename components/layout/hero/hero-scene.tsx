"use client";

import { motion, type MotionValue } from "framer-motion";
import { Globe } from "../../ui/globe";
import StarsBackground from "../../ui/starsbackground";

type HeroSceneProps = {
  reducedMotion: boolean;
  scrollOffset: number;
  globeY: MotionValue<number>;
  globeScale: MotionValue<number>;
  glowOpacity: MotionValue<number>;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroScene({
  reducedMotion,
  scrollOffset,
  globeY,
  globeScale,
  glowOpacity,
}: HeroSceneProps) {
  return (
    <>
      {/* glöd */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: reducedMotion ? 0.4 : glowOpacity }}
        className="pointer-events-none absolute left-1/2 top-[34%] -z-10 h-[75vmin] w-[75vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(20,91,165,0.22)_0%,rgba(12,42,85,0.12)_45%,transparent_72%)] blur-[55px]"
      />

      {/* rutnät */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:90px_90px]"
      />

      <StarsBackground reducedMotion={reducedMotion} />

      {/* vinjettering */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_50%_42%,transparent_20%,rgba(3,6,11,0.22)_65%,rgba(3,6,11,0.7)_100%)]"
      />

      {/* jordglob */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease }}
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
      >
        <motion.div
          style={reducedMotion ? undefined : { y: globeY, scale: globeScale }}
          className="relative h-[115vmin] w-[115vmin] max-h-[900px] max-w-[900px] -translate-y-[7%] sm:h-[105vmin] sm:w-[105vmin] md:-translate-y-[4%]"
        >
          <Globe scrollOffset={scrollOffset} />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(115deg, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.10) 42%, transparent 68%)",
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
