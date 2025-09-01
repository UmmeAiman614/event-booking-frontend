// src/pages/admin/Blog.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllBlogs, deleteBlog } from "../../api/api";
import AdminTable from "../../components/admin/AdminTable";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const res = await getAllBlogs();
      setBlogs(res.data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchBlogs();
}, []);

useEffect(() => {
  console.log("📌 Blogs fetched:", blogs);
}, [blogs]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Failed to delete blog:", error);
      alert("Failed to delete blog.");
    }
  };

  if (loading) return <p>Loading...</p>;

  // Columns definition for AdminTable
const columns = [
  {
    key: "image",
    title: "Image",
    render: (value, blog) =>
      blog.image ? (
        <img
          src={`http://localhost:3000/${blog.image}`}
          alt={blog.title}
          className="w-20 h-14 object-cover rounded"
        />
      ) : (
        "No Image"
      ),
  },
  { key: "title", title: "Title" },
  {
    key: "author",
    title: "Author",
    render: (value, blog) => blog.author?.name || "Unknown",
  },
];



  // Actions definition for AdminTable
  const actions = [
    {
      label: "Edit",
      color: "bg-accentOrange",
      onClick: (blog) => navigate(`/admin/blogs/edit/${blog._id}`),
    },
    {
      label: "Delete",
      color: "bg-red-500",
      onClick: (blog) => handleDelete(blog._id),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Blogs</h1>
        <Link
          to="/admin/blogs/add"
          className="bg-primaryBlue text-white px-4 py-2 rounded"
        >
          Add Blog
        </Link>
      </div>

      <AdminTable columns={columns} data={blogs} actions={actions} />
    </div>
  );
};

export default Blog;
