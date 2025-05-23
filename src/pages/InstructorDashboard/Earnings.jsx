import React, { useEffect, useState } from "react";
import axios from "axios";

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

  if (loading) return <LoadingSpinner />;
  const [monthlyEarnings, setMonthlyEarnings] = useState([]);

  // useEffect(() => {
  //   const fetchEarnings = async () => {
  //     try {
  //       const { data } = await axios.get("/api/earnings/monthly?instructorId=1"); // غيري الـ ID حسب المستخدم
  //       const sortedData = [...data].sort((a, b) => a.month - b.month);
  //       setMonthlyEarnings(sortedData.map((item) => ({
  //         name: `${new Date(0, item.month - 1).toLocaleString("default", { month: "short" })}`,
  //         totalEarnings: Number(item.totalEarnings),
  //       })));
  //     } catch (err) {
  //       console.error("Error fetching earnings", err);
  //     }
  //   };
  //     fetchEarnings();
  // }, []);
  useEffect(() => {
    const dummyData = [
      { name: "Jan", totalEarnings: 2000 },
      { name: "Feb", totalEarnings: 1500 },
      { name: "Mar", totalEarnings: 1800 },
      { name: "Apr", totalEarnings: 2200 },
      { name: "May", totalEarnings: 2500 },
      { name: "Jun", totalEarnings: 3000 },
      { name: "Jul", totalEarnings: 4000 },
      { name: "Aug", totalEarnings: 5000 },
      { name: "Sep", totalEarnings: 6000 },
      { name: "Oct", totalEarnings: 7000 },
      { name: "Nov", totalEarnings: 8500 },
      { name: "Dec", totalEarnings: 9000 },
    ];

    setMonthlyEarnings(dummyData);
  }, []);
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
              <XAxis dataKey="name" />
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
