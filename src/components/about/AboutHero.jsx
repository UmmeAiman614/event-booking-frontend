// src/components/about/AboutHero.jsx
import { Link } from "react-router-dom";

const AboutHero = () => {
  return (
    <section
      className="relative h-[70vh] flex items-center justify-center text-center text-white bg-fixed bg-center bg-cover"
      style={{ backgroundImage: "url('/assets/event-bg.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 px-6">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
          Creating Unforgettable Event Experiences
        </h2>

        {/* Contact Us Button */}
        <Link
          to="/contact"
          className="relative inline-block px-10 py-4 text-lg font-semibold rounded-xl overflow-hidden group bg-accentOrange"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-accentOrange to-primaryBlue transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
          <span className="relative z-10">Contact Us</span>
        </Link>
      </div>
    </section>
  );
};

export default AboutHero;
