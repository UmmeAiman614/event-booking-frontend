// src/pages/admin/AdminEventDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getEventById } from "../api/api"; // adjust import according to your API utils
import PageHeader from "../components/common/PageHeader";
import Tickets from "../components/common/Tickets";

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

  if (loading) return <p className="text-primaryBlue">Loading event details...</p>;
  if (!event) return <p className="text-accentOrange">Event not found.</p>;

  return (
    <>
      <PageHeader
        title="Event Details"
        image="/assets/page-header.jpg"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Events", path: "/events" },
          { label: "Event Detail" },
        ]}
      />
      <div className="p-8 bg-cream min-h-screen">
      
        <h1 className="text-3xl font-bold mb-4 text-darkNavy">{event.title}</h1>
        <img
          src={`http://localhost:3000${event.image}`}
          alt={event.title}
          className="w-full h-64 object-cover rounded-md mb-4 shadow"
        />
        <p className="text-neutralDark mb-4 leading-relaxed">{event.description}</p>
        <p className="text-primaryBlue font-semibold">
          Date:{" "}
          <span className="text-darkNavy">
            {new Date(event.date).toLocaleDateString()}
          </span>{" "}
          | Location:{" "}
          <span className="text-darkNavy">{event.location}</span>
        </p>
      </div>
      <Tickets event={event} />
    </>
  );
};

export default EventDetail;
