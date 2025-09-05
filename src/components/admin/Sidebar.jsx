import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Mic,
  BookOpen,
  MessageSquare,
  FileText,
  Phone,
  Menu,
  X,
  Home, // ✅ added home icon
} from "lucide-react";

const allMenuItems = [
  { name: "Home", path: "/", icon: Home, roles: ["admin", "speaker"] }, // ✅ new home link
  { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard, roles: ["admin"] },
  { name: "Users", path: "/admin/users", icon: Users, roles: ["admin"] },
  { name: "Events", path: "/admin/events", icon: Calendar, roles: ["admin"] },
  { name: "Speakers", path: "/admin/speakers", icon: Mic, roles: ["admin", "speaker"] },
  { name: "Bookings", path: "/admin/bookings", icon: BookOpen, roles: ["admin"] },
  { name: "Blogs", path: "/admin/blogs", icon: FileText, roles: ["admin"] },
  { name: "Comments", path: "/admin/comments", icon: MessageSquare, roles: ["admin"] },
  { name: "About", path: "/admin/about", icon: FileText, roles: ["admin"] },
  { name: "Contacts", path: "/admin/contacts", icon: Phone, roles: ["admin"] },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Filter menu items based on role
  const menuItems = allMenuItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <>
      {/* Topbar for small screens */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-darkNavy text-cream px-4 py-3 shadow-md">
        <div className="text-xl font-bold">Dashboard</div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-primaryBlue rounded-md"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-darkNavy text-cream shadow-lg z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo (only visible on desktop) */}
        <div className="hidden md:block p-6 text-2xl font-bold border-b border-primaryBlue">
          Admin Panel
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2 mt-16 md:mt-0">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isHome = item.name === "Home"; // ✅ detect home
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isHome
                      ? isActive
                        ? "bg-accentOrange text-white font-bold shadow-md scale-105"
                        : "text-accentOrange font-semibold border border-accentOrange hover:bg-accentOrange hover:text-white"
                      : isActive
                      ? "bg-primaryBlue text-white"
                      : "text-cream hover:bg-accentOrange hover:text-white"
                  }`
                }
                onClick={() => setIsOpen(false)} // close on mobile
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
