"use client";

import clsx from "clsx";
import { motion } from "motion/react";

type GradientVariant = "default";

interface BackgroundProps {
  startColor?: string;
  middleColor?: string;
  endColor?: string;
  className?: string;
  variant?: GradientVariant;
  shape?: "default";
  animate?: boolean;
  useAllSteps?: boolean; // New prop to use all 9 glow steps
}

const gradientVariants: Record<
  GradientVariant,
  { start: string; middle: string; end: string }
> = {
  default: {
    start: "var(--glow-step-6)", // blue
    middle: "var(--glow-step-8)", // purple
    end: "var(--glow-step-3)", // coral
  },
};

export default function Background(props: BackgroundProps) {
  return <BackgroundGlow {...props} />;
}

const shapes = {
  default:
    "M 1020 320 C 500 0, 460 60, 580 240 C 420 320, 160 200, 240 520, 120 220, 240 420 C 160 420, 80 380, 60 300 C 40 220, 80 140, 160 120 C 240 100, 280 140, 320 120",
};

const generateRandomPath = (shape: keyof typeof shapes) => {
  const basePath = shapes[shape];
  // Split the path into its components
  const parts = basePath.split(/(?=[A-Z])/);

  // Add more pronounced random variation to each number while maintaining the shape
  const delta = 10;

  return parts
    .map((part) => {
      if (part.match(/[0-9]/)) {
        return part.replace(/[0-9]+(\.[0-9]+)?/g, (match) => {
          const num = parseFloat(match);
          const variance = num * delta; // Increased to 25% variance for more pronounced effect
          return (num + (Math.random() * variance * 2 - variance)).toFixed(1);
        });
      }
      return part;
    })
    .join("");
};

function BackgroundGlow({
  startColor,
  middleColor,
  endColor,
  className,
  variant = "default",
  shape = "default",
  animate = false,
  useAllSteps = false,
}: BackgroundProps) {
  const colors = startColor
    ? {
        start: startColor,
        middle: middleColor || "var(--glow-step-2)",
        end: endColor || "var(--glow-step-3)",
      }
    : gradientVariants[variant];

  // All 9 glow steps for rich gradient
  const allGlowSteps = [
    "var(--glow-step-1)", // #fff1ac - creamsicle light
    "var(--glow-step-2)", // #ff6f3c - creamsicle dark
    "var(--glow-step-3)", // #ffada0 - coral
    "var(--glow-step-4)", // #96d0ff - blue
    "var(--glow-step-5)", // #ffc1fd - pink
    "var(--glow-step-6)", // #5092c7 - darker blue
    "var(--glow-step-7)", // #ffb005 - yellow
    "var(--glow-step-8)", // #c679c4 - purple
    "var(--glow-step-9)", // #340b05 - midnight dark
  ];

  const PathComponent = animate ? motion.path : "path";

  return (
    <div
      className={clsx(
        "absolute inset-0 flex items-center justify-center opacity-30 overflow-hidden h-screen w-screen"
      )}
    >
      <svg
        viewBox="0 0 640 430"
        className={clsx("w-full h-full", className)}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient
            id="blob-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            {useAllSteps ? (
              allGlowSteps.map((color, index) => (
                <stop
                  key={index}
                  offset={`${(index / (allGlowSteps.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))
            ) : (
              // Use simple 3-color gradient
              <>
                <stop offset="0%" stopColor={colors.start} />
                <stop offset="50%" stopColor={colors.middle} />
                <stop offset="100%" stopColor={colors.end} />
              </>
            )}
          </linearGradient>
        </defs>
        <PathComponent
          d={shapes[shape]}
          fill="url(#blob-gradient)"
          animate={
            animate
              ? {
                  d: [
                    shapes[shape],
                    generateRandomPath(shape),
                    generateRandomPath(shape),
                    generateRandomPath(shape),
                    shapes[shape],
                  ],
                }
              : undefined
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
        />
      </svg>
    </div>
  );
}
