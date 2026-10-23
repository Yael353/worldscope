"use client";

import { CountryPanel } from "@/components/dashboard/CountryPanel";
import { Hero } from "@/components/layout/hero";
import { MapTest } from "@/components/map/map-test";
import { useRef, useState } from "react";
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
        window.scrollTo({ top, behavior: "auto" });
      }

      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 400);
  };

  return (
    <main className="relative bg-black">
      <Hero />
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pb-24 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex justify-center mt-12"
        >
          <MapTest onSelect={handleSelectCountry} />
        </motion.div>
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
