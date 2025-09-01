// src/components/home/HomeAbout.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAbout } from "../../api/api"; // <-- your API function

const HomeAbout = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchAbout = async () => {
    try {
      console.log("📢 Fetching About info from backend...");
      const { data } = await getAbout();
      console.log("✅ About data received:", data);
      setAbout(data);
    } catch (err) {
      console.error("❌ Failed to fetch About:", err.response || err.message || err);
      setError("Failed to load about info.");
    } finally {
      setLoading(false);
    }
  };

  fetchAbout();
}, []);

  if (loading) {
    return (
      <section className="py-20 bg-cream text-center">
        <p className="text-darkNavy text-lg">Loading About Info...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-cream text-center">
        <p className="text-red-600 text-lg">{error}</p>
      </section>
    );
  }

  if (!about) {
    return (
      <section className="py-20 bg-cream text-center">
        <p className="text-darkNavy text-lg">No About Info Found</p>
      </section>
    );
  }

  return (
    <section className="relative py-20 bg-cream overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 items-center gap-12">
        {/* Left Side: Heading, Description, Button */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-darkNavy">
            {about.heading}
          </h2>
          <p className="text-neutralDark text-lg">{about.description}</p>

          {/* Optional Mission & Vision if available */}
          {about.mission && (
            <p className="text-primaryBlue font-semibold">
              <span className="text-darkNavy">Our Mission: </span>
              {about.mission}
            </p>
          )}
          {about.vision && (
            <p className="text-accentOrange font-semibold">
              <span className="text-darkNavy">Our Vision: </span>
              {about.vision}
            </p>
          )}

          <Link
            to="/get-tickets"
            className="relative inline-block px-8 py-3 font-semibold text-white rounded-lg overflow-hidden group bg-accentOrange"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-accentOrange to-primaryBlue -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
            <span className="relative z-10">Get Tickets</span>
          </Link>
        </div>

        {/* Right Side: Image with decorative diagonal lines */}
        <div className="relative flex justify-center items-center">
          {/* Diagonal lines behind image */}
          <div
            className="absolute -inset-4 rounded-full z-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                #954C2E 0px,
                #954C2E 4px,
                transparent 4px,
                transparent 12px
              )`,
            }}
          ></div>

          {/* Circular image */}
          <img
            src="/assets/about-circle.jpg"
            alt="About Event"
            className="relative w-72 h-72 md:w-96 md:h-96 rounded-full object-cover shadow-lg z-10"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
