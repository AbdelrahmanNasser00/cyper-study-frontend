import {
  useGetLessonsByCourseQuery,
  useDeleteLessonMutation,
  useReorderLessonsMutation,
} from "../../../services/lessonApi";
import LessonRow from "./LessonRow";
import LoadingSpinner from "@/components/common/loadingSpinner";
import { useState } from "react";
import { Link } from "react-router-dom";
const PAGE_SIZE = 5;

const CourseVideos = ({ courseId }) => {
  const { data: lessons = [], isLoading } =
    useGetLessonsByCourseQuery(courseId);
  const [deleteLesson] = useDeleteLessonMutation();
  const [reorderLessons] = useReorderLessonsMutation();
  const [page, setPage] = useState(1);

  // Pagination logic
  const totalPages = Math.ceil(lessons.length / PAGE_SIZE);
  const paginatedLessons = lessons.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      await deleteLesson(id);
    }
  };

  // Reorder handler (move up/down)
  const handleReorder = async (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= lessons.length) return;
    const newOrder = [...lessons];
    const [moved] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, moved);
    await reorderLessons({ courseId, order: newOrder.map((l) => l.id) });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Course Videos</h2>
        <Link to={`/instructor/courses/${courseId}/add-video`}>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            + Add New Video
          </button>
        </Link>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="p-2">#</th>
              <th className="p-2">Title</th>
              <th className="p-2">Duration</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLessons.map((lesson, idx) => (
              <LessonRow
                key={lesson.id}
                courseId={courseId}
                lesson={lesson}
                index={(page - 1) * PAGE_SIZE + idx}
                onDelete={handleDelete}
                onReorder={handleReorder}
                total={lessons.length}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseVideos;
