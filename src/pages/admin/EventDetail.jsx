// src/pages/admin/AdminEventDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getEventById } from "../../api/api"; // adjust import according to your API utils

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEventById(id); // GET /api/events/:id
        setEvent(res.data);
      } catch (error) {
        console.error("Failed to fetch event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <p>Loading event details...</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <div className="p-6">
      <Link
        to="/admin/events"
        className="text-orange-600 hover:underline mb-4 inline-block"
      >
        &larr; Back to Events
      </Link>
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <img
        src={event.image || "/placeholder.png"}
        alt={event.title}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <p className="text-gray-700 mb-2">{event.description}</p>
      <p className="text-gray-500">
        Date: {new Date(event.date).toLocaleDateString()} | Location: {event.location}
      </p>
    </div>
  );
};

export default EventDetail;
