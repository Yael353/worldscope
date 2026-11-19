import { StatCard } from "@/components/ui/stat-card";
import type { EconomyData } from "./use-economy-data";

const formatUSD = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const formatPercent = (value: number) => `${value.toFixed(1)}%`;

export function EconomyStats({ data }: { data: EconomyData }) {
  const gdp = data.gdpPerCapita.at(-1);
  const unemployment = data.unemployment.at(-1);
  const inflation = data.inflation.at(-1);

  const previous = data.gdpPerCapita.at(-2);

  const gdpTrend =
    gdp && previous && previous.value !== 0
      ? ((gdp.value - previous.value) / Math.abs(previous.value)) * 100
      : undefined;

  return (
    <div className="grid gap-5 md:grid-cols-3">
      <StatCard
        label={`GDP per capita · ${gdp?.year ?? "N/A"}`}
        value={gdp ? formatUSD(gdp.value) : "N/A"}
        trend={gdpTrend === undefined ? undefined : Number(gdpTrend.toFixed(2))}
      />

      <StatCard
        label={`Unemployment · ${unemployment?.year ?? "N/A"}`}
        value={unemployment ? formatPercent(unemployment.value) : "N/A"}
      />

      <StatCard
        label={`Inflation · ${inflation?.year ?? "N/A"}`}
        value={inflation ? formatPercent(inflation.value) : "N/A"}
      />
    </div>
  );
}
