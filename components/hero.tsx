"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { Globe } from "./globe";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollOffsetValue, setScrollOffsetValue] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollOffset = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);

  useMotionValueEvent(scrollOffset, "change", (latest) => {
    setScrollOffsetValue(latest);
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.4], [0, -250]);

  return (
    <section ref={containerRef} className="relative h-[200vh] w-full bg-black">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[80vmin] w-[80vmin] max-h-200 max-w-200">
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
        </div>

        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute bottom-[12vh] left-0 right-0 z-10 flex flex-col items-center text-center px-6"
        >
          <h1 className="font-heading text-6xl md:text-8xl font-bold tracking-tight text-white">
            Worldscope
          </h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            Utforska världens länder genom interaktiva data och diagram.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
