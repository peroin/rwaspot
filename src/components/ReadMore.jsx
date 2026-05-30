export default function ReadMore({ node }) {
  const post = node?.post;
  if (!post) return null;

  const slug = typeof post.slug === 'string' ? post.slug : post.slug?.current;

  return (
    <div className="my-6 p-4 border-l-4 border-yellow-600 bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors shadow-sm">
      <span className="flex items-center gap-2 text-xs font-black text-yellow-600 uppercase tracking-wider mb-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"/>
        </svg>
        Baca Juga:
      </span>
      
      <a href={`/posts/${slug}`} className="block group">
        <h3 className="text-sm md:text-base font-semibold text-gray-900 leading-snug group-hover:text-yellow-700 transition-colors">
          {post.title}
        </h3>
      </a>
    </div>
  );
}