"use client";

import { ChartCard } from "@/components/ui/chart-card";
import { StatCard } from "@/components/ui/stat-card";

export function HealthTab({ country }: { country: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
      <StatCard
        label="Life Expectancy"
        value="82.4"
        trend={0.3}
        className="md:col-span-1"
      />
      <StatCard
        label="Infant Mortality"
        value="2.1 / 1000"
        trend={-1.2}
        className="md:col-span-1"
      />
      <StatCard
        label="Healthcare Spending"
        value="11.2% GDP"
        trend={0.5}
        className="md:col-span-1"
      />

      <ChartCard title="Life Expectancy over time" className="md:col-span-2">
        <p className="text-muted-foreground">Line Chart placeholder</p>
      </ChartCard>
      <ChartCard title="Cause of Death split" className="md:col-span-1">
        <p className="text-muted-foreground">Donut Chart placeholder</p>
      </ChartCard>
    </div>
  );
}
