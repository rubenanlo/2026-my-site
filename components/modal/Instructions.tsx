"use client";

import { springIn } from "@/lib/animations";
import { AnimatePresence, motion } from "motion/react";

interface InstructionsProps {
  isVisible: boolean;
}

export default function Instructions({ isVisible }: InstructionsProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute top-10 right-10 translate-y-1/2 bg-primary/70 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 max-w-sm mx-auto"
          {...springIn({})}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <span>💡</span>
              <span>Click and drag to explore all skills</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
