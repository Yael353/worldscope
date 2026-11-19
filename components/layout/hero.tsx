"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

import { Globe } from "../globe";
import { GlowDivider } from "./glow-divider";

const ease = [0.22, 1, 0.36, 1] as const;
type Star = {
  id: string;
  left: string;
  top: string;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
};

function createStars(
  count: number,
  minSize: number,
  maxSize: number,
  minOpacity: number,
  maxOpacity: number,
  seedX: number,
  seedY: number,
): Star[] {
  return Array.from({ length: count }, (_, i) => {
    const sizeRatio = ((i * 17) % 100) / 100;
    const opacityRatio = ((i * 29) % 100) / 100;
    const durationRatio = ((i * 13) % 100) / 100;
    const delayRatio = ((i * 19) % 100) / 100;

    return {
      id: `${seedX}-${seedY}-${i}`,
      left: `${(i * seedX + 11) % 100}%`,
      top: `${(i * seedY + 7) % 100}%`,
      size: minSize + sizeRatio * (maxSize - minSize),
      opacity: minOpacity + opacityRatio * (maxOpacity - minOpacity),
      duration: 2.8 + durationRatio * 3.8,
      delay: delayRatio * 4,
    };
  });
}

const starLayers = [
  createStars(55, 1, 2.2, 0.18, 0.55, 37, 61),
  createStars(35, 1.4, 3.2, 0.25, 0.75, 53, 41),
  createStars(18, 2, 4.2, 0.35, 0.95, 71, 47),
];

