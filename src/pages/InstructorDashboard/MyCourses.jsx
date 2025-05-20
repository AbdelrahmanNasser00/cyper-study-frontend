import React, { useState } from "react";
import CourseRow from "./components/CourseRow";
import StatsCard from "./components/StatsCard";
import { Link } from "react-router-dom";
import {
  UserIcon,
  BookOpenIcon,
  DollarSignIcon,
  AwardIcon,
} from "lucide-react";
const MyCourses = () => {
  const stats = {
    totalStudents: 5,
    totalCourses: 4,
    totalEarnings: 88109.17,
    publishedCourses: 3,
    totalCertificates: 0,
  };
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Complete Web Development",
      students: 54239,
      rating: 4.8,
      status: "Published",
      updatedAt: "2023-09-15",
    },
    {
      id: 2,
      title: "Advanced React Native",
      students: 21052,
      rating: 4.6,
      status: "Published",
      updatedAt: "2023-11-03",
    },
    {
      id: 3,
      title: "Advanced TypeScript",
      students: 0,
      rating: null,
      status: "Draft",
      updatedAt: "2024-03-10",
    },
  ]);
  const handleEdit = (id) => {
    alert("you are about to edit the course" + id);
  };

  const toggleStatus = (id) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id
          ? {
              ...course,
              status: course.status === "Published" ? "Draft" : "Published",
            }
          : course
      )
    );
  };

  const deleteCourse = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses((prev) => prev.filter((course) => course.id !== id));
    }
  };
  return (
    <div className="flex flex-col gap-4">
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
      <div className="p-6 bg-white shadow rounded-lg">
        <h2 className="text-xl font-bold mb-2">Manage Courses</h2>
        <p className="mb-4 text-gray-500">
          You have {courses.length} courses (
          {courses.filter((c) => c.status === "Published").length} published)
        </p>

        <div className="overflow-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="p-2">Course</th>
                <th className="p-2">Students</th>
                <th className="p-2">Rating</th>
                <th className="p-2">Status</th>
                <th className="p-2">Last Updated</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <CourseRow
                  key={course.id}
                  course={course}
                  onEdit={handleEdit}
                  onDelete={deleteCourse}
                  onToggleStatus={toggleStatus}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
