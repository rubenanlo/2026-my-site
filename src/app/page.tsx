"use client";

import Background from "@/components/Background";
import BlogPosts from "@/components/BlogPosts";
import Projects from "@/components/Projects";
import SectionHero from "@/components/SectionHero";
import Skills from "@/components/Skills";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";
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

// Function to generate transform values for each section
const useSectionTransforms = (
  scrollYProgress: MotionValue<number>,
  totalSections: number
) => {
  const transforms = sections.map((_, index) => {
    // Hero section (index 0) gets fade-out effect
    if (index === 0) {
      return {
        y: 0,
        scale: 1,
        opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]),
      };
    }

    // Calculate scroll ranges for each section with gaps
    const sectionIndex = index - 1; // Adjust for hero section
    const totalAnimatedSections = totalSections - 1; // Exclude hero

    // Distribute sections evenly across scroll progress
    const sectionSize = 1 / totalAnimatedSections; // Each section gets equal space
    const animationDuration = sectionSize * 0.8; // 80% of section space for animation
    const gapDuration = sectionSize * 0.2; // 20% gap between sections

    // Start and end points for this section's animation
    const startProgress = sectionIndex * sectionSize;
    const endProgress = Math.min(startProgress + animationDuration, 1.0);

    const midProgress = startProgress + animationDuration * 0.75;

    return {
      y: useTransform(scrollYProgress, [startProgress, endProgress], [100, 0]),
      scale: useTransform(
        scrollYProgress,
        [startProgress, endProgress],
        [0.8, 1]
      ),
      opacity: useTransform(
        scrollYProgress,
        [startProgress, midProgress, endProgress],
        [0, 0.5, 1]
      ),
    };
  });

  return transforms;
};

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Generate transforms for all sections
  const sectionTransforms = useSectionTransforms(
    scrollYProgress,
    sections.length
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

    return (
      <motion.div
        style={{
          y: transforms.y,
          scale: transforms.scale,
          opacity: transforms.opacity,
          top: section.sticky ? `${index * 10}px` : undefined,
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
            <Component />
          </SectionWrapper>
        ))}

        {/* Spacer to create scroll distance for animations */}
        <div className="h-[200vh]" />
      </main>
    </>
  );
}
