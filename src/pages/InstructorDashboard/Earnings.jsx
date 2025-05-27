import React, { useEffect, useState } from "react";
import { useGetMonthlyEarningsQuery } from "../../services/dashboardApi";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { Link } from "react-router-dom";
import { useStats } from "../../context/statsContext";
import StatsCard from "./components/StatsCard";
import LoadingSpinner from "@/components/common/loadingSpinner";
const MyEarnings = () => {
  const { stats, loading } = useStats();
  const { data: earnings = [], isLoading } = useGetMonthlyEarningsQuery();

  if (loading || isLoading) return <LoadingSpinner />;

  const year = earnings[0]?.year || new Date().getFullYear();
  const monthlyEarnings = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const found = earnings.find(
      (item) => item.month === month && item.year === year
    );
    return {
      name: month.toString(), 
      totalEarnings: found ? Number(found.totalEarnings) : 0,
    };
  });

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
      <div className="p-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Earnings Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyEarnings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                label={{
                  value: "Month",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="totalEarnings"
                stroke="#4f46e5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default MyEarnings;
