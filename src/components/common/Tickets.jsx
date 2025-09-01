// src/pages/Tickets.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

// Add real event IDs here from your DB
const ticketTypes = [
    {
        id: 1,
        eventId: "66cfa12f9ab1d25e5c1b1234",
        name: "Day Pass",
        price: 35.99,
        features: ["Conference Tickets", "Free Lunch And Coffee", "Certificate"],
        bgColor: "bg-primaryBlue",
        textColor: "text-white",
        icon: "✈️",
    },
    {
        id: 2,
        eventId: "66cfa12f9ab1d25e5c1b1235",
        name: "Full Pass",
        price: 99.99,
        features: ["Conference Tickets", "Free Lunch And Coffee", "Certificate"],
        bgColor: "bg-accentOrange",
        textColor: "text-white",
        icon: "💎",
    },
    {
        id: 3,
        eventId: "66cfa12f9ab1d25e5c1b1236",
        name: "Group Pass",
        price: 199.99,
        features: ["Conference Tickets", "Free Lunch And Coffee", "Certificate"],
        bgColor: "bg-darkNavy",
        textColor: "text-white",
        icon: "🚀",
    },
];

const Tickets = () => {
    const [selectedTickets, setSelectedTickets] = useState({});
    const navigate = useNavigate();

    const handleQuantityChange = (ticketId, qty) => {
        setSelectedTickets({ ...selectedTickets, [ticketId]: qty });
    };

    const handleBuy = (ticket) => {
        const user = localStorage.getItem("user");
        if (!user) {
            navigate("/signin", { state: { from: "/buy-tickets" } });
            return;
        }

        const qty = selectedTickets[ticket.id] || 1;

        navigate("/get-tickets", {
            state: {
                eventId: ticket.eventId, // ✅ send eventId
                ticketType: ticket.name,
                price: ticket.price,
                quantity: qty,
            },
        });
    };

    return (
        <section className="py-20 bg-cream">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-darkNavy">Buy Your Tickets</h2>
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
                                        onClick={() => handleBuy(ticket)}
                                        className="relative w-full py-3 font-semibold text-white bg-accentOrange rounded-lg overflow-hidden group"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-accentOrange to-primaryBlue -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
                                        <span className="relative z-10">Buy Now</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Tickets;
