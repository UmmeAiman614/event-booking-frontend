// src/pages/admin/AdminEvents.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllEvents } from "../api/api"; // adjust import according to your API utils
import PageHeader from "../components/common/PageHeader";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getAllEvents(); // GET /api/events
        console.log(res.data);
        setEvents(res.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p className="text-darkNavy">Loading events...</p>;

  return (
    <>
      <PageHeader
        title="Events"
        image="/assets/page-header.jpg"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Events" },
        ]}
      />

      <div className="p-6 bg-cream min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-darkNavy">All Events</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="border border-neutralDark rounded-lg p-4 shadow hover:shadow-lg transition bg-cream"
            >
              <img
                src={event.image?.startsWith("http") ? event.image : `${import.meta.env.VITE_UPLOADS_URL}/${event.image}`}
                alt={event.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />

              <h2 className="text-xl font-semibold mb-2 text-primaryBlue">
                {event.title}
              </h2>

              <p className="text-neutralDark mb-4">
                {event.description.length > 100
                  ? event.description.substring(0, 100) + "..."
                  : event.description}
              </p>

              <Link
                to={`/events/${event._id}`}
                className="text-white bg-accentOrange hover:bg-darkNavy px-4 py-2 rounded font-medium transition"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminEvents;
