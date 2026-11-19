import { StatCard } from "@/components/ui/stat-card";
import { usePopulationData } from "../../hooks/use-population-data";

type PopulationData = ReturnType<typeof usePopulationData>["data"];

const formatPopulation = (value: number) =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);

const formatPercent = (value?: number) =>
  value === undefined ? "N/A" : `${value.toFixed(1)}%`;

export function PopulationStats({ data }: { data: PopulationData }) {
  const population = data.population.at(-1);
  const previous = data.population.at(-2);
  const growth = data.growth.at(-1);
  const urban = data.urban.at(-1);

  const trend =
    population && previous && previous.value !== 0
      ? Number(
          (
            ((population.value - previous.value) / Math.abs(previous.value)) *
            100
          ).toFixed(2),
        )
      : undefined;

  return (
    <div className="grid gap-5 md:grid-cols-3">
      <StatCard
        label={`Population · ${population?.year ?? "N/A"}`}
        value={population ? formatPopulation(population.value) : "N/A"}
        trend={trend}
        className="h-full"
      />

      <StatCard
        label={`Annual growth · ${growth?.year ?? "N/A"}`}
        value={formatPercent(growth?.value)}
        className="h-full"
      />

      <StatCard
        label={`Urban population · ${urban?.year ?? "N/A"}`}
        value={formatPercent(urban?.value)}
        className="h-full"
      />
    </div>
  );
}
