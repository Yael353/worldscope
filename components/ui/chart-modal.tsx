"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function ChartModal({
  isOpen,
  onClose,
  title,
  children,
}: ChartModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-12"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl h-[70vh] rounded-3xl border border-primary/20 bg-[#050508]/95 p-8 flex flex-col shadow-[0_0_100px_-20px_rgba(34,211,238,0.2)]"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-heading text-2xl text-white">{title}</h3>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-white transition-colors text-xl"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 min-h-0">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
