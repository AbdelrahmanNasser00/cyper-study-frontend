import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { FaEdit } from "react-icons/fa";
const LessonRow = ({ lesson, index, onDelete, onReorder, total }) => (
  <tr className="border-b hover:bg-gray-50">
    <td className="p-2">{index + 1}</td>
    <td className="p-2">{lesson.title}</td>
    <td className="p-2">{lesson.duration} min</td>
    <td className="p-2 flex gap-2">
      <Link to={`/instructor/lessons/${lesson.id}/edit`}>
        <button className="text-blue-500 hover:text-blue-700">
          {" "}
          <FaEdit />
        </button>
      </Link>
      <button className="text-red-600" onClick={() => onDelete(lesson.id)}>
        <Trash2 size={16} />
      </button>
      <button
        className="text-gray-600"
        disabled={index === 0}
        onClick={() => onReorder(index, index - 1)}
        title="Move Up"
      >
        ↑
      </button>
      <button
        className="text-gray-600"
        disabled={index === total - 1}
        onClick={() => onReorder(index, index + 1)}
        title="Move Down"
      >
        ↓
      </button>
    </td>
  </tr>
);

export default LessonRow;
