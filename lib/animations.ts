import type { Transition } from "motion/react";
import { Easing } from "motion/react";

type AnimationProps = {
  opacity?: number;
  y?: number;
  x?: number;
  scale?: number;
  height?: string | number;
  width?: string | number;
  borderBottom?: string;
  duration?: number;
  ease?: Easing | Easing[];
  delay?: number;
  filter?: string;
  condition?: boolean;
};

type Props = {
  initial?: AnimationProps;
  animate: AnimationProps;
  exit?: AnimationProps;
  transition?: Transition;
};

export const fadeInBelow = ({
  duration = 0.7,
  ease,
}: AnimationProps): Props => {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration,
      ease: ease || "easeOut",
    },
  };
};

export const blurIn = ({
  duration = 0.3,
  ease,
  delay = 0.2,
}: AnimationProps): Props => {
  return {
    initial: { opacity: 0, filter: "blur(10px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    transition: {
      duration,
      ease: ease || "easeOut",
      delay,
    },
  };
};

export const fadeInLeft = ({
  duration = 0.2,
  ease,
  delay = 0.2,
}: AnimationProps): Props => {
  return {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration, ease: ease || "easeOut", delay },
  };
};

export const moveFromLeft = ({
  duration = 0.2,
  ease,
  delay = 0.2,
  condition = false,
}: AnimationProps): Props => {
  return {
    animate: { x: condition ? 10 : 0 },
    transition: {
      duration,
      ease: ease || "easeOut",
      delay,
    },
  };
};
