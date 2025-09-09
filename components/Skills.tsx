import BubbleWords, { type Skill } from "@/components/BubbleWords";
import LayoutSection from "@/components/layout/LayoutSection";
import Instructions from "@/components/modal/Instructions";
import { useInView } from "motion/react";
import { useRef, useState } from "react";

interface SkillsProps {
  topOffset?: number;
}

const skillsData: Skill[] = [
  { name: "React", importance: 8, color: "bg-white/20" },
  { name: "TypeScript", importance: 4, color: "bg-white/20" },
  { name: "Next.js", importance: 8, color: "bg-white/20" },
  { name: "Node.js", importance: 8, color: "bg-white/20" },
  { name: "JavaScript", importance: 9, color: "bg-white/20" },
  { name: "Python", importance: 3, color: "bg-white/20" },
  { name: "TailwindCSS", importance: 8, color: "bg-white/20" },
  { name: "AWS", importance: 7, color: "bg-white/20" },
  { name: "PostgreSQL", importance: 2, color: "bg-white/20" },
  { name: "MongoDB", importance: 6, color: "bg-white/20" },
  { name: "Notion", importance: 5, color: "bg-white/20" },
  { name: "Project management", importance: 12, color: "bg-white/20" },
  { name: "Automation", importance: 12, color: "bg-white/20" },
  { name: "Motion", importance: 6, color: "bg-white/20" },
  { name: "Business Acumen", importance: 12, color: "bg-white/20" },
  { name: "Data Analysis", importance: 6, color: "bg-white/20" },
];

export default function Skills({ topOffset = 0 }: SkillsProps) {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleOverflowChange = (hasOverflow: boolean) => {
    if (hasOverflow) {
      setShowInstructions(true);
    }
  };

  const viewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(viewRef, {
    once: true,
    amount: 0.5,
  });

  return (
    <LayoutSection id="skills-section" topOffset={topOffset}>
      <div className="flex w-full sm:px-38 sm:py-20 gap-x-20">
        <div className="flex flex-col gap-y-4 justify-center flex-1">
          <p
            className="font-bold text-gray-600 text-5xl self-start"
            ref={viewRef}
          >
            Skills and Tools
          </p>
          <p className="text-gray-600 text-lg self-start">
            I've acquired a wide range of skills and technical knowledge
            front-end development, back-end development and soft skills.
          </p>
        </div>
        <BubbleWords
          skillsData={skillsData}
          isInView={isInView}
          onOverflowChange={handleOverflowChange}
        />
      </div>

      {/* Instructions Modal */}
      <Instructions isVisible={showInstructions} />
    </LayoutSection>
  );
}
