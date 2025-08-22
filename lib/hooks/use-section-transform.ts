import { MotionValue, useTransform } from "motion/react";

export const useSectionTransforms = (
  scrollYProgress: MotionValue<number>,
  totalSections: number,
  sections: Array<{
    id: string;
    title: string;
    component: React.ComponentType;
    sticky: boolean;
  }>
) => {
  const transforms = sections.map((_, index) => {
    // Hero section (index 0) gets fade-out effect
    if (index === 0) {
      return {
        y: 0,
        scale: 1,
        opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]),
        visibility: useTransform(
          scrollYProgress,
          [0, 0.2],
          ["visible", "hidden"]
        ),
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
      visibility: useTransform(scrollYProgress, [0, 1], ["visible", "visible"]), // Other sections remain visible
    };
  });

  return transforms;
};
