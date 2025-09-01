import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllSpeakers } from "../../api/api";

const BACKEND_URL = "https://event-booking-frontend-kappa.vercel.app"; // Change to your backend URL

const Schedule = () => {
  const [speakers, setSpeakers] = useState([]);
  const [activeDay, setActiveDay] = useState(null);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const { data } = await getAllSpeakers();
        setSpeakers(data);

        // Extract unique days from speaker schedules
        const scheduleDates = data.flatMap(s =>
          s.schedules.map(sc => new Date(sc.startTime).toDateString())
        );
        const uniqueDays = [...new Set(scheduleDates)];
        setDays(uniqueDays);
        setActiveDay(uniqueDays[0]);
      } catch (error) {
        console.error("Failed to fetch speakers:", error);
      }
    };

    fetchSpeakers();
  }, []);

  const schedulesForDay = speakers.flatMap(s =>
    s.schedules
      .filter(sc => new Date(sc.startTime).toDateString() === activeDay)
      .map(sc => ({
        ...sc,
        speakerName: s.name,
        speakerRole: s.role,
        speakerPhoto: s.photo ? `${BACKEND_URL}${s.photo}` : "/assets/default-avatar.jpg",
        speakerId: s._id,
      }))
  );

  return (
    <section className="py-20 bg-cream relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-darkNavy text-center mb-12">
          Event Schedule
        </h2>

        {/* Days Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {days.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDay(day)}
              className={`px-6 py-3 rounded-lg shadow-md text-center text-sm md:text-base transition-all duration-300 ${activeDay === day
                ? "bg-accentOrange text-white"
                : "bg-primaryBlue text-white hover:bg-darkNavy"
                }`}
            >
              <div className="font-bold">{day}</div>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative space-y-16">
          {schedulesForDay.map((item, idx) => {
            const isEven = idx % 2 === 0;
            const bgColor =
              isEven
                ? "bg-primaryBlue before:border-r-primaryBlue"
                : "bg-accentOrange before:border-l-accentOrange";

            return (
              <div
                key={idx}
                className="relative flex flex-col md:flex-row items-center md:items-start"
              >
                {/* Time Circle */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-accentOrange text-white font-bold items-center justify-center shadow-lg z-10">
                  {new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>

                {/* Speaker Card */}
                {/* Speaker Card */}
                <div
                  key={idx}
                  className={`relative w-full md:w-[45%] ${bgColor} text-white p-6 rounded-lg shadow-2xl transition-all duration-300 ${isEven
                    ? "ml-auto before:content-[''] before:absolute before:top-8 before:right-full before:border-y-8 before:border-r-8 before:border-y-transparent"
                    : "mr-auto before:content-[''] before:absolute before:top-8 before:left-full before:border-y-8 before:border-l-8 before:border-y-transparent"
                    }`}
                >
                  <div className="flex flex-col md:flex-row items-start gap-4">
                    {/* Left: Speaker Image */}
                    <img
                      src={item.speakerPhoto}
                      alt={item.speakerName}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-white flex-shrink-0"
                    />

                    {/* Right: Name, Role, Description, Read More */}
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold">{item.speakerName}</h3>
                      <p className="text-sm text-cream mb-2">{item.speakerRole}</p>
                      <p className="text-sm text-cream mb-4">{item.description}</p>
                      <Link
                        to={`/speakers/${item.speakerId}`}
                        className="px-4 py-2 bg-darkNavy rounded-lg text-white hover:bg-cream hover:text-darkNavy transition inline-block"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>


              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
