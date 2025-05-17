import React from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const InstructorLayout = () => {
  const stats = {
    totalStudents: 5,
    totalCourses: 4,
    totalEarnings: 88109.17,
    publishedCourses: 3,
    totalCertificates: 0,
  };

  return (
    <div className="flex min-h-screen bg-white">
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
