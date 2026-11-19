export function MapHeading() {
  return (
    <header className="mb-12 text-center md:mb-16">
      <div className="mb-7 flex items-center justify-center gap-4">
        <span className="h-px w-7 bg-[#8CB9E2]/40" />

        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8CB9E2] sm:text-xs">
          A world to explore
        </span>

        <span className="h-px w-7 bg-[#8CB9E2]/40" />
      </div>

      <h2
        id="map-heading"
        className="
          font-heading text-[clamp(2.5rem,5.5vw,5.5rem)]
          font-semibold leading-[1.1] tracking-[-0.045em]
        "
      >
        Every country has
        <br />
        <span className="bg-gradient-to-r from-[#D9E9F7] via-[#8CB9E2] to-[#5389BF] bg-clip-text text-transparent">
          its story.
        </span>
      </h2>

      <p className="mx-auto mt-7 max-w-lg text-base leading-relaxed text-white/55 md:text-lg">
        Choose a country and discover the data behind its story.
      </p>
    </header>
  );
}
