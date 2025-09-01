// src/pages/admin/Speakers.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminTable from "../../components/admin/AdminTable";
import { getAllSpeakers, deleteSpeaker } from "../../api/api";

const Speakers = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load logged-in user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } else {
      setUser(null);
      navigate("/signIn", { replace: true });
    }
  }, [navigate]);

  // Fetch speakers according to role
  const fetchSpeakers = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data } = await getAllSpeakers();

      if (user.role === "admin") {
        setSpeakers(data);
      } else if (user.role === "speaker") {
        const ownSpeaker = data.find(s => s._id === user.id);
        setSpeakers(ownSpeaker ? [ownSpeaker] : []);
      } else {
        setSpeakers([]);
      }
    } catch (err) {
      console.error("Error fetching speakers:", err.response || err);
      setSpeakers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpeakers();
  }, [user]);

  // Delete speaker (only admin)
  const handleDelete = async (speaker) => {
    if (user?.role !== "admin") return;

    if (!window.confirm(`Are you sure you want to delete ${speaker.name}?`)) return;

    try {
      await deleteSpeaker(speaker._id);
      fetchSpeakers();
    } catch (err) {
      console.error("Error deleting speaker:", err.response || err);
    }
  };

  // Format date/time
  const formatDateTime = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleString([], { dateStyle: "short", timeStyle: "short" });
  };

  // Columns for AdminTable
  const columns = [
    { key: "name", title: "Name" },
    {
      key: "expertise",
      title: "Expertise",
      render: (val) => (val ? val.join(", ") : "—"),
    },
    {
      key: "schedule",
      title: "Schedule (start time - end time)",
      render: (_, speaker) =>
        speaker.schedules && speaker.schedules.length > 0 ? (
          <ul className="space-y-1">
            {speaker.schedules.map((sch, idx) => (
              <li key={idx}>
                {formatDateTime(sch.startTime)} - {formatDateTime(sch.endTime)}
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-neutralDark/70">No schedule</span>
        ),
    },
  ];

  // Actions (Edit/Delete) — only admin can delete
  const actions = [
    {
      label: "Edit",
      color: "bg-accentOrange",
      onClick: (item) => navigate(`/admin/speakers/edit/${item._id}`),
    },
    {
      label: "Delete",
      color: "bg-red-500 hover:bg-red-600",
      onClick: handleDelete,
    },
  ];

  if (!user) return <p className="text-center text-darkNavy py-20">Please log in to view speakers.</p>;

  return (
    <div className="p-4 bg-cream min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-primaryBlue">Speakers</h1>

        {/* Show Add button only for admin */}
        {user.role === "admin" && (
          <Link
            to="/admin/speakers/add"
            className="bg-primaryBlue text-white px-4 py-2 rounded hover:bg-accentOrange transition"
          >
            Add New Speaker
          </Link>
        )}
      </div>

      {loading ? (
        <p className="text-darkNavy">Loading speakers...</p>
      ) : (
        <AdminTable columns={columns} data={speakers} actions={actions} />
      )}
    </div>
  );
};

export default Speakers;
