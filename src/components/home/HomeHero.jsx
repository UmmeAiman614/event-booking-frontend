// src/components/home/HomeHero.jsx
import React from "react";
import { MapPin, Users, Mic } from "lucide-react";

const HomeHero = () => {
    return (
        <section
            className="relative bg-cover bg-center h-[70vh] flex items-center"
            style={{ backgroundImage: "url('/assets/hero-bg.jpg')" }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-80"></div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center text-cream">
                {/* Heading */}
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Join the Ultimate Event Experience
                </h1>

                {/* Stats row */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
                    {/* Available Seats */}
                    <div className="flex items-center gap-2 bg-darkNavy bg-opacity-50 px-4 py-2 rounded">
                        <Users className="w-6 h-6 text-accentOrange" />
                        <span>Available Seats: 120</span>
                    </div>

                    {/* Speakers */}
                    <div className="flex items-center gap-2 bg-darkNavy bg-opacity-50 px-4 py-2 rounded">
                        <Mic className="w-6 h-6 text-accentOrange" />
                        <span>Speakers: 8</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 bg-darkNavy bg-opacity-50 px-4 py-2 rounded">
                        <MapPin className="w-6 h-6 text-accentOrange" />
                        <span>Location: New York</span>
                    </div>
                </div>

              {/* Book Now Button */}
<button className="relative inline-block px-8 py-3 font-semibold text-white rounded-lg overflow-hidden group bg-accentOrange">
  {/* Sliding gradient background */}
  <span className="absolute inset-0 bg-gradient-to-r from-accentOrange to-primaryBlue -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>

  {/* Button text */}
  <span className="relative z-10">Book Now</span>
</button>

            </div>
        </section>
    );
};

export default HomeHero;
