"use client";

import { useEffect, useState } from "react";

import { ChartCard } from "@/components/ui/chart-card";
import { TrendChart } from "@/components/ui/trend-chart";
import { ChartModal } from "@/components/ui/chart-modal";

import { useEconomyData } from "./use-economy-data";
import { EconomyStats } from "./economy-stats";
import { EconomyStructure } from "./economy-structure";

export function EconomyTab({ country }: { country: string }) {
  const { data, loading, error } = useEconomyData(country);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setModalOpen(false);
  }, [country]);

  if (loading) {
    return (
      <div
        role="status"
        className="grid animate-pulse gap-5 md:grid-cols-3 motion-reduce:animate-none"
      >
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="h-36 rounded-2xl border border-white/10 bg-white/[0.04]"
          />
        ))}
        <div className="h-72 rounded-2xl border border-white/10 bg-white/[0.04] md:col-span-3" />
        <span className="sr-only">Loading economic data</span>
      </div>
    );
  }

  if (error) {
    return (
      <p role="alert" className="text-red-400">
        {error}
      </p>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      {/* statistik */}
      <EconomyStats data={data} />

      {/* diagram */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <ChartCard
            title="GDP per capita over time"
            className="h-full"
            onClick={
              data.gdpPerCapita.length ? () => setModalOpen(true) : undefined
            }
          >
            {data.gdpPerCapita.length ? (
              <TrendChart
                data={data.gdpPerCapita}
                color="#8CB9E2"
                unit="USD"
                height={280}
              />
            ) : (
              <div className="flex h-[220px] items-center justify-center text-sm text-white/40">
                No data available.
              </div>
            )}
          </ChartCard>
        </div>

        <div className="min-w-0">
          <EconomyStructure data={data} />
        </div>
      </div>

      {/* källor */}
      <div className="flex flex-wrap justify-between gap-3 border-t border-white/10 pt-5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          Source: World Bank · WDI
        </span>

        <a
          href="https://data.worldbank.org/topic/economy-and-growth"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#8CB9E2] hover:text-white"
        >
          Explore economic data ↗
        </a>
      </div>

      {/* modal */}
      <ChartModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="GDP per capita over time"
      >
        <TrendChart
          data={data.gdpPerCapita}
          color="#8CB9E2"
          unit="USD"
          height={420}
        />
      </ChartModal>
    </div>
  );
}
