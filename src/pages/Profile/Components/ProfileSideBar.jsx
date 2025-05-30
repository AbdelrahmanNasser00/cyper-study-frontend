import { NavLink } from "react-router-dom";
import img from "/instructor-removebg-preview.png";
import { HomeIcon, ChevronRightIcon, User, Shield } from "lucide-react";

function ProfileSideBar({ profileImage, name, email, role }) {
  console.log(profileImage);
  const navItems = [
    {
      name: "Details",
      to: "/profile/details",
      icon: <User size={18} />,
    },
    {
      name: "Security",
      to: "/profile/security",
      icon: <Shield size={18} />,
    },
    {
      name: "Dashboard",
      to: role === "student" ? "/student/dashboard" : "/instructor/dashboard", // Dynamic dashboard link
      icon: <HomeIcon size={18} />,
    },
  ];
  return (
    <div className="p-5 border-2 border-gray-100 rounded-2xl">
      {/* image */}
      <div className="flex justify-center mb-1 ">
        <img
          src={profileImage}
          alt="user image"
          className="w-20 h-20 lg:mx-0 rounded-full  overflow-hidden border-4 border-mainColor flex-shrink-0"
        />
      </div>
      {/* image */}
      <div className="text-center">
        <h4>{name}</h4>
        <p className="text-gray-400">{email}</p>
      </div>
      {/* lable */}
      <div className="rounded-full mb-10 mt-2 bg-blue-300/30 text-blue-800 text-center w-fit mx-auto text-sm font-semibold px-3 py-0.5">
        {role}
      </div>
      {/* lable */}
      {/* links */}
      <ul>
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
              }>
              <div className="flex items-center space-x-2">
                {item.icon}
                <span>{item.name}</span>
              </div>
              <ChevronRightIcon size={16} />
            </NavLink>
          </li>
        ))}
      </ul>
      {/* links */}
    </div>
  );
}

export default ProfileSideBar;
