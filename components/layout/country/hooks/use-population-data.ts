"use client";

import { useEffect, useState } from "react";
import { fetchOwidData, type OwidDataPoint } from "@/lib/api/owid";
import {
  fetchWorldBankIndicators,
  resolveCountryCode,
  type DataPoint,
} from "@/lib/api/world-bank";

export type PopulationData = {
  population: OwidDataPoint[];
  growth: DataPoint[];
  urban: DataPoint[];
  ages0to14: DataPoint[];
  ages15to64: DataPoint[];
  ages65plus: DataPoint[];
};

const emptyData: PopulationData = {
  population: [],
  growth: [],
  urban: [],
  ages0to14: [],
  ages15to64: [],
  ages65plus: [],
};

const indicators = {
  growth: "SP.POP.GROW",
  urban: "SP.URB.TOTL.IN.ZS",
  ages0to14: "SP.POP.0014.TO.ZS",
  ages15to64: "SP.POP.1564.TO.ZS",
  ages65plus: "SP.POP.65UP.TO.ZS",
} as const;

function getLast100Years(data: OwidDataPoint[]) {
  if (!data.length) return [];

  const latestYear = Math.max(...data.map((point) => point.year));

  return data.filter((point) => point.year >= latestYear - 99);
}

export function usePopulationData(country: string) {
  const [data, setData] = useState<PopulationData>(emptyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      setData(emptyData);

      const populationPromise = fetchOwidData(
        "population",
        country,
        controller.signal,
      );

      const bankPromise = resolveCountryCode(country, controller.signal).then(
        async (code) => {
          const keys = Object.keys(indicators) as (keyof typeof indicators)[];

          // Hämta alla fem indikatorerna i ett enda anrop.
          const grouped = await fetchWorldBankIndicators(
            code,
            keys.map((key) => indicators[key]),
            controller.signal,
          );

          const values = { ...emptyData };

          keys.forEach((key) => {
            const series = grouped[indicators[key]];
            if (series) {
              values[key] = series;
            }
          });

          return values;
        },
      );

      const [owidResult, bankResult] = await Promise.allSettled([
        populationPromise,
        bankPromise,
      ]);

      if (cancelled) return;

      const next: PopulationData = {
        ...emptyData,
        ...(bankResult.status === "fulfilled" ? bankResult.value : {}),
        population:
          owidResult.status === "fulfilled"
            ? getLast100Years(owidResult.value)
            : [],
      };

      const hasData = Object.values(next).some((series) => series.length > 0);

      if (!hasData) {
        setError(`No population data available for ${country}.`);
      }

      setData(next);
      setLoading(false);
    }

    load();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [country]);

  return { data, loading, error };
}
