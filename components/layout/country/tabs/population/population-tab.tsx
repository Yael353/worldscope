"use client";

import { useEffect, useState } from "react";

import { ChartCard } from "@/components/ui/chart-card";
import { TrendChart } from "@/components/ui/trend-chart";
import { ChartModal } from "@/components/ui/chart-modal";

import { usePopulationData } from "../../hooks/use-population-data";
import { PopulationStats } from "./population-stats";
import { PopulationAgeChart } from "./population-age-chart";

export function PopulationTab({ country }: { country: string }) {
  const { data, loading, error } = usePopulationData(country);
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
        <span className="sr-only">Loading population data</span>
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
      <PopulationStats data={data} />

      {/* diagram */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <ChartCard
            title="Population over time"
            className="h-full min-h-[350px]"
            onClick={
              data.population.length ? () => setModalOpen(true) : undefined
            }
          >
            {data.population.length ? (
              <TrendChart
                data={data.population}
                color="#22d3ee"
                unit="people"
                height={280}
              />
            ) : (
              <EmptyState />
            )}
          </ChartCard>
        </div>

        <div className="min-w-0">
          <PopulationAgeChart
            ages0to14={data.ages0to14}
            ages15to64={data.ages15to64}
            ages65plus={data.ages65plus}
          />
        </div>
      </div>

      {/* källor */}
      <div className="flex flex-wrap justify-between gap-3 border-t border-white/10 pt-5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          Sources: Our World in Data · World Bank
        </span>

        <a
          href="https://data.worldbank.org/topic/population"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#8CB9E2] hover:text-white"
        >
          Explore population data ↗
        </a>
      </div>

      {/* modal */}
      <ChartModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Population over time"
      >
        <TrendChart
          data={data.population}
          color="#22d3ee"
          unit="people"
          height={420}
        />
      </ChartModal>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[220px] items-center justify-center text-center text-sm text-white/40">
      No population data available.
    </div>
  );
}
