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
            ? className || `sticky z-${10 + index * 10}`
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
      <main ref={containerRef} className="relative">
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
