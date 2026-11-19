import type { DataPoint } from "@/lib/api/world-bank";
import { ChartCard } from "@/components/ui/chart-card";

type AgeChartProps = {
  ages0to14: DataPoint[];
  ages15to64: DataPoint[];
  ages65plus: DataPoint[];
};

export function PopulationAgeChart({
  ages0to14,
  ages15to64,
  ages65plus,
}: AgeChartProps) {
  const year = ages0to14
    .map((point) => point.year)
    .filter(
      (year) =>
        ages15to64.some((p) => p.year === year) &&
        ages65plus.some((p) => p.year === year),
    )
    .at(-1);

  const groups = [
    { label: "Ages 0–14", data: ages0to14, color: "#8CB9E2" },
    { label: "Ages 15–64", data: ages15to64, color: "#22D3EE" },
    { label: "Ages 65+", data: ages65plus, color: "#A78BFA" },
  ].map(({ label, data, color }) => ({
    label,
    color,
    value: data.find((p) => p.year === year)?.value ?? 0,
  }));

  return (
    <ChartCard title="Population by age" className="h-full min-h-[350px]">
      {year === undefined ? (
        <div className="flex min-h-[220px] items-center justify-center text-sm text-white/40">
          No age data available.
        </div>
      ) : (
        <div className="py-5">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-widest text-white/40">
            Age distribution · {year}
          </p>

          {/* fördelning */}
          <div className="flex h-3 overflow-hidden rounded-full">
            {groups.map((group) => (
              <div
                key={group.label}
                style={{
                  width: `${Math.max(0, group.value)}%`,
                  backgroundColor: group.color,
                }}
              />
            ))}
          </div>

          {/* åldersgrupper */}
          <div className="mt-9 space-y-5">
            {groups.map((group) => (
              <div
                key={group.label}
                className="flex items-center justify-between gap-4"
              >
                <span className="flex items-center gap-3 text-sm text-white/65">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: group.color }}
                  />
                  {group.label}
                </span>

                <span className="font-mono text-sm text-white">
                  {group.value.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>

          <p className="mt-7 text-xs text-white/40">
            Share of total population.
          </p>
        </div>
      )}
    </ChartCard>
  );
}
