"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { Globe } from "../globe";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollOffsetValue, setScrollOffsetValue] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollOffset = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
  const globeY = useTransform(scrollYProgress, [0, 0.4], [0, -150]);
  const titleY = useTransform(scrollYProgress, [0, 0.4], [0, -280]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0.7, 1], [1, 0.85]);
  const heroOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);

  useMotionValueEvent(scrollOffset, "change", (latest) => {
    setScrollOffsetValue(latest);
  });

  return (
    <section
      ref={containerRef}
      className="relative h-screen 200-vh w-full overflow-hidden bg-black"
    >
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative flex h-full w-full items-center justify-center"
      >
        {/* Globe */}
        <motion.div
          style={{ y: globeY }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative h-[120vmin] w-[120vmin] max-h-200 max-w-200">
            <Globe scrollOffset={scrollOffsetValue} />
            <div
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background:
                  "linear-gradient(105deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,0) 55%, rgba(0,0,0,0) 100%)",
                boxShadow: "inset -20px -20px 60px rgba(0,0,0,0.6)",
              }}
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute bottom-[12vh] left-0 right-0 z-10 flex flex-col items-center text-center px-6"
        >
          <h1 className="font-heading text-6xl md:text-9xl font-bold tracking-tighter bg-linear-to-b from-white to-white/70 bg-clip-text text-transparent">
            Worldscope
          </h1>
          <p className="mt-4 max-w-md text-lg md:text-xl text-negative leading-relaxed">
            Every country tells a story shaped by its circumstances.{" "}
            <span className="text-white">here is where you figure it out.</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
