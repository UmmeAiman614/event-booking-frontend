// src/components/common/Footer.jsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-darkNavy text-cream pt-12 pb-6">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Column 1: Logo + Description */}
        <div>
          <img
            src="/assets/nav-logo.png"
            alt="Logo"
            className="h-10 mb-4"
          />
          <p className="text-sm text-cream/90">
            Your event booking platform. Find and book events with ease. Experience unforgettable moments.
          </p>
        </div>

        {/* Column 2: Useful Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 border-b border-cream inline-block pb-1">
            Useful Links
          </h4>
          <ul className="space-y-2 mt-2">
            <li>
              <Link to="/" className="hover:text-accentOrange transition">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-accentOrange transition">About</Link>
            </li>
            <li>
              <Link to="/speakers" className="hover:text-accentOrange transition">Speakers</Link>
            </li>
            <li>
              <Link to="/schedule" className="hover:text-accentOrange transition">Schedule</Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-accentOrange transition">Blog</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-accentOrange transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Us */}
        <div>
          <h4 className="text-lg font-semibold mb-4 border-b border-cream inline-block pb-1">
            Contact Us
          </h4>
          <ul className="space-y-2 mt-2 text-sm text-cream/90">
            <li>Email: info@yourevent.com</li>
            <li>Phone: +1 234 567 890</li>
            <li>Address: 123 Event Street, City, Country</li>
          </ul>
        </div>

        {/* Column 4: Instagram Gallery */}
        <div>
          <h4 className="text-lg font-semibold mb-4 border-b border-cream inline-block pb-1">
            Instagram
          </h4>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <img src="/assets/insta1.jpg" alt="Instagram 1" className="w-full h-20 object-cover rounded" />
            <img src="/assets/insta2.jpg" alt="Instagram 2" className="w-full h-20 object-cover rounded" />
            <img src="/assets/insta3.jpg" alt="Instagram 3" className="w-full h-20 object-cover rounded" />
            <img src="/assets/insta4.jpg" alt="Instagram 4" className="w-full h-20 object-cover rounded" />
            <img src="/assets/insta5.jpg" alt="Instagram 5" className="w-full h-20 object-cover rounded" />
            <img src="/assets/insta6.jpg" alt="Instagram 6" className="w-full h-20 object-cover rounded" />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center text-sm text-cream/70">
        &copy; {new Date().getFullYear()} Your Event Booking. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
