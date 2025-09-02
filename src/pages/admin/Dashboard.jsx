import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import {
  getUsersCount,
  getSpeakersCount,
  getEventsCount,
  getBlogsCount,
  getCommentsCount,
  getAboutCount,
  getBookingsCount,
  getContactsCount,
} from "../../api/api";
import {
  FaUsers,
  FaMicrophone,
  FaCalendarAlt,
  FaBlog,
  FaComments,
  FaInfoCircle,
  FaBookOpen,
  FaEnvelope,
} from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    speakers: 0,
    events: 0,
    blogs: 0,
    comments: 0,
    about: 0,
    bookings: 0,
    contacts: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("🔑 Dashboard fetchCounts token:", token);

        const [
          usersRes,
          speakersRes,
          eventsRes,
          blogsRes,
          commentsRes,
          aboutRes,
          bookingsRes,
          contactsRes,
        ] = await Promise.all([
          getUsersCount(),
          getSpeakersCount(),
          getEventsCount(),
          getBlogsCount(),
          getCommentsCount(),
          getAboutCount(),
          getBookingsCount(),
          getContactsCount(),
        ]);

        console.log("✅ Dashboard counts fetched:", {
          usersRes,
          speakersRes,
          eventsRes,
          blogsRes,
          commentsRes,
          aboutRes,
          bookingsRes,
          contactsRes,
        });

        setStats({
          users: usersRes?.data?.count || 0,
          speakers: speakersRes?.data?.count || 0,
          events: eventsRes?.data?.count || 0,
          blogs: blogsRes?.data?.count || 0,
          comments: commentsRes?.data?.count || 0,
          about: aboutRes?.data?.count || 0,
          bookings: bookingsRes?.data?.count || 0,
          contacts: contactsRes?.data?.count || 0,
        });
      } catch (err) {
        if (err.response) {
          console.error(
            "❌ Failed to fetch dashboard counts: response error",
            err.response.status,
            err.response.data
          );
        } else if (err.request) {
          console.error(
            "❌ Failed to fetch dashboard counts: no response received",
            err.request
          );
        } else {
          console.error("❌ Failed to fetch dashboard counts:", err.message);
        }
      }
    };

    fetchCounts();
  }, []);

  const cards = [
    { title: "Users", value: stats.users, icon: <FaUsers className="text-4xl opacity-80" />, color: "bg-gradient-to-r from-blue-500 to-blue-700" },
    { title: "Speakers", value: stats.speakers, icon: <FaMicrophone className="text-4xl opacity-80" />, color: "bg-gradient-to-r from-purple-500 to-purple-700" },
    { title: "Events", value: stats.events, icon: <FaCalendarAlt className="text-4xl opacity-80" />, color: "bg-gradient-to-r from-green-500 to-green-700" },
    { title: "Blogs", value: stats.blogs, icon: <FaBlog className="text-4xl opacity-80" />, color: "bg-gradient-to-r from-orange-500 to-orange-700" },
    { title: "Comments", value: stats.comments, icon: <FaComments className="text-4xl opacity-80" />, color: "bg-gradient-to-r from-red-500 to-red-700" },
    { title: "Bookings", value: stats.bookings, icon: <FaBookOpen className="text-4xl opacity-80" />, color: "bg-gradient-to-r from-pink-500 to-pink-700" },
    { title: "Contacts", value: stats.contacts, icon: <FaEnvelope className="text-4xl opacity-80" />, color: "bg-gradient-to-r from-teal-500 to-teal-700" },
    { title: "About", value: stats.about, icon: <FaInfoCircle className="text-4xl opacity-80" />, color: "bg-gradient-to-r from-gray-500 to-gray-700" },
  ];

  return (
    <div className="flex min-h-screen bg-offwhite">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`${card.color} shadow-lg rounded-xl p-6 flex items-center justify-between text-white transform hover:scale-105 transition duration-300`}
            >
              <div>
                <h2 className="text-lg font-semibold">{card.title}</h2>
                <p className="text-3xl font-bold">{card.value}</p>
              </div>
              {card.icon}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
