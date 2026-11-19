import { StatCard } from "@/components/ui/stat-card";
import type { HealthData } from "./use-health-data";

export function HealthStats({ data }: { data: HealthData }) {
  const life = data.life.at(-1);
  const mortality = data.mortality.at(-1);
  const spending = data.spending.at(-1);

  return (
    <div className="grid gap-5 md:grid-cols-3">
      <StatCard
        label={`Life expectancy · ${life?.year ?? "N/A"}`}
        value={life ? `${life.value.toFixed(1)} years` : "N/A"}
      />

      <StatCard
        label={`Infant mortality · ${mortality?.year ?? "N/A"}`}
        value={mortality ? mortality.value.toFixed(1) : "N/A"}
      />

      <StatCard
        label={`Health spending · ${spending?.year ?? "N/A"}`}
        value={spending ? `${spending.value.toFixed(1)}%` : "N/A"}
      />
    </div>
  );
}
