"use client";

import Typewrite from "@/components/Typewrite";
import { useAnimatedValue } from "@/lib/hooks/use-animated-value";
import { motion } from "motion/react";
import Link from "next/link";

type Card = {
  title: string;
  value: number | string[] | string;
  duration?: number;
  animation?: "value" | "typewriter";
};

const cards: Card[] = [
  {
    title: "Projects",
    value: 10,
    animation: "value",
  },
  {
    title: "Experience",
    value: 15,
    animation: "value",
    duration: 1.6,
  },
  {
    title: "Expertise",
    value: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Javascript",
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
  return (
    <section className="h-screen w-full flex items-center">
      <div className="flex flex-col w-full h-3/4 sm:px-32 sm:py-20">
        <div className="flex w-full">
          <header className="flex flex-col px-4 flex-7">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl whitespace-nowrap">
              Ruben Andino
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl">
              Full Stack Web Developer
            </h2>
            <p className="mt-20 sm:text-2xl">
              Bridging the gap between business needs and web applications
            </p>
          </header>
          <div className="flex flex-col flex-1 w-full h-fit justify-start items-start gap-y-10">
            {cards.map((card) => (
              <Card key={card.title} {...card} />
            ))}
          </div>
        </div>
        <Links />
      </div>
    </section>
  );
}

const Card = ({
  value,
  title,
  duration,
  animation,
}: {
  value: number | string[] | string;
  title: string;
  duration?: number;
  animation?: "value" | "typewriter";
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
    <div className="flex flex-1 w-full px-5">
      <div className="bg-primary z-10 shadow-md dark:shadow-2xl shadow-foreground-primary/10 h-fit rounded-2xl  w-full">
        <div className="py-5 px-10 flex flex-col w-xs">
          <h3 className="text-2xl font-general-sans tracking-tight text-foreground-primary w-full">
            {title}
          </h3>
          {animation === "value" && (
            <div className="flex items-center gap-x-2 font-bold text-foreground-secondary">
              <motion.p className="text-4xl">{animatedValue}</motion.p>
              <span className="text-4xl">+</span>
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
    </div>
  );
};

const Links = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Link href="/">h</Link>
    </div>
  );
};
