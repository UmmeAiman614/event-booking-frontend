// src/components/admin/EventsTable.jsx
import { useEffect, useState } from "react";
import AdminTable from "../../components/admin/AdminTable";
import { getAllEvents, deleteEvent } from "../../api/api";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await getAllEvents();
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Delete event
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(id);
        fetchEvents();
      } catch (err) {
        console.error("Error deleting event:", err);
      }
    }
  };

  // Columns for AdminTable
  const columns = [
    { key: "title", title: "Title" },
    { key: "description", title: "Description" },
    {
      key: "date",
      title: "Date",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    { key: "location", title: "Location" },
  ];

  // Actions for AdminTable
  const actions = [
    {
      label: "Edit",
      color: "bg-accentOrange",
      onClick: (item) => navigate(`/admin/events/edit/${item._id}`),
    },
    {
      label: "Delete",
      color: "bg-red-500",
      onClick: (item) => handleDelete(item._id),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Events</h2>
        <button
          className="bg-primaryBlue text-white px-4 py-2 rounded hover:bg-accentOrange transition duration-300 ease-in-out"
          onClick={() => navigate("/admin/events/add")}
        >
          Add Event
        </button>
      </div>

      <AdminTable columns={columns} data={events} actions={actions} />
    </div>
  );
};

export default Events;