function StarsBackground({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[-1]"
    >
      {starLayers.map((layer, layerIndex) => (
        <div key={layerIndex} className="absolute inset-0">
          {layer.map((star) => (
            <motion.span
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
                boxShadow:
                  layerIndex === 2
                    ? "0 0 10px rgba(255,255,255,0.35)"
                    : "0 0 6px rgba(255,255,255,0.2)",
              }}
              animate={
                reducedMotion
                  ? undefined
                  : {
                      opacity: [
                        star.opacity * 0.65,
                        star.opacity,
                        star.opacity * 0.75,
                      ],
                      scale: [1, 1.15, 1],
                    }
              }
              transition={{
                duration: star.duration,
                delay: star.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [scrollOffsetValue, setScrollOffsetValue] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [0, Math.PI * 0.4],
  );

  // parallax
  const globeY = useTransform(scrollYProgress, [0, 1], [0, -90]);

  const globeScale = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -65]);

  const titleOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.8, 0.3]);

  useMotionValueEvent(scrollOffset, "change", (value) => {
    if (!shouldReduceMotion) {
      setScrollOffsetValue(value);
    }
  });

  return (
    <section
      ref={containerRef}
      className="
    relative isolate
    flex min-h-screen min-h-[100svh]
    w-full items-center
    justify-center overflow-hidden
    bg-[#0a162a] text-white
  "
    >
      {/* Bg*/}

      {/* glöd bakom globen */}
      <motion.div
        aria-hidden="true"
        style={{
          opacity: shouldReduceMotion ? 0.4 : glowOpacity,
        }}
        className="
      pointer-events-none
      absolute left-1/2 top-[34%]
      -z-10
      h-[75vmin] w-[75vmin]
      -translate-x-1/2
      rounded-full
      bg-[radial-gradient(circle,rgba(20,91,165,0.22)_0%,rgba(12,42,85,0.12)_45%,transparent_72%)]
      blur-[55px]
    "
      />

      <div
        aria-hidden="true"
        className="
      pointer-events-none absolute
      inset-0 -z-10
      opacity-[0.055]
      [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)]
      [background-size:90px_90px]
    "
      />

      {/* Stjärnor */}
      <StarsBackground reducedMotion={shouldReduceMotion ?? false} />
      <div
        aria-hidden="true"
        className="
      pointer-events-none
      absolute inset-0 z-[2]
      bg-[radial-gradient(ellipse_at_50%_42%,transparent_20%,rgba(3,6,11,0.22)_65%,rgba(3,6,11,0.7)_100%)]
    "
      />

      {/* Globe */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.93 }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.6,
          ease,
        }}
        className="
      pointer-events-none
      absolute inset-0 z-0
      flex items-center justify-center
    "
      >
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : {
                  y: globeY,
                  scale: globeScale,
                }
          }
          className="
        relative
        h-[115vmin] w-[115vmin]
        max-h-[900px] max-w-[900px]
        -translate-y-[7%]
        sm:h-[105vmin] sm:w-[105vmin]
        md:-translate-y-[4%]
      "
        >
          <Globe scrollOffset={scrollOffsetValue} />

          <div
            aria-hidden="true"
            className="
          pointer-events-none
          absolute inset-0
          rounded-full
        "
            style={{
              background:
                "linear-gradient(115deg, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.1) 42%, transparent 68%)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Bar uppe*/}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 0.3,
          ease,
        }}
        className="
          pointer-events-none
          absolute left-6 right-6 top-8
          z-20 flex items-center
          justify-between
          md:left-12 md:right-12
          md:top-12
        "
      >
        <div
          className="
            flex items-center gap-3
            font-mono text-[10px]
            uppercase tracking-[0.22em]
            text-white/50
            sm:text-xs
          "
        >
          <span
            className="
              h-1.5 w-1.5
              rounded-full bg-[#84B8E6]
              shadow-[0_0_12px_rgba(132,184,230,0.7)]
            "
          />
          A WORLD OF DATA
        </div>

        <span
          className="
            hidden font-mono text-[10px]
            uppercase tracking-[0.22em]
            text-white/40 sm:block
          "
        >
          GLOBAL PERSPECTIVE
        </span>
      </motion.div>

      {/* Glob */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.93 }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.6,
          ease,
        }}
        className="
          pointer-events-none
          absolute inset-0 z-0
          flex items-center justify-center
        "
      >
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : {
                  y: globeY,
                  scale: globeScale,
                }
          }
          className="
            relative
            h-[115vmin] w-[115vmin]
            max-h-[900px] max-w-[900px]
            -translate-y-[7%]
            sm:h-[105vmin] sm:w-[105vmin]
            md:-translate-y-[4%]
          "
        >
          <Globe scrollOffset={scrollOffsetValue} />

          {/* Mild skugga för dimension */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-0
              rounded-full
            "
            style={{
              background:
                "linear-gradient(115deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.1) 22%, transparent 68%)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* detaljer */}

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 1,
          duration: 0.8,
          ease,
        }}
        className="
          pointer-events-none
          absolute left-12 top-[49%]
          z-10 hidden
          -translate-y-1/2
          flex-col gap-3
          lg:flex
        "
      >
        <span
          className="
            font-mono text-[10px]
            tracking-[0.2em]
            text-white/35
          "
        >
          01 / EXPLORE
        </span>

        <div className="h-px w-12 bg-white/20" />

        <span
          className="
            max-w-[120px]
            font-sans text-xs
            leading-relaxed text-white/45
          "
        >
          Different places. Different realities.
        </span>
      </motion.div>

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 1.1,
          duration: 0.8,
          ease,
        }}
        className="
          pointer-events-none
          absolute right-12 top-[49%]
          z-10 hidden
          -translate-y-1/2
          flex-col items-end gap-3
          lg:flex
        "
      >
        <span
          className="
            font-mono text-[10px]
            tracking-[0.2em]
            text-white/35
          "
        >
          GLOBAL ATLAS
        </span>

        <div className="h-px w-12 bg-white/20" />

        <span
          className="
            font-sans text-xs
            text-white/45
          "
        >
          One connected world.
        </span>
      </motion.div>

      {/* Rubrik*/}
      <motion.div
        style={
          shouldReduceMotion
            ? undefined
            : {
                y: titleY,
                opacity: titleOpacity,
              }
        }
        className="
          pointer-events-none
          absolute bottom-[15%]
          left-0 right-0
          z-20 flex flex-col
          items-center px-6
          text-center
          md:bottom-[14%]
        "
      >
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease,
          }}
          className="
            mb-5 flex items-center gap-4
          "
        >
          <span className="h-px w-7 bg-white/30" />

          <span
            className="
              font-mono text-[10px]
              uppercase tracking-[0.3em]
              text-[#A7C8E7]
              sm:text-xs
            "
          >
            THE WORLD, IN PERSPECTIVE
          </span>

          <span className="h-px w-7 bg-white/30" />
        </motion.div>

        <motion.h1
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 40,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1.1,
            delay: 0.65,
            ease,
          }}
          className="
            font-heading
            text-[clamp(3.5rem,11vw,10rem)]
            font-bold
            leading-[0.95]
            tracking-[-0.065em]
            text-white
            drop-shadow-[0_12px_35px_rgba(0,0,0,0.4)]
          "
        >
          Worldscope
          <span className="text-[#8CB9E2]">.</span>
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.95,
            ease,
          }}
          className="
            mt-7 max-w-xl
            font-sans text-base
            leading-relaxed
            text-white/65
            sm:text-lg md:text-xl
          "
        >
          Every country has a story.
          <br className="hidden sm:block" />{" "}
          <span className="text-white/95">
            Discover the world through its data.
          </span>
        </motion.p>
      </motion.div>

      {/* Nedre detaljer */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.5,
          duration: 0.8,
        }}
        className="
          pointer-events-none
          absolute bottom-7
          left-6 right-6 z-20
          flex items-end justify-between
          md:bottom-10
          md:left-12 md:right-12
        "
      >
        <span
          className="
            hidden font-mono text-[10px]
            uppercase tracking-[0.2em]
            text-white/35 sm:block
          "
        >
          EXPLORE · COMPARE · UNDERSTAND
        </span>

        <div
          className="
            mx-auto flex flex-col
            items-center gap-3
            sm:mx-0
          "
        >
          <span
            className="
              font-mono text-[10px]
              uppercase tracking-[0.25em]
              text-white/45
            "
          >
            Scroll to explore
          </span>

          <div
            className="
              relative h-9 w-px
              overflow-hidden bg-white/20
            "
          >
            <motion.div
              animate={
                shouldReduceMotion ? undefined : { y: ["-100%", "200%"] }
              }
              transition={{
                duration: 2.2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="
                absolute top-0
                h-5 w-full bg-[#A7C8E7]
              "
            />
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-30">
        <GlowDivider />
      </div>
    </section>
  );
}
