import LayoutSection from "./layout/LayoutSection";

interface BlogPostsProps {
  topOffset?: number;
}

export default function BlogPosts({ topOffset = 0 }: BlogPostsProps) {
  return (
    <LayoutSection id="blog-posts-section" topOffset={topOffset}>
      <div className="text-center">
        <h2 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Blog Posts
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Thoughts, insights, and technical articles
        </p>
      </div>
    </LayoutSection>
  );
}
