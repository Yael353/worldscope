"use client";

import { useId, useMemo } from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface TrendChartProps {
  data: {
    year: number;
    value: number;
  }[];
  color?: string;
  unit?: string;
  height?: number;
}

function formatNumber(value: number) {
  const abs = Math.abs(value);

  if (abs >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  }

  if (abs >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (abs >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }

  return Number(value.toFixed(1)).toString();
}

export function TrendChart({
  data,
  color = "#22d3ee",
  unit = "",
  height = 280,
}: TrendChartProps) {
  const id = useId().replace(/:/g, "");
  const gradientId = `chart-gradient-${id}`;

  const chartData = useMemo(
    () =>
      data
        .filter(
          (point) =>
            Number.isFinite(point.year) && Number.isFinite(point.value),
        )
        .sort((a, b) => a.year - b.year),
    [data],
  );

  if (!chartData.length) {
    return (
      <div
        className="
          flex w-full items-center justify-center
          text-sm text-white/40
        "
        style={{ height }}
      >
        No chart data available.
      </div>
    );
  }

  return (
    <div className="w-full min-w-0" style={{ height }}>
      <ResponsiveContainer
        width="100%"
        height={height}
        minWidth={1}
        debounce={100}
      >
        <AreaChart
          data={chartData}
          margin={{
            top: 16,
            right: 18,
            left: 0,
            bottom: 4,
          }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.25} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="3 5"
            vertical={false}
          />

          <XAxis
            dataKey="year"
            type="number"
            domain={["dataMin", "dataMax"]}
            tickCount={6}
            tickFormatter={(year) => String(Math.round(year))}
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "rgba(255,255,255,0.45)",
              fontSize: 11,
            }}
            minTickGap={24}
          />

          <YAxis
            tickFormatter={formatNumber}
            axisLine={false}
            tickLine={false}
            width={54}
            tick={{
              fill: "rgba(255,255,255,0.45)",
              fontSize: 11,
            }}
            domain={["auto", "auto"]}
          />

          <Tooltip
            cursor={{
              stroke: color,
              strokeOpacity: 0.35,
              strokeDasharray: "4 4",
            }}
            contentStyle={{
              backgroundColor: "#0B1422",
              border: "1px solid rgba(140,185,226,0.2)",
              borderRadius: 12,
              padding: "12px 16px",
              boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
            }}
            labelStyle={{
              color: "#9FB2C8",
              fontSize: 12,
              marginBottom: 5,
            }}
            itemStyle={{
              color: "#FFFFFF",
              fontSize: 13,
            }}
            labelFormatter={(label) => `Year: ${label}`}
            formatter={(value) => {
              if (typeof value !== "number") {
                return ["N/A", "Value"];
              }

              return [
                `${value.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}${unit ? ` ${unit}` : ""}`,
                "Value",
              ];
            }}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2.5}
            fill={`url(#${gradientId})`}
            fillOpacity={1}
            dot={false}
            activeDot={{
              r: 4,
              stroke: "#0B1422",
              strokeWidth: 2,
              fill: color,
            }}
            isAnimationActive={false}
            connectNulls={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
