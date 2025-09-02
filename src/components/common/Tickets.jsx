import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import api from "../../api/api"; 

const Tickets = ({ event }) => {
    const [selectedTickets, setSelectedTickets] = useState({});
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currentTicket, setCurrentTicket] = useState(null);
    const navigate = useNavigate();

    if (!event) return <p>Event not found</p>;

    const ticketTypes = [
        { id: 1, name: "Day Pass", price: 35.99, features: ["Conference Tickets", "Free Lunch And Coffee", "Certificate"], bgColor: "bg-primaryBlue", textColor: "text-white", icon: "✈️" },
        { id: 2, name: "Full Pass", price: 99.99, features: ["Conference Tickets", "Free Lunch And Coffee", "Certificate"], bgColor: "bg-accentOrange", textColor: "text-white", icon: "💎" },
        { id: 3, name: "Group Pass", price: 199.99, features: ["Conference Tickets", "Free Lunch And Coffee", "Certificate"], bgColor: "bg-darkNavy", textColor: "text-white", icon: "🚀" },
    ];

    const handleQuantityChange = (ticketId, qty) => {
        setSelectedTickets({ ...selectedTickets, [ticketId]: qty });
    };

    const handleBuy = (ticket) => {
        setCurrentTicket(ticket);
        setShowModal(true);
    };

    const confirmBooking = async () => {
        if (!currentTicket) return;
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            navigate("/signin", { state: { from: `/events/${event._id}` } });
            return;
        }

        const qty = selectedTickets[currentTicket.id] || 1;
        setLoading(true);

        try {
            await api.post(`/bookings/${event._id}`, {
                ticketType: currentTicket.name,
                quantity: qty,
                totalPrice: currentTicket.price * qty,
            });
            setShowModal(false);
            alert("Booking request sent! Waiting for admin approval."); // you can replace this with a nice toast
            navigate("/bookings");
        } catch (error) {
            console.error("Failed to book ticket:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-20 bg-cream">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-darkNavy">Buy Your Tickets for {event.name}</h2>
                    <p className="text-neutralDark mt-4 max-w-xl mx-auto">
                        Secure your spot at the most exciting event of the year! Choose your ticket type and join us.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {ticketTypes.map((ticket) => (
                        <div key={ticket.id} className="rounded-3xl overflow-hidden shadow-2xl flex flex-col">
                            <div className={`${ticket.bgColor} flex flex-col items-center justify-center py-10`}>
                                <div className="text-5xl mb-4">{ticket.icon}</div>
                                <h3 className={`text-2xl font-bold ${ticket.textColor}`}>{ticket.name}</h3>
                                <p className={`text-xl font-semibold mt-2 ${ticket.textColor}`}>${ticket.price}</p>
                            </div>

                            <div className="bg-white p-6 flex-1 flex flex-col justify-between">
                                <ul className="space-y-3 mb-6">
                                    {ticket.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-neutralDark">
                                            <FaCheck className="text-accentOrange" /> {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <label className="font-semibold text-neutralDark">Quantity:</label>
                                        <input
                                            type="number"
                                            min={1}
                                            value={selectedTickets[ticket.id] || 1}
                                            onChange={(e) => handleQuantityChange(ticket.id, parseInt(e.target.value))}
                                            className="w-16 p-1 rounded border border-gray-300 text-black text-center"
                                        />
                                    </div>
                                    <button
                                        disabled={loading}
                                        onClick={() => handleBuy(ticket)}
                                        className="relative w-full py-3 font-semibold text-white bg-accentOrange rounded-lg overflow-hidden group disabled:opacity-50"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-accentOrange to-primaryBlue -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
                                        <span className="relative z-10">{loading ? "Processing..." : "Buy Now"}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ✅ Confirmation Modal */}
            {showModal && currentTicket && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 w-96 text-center shadow-2xl">
                        <h3 className="text-2xl font-bold mb-4">Confirm Your Booking</h3>
                        <p className="mb-4">You are booking <strong>{selectedTickets[currentTicket.id] || 1}</strong> x <strong>{currentTicket.name}</strong></p>
                        <p className="mb-6 text-lg font-semibold">Total Price: ${((selectedTickets[currentTicket.id] || 1) * currentTicket.price).toFixed(2)}</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmBooking}
                                className="px-4 py-2 bg-accentOrange text-white rounded-lg font-semibold"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Tickets;
