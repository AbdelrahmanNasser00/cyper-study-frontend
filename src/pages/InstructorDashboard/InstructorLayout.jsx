import React from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const InstructorLayout = () => {
  return (
    <div className="flex min-h-screen bg-white container">
      <div className=" p-4">
        <Sidebar />
      </div>
      <div className="flex-1 p-6 space-y-6">
        <div className="space-y-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default InstructorLayout;
