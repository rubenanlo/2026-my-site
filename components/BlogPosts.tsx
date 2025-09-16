import clsx from "clsx";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { ActionLink } from "./ActionLink";
import LayoutSection from "./layout/LayoutSection";

interface BlogPostsProps {
  topOffset?: number;
}

export default function BlogPosts({ topOffset = 0 }: BlogPostsProps) {
  const posts = [
    {
      title: "All about my journey",
      description:
        "Learn more about my professional journey and how I got here.",
      background: "moonlight-gradient",
      className: {
        firstCard: "rotate-2",
        secondCard: "-rotate-5",
      },
      link: "https://ruben-andino.rawdev.me/about",
    },
    {
      title: "Rounding with Python and Javascript",
      description:
        "In this post we delve into the differences between Python and Javascript when rounding numbers.",
      background: "sun-gradient",
      className: {
        firstCard: "rotate-2",
        secondCard: "rotate-10",
      },
      link: "https://ruben-andino.rawdev.me/blog/rounding-with-python-and-javascript",
    },
    {
      title: "Simplifying Tailwind CSS",
      description:
        "Learn how to create custom components and a way to use Tailwind in a more efficient way.",
      background: "red-gradient",
      className: {
        firstCard: "-rotate-6",
        secondCard: "-rotate-1",
      },
      link: "https://ruben-andino.rawdev.me/blog/simplifying-tailwind-CSS-with-custom-components-and-class-object-management",
    },
  ];

  const [isHovered, setIsHovered] = useState(false);

  return (
    <LayoutSection id="blog-posts-section" topOffset={topOffset}>
      <div className="flex flex-col items-center justify-between h-full sm:px-38 sm:py-20 w-full">
        <div className="text-center w-full">
          <h2 className="text-6xl font-bold text-gray-600 mb-4">Blog Posts</h2>
          <p className="text-xl text-foreground-secondary">
            Thoughts, insights, and technical articles
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-full flex-1 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            {posts.map((post, index) => (
              <VerticalCard
                background={post.background}
                title={post.title}
                description={post.description}
                key={`${post.title}-${index}`}
                className={post.className}
                link={post.link}
              />
            ))}
          </div>
        </div>
        <ActionLink
          href="https://ruben-andino.rawdev.me/blog"
          text="Check all my blog posts here →"
        />
      </div>
    </LayoutSection>
  );
}

const VerticalCard = ({
  title,
  description,
  background,
  className,
  link,
}: {
  title: string;
  description: string;
  background: string;
  className: {
    firstCard: string;
    secondCard: string;
  };
  link: string;
}) => {
  const [rotate, setRotate] = useState(false);
  return (
    <Link href={link} target="_blank" className="relative">
      {/* Background motion divs - positioned behind the main card */}
      <motion.div
        animate={{
          y: rotate ? -10 : 0,
          rotate: rotate ? 1 : 0,
        }}
        className={clsx(
          className.firstCard,
          "absolute top-0 left-0 bg-primary h-[347px] w-[260px] rounded-2xl z-0 shadow-2xl border-[0.2px] border-foreground-secondary"
        )}
      />
      <motion.div
        animate={{
          rotate: rotate ? -10 : 0,
        }}
        className={clsx(
          className.secondCard,
          "absolute top-0 left-0 bg-primary h-[347px] w-[260px] rounded-2xl z-0 shadow-2xl border-[0.2px] border-foreground-secondary"
        )}
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
    </Link>
  );
};
