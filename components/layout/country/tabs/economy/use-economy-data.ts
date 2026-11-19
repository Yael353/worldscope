"use client";

import { useEffect, useState } from "react";

import {
  ECONOMY_INDICATORS,
  fetchWorldBankIndicators,
  resolveCountryCode,
  type DataPoint,
} from "@/lib/api/world-bank";

export type EconomyData = Record<keyof typeof ECONOMY_INDICATORS, DataPoint[]>;

const emptyData: EconomyData = {
  gdpPerCapita: [],
  unemployment: [],
  inflation: [],
  agriculture: [],
  industry: [],
  services: [],
};

export function useEconomyData(country: string) {
  const [data, setData] = useState<EconomyData>(emptyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    setLoading(true);
    setError(null);
    setData(emptyData);

    async function load() {
      try {
        const code = await resolveCountryCode(country, controller.signal);

        const grouped = await fetchWorldBankIndicators(
          code,
          Object.values(ECONOMY_INDICATORS),
          controller.signal,
        );

        if (cancelled) return;

        const next = Object.fromEntries(
          Object.entries(ECONOMY_INDICATORS).map(([key, indicator]) => [
            key,
            grouped[indicator] ?? [],
          ]),
        ) as EconomyData;

        if (Object.values(next).every((series) => series.length === 0)) {
          throw new Error("No economic data available for this country.");
        }

        setData(next);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load economic data.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [country]);

  return { data, loading, error };
}
