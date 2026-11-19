"use client";

import { useEffect, useState } from "react";

import {
  fetchWorldBankIndicators,
  resolveCountryCode,
  type DataPoint,
} from "@/lib/api/world-bank";

const indicators = {
  life: "SP.DYN.LE00.IN",
  mortality: "SP.DYN.IMRT.IN",
  spending: "SH.XPD.CHEX.GD.ZS",
} as const;

export type HealthData = {
  life: DataPoint[];
  mortality: DataPoint[];
  spending: DataPoint[];
};

const emptyData: HealthData = {
  life: [],
  mortality: [],
  spending: [],
};

export function useHealthData(country: string) {
  const [data, setData] = useState<HealthData>(emptyData);
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

        const result = await fetchWorldBankIndicators(
          code,
          Object.values(indicators),
          controller.signal,
        );

        if (cancelled) return;

        const next: HealthData = {
          life: result[indicators.life] ?? [],
          mortality: result[indicators.mortality] ?? [],
          spending: result[indicators.spending] ?? [],
        };

        if (Object.values(next).every((series) => !series.length)) {
          throw new Error("No health data available for this country.");
        }

        setData(next);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load health data.",
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
