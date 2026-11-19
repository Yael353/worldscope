"use client";

import { WorldMap } from "./world-map";

type MapCardProps = {
  selected: string | null;
  onSelect: (name: string) => void;
};

export function MapCard({ selected, onSelect }: MapCardProps) {
  return (
    <div
      className="
        relative overflow-hidden rounded-[24px]
        border border-[#8CB9E2]/15 bg-[#060C17]/75
        shadow-[0_24px_80px_rgba(0,0,0,0.22)]
      "
    >
      {/* övre rad */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-5 md:px-8">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-[#8CB9E2]"
          />

          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55 sm:text-xs">
            World atlas / Interactive
          </span>
        </div>

        <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 sm:block">
          Explore · Compare · Understand
        </span>
      </div>

      {/* karta */}
      <div className="relative sm:px-6 md:py-8">
        <WorldMap onSelect={onSelect} />
      </div>

      {/* valt land */}
      <div className="flex flex-col gap-4 border-t border-white/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-full border border-[#8CB9E2]/20
              bg-[#256eb1]/[0.06] text-[#256eb1]
            "
          >
            ◎
          </span>

          <div aria-live="polite">
            <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-white/35">
              {selected ? "Selected country" : "Start exploring"}
            </span>

            <span className="mt-1 block text-sm text-white/85">
              {selected ?? "Select a country on the map"}
            </span>
          </div>
        </div>

        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8CB9E2]/70">
          {selected ? "Country selected" : "Click to discover"}{" "}
          <span aria-hidden="true">↗</span>
        </span>
      </div>
    </div>
  );
}
