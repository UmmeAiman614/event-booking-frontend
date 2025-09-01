// src/pages/GetTickets.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PageHeader from "../components/common/PageHeader";
import api from "../api/api";

const ticketTypes = [
  { id: 1, name: "Day Pass", price: 35.99 },
  { id: 2, name: "Full Pass", price: 99.99 },
  { id: 3, name: "Group Pass", price: 199.99 },
];

const GetTickets = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { ticketType: preSelectedType, price: preSelectedPrice, quantity: preQuantity } =
    location.state || {};

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketType, setTicketType] = useState(preSelectedType || "");
  const [price, setPrice] = useState(preSelectedPrice || 0);
  const [quantity, setQuantity] = useState(preQuantity || 1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!preSelectedType) {
      setTicketType("");
      setPrice(0);
      setQuantity(1);
    }
  }, [preSelectedType]);

  const handleTicketChange = (e) => {
    const selected = ticketTypes.find((t) => t.name === e.target.value);
    if (selected) {
      setTicketType(selected.name);
      setPrice(selected.price);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email) {
      alert("❌ Please enter your name and email.");
      return;
    }

    const total = price * quantity;

    try {
      setLoading(true);

      // Send booking without eventId
      const res = await api.post("/bookings", {
        fullName,
        email,
        ticketType,
        quantity,
        totalPrice: total,
      });

      if (res.status === 201) {
        alert("✅ Booking successful! Your ticket is pending admin approval.");
        navigate("/bookings");
      }
    } catch (error) {
      console.error("Booking failed:", error);
      const message =
        error.response?.data?.message || "Failed to complete booking. Please try again.";
      alert(`❌ ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Buy Tickets"
        image="/assets/page-header.jpg"
        breadcrumbs={[{ label: "Home", path: "/" }, { label: "Buy Tickets" }]}
      />

      <section className="py-20 bg-cream min-h-screen">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="p-8 rounded-3xl shadow-2xl bg-darkNavy text-white">
              <h2 className="text-3xl font-bold mb-6">Complete Your Ticket</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                
                {/* Full Name */}
                <div>
                  <label className="block font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full p-3 rounded-lg border border-gray-300 text-black"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full p-3 rounded-lg border border-gray-300 text-black"
                    required
                  />
                </div>

                {/* Ticket Type */}
                <div>
                  <label className="block font-semibold mb-1">Ticket Type</label>
                  <select
                    value={ticketType}
                    onChange={handleTicketChange}
                    className="w-full p-3 rounded-lg bg-cream text-darkNavy font-semibold"
                    required
                  >
                    <option value="" disabled>Select a ticket type</option>
                    {ticketTypes.map((t) => (
                      <option key={t.id} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>

                {/* Total Price */}
                <div>
                  <label className="block font-semibold mb-1">Total Price</label>
                  <input
                    type="text"
                    value={price ? `$${(price * quantity).toFixed(2)}` : ""}
                    readOnly
                    className="w-full p-3 rounded-lg bg-cream text-darkNavy font-semibold cursor-not-allowed"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="block font-semibold mb-1">Quantity</label>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full p-3 rounded-lg border border-gray-300 text-black"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full py-3 font-semibold text-white bg-accentOrange rounded-lg overflow-hidden group mt-4"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-accentOrange to-primaryBlue -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
                  <span className="relative z-10">{loading ? "Processing..." : "Confirm & Pay"}</span>
                </button>
              </form>
            </div>

            <div className="flex flex-col justify-start text-darkNavy">
              <h3 className="text-2xl font-bold mb-4">Ticket Details & Benefits</h3>
              <p className="text-base leading-relaxed">
                Choose from our flexible ticket options. Every ticket comes with access to
                exclusive sessions, networking opportunities, and more!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GetTickets;
