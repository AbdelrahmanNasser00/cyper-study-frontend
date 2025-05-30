import React, { useState } from "react";
import CourseRow from "./components/CourseRow";
import StatsCard from "./components/StatsCard";
import { Link, useNavigate } from "react-router-dom";
import { useStats } from "../../context/statsContext";
import LoadingSpinner from "@/components/common/loadingSpinner";
import {
  useGetInstructorCoursesQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} from "../../services/coursesApi";

const PAGE_SIZE = 5;

const MyCourses = () => {
  const navigate = useNavigate();
  const { stats, loading } = useStats();
  let { data: courses = [], isLoading } = useGetInstructorCoursesQuery();
  const [updateCourse] = useUpdateCourseMutation();
  const [deleteCourseApi] = useDeleteCourseMutation();

  // Pagination state
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(courses.length / PAGE_SIZE);

  const paginatedCourses = courses.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  if (loading || isLoading) return <LoadingSpinner />;

  const handleEdit = (id) => {
    navigate(`/instructor/courses/${id}/edit`);
  };

  const toggleStatus = async (id) => {
    const course = courses.find((c) => c.id === id);
    if (!course) return;
    try {
      await updateCourse({
        id,
        ...course,
        isPublished: !course.isPublished,
      });
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const deleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourseApi(id);
      } catch (err) {
        alert("Failed to delete course");
      }
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
          {courses.filter((c) => c.isPublished).length} published)
        </p>
        <div className="overflow-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="p-2">Course</th>
                <th className="p-2">Students</th>
                <th className="p-2">Rating</th>
                <th className="p-2">Status</th>
                <th className="p-2">price</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCourses.map((course) => (
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
        {/* Pagination controls */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}>
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
