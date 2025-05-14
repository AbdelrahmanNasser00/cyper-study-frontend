import React from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import StatsCard from "./components/StatsCard";

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
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              + Create New Course
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Total Students"
              value={stats.totalStudents}
              icon="👤"
            />
            <StatsCard
              title="Total Courses"
              value={stats.totalCourses}
              icon="📚"
            />
            <StatsCard
              title="Total Earnings"
              value={stats.totalEarnings}
              icon="💰"
            />
            <StatsCard
              title="Certificates Issued"
              value={stats.totalCertificates}
              icon="🎖️"
            />
          </div>
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default InstructorLayout;
