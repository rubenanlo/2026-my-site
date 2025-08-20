import { fadeInBelow } from "@/lib/animations";
import { motion } from "motion/react";

const Logo = () => {
  return (
    <motion.div
      {...fadeInBelow({ duration: 0.7, ease: "easeOut" })}
      className="flex -space-y-3 flex-col"
    >
      <span className="font-extrabold text-2xl tracking-tight logo text-accent">
        raw
      </span>
      <span className="font-extrabold text-2xl tracking-tighter logo">Dev</span>
    </motion.div>
  );
};

export default Logo;
