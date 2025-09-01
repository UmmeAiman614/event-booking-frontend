// src/pages/admin/UpdateSpeaker.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminForm from "../../components/admin/AdminForm";
import { getSpeakerById, updateSpeaker } from "../../api/api";

const UpdateSpeaker = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fields = [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Username", name: "username", type: "text", required: true, readOnly: true },
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Password", name: "password", type: "password", value: "" },
    { label: "Bio", name: "bio", type: "textarea", fullWidth: true },
    { label: "Expertise (comma separated)", name: "expertise", type: "text", fullWidth: true },
    { label: "Photo", name: "photo", type: "file" },
  ];

  // Fetch speaker data
  useEffect(() => {
    const fetchSpeaker = async () => {
      try {
        const res = await getSpeakerById(id);
        const speakerData = { ...res.data, password: "" };
        // Ensure schedules is an array
        if (!Array.isArray(speakerData.schedules)) speakerData.schedules = [];
        setFormData(speakerData);
      } catch (error) {
        console.error("Failed to fetch speaker:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSpeaker();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      for (const key in formData) {
        if (key === "photo" && formData.photo instanceof File) {
          data.append("photo", formData.photo);
        } else if (key !== "schedules" && key !== "username") {
          data.append(key, formData[key]);
        }
      }

      // Send schedules as JSON string
      data.append("schedules", JSON.stringify(formData.schedules || []));

      await updateSpeaker(id, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/admin/speakers");
    } catch (error) {
      console.error("Failed to update speaker:", error);
      alert("Failed to update speaker.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!formData) return <p>Speaker not found.</p>;

  return (
    <AdminForm
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      submitLabel="Update Speaker"
      fields={fields}
      showSchedules={true} // ensure schedules section is visible
    />
  );
};

export default UpdateSpeaker;
