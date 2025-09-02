// src/components/common/PageHeader.jsx
import { Link } from "react-router-dom";

const PageHeader = ({ title, image, breadcrumbs, event }) => {
  return (
    <div className="relative h-64 md:h-80 w-full flex flex-col justify-center">
      {/* Background Image */}
      {image && (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>

        {/* Breadcrumbs */}
        <div className="flex justify-center items-center space-x-2 text-sm md:text-base mb-3">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center space-x-2">
              {crumb.path ? (
                <Link
                  to={crumb.path}
                  className="hover:text-accentOrange transition"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-accentOrange">{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && <span>|</span>}
            </span>
          ))}
        </div>

        {/* Event Info */}
        {event && (
          <div className="flex flex-col md:flex-row justify-center gap-6 text-white text-sm md:text-base mt-2">
            {/* Location */}
            {event.location && (
              <div className="flex items-center gap-1">
                <span className="font-semibold">📍 Location:</span>
                <span>{event.location}</span>
              </div>
            )}
            {/* Available Seats */}
            {event.availableSeats != null && (
              <div className="flex items-center gap-1">
                <span className="font-semibold">🎟️ Available Seats:</span>
                <span>{event.availableSeats}</span>
              </div>
            )}
            {/* Speakers */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="flex items-center gap-1">
                <span className="font-semibold">🗣️ Speakers:</span>
                <span>
                  {event.speakers.map(s => s.name).join(", ")}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
