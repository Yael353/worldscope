"use client";

import { useCallback, useState } from "react";
import { MapHeading } from "./map-heading";
import { MapCard } from "./map-card";

type MapSectionProps = {
  onSelect: (name: string) => void;
};

export function MapSection({ onSelect }: MapSectionProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const selectCountry = useCallback(
    (name: string) => {
      setSelected(name);
      onSelect(name);
    },
    [onSelect],
  );

  return (
    <section
      aria-labelledby="map-heading"
      className="
        relative isolate w-full overflow-hidden
        bg-[linear-gradient(180deg,#0a162a_0%,#0a162a_22%,#081325_55%,#03060B_100%)]
        px-5 pb-24 pt-24 text-white
        sm:px-8 md:pb-32 md:pt-32 lg:px-12
      "
    >
      <div className="relative mx-auto max-w-7xl">
        <MapHeading />

        {/* glöd */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute left-1/2 top-[40%] -z-10
            h-[450px] w-[80%] -translate-x-1/2 rounded-full
            bg-[radial-gradient(ellipse,rgba(35,105,175,0.13),transparent_70%)]
          "
        />

        <MapCard selected={selected} onSelect={selectCountry} />

        <footer className="mt-7 flex flex-col justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/30 sm:flex-row">
          <span>Worldscope / Geographic exploration</span>
          <span>One world. Different perspectives.</span>
        </footer>
      </div>
    </section>
  );
}
