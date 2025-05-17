import React from "react";
import { Link } from "react-router-dom";
import WelcomeSection from "./components/WelcomeSection";
import TipsSection from "./components/TipsSection";
import StatsCard from "./components/StatsCard";

const Dashboard = () => {
  const stats = {
    totalStudents: 5,
    totalCourses: 4,
    totalEarnings: 88109.17,
    publishedCourses: 3,
    totalCertificates: 0,
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
        <Link to="/instructor/courses/new">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            + Create New Course
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        <StatsCard
          title="Total Students"
          value={stats.totalStudents}
          icon="👤"
        />
        <StatsCard title="Total Courses" value={stats.totalCourses} icon="📚" />
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <WelcomeSection />
        <TipsSection />
      </div>
    </div>
  );
};

export default Dashboard;
