"use client";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void; // NYTT
}

export function ChartCard({
  title,
  children,
  className = "",
  onClick,
}: ChartCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl border border-primary/15 bg-white/[0.02] p-6 flex flex-col 
        ${className} 
        ${onClick ? "cursor-pointer hover:bg-white/[0.05] hover:border-primary/30 transition-all duration-200" : ""}
      `}
    >
      <p className="text-sm text-muted-foreground mb-4">{title}</p>
      <div className="flex-1 min-h-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
