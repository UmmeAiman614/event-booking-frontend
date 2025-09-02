import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminForm from "../../components/admin/AdminForm";
import { createEvent } from "../../api/api";

const AddEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    schedules: [],
    totalSeats: 0, // <-- new field
  });

  const eventFields = [
    { label: "Title", name: "title", type: "text", required: true },
    { label: "Description", name: "description", type: "textarea", fullWidth: true },
    { label: "Date", name: "date", type: "date", required: true },
    { label: "Location", name: "location", type: "text" },
    { label: "Total Seats", name: "totalSeats", type: "number", required: true }, // <-- new field
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(formData); // availableSeats will be set automatically in backend
      navigate("/admin/events");
    } catch (err) {
      console.error("Error creating event:", err);
      alert("Failed to create event");
    }
  };

  return (
    <AdminForm
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      submitLabel="Add Event"
      fields={eventFields}
    />
  );
};

export default AddEvent;
