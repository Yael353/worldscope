"use client";

import { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "@vnedyalk0v/react19-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type WorldMapProps = {
  onSelect: (name: string) => void;
};

const geographyStyle = {
  default: {
    fill: "rgba(140,185,226,0.13)",
    stroke: "rgba(140,185,226,0.25)",
    strokeWidth: 0.45,
    outline: "none",
    cursor: "pointer",
  },
  hover: {
    fill: "#276A93",
    stroke: "rgba(189,227,255,0.85)",
    strokeWidth: 0.9,
    outline: "none",
    cursor: "pointer",
  },
  pressed: {
    fill: "#267FB5",
    stroke: "rgba(189,227,255,0.85)",
    strokeWidth: 0.9,
    outline: "none",
    cursor: "pointer",
  },
};

export const WorldMap = memo(function WorldMap({ onSelect }: WorldMapProps) {
  return (
    <ComposableMap
      projection="geoNaturalEarth1"
      projectionConfig={{ scale: 165 }}
      width={1000}
      height={560}
      style={{
        width: "100%",
        height: "auto",
        display: "block",
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const name = geo.properties?.name as string | undefined;

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={geographyStyle}
                role="button"
                tabIndex={0}
                aria-label={name ? `Explore ${name}` : "Unknown country"}
                onClick={() => {
                  if (name) onSelect(name);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();

                    if (name) onSelect(name);
                  }
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
});
