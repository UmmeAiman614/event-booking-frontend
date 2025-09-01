// src/components/home/Features.jsx
import { FaMicrophone, FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaMicrophone />,
    title: "Expert Speakers",
    desc: "Hear from industry leaders and professionals.",
  },
  {
    icon: <FaUsers />,
    title: "Networking",
    desc: "Connect with like-minded individuals and grow.",
  },
  {
    icon: <FaCalendarAlt />,
    title: "Event Schedule",
    desc: "Well-structured sessions and engaging panels.",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Prime Location",
    desc: "Convenient and easily accessible venue.",
  },
  {
    icon: <FaTicketAlt />,
    title: "Easy Tickets",
    desc: "Book tickets online quickly and securely.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-6">
        {/* Top Row: Heading + 2 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Heading */}
          <div>
            <h2 className="text-4xl font-bold text-darkNavy">Why Join Us?</h2>
            <p className="text-neutralDark mt-2 max-w-md">
              Our event brings together the best of the industry. Here’s why you should not miss it.
            </p>
          </div>

          {/* First two feature cards */}
          {features.slice(0, 2).map((feature, index) => (
            <div
              key={index}
              className="flex items-start p-6 bg-primaryBlue rounded-lg shadow-2xl transition-all duration-500 ease-in-out hover:shadow-none group"
            >
              {/* Icon */}
              <div className="text-4xl text-accentOrange mr-4 transition-transform duration-500 ease-in-out group-hover:rotate-[360deg]">
                {feature.icon}
              </div>

              {/* Texts */}
              <div>
                <h3 className="text-xl font-semibold text-cream mb-2 transition-colors duration-500 ease-in-out group-hover:text-accentOrange">
                  {feature.title}
                </h3>
                <p className="text-cream/80">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row: Remaining 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {features.slice(2).map((feature, index) => (
            <div
              key={index}
              className="flex items-start p-6 bg-primaryBlue rounded-lg shadow-2xl transition-all duration-500 ease-in-out hover:shadow-none group"
            >
              {/* Icon */}
              <div className="text-4xl text-accentOrange mr-4 transition-transform duration-500 ease-in-out group-hover:rotate-[360deg]">
                {feature.icon}
              </div>

              {/* Texts */}
              <div>
                <h3 className="text-xl font-semibold text-cream mb-2 transition-colors duration-500 ease-in-out group-hover:text-accentOrange">
                  {feature.title}
                </h3>
                <p className="text-cream/80">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
