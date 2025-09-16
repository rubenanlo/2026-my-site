import { increaseWidth } from "@/lib/animations";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

export const ActionLink = ({ href, text }: { href: string; text: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-fit"
    >
      <Link href={href} target="_blank" className={"cursor-pointer"}>
        {text}
      </Link>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            {...increaseWidth({})}
            className="absolute moonlight-gradient w-32 h-[2px] rounded-full"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
