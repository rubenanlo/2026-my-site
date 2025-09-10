import { ArrowRight } from "@/components/Icons";
import LayoutSection from "@/components/layout/LayoutSection";
import { fadeInLeft, moveFromLeft } from "@/lib/animations";
import OImage from "@/optimization/components/OImage";
import clsx from "clsx";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

interface ProjectsProps {
  topOffset?: number;
}

type Project = {
  title: string;
  tag: string;
  url: string;
};

type images = string[];

export default function Projects({ topOffset = 0 }: ProjectsProps) {
  const images: images = ["mitigation_toolkit", "sdr", "projects"];
  const projects: Project[] = [
    {
      title: "Mitigation Toolkit",
      tag: "Data visualization",
      url: "https://afolumitigationinventory.org/china?GWP=AR4&Source=FAO&Sector=Rice+Cultivation&System=Double+rice+cropping",
    },
    {
      title: "Image Processor",
      tag: "Simple image optimization for Nextjs",
      url: "https://github.com/rubenanlo/image-processor",
    },
    {
      title: "SDR",
      tag: "Data visualization",
      url: "https://dashboards.sdgindex.org/",
    },
    {
      title: "SDSN Intranet",
      tag: "CMS and analytics",
      url: "https://intranet-n405u3oj6-rubenanlos-projects.vercel.app/",
    },
  ];

  const [indexHovered, setIndexHovered] = useState<number | undefined>(
    undefined
  );

  return (
    <LayoutSection topOffset={topOffset} id="projects-section">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-x-10 w-full h-3/4 sm:px-38 sm:py-20">
        <div className="relative h-full flex-1 flex items-center">
          {images.map((image, index) => (
            <OImage
              key={image}
              original={image}
              className={clsx(
                "absolute -left-69 scale-200 rounded-2xl border border-foreground-primary/10",
                {
                  "rotate-10": index === 1,
                  "rotate-28": index === 2,
                }
              )}
            />
          ))}
        </div>
        <motion.ul className="flex-2 h-full flex flex-col justify-between gap-y-12">
          <div className="flex flex-col gap-y-4">
            <h2 className="font-bold text-gray-600 text-5xl">
              Relevant projects
            </h2>
            <p className="text-gray-600 text-lg self-start">
              Here you have a small sample of the projects I've worked on.
            </p>
          </div>

          <div className="flex flex-col gap-y-8">
            {projects.map(({ title, tag, url }, index) => (
              <motion.li className="relative flex items-end" key={title}>
                <motion.div
                  onHoverStart={() => setIndexHovered(index)}
                  onHoverEnd={() => setIndexHovered(undefined)}
                  id="project"
                  className="flex flex-col gap-y-2 w-full border-b"
                >
                  <Link href={url} target="_blank">
                    <p className="text-md">{tag}</p>
                    <div className="flex items-center justify-between">
                      <motion.h3
                        {...moveFromLeft({ condition: indexHovered === index })}
                        className="text-4xl mb-4"
                      >
                        {title}
                      </motion.h3>
                      {indexHovered === index && (
                        <motion.div {...fadeInLeft({ delay: 0.2 })}>
                          <ArrowRight className=" top-12 h-10 w-10" />
                        </motion.div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              </motion.li>
            ))}
          </div>
          <div className="bg-gradient w-fit  rounded-2xl">
            <div
              className=" bg-white/10 py-3 px-6  rounded-2xl backdrop-blur-2xl shadow-lg
            "
            >
              <Link
                href="https://ruben-andino.rawdev.me/projects"
                target="_blank"
              >
                <p className="text-lg relative font-semibold">
                  Check all my projects here →
                </p>
              </Link>
            </div>
          </div>
        </motion.ul>
      </div>
    </LayoutSection>
  );
}
