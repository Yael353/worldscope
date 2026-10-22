"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PopulationTab } from "./tabs/population-tab";
import { HealthTab } from "./tabs/health-tab";
import { EconomyTab } from "./tabs/economy-tab";

export function CountryPanel({ country }: { country: string }) {
  const [activeTab, setActiveTab] = useState("population");

  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 h-screen w-full flex flex-col items-center justify-center px-6 py-12"
    >
      <div className="w-full h-full max-h-225 rounded-3xl border border-primary/20 bg-card/50 backdrop-blur-sm p-6 md:p-8 flex flex-col gap-6">
        {/* Rubrikrad */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-heading text-4xl md:text-5xl text-white">
              {country}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Data overview</p>
          </div>
        </div>

        {/* Flikar */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col min-h-0"
        >
          <TabsList className="bg-white/5 border border-white/10 w-fit">
            <TabsTrigger value="population">Population</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="economy">Economy</TabsTrigger>
          </TabsList>

          {/* Innehåll */}
          <div className="flex-1 mt-6 min-h-0 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {activeTab === "population" && (
                  <PopulationTab country={country} />
                )}
                {activeTab === "health" && <HealthTab country={country} />}
                {activeTab === "economy" && <EconomyTab country={country} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </Tabs>
      </div>
    </motion.section>
  );
}
