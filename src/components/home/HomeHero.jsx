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
