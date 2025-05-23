import React from "react";
import { Link } from "react-router-dom";
import { useStats } from "../../context/statsContext";
import WelcomeSection from "./components/WelcomeSection";
import TipsSection from "./components/TipsSection";
import StatsCard from "./components/StatsCard";
import LoadingSpinner from "@/components/common/loadingSpinner";

const Dashboard = () => {
  const { stats, loading } = useStats();

  if (loading) return <LoadingSpinner />;

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

      <StatsCard stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <WelcomeSection />
        <TipsSection />
      </div>
    </div>
  );
};

export default Dashboard;
