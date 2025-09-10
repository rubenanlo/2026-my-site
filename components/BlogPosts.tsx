import clsx from "clsx";
import { motion } from "motion/react";
import { useState } from "react";
import LayoutSection from "./layout/LayoutSection";

interface BlogPostsProps {
  topOffset?: number;
}

export default function BlogPosts({ topOffset = 0 }: BlogPostsProps) {
  return (
    <LayoutSection id="blog-posts-section" topOffset={topOffset}>
      <div className="flex flex-col items-center justify-between h-full sm:px-38 sm:py-20 w-full">
        <div className="text-center w-full">
          <h2 className="text-6xl font-bold text-primary mb-4">Blog Posts</h2>
          <p className="text-xl text-secondary">
            Thoughts, insights, and technical articles
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-full flex-1 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            <VerticalCard
              background="moonlight-gradient"
              title="Make the Most of Your Browsing History"
              description="Turn yesterday's searches into today's reflections, recaps, and takeaways."
            />
            <VerticalCard
              background="sun-gradient"
              title="Title"
              description="Description"
            />
            <VerticalCard
              background="red-gradient"
              title="Title"
              description="Description"
            />
          </div>
        </div>
      </div>
    </LayoutSection>
  );
}

const VerticalCard = ({
  title,
  description,
  background,
}: {
  title: string;
  description: string;
  background: string;
}) => {
  const [rotate, setRotate] = useState(false);
  return (
    <div className="relative">
      {/* Background motion divs - positioned behind the main card */}
      <motion.div
        animate={{
          y: rotate ? -10 : 0,
          rotate: rotate ? 1 : 0,
        }}
        className="absolute top-0 left-0 bg-primary h-[347px] w-[260px] rounded-2xl rotate-2 z-0 shadow-2xl border-[0.2px] border-foreground-secondary"
      />
      <motion.div
        animate={{
          rotate: rotate ? -10 : 0,
        }}
        className="absolute top-0 left-0 bg-primary h-[347px] w-[260px] rounded-2xl -rotate-5 z-0 shadow-2xl border-[0.2px] border-foreground-secondary"
      />
      {/* Main card - positioned in front */}
      <motion.div
        animate={{
          y: rotate ? -10 : 0,
        }}
        onMouseEnter={() => setRotate(true)}
        onMouseLeave={() => setRotate(false)}
        className={clsx(
          background,
          "relative flex flex-col items-start justify-start gap-y-5 h-[347px] w-[260px] rounded-2xl cursor-pointer z-10 p-5"
        )}
      >
        <h3 className="text-3xl text-foreground-primary">{title}</h3>
        <p>{description}</p>
      </motion.div>
    </div>
  );
};
