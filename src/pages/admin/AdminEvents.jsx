// src/pages/admin/AdminEvents.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllEvents } from "../../api/api"; // adjust import according to your API utils

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getAllEvents(); // GET /api/events
        setEvents(res.data); 
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <img
              src={event.image || "/placeholder.png"}
              alt={event.title}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-600 mb-2">
              {event.description.length > 100
                ? event.description.substring(0, 100) + "..."
                : event.description}
            </p>
            <Link
              to={`/admin/events/${event._id}`}
              className="text-white bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEvents;
