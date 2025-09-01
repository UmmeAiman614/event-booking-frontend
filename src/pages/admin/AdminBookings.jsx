// src/pages/admin/AdminBookings.jsx
import { useEffect, useState } from "react";
import { getAllBookings, approveBooking, rejectBooking } from "../../api/api";
import AdminTable from "../../components/admin/AdminTable";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data } = await getAllBookings();
      console.log("✅ Fetched bookings:", data);
      setBookings(data);
    } catch (error) {
      console.error("❌ Failed to fetch bookings");
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Status Text:", error.response.statusText);
        console.error("Response Data:", error.response.data);
      } else if (error.request) {
        console.error("📡 No response received from server");
        console.error("Request details:", error.request);
      } else {
        console.error("⚠️ Error message:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleApprove = async (booking) => {
    try {
      await approveBooking(booking._id);
      fetchBookings();
    } catch (error) {
      console.error("Failed to approve booking", error);
    }
  };

  const handleReject = async (booking) => {
    try {
      await rejectBooking(booking._id);
      fetchBookings();
    } catch (error) {
      console.error("Failed to reject booking", error);
    }
  };

  if (loading) return <p className="p-4">Loading bookings...</p>;

  // Table column definitions
  const columns = [
    {
      key: "name",
      title: "Name",
      render: (_, item) => item.user?.name || "N/A",
    },
    {
      key: "email",
      title: "Email",
      render: (_, item) => item.user?.email || "N/A",
    },
    { key: "quantity", title: "Quantity" },
    { key: "ticketType", title: "Ticket Type" },
    {
      key: "status",
      title: "Status",
      render: (value) => (
        <span
          className={`font-semibold ${
            value === "approved"
              ? "text-green-600"
              : value === "rejected"
              ? "text-red-600"
              : "text-yellow-600"
          }`}
        >
          {value || "pending"}
        </span>
      ),
    },
  ];

  // Action buttons
  const actions = [
    {
      label: "Approve",
      color: "bg-green-500 hover:bg-green-600",
      onClick: handleApprove,
    },
    {
      label: "Reject",
      color: "bg-red-500 hover:bg-red-600",
      onClick: handleReject,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>
      <AdminTable columns={columns} data={bookings} actions={actions} />
    </div>
  );
};

export default AdminBookings;
