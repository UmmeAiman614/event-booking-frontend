// src/components/blog/BlogSection.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs, getCommentsByBlogId } from "../../api/api";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getAllBlogs();
        const blogList = Array.isArray(res.data) ? res.data : res.data.data;

        // fetch comments count for each blog
        const blogsWithComments = await Promise.all(
          (blogList || []).map(async (blog) => {
            try {
              const commentsRes = await getCommentsByBlogId(blog._id);
              return { ...blog, commentsCount: commentsRes.data?.length || 0 };
            } catch (err) {
              console.error("Error fetching comments for blog:", blog._id, err);
              return { ...blog, commentsCount: 0 };
            }
          })
        );

        setBlogs(blogsWithComments);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p className="text-center text-darkNavy">Loading blogs...</p>;
  }

  if (blogs.length === 0) {
    return <p className="text-center text-darkNavy">No blogs found</p>;
  }

  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <section className="py-12 bg-cream">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-darkNavy mb-8 text-center">
          Latest Blogs
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-darkNavy text-cream rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1"
            >
              {blog.image && (
                <img
                  src={`http://localhost:3000/${blog.image}`}
                  alt={blog.title}
                  className="w-full h-52 object-cover"
                />
              )}

              {/* Author + Comments bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-accentOrange text-white text-sm font-medium">
                <span>🖊 {blog.author?.name || blog.user?.name || "Unknown"}</span>
                <span>💬 {blog.commentsCount} Comments</span>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-accentOrange mb-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-300 mb-3">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <p className="text-cream mb-4">
                  {blog.content.length > 100
                    ? blog.content.substring(0, 100) + "..."
                    : blog.content}
                </p>
                <Link
                  to={`/blog/${blog._id}`}
                  className="inline-block px-4 py-2 bg-accentOrange text-white font-semibold rounded-lg hover:bg-cream hover:text-darkNavy transition"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
