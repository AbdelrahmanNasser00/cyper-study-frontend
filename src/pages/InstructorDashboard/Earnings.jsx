import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  UserIcon,
  BookOpenIcon,
  DollarSignIcon,
  AwardIcon,
} from "lucide-react";
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
import StatsCard from "./components/StatsCard";
const MyEarnings = () => {
  const stats = {
    totalStudents: 5,
    totalCourses: 4,
    totalEarnings: 88109.17,
    publishedCourses: 3,
    totalCertificates: 0,
  };
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        <StatsCard
          title="Total Students"
          value={stats.totalStudents}
          icon={
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
              <UserIcon size={24} className="text-blue-600" />
            </span>
          }
        />
        <StatsCard
          title="Total Courses"
          value={stats.totalCourses}
          icon={
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
              <BookOpenIcon size={24} className="text-green-600" />
            </span>
          }
        />
        <StatsCard
          title="Total Earnings"
          value={stats.totalEarnings}
          icon={
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100">
              <DollarSignIcon size={24} className="text-yellow-600" />
            </span>
          }
        />
        <StatsCard
          title="Certificates Issued"
          value={stats.totalCertificates}
          icon={
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100">
              <AwardIcon size={24} className="text-purple-600" />
            </span>
          }
        />
      </div>
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
