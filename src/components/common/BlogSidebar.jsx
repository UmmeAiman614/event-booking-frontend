import { Link } from "react-router-dom";

const BlogSidebar = ({ allBlogs = [], searchTerm, setSearchTerm }) => {
  const filteredPosts = allBlogs
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <aside className="space-y-10">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-neutralDark focus:outline-none focus:ring-2 focus:ring-accentOrange"
        />
      </div>

      <div className="bg-accentOrange p-6 rounded-xl text-white shadow-lg">
        <h4 className="font-bold text-lg mb-4 underline">Recent Posts</h4>
        <ul className="space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <li key={post._id}>
                <Link
                  to={`/blog/${post._id}`}
                  className="flex items-center gap-4 hover:text-darkNavy transition"
                >
                  {post.image && (
                    <img
                      src={`${import.meta.env.VITE_UPLOADS_URL}/${post.image}`}
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded-lg shadow"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{post.title}</p>
                    <p className="text-xs">{new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li className="text-sm text-white/80">No posts found</li>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default BlogSidebar;
