import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogSidebar from "../components/common/BlogSidebar";
import PageHeader from "../components/common/PageHeader";
import { getAllBlogs } from "../api/api";

const POSTS_PER_PAGE = 2;

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const { data } = await getAllBlogs();
        setBlogs(data);
        setFilteredBlogs(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Failed to load blogs.");
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Filter blogs when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredBlogs(blogs);
    } else {
      const results = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(results);
      setCurrentPage(1); // reset pagination
    }
  }, [searchTerm, blogs]);

  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <>
      <PageHeader
        title="Our Blog"
        image="/assets/page-header.jpg"
        breadcrumbs={[{ label: "Home", path: "/" }, { label: "Blog" }]}
      />

      <section className="py-20 bg-cream">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Blog Posts */}
          <div className="lg:col-span-3 space-y-10">
            {currentPosts.map((blog) => (
              <div key={blog._id} className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition group">
                {blog.image && (
                  <>
                    {console.log("Blog image path:", `${import.meta.env.VITE_UPLOADS_URL}/${blog.image}`)}
                    <img
                      src={`http://localhost:3000/${blog.image}`}
                      alt={blog.title}
                      className="w-full h-96 md:h-96 object-cover"
                    />
                  </>
                )}
                <div className="p-6 bg-cream">
                  <p className="text-sm text-accentOrange font-semibold mb-2">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <h3 className="text-xl font-bold text-darkNavy mb-4">{blog.title}</h3>
                  <p className="text-neutralDark mb-4">{blog.content.slice(0, 200)}...</p>
                  <Link
                    to={`/blog/${blog._id}`}
                    className="relative inline-block px-8 py-3 font-semibold text-white rounded-lg overflow-hidden group bg-accentOrange hover:bg-gradient-to-r hover:from-accentOrange hover:to-primaryBlue transition-all duration-300"
                  >
                    <span className="relative z-10">Read More</span>
                  </Link>
                </div>
              </div>
            ))}


            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-10 items-center">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 rounded-lg font-semibold bg-primaryBlue text-white hover:bg-darkNavy transition"
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${currentPage === idx + 1 ? "bg-accentOrange text-white" : "bg-primaryBlue text-white hover:bg-darkNavy"
                    }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="px-4 py-2 rounded-lg font-semibold bg-primaryBlue text-white hover:bg-darkNavy transition"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <BlogSidebar
            allBlogs={blogs}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </section>
    </>
  );
};

export default Blog;
