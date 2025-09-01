import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { getAllSpeakers } from "../../api/api";

// ✅ Fixed photo resolver
const resolvePhotoUrl = (photo) => {
  if (!photo) {
    return "/assets/speaker-placeholder.jpg";
  }
  if (photo.startsWith("http")) {
    return photo;
  }

  // DB stores like: /uploads/filename.jpg
  return `http://localhost:3000${photo}`;
};

const Speakers = ({ bgColor = "bg-darkNavy" }) => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        setLoading(true);
        const { data } = await getAllSpeakers();
        setSpeakers(data);
      } catch (err) {
        setSpeakers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSpeakers();
  }, []);

  if (loading) return <p className="text-center text-white py-20">Loading speakers...</p>;

  return (
    <section className={`${bgColor} py-20 relative`}>
      <div className="absolute inset-0 bg-darkNavy/80"></div>

      <div className="relative container mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cream">Meet Our Speakers</h2>
          <p className="text-cream/70 mt-2">Industry leaders who will inspire and engage you</p>
        </div>

        {/* Grid of Speakers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {speakers.length === 0 && (
            <p className="text-cream text-center col-span-full">No speakers to show</p>
          )}

          {speakers.map((speaker) => {
            const photoUrl = resolvePhotoUrl(speaker.photo);

            return (
              <Link
                key={speaker._id}
                to={`/speakers/${speaker._id}`}
                className="relative group block"
              >
                {/* Speaker Image */}
                <img
                  src={photoUrl}
                  alt={speaker.name}
                  className="w-full aspect-square object-cover rounded-full border-4 border-cream shadow-lg"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/speaker-placeholder.jpg";
                  }}
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 rounded-full bg-primaryBlue/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-center p-4">
                  <h3 className="text-xl font-semibold text-accentOrange">{speaker.name}</h3>
                  <p className="text-cream mb-2">{speaker.expertise?.join(", ")}</p>

                  {speaker.schedules?.length > 0 ? (
                    <ul className="text-sm text-cream mb-4 space-y-1">
                      {speaker.schedules.map((sch, idx) => (
                        <li key={idx}>
                          {new Date(sch.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          {" - "}
                          {new Date(sch.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-cream/70 mb-4">No schedule</p>
                  )}

                  <div className="flex space-x-4">
                    <FaFacebookF className="text-cream hover:text-accentOrange transition" />
                    <FaTwitter className="text-cream hover:text-accentOrange transition" />
                    <FaLinkedinIn className="text-cream hover:text-accentOrange transition" />
                    <FaInstagram className="text-cream hover:text-accentOrange transition" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Speakers;
