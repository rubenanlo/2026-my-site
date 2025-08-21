"use client";

import { useAnimatedValue } from "@/lib/hooks/use-animated-value";
import { Typewriter } from "motion-plus/react";
import { delay, motion, wrap } from "motion/react";
import Link from "next/link";
import { useState } from "react";

type Card = {
  title: string;
  value?: number;
  duration?: number;
  text?: string[];
};

const cards: Card[] = [
  {
    title: "Projects",
    value: 10,
  },
  {
    title: "Experience",
    value: 15,
    duration: 1.6,
  },
  {
    title: "Expertise",
    text: [
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
  text,
}: {
  value?: number;
  title: string;
  duration?: number;
  text?: string[];
}) => {
  const animatedValue = useAnimatedValue({
    from: 0,
    to: value,
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
          {value && (
            <div className="flex items-center gap-x-2 font-bold text-foreground-secondary">
              <motion.p className="text-4xl">{animatedValue}</motion.p>
              <span className="text-4xl">+</span>
            </div>
          )}

          {text && (
            <Typewrite
              text={text}
              whenToStart={1}
              speed={300}
              className="text-4xl font-bold text-foreground-secondary gradient"
              backspaceFactor={0.1}
            />
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

const Typewrite = ({
  text,
  whenToStart,
  speed,
  className,
  backspaceFactor,
  showCursor,
}: {
  text: string[];
  whenToStart: number;
  speed: number;
  className: string;
  backspaceFactor: number;
  showCursor?: boolean;
}) => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <Typewriter
        as="span"
        delay={whenToStart} // Initial delay before typing starts (1 second)
        speed={speed} // Typing speed in milliseconds per character
        onComplete={() => {
          // This fires when typing is complete
          // delay() takes seconds, not milliseconds
          delay(() => setIndex(wrap(0, text.length, index + 1)), 2); // Wait 2 seconds before starting to backspace/erase
        }}
        className={className}
        backspaceFactor={backspaceFactor} // Controls backspace speed (0.1 = very fast backspacing)
        cursorStyle={{ visibility: showCursor ? "visible" : "hidden" }}
      >
        {`${text[index]} `}
      </Typewriter>
    </div>
  );
};
