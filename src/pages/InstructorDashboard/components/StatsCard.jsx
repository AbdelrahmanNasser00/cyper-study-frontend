import React from "react";
import {
  UserIcon,
  BookOpenIcon,
  DollarSignIcon,
  AwardIcon,
} from "lucide-react";

const defaultCards = [
  {
    key: "totalStudents",
    title: "Total Students",
    icon: <UserIcon />,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    key: "totalCourses",
    title: "Total Courses",
    icon: <BookOpenIcon />,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    key: "totalEarnings",
    title: "Total Earnings",
    icon: <DollarSignIcon />,
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
  {
    key: "totalCertificates",
    title: "Certificates Issued",
    icon: <AwardIcon />,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
];

const StatsCard = ({ stats, cards = defaultCards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      {cards.map((card) => (
        <div
          key={card.key}
          className="bg-white shadow rounded-xl p-4 flex items-center justify-between"
        >
          <div>
            <h2 className="text-sm text-gray-500">{card.title}</h2>
            <p className="text-xl font-semibold">{stats[card.key]}</p>
          </div>
          <span
            className={`flex items-center justify-center w-10 h-10 rounded-full ${card.bg}`}
          >
            {React.cloneElement(card.icon, { size: 24, className: card.color })}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
