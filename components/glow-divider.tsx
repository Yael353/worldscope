"use client";

import { motion } from "framer-motion";

export function GlowDivider() {
  return (
    <div className="relative h-px w-full">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="h-px w-full bg-linear-to-r from-transparent via-primary to-transparent"
      />
    </div>
  );
}
