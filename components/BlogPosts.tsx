import LayoutSection from "./layout/LayoutSection";

interface BlogPostsProps {
  topOffset?: number;
}

export default function BlogPosts({ topOffset = 0 }: BlogPostsProps) {
  return (
    <LayoutSection id="blog-posts-section" topOffset={topOffset}>
      <div className="flex flex-col items-center justify-between h-full sm:px-38 sm:py-20 w-full">
        <div className="text-center border w-full">
          <h2 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Blog Posts
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Thoughts, insights, and technical articles
          </p>
        </div>
        <div className="flex flex-col items-center justify-center border h-full flex-1 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border">
            <VerticalCard title="Title" description="Description" />
            <VerticalCard title="Title" description="Description" />
            <VerticalCard title="Title" description="Description" />
          </div>
        </div>
      </div>
    </LayoutSection>
  );
}

const VerticalCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center border bg-white h-69">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};
