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

        // Parse schedules if string
        if (typeof speakerData.schedules === "string") {
          try {
            speakerData.schedules = JSON.parse(speakerData.schedules);
          } catch {
            speakerData.schedules = [];
          }
        }

        if (!Array.isArray(speakerData.schedules)) speakerData.schedules = [];

        // Normalize startTime and endTime
        speakerData.schedules = speakerData.schedules.map((sch) => ({
          ...sch,
          startTime: sch.startTime ? new Date(sch.startTime).toISOString().slice(0, 16) : "",
          endTime: sch.endTime ? new Date(sch.endTime).toISOString().slice(0, 16) : "",
        }));

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
    if (!formData) return;

    try {
      const data = new FormData();

      // Append fields to FormData
      for (const key of Object.keys(formData)) {
        if (key === "photo") {
          // Only append if a new file is selected
          if (formData.photo instanceof File) {
            data.append("photo", formData.photo);
          }
        } else if (key === "expertise") {
          data.append(key, formData.expertise || "");
        } else if (key !== "schedules" && key !== "username") {
          data.append(key, formData[key] || "");
        }
      }

      // Append schedules as JSON string
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
      showSchedules={true}
    />
  );
};

export default UpdateSpeaker;
