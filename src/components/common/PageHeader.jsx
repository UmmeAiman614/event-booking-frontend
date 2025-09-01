// src/components/common/PageHeader.jsx
import { Link } from "react-router-dom";

const PageHeader = ({ title, image, breadcrumbs }) => {
  return (
    <div className="relative h-64 md:h-80 w-full flex items-center justify-center">
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
      <div className="relative z-10 text-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>

        {/* Breadcrumbs */}
        <div className="flex justify-center items-center space-x-2 text-sm md:text-base">
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
      </div>
    </div>
  );
};

export default PageHeader;
