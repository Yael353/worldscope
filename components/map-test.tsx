"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "@vnedyalk0v/react19-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export function MapTest({ onSelect }: { onSelect: (name: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 240, scale: 0.88, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-30% 0px -30% 0px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-6xl"
    >
      <div className="absolute -top-12 left-0 right-0 h-24 pointer-events-none">
        <div className="h-full w-full rounded-t-[100%] border-t border-x border-white/10" />
      </div>

      <div className="absolute -bottom-12 left-0 right-0 h-24 pointer-events-none">
        <div className="h-full w-full rounded-b-[100%] border-b border-x border-white/10" />
      </div>

      <h2 className="font-heading text-3xl md:text-4xl text-white mb-8 text-center tracking-widest">
        Choose a country to explore
      </h2>

      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 180 }}
        width={1000}
        height={700}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => {
                  onSelect(geo.properties?.name);
                }}
                style={{
                  default: {
                    fill: "rgba(255,255,255,0.08)",
                    stroke: "rgba(255,255,255,0.15)",
                    strokeWidth: 0.5,
                    outline: "none",
                  },
                  hover: {
                    fill: "#22d3ee",
                    outline: "none",
                    cursor: "pointer",
                  },
                  pressed: {
                    fill: "#a78bfa",
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </motion.div>
  );
}
