"use client";

import Background from "@/components/Background";
import BlogPosts from "@/components/BlogPosts";
import Loading from "@/components/modal/Loading";
import Projects from "@/components/Projects";
import SectionHero from "@/components/SectionHero";
import Skills from "@/components/Skills";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";
import { useSectionTransforms } from "@/lib/hooks/use-section-transform";
import { motion, useScroll } from "motion/react";
import { useRef } from "react";

const sections = [
  {
    id: "hero",
    title: "Hero",
    component: SectionHero,
    sticky: true, // Hero section doesn't need sticky behavior
  },
  {
    id: "projects",
    title: "Projects",
    component: Projects,
    sticky: true,
  },
  {
    id: "skills",
    title: "Skills",
    component: Skills,
    sticky: true,
  },
  {
    id: "blog",
    title: "Blog",
    component: BlogPosts,
    sticky: true,
  },
];

type SectionsBehavior = "stack" | "fixed";
const sectionsBehavior: SectionsBehavior = "stack";

// Helper function to get proper Tailwind z-index classes
const getZIndexClass = (index: number) => {
  const zIndexMap = {
    0: "z-10", // Hero
    1: "z-20", // Projects
    2: "z-30", // Skills
    3: "z-40", // Blog
  };
  return zIndexMap[index as keyof typeof zIndexMap] || "z-10";
};

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Generate transforms for all sections
  const sectionTransforms = useSectionTransforms(
    scrollYProgress,
    sections.length,
    sections
  );

  const SectionWrapper = ({
    children,
    index,
    className,
  }: {
    children: React.ReactNode;
    index: number;
    className?: string;
  }) => {
    const section = sections[index];
    const transforms = sectionTransforms[index];

    const isMounted = useIsMounted();

    if (!isMounted) return <Loading />;

    return (
      <motion.div
        style={{
          y: transforms.y,
          scale: transforms.scale,
          opacity: transforms.opacity,
          visibility: transforms.visibility,
          top:
            section.sticky && sectionsBehavior === "stack"
              ? `${index * 10}px`
              : section.sticky
              ? 0
              : undefined,
        }}
        className={
          section.sticky
            ? className || `sticky ${getZIndexClass(index)}`
            : className || "relative"
        }
      >
        {children}
      </motion.div>
    );
  };

  return (
    <>
      <Background
        variant="default"
        animate={true}
        useAllSteps={true}
        shape="default"
      />
      <main className="relative lg:hidden">
        <div className="flex flex-col items-center justify-center h-screen max-w-2xl mx-auto gap-y-10">
          <h1 className="text-2xl font-bold text-center">
            Website currently for desktop version only.
          </h1>
          <p className="text-center">
            Working hard to bring you a mobile version of my website. In the
            meantime, please use a desktop device to view my portfolio.
          </p>
        </div>
      </main>
      <main ref={containerRef} className="relative hidden lg:block">
        {sections.map(({ id, component: Component }, index) => (
          <SectionWrapper key={id} index={index}>
            <Component
              topOffset={sectionsBehavior === "stack" ? index * 10 : 0}
            />
          </SectionWrapper>
        ))}
      </main>
    </>
  );
}
