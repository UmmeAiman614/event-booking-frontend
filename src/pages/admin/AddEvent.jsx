// src/pages/admin/AddEvent.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminForm from "../../components/admin/AdminForm";
import { createEvent } from "../../api/api"; // axios helper

const AddEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    totalSeats: 0,
    schedules: [],
    image: null, // must match multer field name in backend
  });

  const fields = [
    { label: "Title", name: "title", type: "text", required: true },
    { label: "Description", name: "description", type: "textarea", fullWidth: true },
    { label: "Date", name: "date", type: "date", required: true },
    { label: "Location", name: "location", type: "text" },
    { label: "Total Seats", name: "totalSeats", type: "number", required: true },
    { label: "Event Image", name: "image", type: "file" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      for (const key in formData) {
        if (key === "image" && formData.image instanceof File) {
          console.log("📸 Appending image:", formData.image);
          data.append("image", formData.image); // field must be "image"
        } else if (key === "schedules") {
          console.log("🗂 Appending schedules:", formData.schedules);
          data.append("schedules", JSON.stringify(formData.schedules));
        } else {
          console.log(`📝 Appending ${key}:`, formData[key]);
          data.append(key, formData[key]);
        }
      }

      // ✅ Get token
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No auth token found. Please log in first.");
        return;
      }

      // ✅ Call API (pass headers like in AddBlog)
      const response = await createEvent(data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Event created:", response.data);
      navigate("/admin/events");
    } catch (error) {
      console.error("❌ Failed to create event");
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
      alert("Failed to create event. Check console for details.");
    }
  };

  return (
    <AdminForm
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      submitLabel="Add Event"
      fields={fields}
      showSchedules={true}
    />
  );
};

export default AddEvent;
