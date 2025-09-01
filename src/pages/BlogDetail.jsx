import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogSidebar from "../components/common/BlogSidebar";
import PageHeader from "../components/common/PageHeader";
import { FaUser } from "react-icons/fa";
import { getBlogById, postComment, getAllBlogs, getCommentsByBlogId } from "../api/api";

const BlogDetail = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", content: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch blog and its approved comments
  const fetchBlogAndComments = async () => {
    try {
      setLoading(true);

      // Fetch blog
      const { data: blogData } = await getBlogById(id);
      setBlog(blogData);

      // Fetch approved comments using your backend route
      const { data: commentsData } = await getCommentsByBlogId(id);
      console.log("Fetched comments:", commentsData);
      setComments(commentsData);

      setLoading(false);
    } catch (err) {
      console.error("Failed to load blog or comments:", err);
      setError("Failed to load blog");
      setLoading(false);
    }
  };

  // Fetch all blogs for sidebar
  const fetchAllBlogsForSidebar = async () => {
    try {
      const { data } = await getAllBlogs();
      setAllBlogs(data);
    } catch (err) {
      console.error("Failed to fetch all blogs for sidebar:", err);
    }
  };

  useEffect(() => {
    fetchBlogAndComments();
    fetchAllBlogsForSidebar();
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.content) return;

    try {
      const response = await postComment(id, formData);
      console.log("Comment submitted:", response.data.message);
      alert("Your comment has been submitted and is pending approval.");
      setFormData({ name: "", email: "", content: "" });
    } catch (err) {
      console.error("Failed to add comment:", err);
      alert("Failed to submit comment. Try again.");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!blog) return <p className="text-center mt-20 text-red-500">Blog not found</p>;

  return (
    <>
      <PageHeader
        title={'Blog Detail'}
        image="/assets/page-header.jpg"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Blog", path: "/blog" },
          { label: 'blog detail' },
        ]}
      />

      <section className="py-20 bg-cream">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-3 space-y-10">
            {/* Blog Image */}
            {blog.image && (
              <div className="relative group overflow-hidden rounded-xl shadow-lg">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${blog.image}`}
                  alt={blog.title}
                  className="w-full h-96 md:h-[600px] object-cover"
                />
                <span className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/50 to-white/30 opacity-0 group-hover:opacity-100 animate-[shine_1.5s_ease-in-out_infinite] pointer-events-none"></span>
              </div>
            )}

            {/* Blog Details */}
            <div className="space-y-4">
              <p className="text-sm text-accentOrange font-semibold">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <h2 className="text-3xl font-bold text-darkNavy">{blog.title}</h2>
              <p className="text-neutralDark mb-4 flex items-center gap-2">
                <FaUser className="text-accentOrange" /> {blog.author?.name || "Unknown"}
              </p>
              <p className="text-neutralDark">{blog.content}</p>
            </div>

            {/* Comments Section */}
            <div className="mt-10 space-y-6">
              <h3 className="text-2xl font-bold text-darkNavy">
                Comments ({comments.length})
              </h3>

              {comments.length > 0 ? (
                comments.map((c) => (
                  <div
                    key={c._id}
                    className="p-4 bg-primaryBlue/10 border-l-4 border-accentOrange rounded-lg"
                  >
                    <p className="font-semibold text-darkNavy flex items-center gap-2">
                      <FaUser className="text-accentOrange" /> {c.user?.name || c.name || "User"}
                    </p>
                    <p className="text-neutralDark mt-1">{c.content}</p>
                    <p className="text-xs text-neutralDark/70 mt-1">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-neutralDark">No comments yet.</p>
              )}

              {/* Add Comment Form */}
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accentOrange"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accentOrange"
                  required
                />
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Your Comment"
                  className="w-full p-4 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-accentOrange"
                  rows={4}
                  required
                ></textarea>
                <button
                  type="submit"
                  className="px-6 py-3 bg-accentOrange text-white font-semibold rounded-lg hover:bg-primaryBlue transition"
                >
                  Post Comment
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <BlogSidebar
            allBlogs={allBlogs.filter(b => b._id !== blog._id)} // exclude current blog
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </section>
    </>
  );
};

export default BlogDetail;
