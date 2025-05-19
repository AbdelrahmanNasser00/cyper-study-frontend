import { Outlet } from "react-router-dom";
import ProfileSideBar from "./Components/ProfileSideBar";

function Profile() {
  return (
    <div className="container my-10">
      <h2 className="text-3xl font-bold mb-10">My profile</h2>
      <div className="flex gap-10">
        {/* sidebar */}
        <ProfileSideBar />
        {/* sidebar */}
        {/* content */}
        <div className="flex-1">
          <Outlet />
        </div>
        {/* content */}
      </div>
    </div>
  );
}

export default Profile;
