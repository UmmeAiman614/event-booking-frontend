import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import {
  getAllUsers,
  getAllSpeakers,
  getAllEvents,
  getAllBlogs,
  getAllComments,
  getAbout,
  getAllBookings,
  getAllContacts,
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
    const fetchData = async () => {
      try {
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
          getAllUsers(),
          getAllSpeakers(),
          getAllEvents(),
          getAllBlogs(),
          getAllComments(),
          getAbout(),
          getAllBookings(),
          getAllContacts(),
        ]);

        setStats({
          users: Array.isArray(usersRes?.data)
            ? usersRes.data.length
            : Array.isArray(usersRes)
            ? usersRes.length
            : usersRes?.users?.length || 0,
          speakers: speakersRes?.data?.length || 0,
          events: eventsRes?.data?.length || 0,
          blogs: blogsRes?.data?.length || 0,
          comments: commentsRes?.data?.length || 0,
          about: aboutRes ? 1 : 0,
          bookings: bookingsRes?.data?.length || 0,
          contacts: contactsRes?.data?.length || 0,
        });
      } catch (err) {
        console.error("❌ Failed to fetch dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  const cards = [
    {
      title: "Users",
      value: stats.users,
      icon: <FaUsers className="text-4xl opacity-80" />,
      color: "bg-gradient-to-r from-blue-500 to-blue-700",
    },
    {
      title: "Speakers",
      value: stats.speakers,
      icon: <FaMicrophone className="text-4xl opacity-80" />,
      color: "bg-gradient-to-r from-purple-500 to-purple-700",
    },
    {
      title: "Events",
      value: stats.events,
      icon: <FaCalendarAlt className="text-4xl opacity-80" />,
      color: "bg-gradient-to-r from-green-500 to-green-700",
    },
    {
      title: "Blogs",
      value: stats.blogs,
      icon: <FaBlog className="text-4xl opacity-80" />,
      color: "bg-gradient-to-r from-orange-500 to-orange-700",
    },
    {
      title: "Comments",
      value: stats.comments,
      icon: <FaComments className="text-4xl opacity-80" />,
      color: "bg-gradient-to-r from-red-500 to-red-700",
    },
    {
      title: "Bookings",
      value: stats.bookings,
      icon: <FaBookOpen className="text-4xl opacity-80" />,
      color: "bg-gradient-to-r from-pink-500 to-pink-700",
    },
    {
      title: "Contacts",
      value: stats.contacts,
      icon: <FaEnvelope className="text-4xl opacity-80" />,
      color: "bg-gradient-to-r from-teal-500 to-teal-700",
    },
    {
      title: "About",
      value: stats.about,
      icon: <FaInfoCircle className="text-4xl opacity-80" />,
      color: "bg-gradient-to-r from-gray-500 to-gray-700",
    },
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
