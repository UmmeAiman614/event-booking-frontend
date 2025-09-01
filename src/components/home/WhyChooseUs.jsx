import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Image */}
        <div className="relative">
          <img
            src="/assets/why-choose.png"
            alt="Why Choose Us"
            className="rounded-2xl w-[95%] md:w-[105%] object-cover"
          />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-4xl font-bold text-darkNavy mb-6">
            Why Choose Us
          </h2>
          <p className="text-darkNavy/80 mb-8">
            Join the most inspiring event of the year where industry leaders, 
            innovators, and thinkers come together to share knowledge, 
            network, and explore future opportunities.
          </p>

          {/* List Items */}
          <ul className="space-y-4 mb-8">
            {[
              "Top industry expert speakers",
              "Networking opportunities with professionals",
              "Exclusive insights into latest trends",
              "Workshops & hands-on learning",
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-darkNavy">
                <CheckCircle className="w-6 h-6 text-accentOrange" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
         <Link
                                 to="/get-tickets"
                                 className="relative inline-block px-8 py-3 font-semibold text-white rounded-lg overflow-hidden group bg-accentOrange"
                             >
                                 <span className="absolute inset-0 bg-gradient-to-r from-accentOrange to-primaryBlue -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
                                 <span className="relative z-10">Get Tickets</span>
                             </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
