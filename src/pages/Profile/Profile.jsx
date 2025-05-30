import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import ProfileSideBar from "./Components/ProfileSideBar";

function Profile() {
  const location = useLocation();
  const [profileImage, setProfileImage] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    role: "",
  });

  return (
    <div className="container my-10">
      <h2 className="text-3xl font-bold mb-10">My profile</h2>
      <div className="flex gap-10 flex-wrap md:flex-nowrap">
        {/* sidebar */}
        <div className="mx-auto flex-1">
          <ProfileSideBar
            profileImage={profileImage}
            name={profileData.name}
            email={profileData.email}
            role={profileData.role}
          />
        </div>
        {/* sidebar */}
        {/* content */}
        <div className="w-full">
          {location.pathname === "/profile" && (
            <Navigate to="/profile/details" replace />
          )}
          <Outlet context={{ setProfileImage, setProfileData }} />{" "}
          {/* Pass setProfileData in context */}
        </div>
        {/* content */}
      </div>
    </div>
  );
}

export default Profile;
