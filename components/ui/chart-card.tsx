"use client";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ChartCard({ title, children, className = "" }: ChartCardProps) {
  return (
    <div
      className={`rounded-2xl border border-primary/15 bg-white/2 p-6 flex flex-col ${className}`}
    >
      <p className="text-sm text-muted-foreground mb-4">{title}</p>
      <div className="flex-1 min-h-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
