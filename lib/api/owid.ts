const OWID_BASE = "https://ourworldindata.org/grapher";

export interface OwidDataPoint {
  year: number;
  value: number;
}

const cache = new Map<string, Promise<OwidDataPoint[]>>();

const countryAliases: Record<string, string> = {
  "United States of America": "United States",
  "Czech Republic": "Czechia",
  "Russian Federation": "Russia",
};


function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let quoted = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (quoted && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

export async function fetchOwidData(
  slug: string,
  countryName: string,
  signal?: AbortSignal,
): Promise<OwidDataPoint[]> {
  signal?.throwIfAborted();

  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error("Invalid OWID chart slug.");
  }

  const country = countryAliases[countryName] ?? countryName;

  const endYear = new Date().getFullYear();
  const startYear = endYear - 99;

  const key = `${slug}:${country}:${startYear}:${endYear}`;

  if (!cache.has(key)) {
    const request = (async () => {
      const params = new URLSearchParams({
        csvType: "filtered",
        tab: "chart",
        country,
        time: `${startYear}..${endYear}`,
      });

      const url = `${OWID_BASE}/${slug}.csv?${params}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`OWID request failed: ${response.status}`);
      }

      const csv = await response.text();
      const lines = csv.trim().split(/\r?\n/);

      const headers = parseCsvLine(lines[0] ?? "");

      const entityIndex = headers.indexOf("Entity");
      const yearIndex = headers.indexOf("Year");

      const valueColumns = headers
        .map((header, index) => ({ header, index }))
        .filter(
          ({ header }) => !["Entity", "Code", "Year", "Day"].includes(header),
        );

      if (entityIndex === -1 || yearIndex === -1 || valueColumns.length !== 1) {
        throw new Error("Unexpected OWID CSV format.");
      }

      const valueIndex = valueColumns[0].index;
      const data: OwidDataPoint[] = [];

      for (let i = 1; i < lines.length; i++) {
        const cols = parseCsvLine(lines[i]);

        if (cols[entityIndex] !== country) continue;

        const year = Number(cols[yearIndex]);
        const value = Number(cols[valueIndex]);

        if (
          !cols[valueIndex]?.trim() ||
          !Number.isInteger(year) ||
          !Number.isFinite(value)
        ) {
          continue;
        }

        data.push({ year, value });
      }

      return data.sort((a, b) => a.year - b.year);
    })().catch((error) => {
      cache.delete(key);
      throw error;
    });

    cache.set(key, request);
  }

  const result = await cache.get(key)!;

  signal?.throwIfAborted();

  return [...result];
}
