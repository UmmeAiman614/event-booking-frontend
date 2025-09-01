// src/pages/admin/UpdateBlog.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminForm from "../../components/admin/AdminForm";
import { getBlogById, updateBlog } from "../../api/api";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);

  const fields = [
    { label: "Title", name: "title", type: "text", required: true },
    {
      label: "Content",
      name: "content",
      type: "textarea",
      fullWidth: true,
      required: true,
    },
    { label: "Image", name: "image", type: "file" },
  ];

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id);
        const blog = res.data;

        setFormData({
          title: blog.title || "",
          content: blog.content || "",
          image: null, // don't set file directly
          existingImage: blog.image || "", // keep old image reference
        });
      } catch (error) {
        console.error("❌ Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);

    if (formData.image instanceof File) {
      data.append("photo", formData.image); // must match backend
    }

    await updateBlog(id, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    navigate("/admin/blogs");
  } catch (error) {
    console.error("❌ Failed to update blog:", error.response?.data || error);
    alert("Failed to update blog.");
  }
};

  if (loading) return <p>Loading...</p>;
  if (!formData) return <p>Blog not found.</p>;

  return (
    <div className="p-6">
      <AdminForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        submitLabel="Update Blog"
        fields={fields}
      />

      {/* Show existing image if available */}
      {formData.existingImage && (
        <div className="mt-4">
          <p className="font-semibold mb-2">Current Image:</p>
          <img
            src={`http://localhost:3000${formData.existingImage}`}
            alt="Blog"
            className="w-64 rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
};

export default UpdateBlog;
