"use client";

import { motion } from "framer-motion";

export function CountryPanel({ country }: { country: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24"
    >
      <div className="w-full max-w-6xl rounded-3xl border border-white/10 bg-linear-to-b from-primary/5 to-primary/5 backdrop-blur-sm p-8 md:p-12">
        <h2 className="font-heading text-4xl md:text-5xl text-white">
          {country}
        </h2>
        <p className="mt-4 text-muted-foreground">
          Dashboarden för {country} — befolkning, ekonomi, hälsa.
        </p>
      </div>
    </motion.section>
  );
}
