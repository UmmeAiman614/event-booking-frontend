// src/components/contact/ReachUs.jsx
import { useState } from "react";
import { FaClock, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaInfoCircle, FaBuilding } from "react-icons/fa";

const ReachUs = () => {
  const [activeTab, setActiveTab] = useState("time");

  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Map */}
        <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
          <iframe
            title="Event Location"
            src="https://www.google.com/maps?q=Expo+Center+Karachi&output=embed"
            className="w-full h-full"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        {/* Right Side - Tabs with Card */}
        <div className="bg-darkNavy text-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex divide-x divide-cream/20">
            <button
              onClick={() => setActiveTab("time")}
              className={`flex-1 px-6 py-3 font-semibold transition ${
                activeTab === "time"
                  ? "bg-accentOrange text-white"
                  : "bg-primaryBlue text-white hover:bg-accentOrange"
              }`}
            >
              Time
            </button>
            <button
              onClick={() => setActiveTab("venue")}
              className={`flex-1 px-6 py-3 font-semibold transition ${
                activeTab === "venue"
                  ? "bg-accentOrange text-white"
                  : "bg-primaryBlue text-white hover:bg-accentOrange"
              }`}
            >
              Venue
            </button>
            <button
              onClick={() => setActiveTab("howto")}
              className={`flex-1 px-6 py-3 font-semibold transition ${
                activeTab === "howto"
                  ? "bg-accentOrange text-white"
                  : "bg-primaryBlue text-white hover:bg-accentOrange"
              }`}
            >
              How To
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "time" && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <FaClock className="text-accentOrange" /> Event Time
                </h3>
                <p>Monday - Friday: <strong>9:00 AM - 6:00 PM</strong></p>
                <p>Saturday: <strong>10:00 AM - 4:00 PM</strong></p>
                <p>Sunday: <strong>Closed</strong></p>
                <div className="space-y-2 pt-4">
                  <p className="flex items-center gap-2">
                    <FaPhoneAlt className="text-primaryBlue" /> +92 300 1234567
                  </p>
                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-primaryBlue" /> info@momento-events.com
                  </p>
                </div>
              </div>
            )}

            {activeTab === "venue" && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <FaMapMarkerAlt className="text-accentOrange" /> Venue
                </h3>
                <p><strong>Event Hall A, Main Expo Center, Karachi</strong></p>
                <p>
                  A modern venue with state-of-the-art facilities, air conditioning, 
                  ample parking space, and advanced audio-visual setup. 
                </p>
                <p className="flex items-center gap-2">
                  <FaBuilding className="text-primaryBlue" /> Capacity: 500+ Guests
                </p>
              </div>
            )}

            {activeTab === "howto" && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <FaInfoCircle className="text-accentOrange" /> How to Reach
                </h3>
                <p>
                  The venue is centrally located and can be accessed by multiple transport options.  
                  <br /> Public Metro Bus stations are just 5 minutes away. 
                  Taxi, ride-hailing services, and local transport are also easily available.
                </p>
                <p>
                  <strong>By Car:</strong> Use Gate #3 of Expo Center for direct access to parking.  
                </p>
                <p>
                  <strong>By Public Transport:</strong> Get off at <em>Expo Stop</em> and walk 500m to Hall A.  
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReachUs;
