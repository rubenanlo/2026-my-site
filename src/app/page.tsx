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
    sticky: false, // Hero section doesn't need sticky behavior
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
    // Skip hero section (index 0) as it doesn't need transforms
    if (index === 0) {
      return { y: 0, scale: 1, opacity: 1 };
    }

    // Calculate scroll ranges for each section with gaps
    const sectionIndex = index - 1; // Adjust for hero section
    const totalAnimatedSections = totalSections - 1; // Exclude hero

    // Create gaps between sections (each section uses 60% of available space, 40% is gap)
    const sectionDuration = 0.6; // How much of the scroll range each section uses
    const gapDuration = 0.4; // Gap between sections
    const totalDuration = sectionDuration + gapDuration;

    // Start and end points for this section's animation
    const startProgress =
      (sectionIndex * totalDuration) / totalAnimatedSections;
    const endProgress = startProgress + sectionDuration / totalAnimatedSections;
    const midProgress =
      startProgress + (sectionDuration * 0.75) / totalAnimatedSections;

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

    // Hero section doesn't need motion wrapper
    if (!section.sticky) {
      return <>{children}</>;
    }

    return (
      <motion.div
        style={{
          y: transforms.y,
          scale: transforms.scale,
          opacity: transforms.opacity,
        }}
        className={className || `sticky top-${index * 10} z-${10 + index * 10}`}
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

        {/* Spacer to create scroll distance */}
        {/* <div className="h-[300vh]" /> */}
      </main>
    </>
  );
}
