"use client";

interface StatCardProps {
  label: string;
  value: string;
  trend?: number;
  className?: string;
}

export function StatCard({
  label,
  value,
  trend,
  className = "",
}: StatCardProps) {
  const isPositive = trend !== undefined && trend > 0;

  return (
    <div
      className={`rounded-2xl border border-primary/15 bg-white/2 p-6 flex flex-col justify-center ${className}`}
    >
      <p className="text-sm text-muted-foreground mb-2">{label}</p>
      <p className="text-4xl font-mono text-accent">{value}</p>
      {trend !== undefined && (
        <p
          className={`text-sm mt-2 ${isPositive ? "text-positive" : "text-negative"}`}
        >
          {isPositive ? "↑" : "↓"} {Math.abs(trend)}% from last year
        </p>
      )}
    </div>
  );
}
