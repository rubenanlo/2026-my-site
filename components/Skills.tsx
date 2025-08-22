import LayoutSection from "@/components/layout/LayoutSection";
import clsx from "clsx";
import * as d3 from "d3";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface SkillsProps {
  topOffset?: number;
}

interface Skill {
  name: string;
  importance: number;
  color: string;
}

interface D3Node extends d3.SimulationNodeDatum {
  id: number;
  name: string;
  importance: number;
  radius: number;
}

const skillsData: Skill[] = [
  { name: "React", importance: 8, color: "bg-yellow/40" },
  { name: "TypeScript", importance: 4, color: "bg-orange/40" },
  { name: "Next.js", importance: 8, color: "bg-red/40" },
  { name: "Node.js", importance: 8, color: "bg-blue/40" },
  { name: "JavaScript", importance: 9, color: "bg-pink/40" },
  { name: "Python", importance: 3, color: "bg-dark-blue/40" },
  { name: "TailwindCSS", importance: 8, color: "bg-sunshine-yellow/40" },
  { name: "AWS", importance: 7, color: "bg-dark-pink/40" },
  { name: "PostgreSQL", importance: 2, color: "bg-midnight-red/40" },
  { name: "MongoDB", importance: 6, color: "bg-yellow/40" },
  { name: "Notion", importance: 5, color: "bg-orange/40" },
  { name: "Project management", importance: 12, color: "bg-red/40" },
  { name: "Automation", importance: 12, color: "bg-blue/40" },
  { name: "Motion", importance: 6, color: "bg-pink/40" },
  { name: "Business Acumen", importance: 12, color: "bg-dark-blue/40" },
  { name: "Data Analysis", importance: 6, color: "bg-sunshine-yellow/40" },
  { name: "and more...", importance: 20, color: "bg-dark-pink/40" },
];

export default function Skills({ topOffset = 0 }: SkillsProps) {
  const [bubblePositions, setBubblePositions] = useState<
    Array<{ x: number; y: number }>
  >([]);
  const [screenSize, setScreenSize] = useState<number>(0);

  useEffect(() => {
    const generateD3Positions = () => {
      if (typeof window === "undefined") return [];

      const containerWidth = Math.min(window.innerWidth - 32, 1000);
      const containerHeight =
        window.innerWidth < 640 ? 300 : window.innerWidth < 1024 ? 500 : 1000;
      const radius = Math.min(containerWidth, containerHeight) / 2 - 50;

      // Create D3 nodes with bubble data
      const nodes: D3Node[] = skillsData.map((skill, index) => ({
        id: index,
        name: skill.name,
        importance: skill.importance,
        radius: getSize(skill.importance) / 2, // D3 works with radius, not diameter
        x: 0, // Start at center
        y: 0,
      }));

      // Create D3 force simulation
      const simulation = d3
        .forceSimulation(nodes)
        .force(
          "collision",
          d3.forceCollide().radius((d: any) => (d as D3Node).radius + 15)
        ) // 15px padding
        .force("center", d3.forceCenter(0, -100)) // Move bubbles up by 100px
        .force("charge", d3.forceManyBody().strength(-50)) // Slight repulsion
        .force("boundary", () => {
          // Custom force to keep bubbles within circular boundary
          nodes.forEach((node) => {
            const x = node.x ?? 0;
            const y = node.y ?? 0;
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = radius - node.radius;

            if (distance > maxDistance && distance > 0) {
              const scale = maxDistance / distance;
              node.x = x * scale;
              node.y = y * scale;
            }
          });
        })
        .alphaDecay(0.05) // Slower cooling for better convergence
        .velocityDecay(0.8) // More damping for stability
        .stop(); // We'll run it manually

      // Run simulation for a fixed number of iterations
      for (let i = 0; i < 300; ++i) simulation.tick();

      // Extract final positions with fallback values
      return nodes.map((node) => ({
        x: node.x ?? 0,
        y: node.y ?? 0,
      }));
    };

    // Generate initial positions
    setBubblePositions(generateD3Positions());

    // Add resize listener for dynamic repositioning
    const handleResize = () => {
      setScreenSize(window.innerWidth);
      // Debounce the repositioning to avoid too many calculations
      setTimeout(() => {
        setBubblePositions(generateD3Positions());
      }, 100);
    };

    // Set initial screen size
    if (typeof window !== "undefined") {
      setScreenSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize]);

  const getSize = (importance: number) => {
    // Scale size based on importance (now handling 2-20 scale with responsive sizing)
    const normalizedImportance = Math.min(Math.max(importance, 2), 20); // Clamp between 2-20
    const importanceRatio = (normalizedImportance - 2) / 18; // Normalize to 0-1 range

    if (typeof window !== "undefined") {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        // Mobile
        const minSize = 40;
        const maxSize = 120;
        return minSize + importanceRatio * (maxSize - minSize);
      } else if (screenWidth < 1024) {
        // Tablet
        const minSize = 60;
        const maxSize = 180;
        return minSize + importanceRatio * (maxSize - minSize);
      }
    }
    // Desktop (default)
    const minSize = 80;
    const maxSize = 320;
    return minSize + importanceRatio * (maxSize - minSize);
  };

  const getFontSize = (importance: number) => {
    // Scale font size based on importance (2-20 scale)
    const normalizedImportance = Math.min(Math.max(importance, 2), 20);
    const importanceRatio = (normalizedImportance - 2) / 18;

    if (typeof window !== "undefined") {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        // Mobile
        const minFont = 8;
        const maxFont = 18;
        return minFont + importanceRatio * (maxFont - minFont);
      } else if (screenWidth < 1024) {
        // Tablet
        const minFont = 10;
        const maxFont = 22;
        return minFont + importanceRatio * (maxFont - minFont);
      }
    }
    // Desktop (default)
    const minFont = 12;
    const maxFont = 32;
    return minFont + importanceRatio * (maxFont - minFont);
  };

  return (
    <LayoutSection id="skills-section" topOffset={topOffset}>
      <div className="relative flex items-center justify-center w-full max-w-[1000px] h-[300px] sm:h-[500px] lg:h-[1000px] mx-auto rounded-full px-4 sm:px-6 lg:px-8">
        {skillsData.map((skill, index) => {
          const position = bubblePositions[index];
          const size = getSize(skill.importance);
          const fontSize = getFontSize(skill.importance);
          const zIndex = Math.floor(skill.importance * 5); // Higher importance = higher z-index for visibility

          if (!position) return null;

          return (
            <motion.div
              key={skill.name}
              className={clsx(
                "absolute rounded-full  shadow-lg hover:shadow-xl cursor-pointer select-none flex items-center justify-center",
                skill.color
              )}
              style={{
                width: size,
                height: size,
                left: `calc(50% + ${position.x}px)`,
                top: `calc(50% + ${position.y}px)`,
                transform: "translate(-50%, -50%)",
                zIndex: zIndex,
              }}
              initial={{
                scale: 0,
                opacity: 0,
                rotate: Math.random() * 360,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: 0,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.1,
                zIndex: 1000, // Bring to very front on hover
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              <span
                className="text-gray-800 font-semibold text-center px-2 leading-tight"
                style={{ fontSize: `${fontSize}px` }}
              >
                {skill.name}
              </span>

              {/* Floating animation */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            </motion.div>
          );
        })}

        {/* Central glow effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
          <div className="absolute w-64 h-64 bg-gradient-to-r from-pink-400/10 to-yellow-400/10 rounded-full blur-2xl" />
        </div>
      </div>
    </LayoutSection>
  );
}
