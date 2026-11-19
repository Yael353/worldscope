"use client";

import { useEffect, useState } from "react";

import { ChartCard } from "@/components/ui/chart-card";
import { TrendChart } from "@/components/ui/trend-chart";
import { ChartModal } from "@/components/ui/chart-modal";

import { useHealthData } from "./use-health-data";
import { HealthStats } from "./health-stats";
import { HealthInfo } from "./health-info";

type Modal = "life" | "mortality" | null;

export function HealthTab({ country }: { country: string }) {
  const { data, loading, error } = useHealthData(country);
  const [modal, setModal] = useState<Modal>(null);

  useEffect(() => {
    setModal(null);
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
        <span className="sr-only">Loading health data</span>
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

  const modalData = modal === "life" ? data.life : data.mortality;
  const modalTitle =
    modal === "life"
      ? "Life expectancy over time"
      : "Infant mortality over time";

  return (
    <div className="space-y-6 pb-6">
      {/* statistik */}
      <HealthStats data={data} />

      {/* medellivslängd */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <ChartCard
            title="Life expectancy over time"
            className="h-full"
            onClick={data.life.length ? () => setModal("life") : undefined}
          >
            {data.life.length ? (
              <TrendChart
                data={data.life}
                color="#a78bfa"
                unit="years"
                height={280}
              />
            ) : (
              <EmptyState />
            )}
          </ChartCard>
        </div>

        <div className="min-w-0">
          <HealthInfo />
        </div>
      </div>

      {/* barnadödlighet */}
      <ChartCard
        title="Infant mortality over time"
        onClick={
          data.mortality.length ? () => setModal("mortality") : undefined
        }
      >
        {data.mortality.length ? (
          <TrendChart
            data={data.mortality}
            color="#8CB9E2"
            unit="per 1,000 live births"
            height={240}
          />
        ) : (
          <EmptyState />
        )}
      </ChartCard>

      {/* källa */}
      <div className="border-t border-white/10 pt-5 text-xs text-white/40">
        Source:{" "}
        <a
          href="https://data.worldbank.org/topic/health"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8CB9E2] hover:text-white"
        >
          World Bank Open Data ↗
        </a>
      </div>

      {/* modal */}
      <ChartModal
        isOpen={modal !== null}
        onClose={() => setModal(null)}
        title={modalTitle}
      >
        {modal && (
          <TrendChart
            data={modalData}
            color={modal === "life" ? "#a78bfa" : "#8CB9E2"}
            unit={modal === "life" ? "years" : "per 1,000 live births"}
            height={420}
          />
        )}
      </ChartModal>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-[220px] items-center justify-center text-sm text-white/40">
      No data available.
    </div>
  );
}
