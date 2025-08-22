import LayoutSection from "@/components/layout/LayoutSection";

interface SkillsProps {
  topOffset?: number;
}

export default function Skills({ topOffset = 0 }: SkillsProps) {
  return (
    <LayoutSection id="skills-section" topOffset={topOffset}>
      <div className="text-center">
        <h2 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Skills
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Technologies and expertise I bring to the table
        </p>
      </div>
    </LayoutSection>
  );
}
