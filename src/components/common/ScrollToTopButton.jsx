import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="
          fixed bottom-6 right-6 p-3 rounded-full shadow-lg 
          bg-accentOrange text-cream
          hover:bg-primaryBlue hover:text-cream
          transition-all duration-300 ease-in-out
          hover:scale-110
        "
      >
        <ArrowUp size={22} />
      </button>
    )
  );
}