// src/pages/SpeakerDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { getSpeakerById } from "../api/api";

const SpeakerDetail = () => {
  const { id } = useParams();
  const [speaker, setSpeaker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpeaker = async () => {
      try {
        console.log("🆔 Speaker ID from route:", id);
        const res = await getSpeakerById(id);
        console.log("📦 Full API response:", res.data);

        setSpeaker(res.data);
        console.log("📅 Speaker schedules:", res.data.schedules);
      } catch (err) {
        console.error("❌ Error fetching speaker:", err);
        setError("Failed to fetch speaker details");
      } finally {
        setLoading(false);
      }
    };
    fetchSpeaker();
  }, [id]);

  const formatTime = (time) => {
    if (!time) return "";
    return new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (loading) {
    return <p className="py-20 text-center text-lg">Loading speaker details...</p>;
  }

  if (error || !speaker) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold text-red-500">{error || "Speaker not found"}</h2>
        <Link to="/speakers" className="text-accentOrange underline mt-4 inline-block">
          Go back to Speakers
        </Link>
      </div>
    );
  }

  const imageUrl = speaker.photo
  ? speaker.photo.startsWith("http")
    ? speaker.photo
    : `${import.meta.env.VITE_UPLOADS_URL}${speaker.photo}`
  : "/assets/speaker-placeholder.jpg";

  return (
    <section className="py-20 bg-cream text-darkNavy">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-12 items-start">
        {/* Image */}
        <div className="lg:w-1/3 flex justify-center">
          <img
            src={imageUrl}
            alt={speaker.name}
            className="rounded-2xl shadow-xl w-80 h-80 object-cover border-4 border-burntOrange"
          />
        </div>

        {/* Details */}
        <div className="lg:w-2/3 space-y-6">
          <h2 className="text-4xl font-extrabold">{speaker.name}</h2>
          <p className="text-burntOrange font-semibold text-xl">
            {Array.isArray(speaker.expertise) ? speaker.expertise.join(", ") : speaker.expertise}
          </p>
          <p className="text-lg leading-relaxed">{speaker.bio}</p>

          {/* Schedule */}
          {speaker.schedules && speaker.schedules.length > 0 ? (
            <div className="mt-10">
              <h3 className="text-2xl font-bold mb-6">📅 Upcoming Schedule</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {speaker.schedules.map((schedule, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl shadow-md border border-burntOrange bg-darkNavy text-offWhite hover:shadow-lg transition"
                  >
                    <p className="text-lg font-semibold text-burntOrange mb-2 text-white">
                      {schedule.title || `Session ${idx + 1}`}
                    </p>
                    <p className="text-white mb-1">
                      {formatTime(schedule.startTime)} – {formatTime(schedule.endTime)}
                    </p>
                    {schedule.description && (
                      <p className="text-white italic mt-2">{schedule.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-6 text-gray-600 italic">No schedules available for this speaker yet.</p>
          )}

          {/* Social Links */}
          <div className="flex space-x-5 mt-8">
            <a href={speaker.facebook || "#"} className="hover:text-burntOrange transition">
              <FaFacebookF size={26} />
            </a>
            <a href={speaker.twitter || "#"} className="hover:text-burntOrange transition">
              <FaTwitter size={26} />
            </a>
            <a href={speaker.linkedin || "#"} className="hover:text-burntOrange transition">
              <FaLinkedinIn size={26} />
            </a>
            <a href={speaker.instagram || "#"} className="hover:text-burntOrange transition">
              <FaInstagram size={26} />
            </a>
          </div>

          {/* Back Link */}
          <Link
            to="/speakers"
            className="inline-block mt-8 px-8 py-3 bg-accentOrange text-white rounded-xl font-semibold hover:bg-darkNavy hover:text-burntOrange transition shadow-md"
          >
            ← Back to Speakers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpeakerDetail;
