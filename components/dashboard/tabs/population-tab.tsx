"use client";

import { ChartCard } from "@/components/ui/chart-card";
import { StatCard } from "@/components/ui/stat-card";

export function PopulationTab({ country }: { country: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
      <StatCard
        label="Population"
        value="10.5M"
        trend={0.8}
        className="md:col-span-1"
      />
      <ChartCard title="Population over time" className="md:col-span-2">
        <p className="text-muted-foreground">Line Chart placeholder</p>
      </ChartCard>
    </div>
  );
}
