import { fadeInBelow } from "@/lib/animations";
import { motion } from "motion/react";

const Logo = () => {
  return (
    // Animated logo container
    <motion.div
      {...fadeInBelow({ duration: 0.7, ease: "easeOut" })}
      className="flex -space-y-3 flex-col"
    >
      {/* Logo text */}
      <span className="font-extrabold text-2xl tracking-tight logo text-accent">
        raw
      </span>
      {/* Accent dot for playful touch */}
      <span className="font-extrabold text-2xl tracking-tighter logo">Dev</span>
    </motion.div>
  );
};

export default Logo;
