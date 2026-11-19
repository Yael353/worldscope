"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { PopulationTab } from "./tabs/population/population-tab";
import { HealthTab } from "./tabs/health/health-tab";
import { EconomyTab } from "./tabs/economy/economy-tab";

type Tab = "population" | "health" | "economy";

const tabs: { id: Tab; label: string; number: string }[] = [
  { id: "population", label: "Population", number: "01" },
  { id: "health", label: "Health", number: "02" },
  { id: "economy", label: "Economy", number: "03" },
];

export function CountryPanel({ country }: { country: string }) {
  const [activeTab, setActiveTab] = useState<Tab>("population");
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="country-heading"
      className="
        relative isolate w-full
        overflow-hidden bg-[#03060B]
        px-5 pb-24 pt-20
        text-white
        sm:px-8 md:pb-32 md:pt-28
        lg:px-12
      "
    >
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-1/2 top-0 -z-10
          h-[420px] w-[85%]
          -translate-x-1/2
          bg-[radial-gradient(ellipse_at_top,rgba(35,105,175,0.10),transparent_70%)]
        "
      />

      <div className="mx-auto w-full max-w-7xl">
        {/* ==================================
            SECTION HEADER
        ================================== */}
        <header className="mb-12 md:mb-16">
          <div className="mb-7 flex items-center gap-4">
            <span className="h-px w-7 bg-[#8CB9E2]/40" />

            <span
              className="
                font-mono text-[10px]
                uppercase tracking-[0.3em]
                text-[#8CB9E2]
                sm:text-xs
              "
            >
              Country profile
            </span>
          </div>

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2
                id="country-heading"
                className="
                  font-heading font-semibold
                  text-[clamp(3rem,7vw,6.5rem)]
                  leading-[1.05]
                  tracking-[-0.055em]
                  text-white
                "
              >
                {country}
                <span className="text-[#8CB9E2]">.</span>
              </h2>

              <p
                className="
                  mt-5 max-w-lg
                  text-base leading-relaxed
                  text-white/50
                "
              >
                A closer look at the people, health and economy shaping{" "}
                {country}.
              </p>
            </div>

            <span
              className="
                hidden font-mono text-[10px]
                uppercase tracking-[0.2em]
                text-white/30 lg:block
              "
            >
              Explore · Compare · Understand
            </span>
          </div>
        </header>

        {/* ==================================
            DASHBOARD
        ================================== */}
        <div
          className="
            overflow-hidden
            rounded-[24px]
            border border-[#8CB9E2]/15
            bg-[#060C17]/75
            shadow-[0_24px_80px_rgba(0,0,0,0.22)]
          "
        >
          {/* Navigation */}
          <div
            className="
              flex flex-col gap-5
              border-b border-white/[0.07]
              px-5 pt-6
              sm:px-7 md:px-9
              md:pt-8
            "
          >
            <div className="flex items-center justify-between gap-4">
              <span
                className="
                  font-mono text-[10px]
                  uppercase tracking-[0.2em]
                  text-white/40
                "
              >
                Country data / Overview
              </span>

              <span
                className="
                  hidden font-mono text-[10px]
                  uppercase tracking-[0.2em]
                  text-[#8CB9E2]/60
                  sm:block
                "
              >
                Worldscope Atlas
              </span>
            </div>

            {/* Custom tab navigation */}
            <div
              role="tablist"
              aria-label={`${country} data categories`}
              className="
                flex gap-1 overflow-x-auto
                border-b border-white/[0.04]
              "
            >
              {tabs.map((tab) => {
                const active = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={active}
                    aria-controls="country-tab-panel"
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      group relative
                      flex shrink-0 items-center gap-2
                      px-4 pb-5 pt-3
                      text-sm
                      transition-colors duration-200
                      focus-visible:outline-2
                      focus-visible:outline-offset-[-2px]
                      focus-visible:outline-[#8CB9E2]
                      ${
                        active
                          ? "text-white"
                          : "text-white/40 hover:text-white/75"
                      }
                    `}
                  >
                    <span
                      className={`
                        font-mono text-[10px]
                        ${active ? "text-[#8CB9E2]" : "text-white/25"}
                      `}
                    >
                      {tab.number}
                    </span>

                    <span className="font-medium">{tab.label}</span>

                    {active && (
                      <motion.span
                        layoutId="active-country-tab"
                        transition={
                          reducedMotion
                            ? { duration: 0 }
                            : {
                                type: "spring",
                                stiffness: 380,
                                damping: 32,
                              }
                        }
                        className="
                          absolute bottom-0 left-0 right-0
                          h-[2px] rounded-full
                          bg-[#8CB9E2]
                        "
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ==================================
              TAB CONTENT
          ================================== */}
          <div
            id="country-tab-panel"
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="
              min-w-0 px-5 py-7
              sm:px-7
              md:px-9 md:py-9
            "
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${country}-${activeTab}`}
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "population" && (
                  <PopulationTab country={country} />
                )}

                {activeTab === "health" && <HealthTab country={country} />}

                {activeTab === "economy" && <EconomyTab country={country} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ==================================
            FOOTER
        ================================== */}
        <footer
          className="
            mt-7 flex flex-col
            justify-between gap-3
            font-mono text-[10px]
            uppercase tracking-[0.18em]
            text-white/30
            sm:flex-row
          "
        >
          <span>Worldscope / Country insights</span>
          <span>Data reveals perspective.</span>
        </footer>
      </div>
    </section>
  );
}
