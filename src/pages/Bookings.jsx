// src/pages/Bookings.jsx
import { useEffect, useState } from "react";
import { FaPhoneAlt, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import PageHeader from "../components/common/PageHeader";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const statusColors = {
  pending: "bg-yellow-500",
  approved: "bg-green-500",
  rejected: "bg-red-500",
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (!token || !user) {
        // User is not logged in
        navigate("/signIn");
        return;
      }

      try {
        const res = await api.get("/my-bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.data || res.data.length === 0) {
          // User has no bookings
          navigate("/get-tickets");
          return;
        }

        setBookings(res.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        navigate("/get-tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  if (loading) {
    return (
      <p className="text-center text-darkNavy text-xl mt-8">Loading bookings...</p>
    );
  }

  return (
    <>
      <PageHeader
        title="My Bookings"
        image="/assets/page-header.jpg"
        breadcrumbs={[{ label: "Home", path: "/" }, { label: "My Bookings" }]}
      />

      <section className="py-20 bg-cream min-h-screen">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-darkNavy">My Bookings</h2>
            <p className="text-neutralDark mt-4 max-w-xl mx-auto">
              View all your booked tickets and their details. Manage your bookings easily.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-darkNavy p-6 rounded-3xl shadow-2xl flex flex-col justify-between"
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white">{booking.ticketType}</h3>
                  <p className="mt-1 text-white">Quantity: {booking.quantity}</p>
                  <p className="mt-1 text-white">Total Price: ${booking.totalPrice.toFixed(2)}</p>
                  <p className="mt-1 text-white">
                    Booking Date: {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                  {booking.event && <p className="mt-1 text-white">Event: {booking.event.name}</p>}
                </div>

                <div className="mt-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white font-semibold ${
                      statusColors[booking.status]
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center gap-6">
            <div className="flex gap-4 text-white">
              <div className="w-10 h-10 bg-accentOrange rounded-full flex items-center justify-center hover:opacity-80 transition">
                <FaFacebookF />
              </div>
              <div className="w-10 h-10 bg-accentOrange rounded-full flex items-center justify-center hover:opacity-80 transition">
                <FaTwitter />
              </div>
              <div className="w-10 h-10 bg-accentOrange rounded-full flex items-center justify-center hover:opacity-80 transition">
                <FaInstagram />
              </div>
            </div>
            <div className="flex items-center gap-3 text-white">
              <FaPhoneAlt className="text-accentOrange" />
              <span>Call for support: <strong>+1 234 567 890</strong></span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Bookings;
