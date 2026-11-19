const information = [
  {
    title: "Life expectancy",
    description:
      "Estimated years a newborn would live if current mortality rates remained unchanged.",
  },
  {
    title: "Infant mortality",
    description: "Deaths before the age of one per 1,000 live births.",
  },
  {
    title: "Health expenditure",
    description: "Current healthcare spending as a percentage of GDP.",
  },
];

export function HealthInfo() {
  return (
    <div className="rounded-2xl border border-[#8CB9E2]/15 bg-[#060C17]/70 p-6">
      <h3 className="font-heading text-xl text-white">
        Understanding the numbers
      </h3>

      <div className="mt-7 space-y-6">
        {information.map(({ title, description }) => (
          <div
            key={title}
            className="border-b border-white/10 pb-5 last:border-0"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#8CB9E2]">
              {title}
            </p>

            <p className="mt-2 text-sm leading-relaxed text-white/60">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
