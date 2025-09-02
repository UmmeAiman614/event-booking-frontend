import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminForm from "../../components/admin/AdminForm";
import { getEventById, updateEvent } from "../../api/api";

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  const eventFields = [
    { label: "Title", name: "title", type: "text", required: true },
    { label: "Description", name: "description", type: "textarea", fullWidth: true },
    { label: "Date", name: "date", type: "date", required: true },
    { label: "Location", name: "location", type: "text" },
    { label: "Total Seats", name: "totalSeats", type: "number", required: true }, // <-- new field
  ];

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEventById(id);

        const eventData = {
          ...res.data,
          date: res.data.date ? res.data.date.split("T")[0] : "",
          schedules: res.data.schedules.map((s) => ({
            ...s,
            startTime: s.startTime ? s.startTime.substring(0, 16) : "",
            endTime: s.endTime ? s.endTime.substring(0, 16) : "",
          })),
          totalSeats: res.data.totalSeats || 0, // <-- populate totalSeats
        };

        setFormData(eventData);
      } catch (err) {
        console.error("Error fetching event:", err);
        alert("Failed to load event data");
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEvent(id, formData);
      navigate("/admin/events");
    } catch (err) {
      console.error("Error updating event:", err);
      alert("Failed to update event");
    }
  };

  if (!formData) return <p>Loading event data...</p>;

  return (
    <AdminForm
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      submitLabel="Update Event"
      fields={eventFields}
    />
  );
};

export default UpdateEvent;
