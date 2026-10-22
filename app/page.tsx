"use client";

import { CountryPanel } from "@/components/CountryPanel";
import { GlowDivider } from "@/components/glow-divider";
import { Hero } from "@/components/hero";
import { MapTest } from "@/components/map-test";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedCountry && panelRef.current) {
      requestAnimationFrame(() => {
        const top =
          panelRef.current!.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      });
    }
  }, [selectedCountry]);

  return (
    <main className="relative bg-black">
      <Hero />
      <div className="relative py-32 md:py-48">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent" />
        <GlowDivider />
      </div>
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-12 pb-32">
        <MapTest onSelect={setSelectedCountry} />
      </section>
      {selectedCountry && (
        <div ref={panelRef}>
          <CountryPanel country={selectedCountry} />
        </div>
      )}
    </main>
  );
}
