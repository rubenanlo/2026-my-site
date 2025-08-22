export default function BlogPosts() {
  return (
    <section className="h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-800 dark:to-purple-900 rounded-t-3xl shadow-2xl border border-gray-200 dark:border-gray-700 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Blog Posts
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Thoughts, insights, and technical articles
        </p>
      </div>
    </section>
  );
}
