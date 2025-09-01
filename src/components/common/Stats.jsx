// src/components/home/Stats.jsx
import { useEffect, useState } from "react";
import { FaUsers, FaMicrophone, FaCalendarCheck, FaBuilding } from "react-icons/fa";

const statsData = [
  { id: 1, icon: <FaUsers />, target: 1200, label: "Happy Users", color: "bg-primaryBlue" },
  { id: 2, icon: <FaMicrophone />, target: 85, label: "Speakers", color: "bg-accentOrange" },
  { id: 3, icon: <FaCalendarCheck />, target: 45, label: "Events Held", color: "bg-darkNavy" },
  { id: 4, icon: <FaBuilding />, target: 30, label: "Venues", color: "bg-neutralDark" },
];

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 sec
    const stepTime = Math.abs(Math.floor(duration / target));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === target) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}</span>;
};

const Stats = ({ bgColor = "bg-cream", numberColor = "text-darkNavy", labelColor = "text-neutralDark" }) => {
  return (
    <section className={`${bgColor} py-20`}>
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        {statsData.map((stat) => (
          <div key={stat.id} className="flex flex-col items-center">
            {/* Icon Circle */}
            <div
              className={`w-20 h-20 ${stat.color} rounded-full flex items-center justify-center text-cream text-3xl shadow-lg mb-4`}
            >
              {stat.icon}
            </div>
            {/* Counter */}
            <h3 className={`text-4xl font-bold ${numberColor}`}>
              <Counter target={stat.target} />+
            </h3>
            {/* Label */}
            <p className={`${labelColor} mt-2 text-lg`}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
