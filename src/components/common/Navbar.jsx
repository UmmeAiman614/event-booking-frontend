import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserBookings } from "../../api/api";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserBookings = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        if (parsedUser && parsedUser.role === "user" && parsedUser.id) {
          getUserBookings(parsedUser.id)
            .then((res) => setBookings(res.data || []))
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
    setIsOpen(false);
  };

  const baseLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    {name: "Events", path: "/events" },
    { name: "Speakers", path: "/speakers" },
    { name: "Schedule", path: "/schedule" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const navLinks = [
    ...baseLinks,
    ...(user && user.role === "user" && bookings.length > 0
      ? [{ name: "My Bookings", path: "/bookings" }]
      : []),
  ];

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

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-darkNavy focus:outline-none"
          >
            {/* Hamburger icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-cream shadow-lg">
          <ul className="flex flex-col space-y-4 p-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-darkNavy font-semibold block hover:text-primaryBlue transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {user ? (
              <>
                {(user.role === "admin" || user.role === "speaker") && (
                  <button
                    onClick={() => {
                      navigate(getDashboardPath());
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 rounded bg-primaryBlue text-white hover:bg-accentOrange transition w-full text-left"
                  >
                    Admin Dashboard
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/signIn"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded bg-primaryBlue text-white hover:bg-accentOrange transition block text-center"
              >
                Login
              </Link>
            )}

            <Link
              to="/get-tickets"
              onClick={() => setIsOpen(false)}
              className="ml-0 mt-2 bg-accentOrange text-white px-4 py-2 rounded hover:bg-primaryBlue transition block text-center"
            >
              Get Tickets
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
