import BubbleWords, { type Skill } from "@/components/BubbleWords";
import LayoutSection from "@/components/layout/LayoutSection";
import Instructions from "@/components/modal/Instructions";
import { useInView } from "motion/react";
import { useRef, useState } from "react";

interface SkillsProps {
  topOffset?: number;
}

const skillsData: Skill[] = [
  { name: "React", importance: 8, color: "sun-gradient" },
  { name: "TypeScript", importance: 4, color: "dark-pink-blue-gradient" },
  { name: "Next.js", importance: 8, color: "sun-gradient" },
  { name: "Node.js", importance: 8, color: "dark-pink-blue-gradient" },
  { name: "JavaScript", importance: 9, color: "dark-pink-blue-gradient" },
  { name: "Python", importance: 3, color: "dark-pink-blue-gradient" },
  { name: "TailwindCSS", importance: 8, color: "moonlight-gradient" },
  { name: "AWS", importance: 7, color: "yellow-orange-gradient" },
  { name: "PostgreSQL", importance: 2, color: "yellow-orange-gradient" },
  { name: "MongoDB", importance: 6, color: "yellow-orange-gradient" },
  { name: "Notion", importance: 5, color: "moonlight-gradient" },
  {
    name: "Project management",
    importance: 12,
    color: "red-gradient",
  },
  { name: "Automation", importance: 12, color: "red-gradient" },
  { name: "Motion", importance: 6, color: "moonlight-gradient" },
  { name: "Business Acumen", importance: 12, color: "red-gradient" },
  { name: "Data Analysis", importance: 6, color: "red-gradient" },
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
          <h2
            className="font-bold text-gray-600 text-5xl self-start"
            ref={viewRef}
          >
            Skills and Tools
          </h2>
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
