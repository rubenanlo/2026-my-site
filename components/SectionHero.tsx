"use client";

import Typewrite from "@/components/Typewrite";
import { blurIn } from "@/lib/animations";
import { useAnimatedValue } from "@/lib/hooks/use-animated-value";
import OImage from "@/optimization/components/OImage";
import clsx from "clsx";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Card = {
  title: string;
  value: number | string[] | string;
  duration?: number;
  image?: string;
  animation?: "value" | "typewriter";
  label?: string;
};

import { links } from "@/lib/links";

const cards: Card[] = [
  {
    title: "Projects",
    value: 10,
    animation: "value",
    image: "mitigation_toolkit",
  },
  {
    title: "Career Jorney",
    value: 15,
    animation: "value",
    duration: 1.6,
    label: "years",
  },
  {
    title: "Tech Stack",
    value: [
      "React",
      "Next.js",
      "Tailwind",
      "TypeScript",
      "JavaScript",
      "Python",
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "Docker",
      "Git",
      "AWS",
      "CI/CD",
      "Agile",
      "Scrum",
      "Kanban",
      "motion",
      "Notion",
    ],
    animation: "typewriter",
  },
];

export default function SectionHero() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [textWidth, setTextWidth] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  const measureTextWidth = () => {
    if (textRef.current && isClient) {
      const width = textRef.current.getBoundingClientRect().width;
      setTextWidth(width);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        measureTextWidth();
      });

      // Optional: Re-measure on window resize
      const handleResize = () => measureTextWidth();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isClient]);

  return (
    <motion.section
      {...blurIn({ delay: 0.2 })}
      className="h-screen w-full flex items-center"
    >
      <div className="flex flex-col w-full h-3/4 sm:px-38 sm:py-20 justify-center">
        <div className="flex w-full justify-between gap-x-20">
          <header className="flex flex-col w-full justify-between">
            <div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl">Ruben Andino</h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl">
                Full Stack Web Developer
              </h2>
              <motion.p
                ref={textRef}
                className="sm:text-2xl w-fit max-w-3/4 mt-10"
              >
                Bridging the gap between business needs and web applications
              </motion.p>
            </div>
            <SectionFooter style={{ width: textWidth }} />
          </header>
          <div className="flex flex-col h-fit justify-between items-between gap-y-5 shrink-0">
            {cards.map((card, index) => (
              <Card
                key={card.title}
                {...card}
                className={
                  index === 0
                    ? "-rotate-10"
                    : index === 2
                    ? "rotate-10"
                    : "-ml-5"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

const Card = ({
  value,
  title,
  duration,
  animation,
  image,
  className,
  label,
}: {
  value: number | string[] | string;
  title: string;
  duration?: number;
  animation?: "value" | "typewriter";
  className?: string;
  image?: string;
  label?: string;
}) => {
  // Only use animated value for numeric values
  const animatedValue = useAnimatedValue({
    from: 0,
    to: typeof value === "number" ? value : 0,
    animations: {
      duration,
    },
  });

  return (
    <div className={clsx("relative flex flex-1 w-full px-5", className)}>
      <div className="relative bg-primary z-10 shadow-md dark:shadow-2xl shadow-foreground-primary/10 h-fit rounded-2xl  w-full">
        <div className="py-5 px-10 flex flex-col w-xs gap-y-2">
          <h3 className="text-2xl font-general-sans tracking-tight text-foreground-primary w-full">
            {title}
          </h3>
          {animation === "value" && (
            <div className="flex items-center gap-x-2 font-bold text-foreground-secondary">
              <motion.p className="text-4xl">{animatedValue}</motion.p>
              {label ? (
                <span className="text-4xl">+ {label}</span>
              ) : (
                <span className="text-4xl">+</span>
              )}
            </div>
          )}
          {animation === "typewriter" && (
            <Typewrite
              text={value as string[]}
              whenToStart={1}
              speed={300}
              className="text-4xl font-bold text-foreground-secondary gradient"
              backspaceFactor={0.1}
            />
          )}
          {!animation && (
            <div className="flex items-center gap-x-2 font-bold text-foreground-secondary">
              <p className="text-4xl">{value}</p>
            </div>
          )}
        </div>
      </div>
      {image && (
        <OImage
          original={image}
          className="absolute w-32 z-10 right-10 top-6 opacity-50 rotate-5 rounded-sm"
        />
      )}
    </div>
  );
};

const SectionFooter = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <div className={"flex gap-x-2"} style={style}>
      {links.map(({ component: Component, ...link }) => {
        // Handle button separately to avoid nesting interactive elements
        if (!link.icon && link.text) {
          return (
            <Link
              href={link.href}
              key={link.label}
              target={link.target}
              rel="noopener noreferrer"
              className={clsx(
                "ml-auto px-10 py-3 bg-foreground-primary rounded-md text-primary font-bold cursor-pointer"
              )}
            >
              {link.text}
            </Link>
          );
        }

        // Handle icons normally
        return (
          <Link
            href={link.href}
            key={link.label}
            target={link.target}
            rel="noopener noreferrer"
            className={clsx("p-[1px] bg-gradient rounded-md")}
          >
            <Component className="w-[2.89rem] h-[2.89rem]" />
          </Link>
        );
      })}
    </div>
  );
};
