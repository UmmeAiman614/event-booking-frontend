// src/pages/admin/AddBlog.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminForm from "../../components/admin/AdminForm";
import { createBlog } from "../../api/api";

const AddBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    photo: null,   // renamed from image → photo
  });

  const fields = [
    { label: "Title", name: "title", type: "text", required: true },
    { label: "Content", name: "content", type: "textarea", fullWidth: true, required: true },
    { label: "Photo", name: "photo", type: "file" },  // renamed
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        if (key === "photo" && formData.photo instanceof File) {
          console.log("Appending file:", formData.photo);
          data.append("photo", formData.photo); // must match backend multer field
        } else {
          console.log(`Appending field: ${key} =`, formData[key]);
          data.append(key, formData[key]);
        }
      }

      console.log("Submitting blog data...");
      const response = await createBlog(data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Blog created successfully:", response.data);

      navigate("/admin/blogs");
    } catch (error) {
      console.error("❌ Failed to create blog");
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
      alert("Failed to create blog. Check console for details.");
    }
  };

  return (
    <AdminForm
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      submitLabel="Add Blog"
      fields={fields}
      showSchedules={false}  // no schedules for blogs
    />
  );
};

export default AddBlog;
