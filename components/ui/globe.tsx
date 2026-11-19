"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

interface GlobeProps {
  scrollOffset?: number;
}

export function Globe({ scrollOffset = 0 }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollOffsetRef = useRef(scrollOffset);

  useEffect(() => {
    scrollOffsetRef.current = scrollOffset;
  }, [scrollOffset]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 3,
      width: 900,
      height: 900,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.0, 0.1, 0.1],
      markerColor: [0.0, 0.9, 1.0],
      glowColor: [0.1, 0.1, 0.2],
    });

    let animationId: number;
    let autoPhi = 0;

    const animate = () => {
      autoPhi += 0.009;
      const finalPhi = autoPhi + scrollOffsetRef.current;
      globe.update({ phi: finalPhi });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      style={{ contain: "layout paint size" }}
    />
  );
}
