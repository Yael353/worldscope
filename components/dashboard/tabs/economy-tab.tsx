"use client";

import { ChartCard } from "@/components/ui/chart-card";
import { StatCard } from "@/components/ui/stat-card";

export function EconomyTab({ country }: { country: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
      <StatCard
        label="GDP per Capita"
        value="$54,200"
        trend={2.1}
        className="md:col-span-1"
      />
      <StatCard
        label="Unemployment"
        value="6.2%"
        trend={-0.4}
        className="md:col-span-1"
      />
      <StatCard
        label="Inflation"
        value="2.8%"
        trend={0.2}
        className="md:col-span-1"
      />

      <ChartCard title="GDP over time" className="md:col-span-2">
        <p className="text-muted-foreground">Line Chart placeholder</p>
      </ChartCard>
      <ChartCard title="Sector split" className="md:col-span-1">
        <p className="text-muted-foreground">Donut Chart placeholder</p>
      </ChartCard>
    </div>
  );
}
