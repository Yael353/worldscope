const BASE_URL = "https://api.worldbank.org/v2";

export type DataPoint = {
  year: number;
  value: number;
};

export const ECONOMY_INDICATORS = {
  gdpPerCapita: "NY.GDP.PCAP.CD",
  unemployment: "SL.UEM.TOTL.ZS",
  inflation: "FP.CPI.TOTL.ZG",
  agriculture: "NV.AGR.TOTL.ZS",
  industry: "NV.IND.TOTL.ZS",
  services: "NV.SRV.TOTL.ZS",
} as const;

type WorldBankCountry = {
  id: string;
  iso2Code: string;
  name: string;
  region: { value: string };
};

type WorldBankObservation = {
  indicator?: { id: string };
  date: string;
  value: number | null;
};

const aliases: Record<string, string> = {
  "united states of america": "US",
  "united states": "US",
  russia: "RU",
  "south korea": "KR",
  "north korea": "KP",
  "democratic republic of the congo": "CD",
  "republic of the congo": "CG",
  "ivory coast": "CI",
  "czech republic": "CZ",
  turkey: "TR",
  iran: "IR",
  egypt: "EG",
  venezuela: "VE",
  vietnam: "VN",
  laos: "LA",
  syria: "SY",
  slovakia: "SK",
  kyrgyzstan: "KG",
  "the bahamas": "BS",
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

let countriesPromise: Promise<WorldBankCountry[]> | null = null;

async function getCountries(signal?: AbortSignal): Promise<WorldBankCountry[]> {
  if (!countriesPromise) {
    countriesPromise = fetch(`${BASE_URL}/country?format=json&per_page=400`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Could not load countries.");
        }

        const json = await response.json();

        if (!Array.isArray(json?.[1])) {
          throw new Error("Invalid country response.");
        }

        return json[1] as WorldBankCountry[];
      })
      .catch((error) => {
        countriesPromise = null;
        throw error;
      });
  }

  if (signal?.aborted) {
    throw new DOMException("Aborted", "AbortError");
  }

  return countriesPromise;
}

export async function resolveCountryCode(
  country: string,
  signal?: AbortSignal,
): Promise<string> {
  const name = normalize(country);

  if (aliases[name]) return aliases[name];

  const countries = await getCountries(signal);

  const match = countries.find(
    (item) =>
      item.region?.value !== "Aggregates" &&
      (normalize(item.name) === name ||
        normalize(item.id) === name ||
        normalize(item.iso2Code) === name),
  );

  if (!match) {
    throw new Error(`Could not match "${country}" to a World Bank country.`);
  }

  return match.iso2Code;
}

const indicatorCache = new Map<string, Promise<Record<string, DataPoint[]>>>();

export async function fetchWorldBankIndicators(
  countryCode: string,
  indicators: string[],
  signal?: AbortSignal,
): Promise<Record<string, DataPoint[]>> {
  signal?.throwIfAborted();

  const unique = [...new Set(indicators)].sort();

  if (!unique.length) return {};

  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 99;

  const key = `${countryCode}:${unique.join(",")}:${startYear}`;

  if (!indicatorCache.has(key)) {
    const request = (async () => {
      const indicatorPath = unique.join(";");

      const baseUrl =
        `${BASE_URL}/country/${encodeURIComponent(countryCode)}` +
        `/indicator/${indicatorPath}`;

      const params = new URLSearchParams({
        format: "json",
        source: "2",
        date: `${startYear}:${currentYear}`,
        per_page: "1000",
      });

      const grouped: Record<string, DataPoint[]> = Object.fromEntries(
        unique.map((id) => [id, []]),
      );

      let page = 1;
      let totalPages = 1;

      do {
        params.set("page", String(page));

  
        const response = await fetch(`${baseUrl}?${params.toString()}`);

        if (!response.ok) {
          throw new Error(`World Bank request failed: ${response.status}`);
        }

        const json = await response.json();

        if (!Array.isArray(json?.[1])) {
          throw new Error("Invalid World Bank indicator response.");
        }

        totalPages = Number(json[0]?.pages ?? 1);

        const observations = json[1] as WorldBankObservation[];

        for (const item of observations) {
          const id = item.indicator?.id;
          const year = Number(item.date);

          if (
            !id ||
            !grouped[id] ||
            item.value === null ||
            !Number.isFinite(item.value) ||
            !Number.isFinite(year)
          ) {
            continue;
          }

          grouped[id].push({
            year,
            value: item.value,
          });
        }

        page++;
      } while (page <= totalPages);

      for (const series of Object.values(grouped)) {
        series.sort((a, b) => a.year - b.year);
      }

      return grouped;
    })().catch((error) => {
      indicatorCache.delete(key);
      throw error;
    });

    indicatorCache.set(key, request);
  }

  const result = await indicatorCache.get(key)!;

  signal?.throwIfAborted();

  return Object.fromEntries(
    Object.entries(result).map(([id, points]) => [id, [...points]]),
  );
}
