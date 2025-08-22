"use client";

import { motion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

import { unbounded } from "@/lib/fonts";

export default function Loading() {
  const progress = useMockLoading();
  const clipPath = useTransform(
    progress,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  return (
    <div className="absolute inset-0 h-screen w-screen flex justify-center items-center bg-transparent z-10">
      <div className="relative text-4xl font-bold">
        <motion.div
          className={`relative text-[64px] font-black text-foreground uppercase tracking-[-0.06em] ${unbounded.className}`}
          style={{ clipPath }}
        >
          Loading
        </motion.div>
      </div>
    </div>
  );
}

/**
 * ==============   Utils   ================
 */
const useMockLoading = (): ReturnType<typeof useSpring> => {
  const progress = useSpring(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newProgress = progress.get() + Math.random() * 0.1;

      if (newProgress >= 1) {
        progress.set(0);
      } else {
        progress.set(newProgress);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [progress]);

  return progress;
};
