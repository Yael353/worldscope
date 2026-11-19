"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroDetails({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      {/* övre etiketter */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease }}
        className="pointer-events-none absolute left-6 right-6 top-8 z-20 flex items-center justify-between md:left-12 md:right-12 md:top-12"
      >
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/50 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#84B8E6] shadow-[0_0_12px_rgba(132,184,230,0.7)]" />
          A world of data
        </div>

        <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-white/40 sm:block">
          Global perspective
        </span>
      </motion.div>

      {/* vänster */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1, ease }}
        className="pointer-events-none absolute left-12 top-[49%] z-10 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/35">
          01 / EXPLORE
        </span>
        <div className="h-px w-12 bg-white/20" />
        <span className="max-w-[120px] text-xs leading-relaxed text-white/45">
          Different places. Different realities.
        </span>
      </motion.div>

      {/* höger */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease }}
        className="pointer-events-none absolute right-12 top-[49%] z-10 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/35">
          GLOBAL ATLAS
        </span>
        <div className="h-px w-12 bg-white/20" />
        <span className="text-xs text-white/45">One connected world.</span>
      </motion.div>

      {/* scrollindikator */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="pointer-events-none absolute bottom-7 left-6 right-6 z-20 flex items-end justify-between md:bottom-10 md:left-12 md:right-12"
      >
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 sm:block">
          Explore · Compare · Understand
        </span>

        <div className="mx-auto flex flex-col items-center gap-3 sm:mx-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
            Scroll to explore
          </span>

          <div className="relative h-9 w-px overflow-hidden bg-white/20">
            <motion.div
              animate={reducedMotion ? undefined : { y: ["-100%", "200%"] }}
              transition={{
                duration: 2.2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="absolute top-0 h-5 w-full bg-[#A7C8E7]"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}
