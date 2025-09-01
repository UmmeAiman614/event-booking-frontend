// src/pages/admin/Contacts.jsx
import { useEffect, useState } from "react";
import AdminTable from "../../components/admin/AdminTable";
import { getAllContacts, markMessageAsRead } from "../../api/api";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchContacts = async () => {
  setLoading(true);
  try {
    const res = await getAllContacts();
    const data = Array.isArray(res) ? res : res?.data || [];

    // Map isRead → status
    const formatted = data.map(c => ({
      ...c,
      status: c.isRead ? "read" : "unread",
    }));

    setContacts(formatted);
  } catch (err) {
    setError("Failed to load contacts. Please check API.");
    setContacts([]);
  }
  setLoading(false);
};


  const handleMarkRead = async (contact) => {
    try {
      console.log(`📌 Marking as read: ${contact._id}`);
      await markMessageAsRead(contact._id);
      fetchContacts(); // refresh list
    } catch (err) {
      console.error("❌ Failed to mark as read:", err.message);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const columns = [
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    { key: "subject", title: "Subject" },
    { key: "message", title: "Message" },
    {
      key: "status",
      title: "Status",
      render: (val) => (
        <span
          className={`px-2 py-1 rounded-lg text-xs font-semibold ${
            val === "read"
              ? "bg-green-200 text-green-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {val}
        </span>
      ),
    },
    {
      key: "createdAt",
      title: "Date",
      render: (val) => new Date(val).toLocaleString(),
    },
  ];

  const actions = [
    {
      label: "Mark as Read",
      color: "bg-primaryBlue hover:bg-accentOrange",
      onClick: handleMarkRead,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-darkNavy mb-6">
        Contact Messages
      </h1>

      {loading && <p>Loading...</p>}
      {error && (
        <p className="text-red-600 font-semibold mb-4">{error}</p>
      )}

      {!loading && !error && (
        <AdminTable columns={columns} data={contacts} actions={actions} />
      )}
    </div>
  );
};

export default AdminContacts;
