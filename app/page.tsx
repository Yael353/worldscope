"use client";

import { CountryPanel } from "@/components/dashboard/CountryPanel";
import { GlowDivider } from "@/components/layout/glow-divider";
import { Hero } from "@/components/layout/hero";
import { MapTest } from "@/components/map/map-test";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleSelectCountry = (country: string) => {
    setIsTransitioning(true);
    setSelectedCountry(country);

    setTimeout(() => {
      if (panelRef.current) {
        const top =
          panelRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: "smooth" });
      }

      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 400);
  };

  return (
    <main className="relative bg-black">
      <Hero />
      <GlowDivider />
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
        <MapTest onSelect={handleSelectCountry} />
      </section>

      {selectedCountry && (
        <div ref={panelRef}>
          <CountryPanel country={selectedCountry} />
        </div>
      )}

    
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-50 pointer-events-none bg-black"
          >
            <div className="h-full w-full flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="text-primary font-mono text-sm tracking-widest uppercase"
              >
                Loading data...
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
