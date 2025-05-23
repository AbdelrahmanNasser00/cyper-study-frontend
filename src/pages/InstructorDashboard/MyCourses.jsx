import React, { useState } from "react";
import CourseRow from "./components/CourseRow";
import StatsCard from "./components/StatsCard";
import { Link } from "react-router-dom";
import { useStats } from "../../context/statsContext";
import LoadingSpinner from "@/components/common/loadingSpinner";
const MyCourses = () => {
  const { stats, loading } = useStats();

  if (loading) return <LoadingSpinner />;

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

      <StatsCard stats={stats} />
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
