"use client";

import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";
import Typewrite from "@/components/Typewrite";
import { useAnimatedValue } from "@/lib/hooks/use-animated-value";
import clsx from "clsx";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
      "Tailwind",
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
  const textRef = useRef<HTMLParagraphElement>(null);
  const [textWidth, setTextWidth] = useState<number>(0);

  const measureTextWidth = () => {
    if (textRef.current) {
      const width = textRef.current.getBoundingClientRect().width;
      setTextWidth(width);
      console.log("Text width:", width);
    }
  };

  useEffect(() => {
    measureTextWidth();

    // Optional: Re-measure on window resize
    const handleResize = () => measureTextWidth();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="h-screen w-full flex items-center">
      <div className="flex flex-col w-full h-3/4 sm:px-38 sm:py-20 justify-center">
        <div className="flex w-full">
          <header className="flex flex-col flex-7 justify-between">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl whitespace-nowrap">
              Ruben Andino
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl flex-1">
              Full Stack Web Developer
            </h2>
            <motion.p
              ref={textRef}
              className="mt-20 sm:text-2xl flex-2 w-fit max-w-3/4"
            >
              Bridging the gap between business needs and web applications
            </motion.p>
            <SectionFooter style={{ width: textWidth }} />
          </header>
          <div className="flex flex-col flex-1 w-full h-fit justify-between items-between gap-y-10">
            {cards.map((card) => (
              <Card key={card.title} {...card} />
            ))}
          </div>
        </div>
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

const SectionFooter = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <div className={"flex items-center gap-x-2"} style={style}>
      <Link href="/">
        <div className="p-[1px] bg-gradient rounded-md">
          <LinkedInIcon className="w-[2.89rem] h-[2.89rem]" />
        </div>
      </Link>
      <Link href="/">
        <div className="p-[1px] bg-gradient rounded-md">
          <GitHubIcon className="w-[2.89rem] h-[2.89rem]" />
        </div>
      </Link>
      <Link href={`mailto:randinocv@gmail.com`} className="ml-auto">
        <Button className="cursor-pointer">Contact me</Button>
      </Link>
    </div>
  );
};

const Button = ({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default";
}) => {
  const variants = {
    default:
      "px-10 py-3 bg-foreground-primary rounded-md text-primary font-bold",
  };
  return (
    <button className={clsx(variants[variant], className)}>{children}</button>
  );
};
