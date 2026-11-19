import type { EconomyData } from "./use-economy-data";

type SectorKey = "agriculture" | "industry" | "services";

const sectors = [
  { key: "agriculture", name: "Agriculture", color: "#8CB9E2" },
  { key: "industry", name: "Industry", color: "#647FB5" },
  { key: "services", name: "Services", color: "#A78BFA" },
] as const;

export function EconomyStructure({ data }: { data: EconomyData }) {
  // Senaste året med data för alla tre sektorerna
  const year = data.agriculture
    .map((point) => point.year)
    .filter(
      (year) =>
        data.industry.some((p) => p.year === year) &&
        data.services.some((p) => p.year === year),
    )
    .at(-1);

  return (
    <div className="rounded-2xl border border-[#8CB9E2]/15 bg-[#060C17]/70 p-6">
      <h3 className="font-heading text-xl text-white">Economic structure</h3>

      {year === undefined ? (
        <p className="mt-10 text-sm text-white/40">No data available.</p>
      ) : (
        <div className="mt-7 space-y-7">
          <p className="font-mono text-[11px] uppercase tracking-widest text-white/40">
            Value added · {year}
          </p>

          {sectors.map(({ key, name, color }) => {
            const value =
              data[key as SectorKey].find((point) => point.year === year)
                ?.value ?? 0;

            return (
              <div key={key} className="space-y-3">
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-white/65">{name}</span>
                  <span className="font-mono text-white">
                    {value.toFixed(1)}%
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(100, Math.max(0, value))}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
            );
          })}

          <p className="text-xs leading-relaxed text-white/40">
            Share of GDP. Values may not sum to exactly 100%.
          </p>
        </div>
      )}
    </div>
  );
}
