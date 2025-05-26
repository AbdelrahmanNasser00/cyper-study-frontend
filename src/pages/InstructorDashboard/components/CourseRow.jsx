import React from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const CourseRow = ({ course, onEdit, onDelete, onToggleStatus }) => {
  
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-2 flex items-center gap-2">
        <img
        
          src={course.thumbnail}
          alt={course.title}
          className="w-10 h-10 rounded"
        />
        <Link to={`/instructor/courses/${course.id}/add-video`}>
          {course.title}
        </Link>
      </td>
      <td className="p-2">{Number(course.students || 0).toLocaleString()}</td>
      <td className="p-2">{course.rating || "-"}</td>
      <td className="p-2">
        <span
          className={`px-2 py-1 text-sm rounded-full ${
            course.isPublished
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {course.isPublished ? "Published" : "Draft"}
        </span>
      </td>
      <td className="p-2">{course.price}</td>
      <td className="p-2 flex gap-2">
        <button
          title="Edit"
          onClick={() => onEdit(course.id)}
          className="text-blue-500 hover:text-blue-700"
        >
          <FaEdit />
        </button>
        {course.isPublished ? (
          <button title="Hide" onClick={() => onToggleStatus(course.id)}>
            <Eye className="opacity-50" size={16} />
          </button>
        ) : (
          <button title="Preview" onClick={() => onToggleStatus(course.id)}>
            <Eye size={16} />
          </button>
        )}
        <button
          title="Delete"
          onClick={() => onDelete(course.id)}
          className="text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
};

export default CourseRow;
