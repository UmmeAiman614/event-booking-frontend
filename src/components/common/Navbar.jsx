import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserBookings } from "../../api/api"; // your API call to fetch bookings

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  // Load user and fetch bookings
  useEffect(() => {
    const fetchUserBookings = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        if (parsedUser && parsedUser.role === "user" && parsedUser.id) {
          getUserBookings(parsedUser.id)
            .then((res) => {
              const data = res.data;
              setBookings(data || []);
            })
            .catch((err) => console.error("Failed to fetch bookings:", err));
        }
      }
    };

    fetchUserBookings();

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    const handleUserLogin = () => {
      const updatedUser = localStorage.getItem("user");
      const parsedUser = updatedUser ? JSON.parse(updatedUser) : null;
      setUser(parsedUser);

      if (parsedUser && parsedUser.role === "user" && parsedUser.id) {
        getUserBookings(parsedUser.id)
          .then((res) => setBookings(res.data || []))
          .catch((err) => console.error("Failed to fetch bookings:", err));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userLoggedIn", handleUserLogin);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userLoggedIn", handleUserLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setBookings([]);
    navigate("/signIn");
  };

  const baseLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Speakers", path: "/speakers" },
    { name: "Schedule", path: "/schedule" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  // Compute nav links dynamically after bookings state updates
  const navLinks = [
    ...baseLinks,
    ...(user && user.role === "user" && bookings.length > 0
      ? [{ name: "My Bookings", path: "/bookings" }]
      : []),
  ];

  // ✅ Decide dashboard path based on role
  const getDashboardPath = () => {
    if (!user) return "/signIn";
    if (user.role === "admin") return "/admin/dashboard";
    if (user.role === "speaker") return "/admin/speakers";
    return "/signIn";
  };

  return (
    <nav className="bg-cream shadow-md fixed w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          <img src="/assets/nav-logo.png" alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-darkNavy hover:text-primaryBlue font-semibold transition"
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <>
              {(user.role === "admin" || user.role === "speaker") && (
                <button
                  onClick={() => navigate(getDashboardPath())}
                  className="px-4 py-2 rounded bg-primaryBlue text-white hover:bg-accentOrange transition"
                >
                  Admin Dashboard
                </button>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/signIn"
              className="px-4 py-2 rounded bg-primaryBlue text-white hover:bg-accentOrange transition"
            >
              Login
            </Link>
          )}

          <Link
            to="/get-tickets"
            className="ml-4 bg-accentOrange text-white px-4 py-2 rounded hover:bg-primaryBlue transition"
          >
            Get Tickets
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
