import { NavLink } from "react-router-dom";
import {
  BookOpenIcon,
  HomeIcon,
  DollarSignIcon,
   TagIcon,
  ChevronRightIcon,
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    to: "/instructor/dashboard",
    icon: <HomeIcon size={18} />,
  },
  {
    name: "My Courses",
    to: "/instructor/courses",
    icon: <BookOpenIcon size={18} />,
  },
  {
    name: "Earnings",
    to: "/instructor/earnings",
    icon: <DollarSignIcon size={18} />,
  },
 
  {
    name: "Coupons",
    to: "/instructor/coupons",
    icon: < TagIcon size={18} />,
  },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-lg p-4  sticky top-0 overflow-y-auto">
      <h2 className="text-lg font-bold mb-6">Instructor Panel</h2>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-between p-2 rounded transition-all ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <div className="flex items-center space-x-2">
                {item.icon}
                <span>{item.name}</span>
              </div>
              <ChevronRightIcon size={16} />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
