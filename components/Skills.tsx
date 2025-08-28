import LayoutSection from "@/components/layout/LayoutSection";
import clsx from "clsx";
import * as d3 from "d3";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const [bubblePositions, setBubblePositions] = useState<
    Array<{ x: number; y: number }>
  >([]);
  const [screenSize, setScreenSize] = useState<number>(0);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasOverflow, setHasOverflow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate consistent tilt angles for each skill
  const getTiltClass = (index: number) => {
    const tiltOptions = [
      "rotate-1",
      "rotate-2",
      "rotate-3",
      "rotate-6",
      "rotate-12",
      "-rotate-1",
      "-rotate-2",
      "-rotate-3",
      "-rotate-6",
      "-rotate-12",
    ];
    return tiltOptions[index % tiltOptions.length];
  };

  useEffect(() => {
    const generateD3Positions = () => {
      if (typeof window === "undefined") return [];

      const simContainerWidth = Math.min(window.innerWidth - 32, 1000);
      const simContainerHeight =
        window.innerWidth < 640 ? 300 : window.innerWidth < 1024 ? 500 : 1000;
      const radius = Math.min(simContainerWidth, simContainerHeight) / 2 - 50;

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
        .alphaDecay(0.05) // Slower cooling for better convergence
        .velocityDecay(0.8) // More damping for stability
        .stop(); // We'll run it manually

      // Run simulation for a fixed number of iterations
      for (let i = 0; i < 300; ++i) simulation.tick();

      // Extract final positions with fallback values
      const positions = nodes.map((node) => ({
        x: node.x ?? 0,
        y: node.y ?? 0,
      }));

      // Check for overflow by seeing if any bubbles extend beyond the circular boundary
      let overflow = false;
      positions.forEach((pos, index) => {
        const size = getSize(skillsData[index].importance);
        const bubbleRadius = size / 2;
        const distanceFromCenter = Math.sqrt(pos.x * pos.x + pos.y * pos.y);

        // Check if bubble extends beyond the circular container radius
        if (distanceFromCenter + bubbleRadius > radius) {
          overflow = true;
        }
      });

      setHasOverflow(overflow);
      return positions;
    };

    // Generate initial positions
    setBubblePositions(generateD3Positions());

    // Add resize listener for dynamic repositioning
    const handleResize = () => {
      setScreenSize(window.innerWidth);
      // Reset pan offset on resize to prevent issues
      setPanOffset({ x: 0, y: 0 });
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

  // Drag handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!hasOverflow) return;
      e.preventDefault(); // Prevent text selection
      setIsDragging(true);
      setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    },
    [hasOverflow, panOffset]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!hasOverflow) return;
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - panOffset.x,
        y: touch.clientY - panOffset.y,
      });
    },
    [hasOverflow, panOffset]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || !hasOverflow) return;
      e.preventDefault();
      const touch = e.touches[0];
      let newX = touch.clientX - dragStart.x;
      let newY = touch.clientY - dragStart.y;

      // Add boundary constraints to prevent dragging too far
      const maxOffset = 200; // Maximum drag distance in pixels
      newX = Math.max(-maxOffset, Math.min(maxOffset, newX));
      newY = Math.max(-maxOffset, Math.min(maxOffset, newY));

      setPanOffset({ x: newX, y: newY });
    },
    [isDragging, hasOverflow, dragStart]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add global mouse up listener
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseUp = () => setIsDragging(false);
      const handleGlobalMouseMove = (e: MouseEvent) => {
        if (!hasOverflow) return;
        e.preventDefault();
        let newX = e.clientX - dragStart.x;
        let newY = e.clientY - dragStart.y;

        // Add boundary constraints to prevent dragging too far
        const maxOffset = 200; // Maximum drag distance in pixels
        newX = Math.max(-maxOffset, Math.min(maxOffset, newX));
        newY = Math.max(-maxOffset, Math.min(maxOffset, newY));

        setPanOffset({ x: newX, y: newY });
      };

      document.addEventListener("mouseup", handleGlobalMouseUp);
      document.addEventListener("mousemove", handleGlobalMouseMove);

      return () => {
        document.removeEventListener("mouseup", handleGlobalMouseUp);
        document.removeEventListener("mousemove", handleGlobalMouseMove);
      };
    }
  }, [isDragging, hasOverflow, dragStart]);

  return (
    <LayoutSection id="skills-section" topOffset={topOffset}>
      <div className="flex border w-full sm:px-38 sm:py-20">
        <div className="flex flex-col gap-y-4 justify-center flex-1">
          <p className="font-bold text-gray-600 text-5xl self-start">
            Skills and Tools
          </p>
          <p className="text-gray-600 text-lg self-start">
            I've worked with a wide range of technologies, from front-end
            development to back-end development and everything in between.
          </p>
          {hasOverflow && (
            <p className="text-gray-500 text-sm self-start italic">
              💡 Drag to explore all skills
            </p>
          )}
        </div>
        <div
          ref={containerRef}
          className={clsx(
            "relative flex items-center justify-center flex-3 h-[300px] sm:h-[500px] lg:h-[1000px] mx-auto rounded-full px-4 sm:px-6 lg:px-8 overflow-hidden select-none",
            hasOverflow && "cursor-grab",
            isDragging && "cursor-grabbing"
          )}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
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
                  "absolute rounded-full  shadow-lg hover:shadow-xl select-none flex items-center justify-center",
                  skill.color,
                  getTiltClass(index),
                  hasOverflow ? "pointer-events-none" : "cursor-pointer"
                )}
                style={{
                  width: size,
                  height: size,
                  left: `calc(50% + ${position.x + panOffset.x}px)`,
                  top: `calc(50% + ${position.y + panOffset.y}px)`,
                  transform: "translate(-50%, -50%)",
                  zIndex: zIndex,
                }}
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
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
        </div>
      </div>
    </LayoutSection>
  );
}
