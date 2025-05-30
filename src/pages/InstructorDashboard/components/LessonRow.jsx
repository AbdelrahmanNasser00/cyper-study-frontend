import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { FaEdit } from "react-icons/fa";
const LessonRow = ({courseId, lesson, index, onDelete, onReorder, total }) => (
  <tr className="border-b hover:bg-gray-50">
    <td className="p-2">{index + 1}</td>
    <td className="p-2">{lesson.title}</td>
    <td className="p-2">{lesson.duration} min</td>
    <td className="p-2 flex gap-2">
      <Link to={`edit-video/${lesson.id}`}>
        <button className="text-blue-500 hover:text-blue-700">
          {" "}
          <FaEdit />
        </button>
      </Link>
      <button className="text-red-600" onClick={() => onDelete(lesson.id)}>
        <Trash2 size={16} />
      </button>
   
     
    </td>
  </tr>
);

export default LessonRow;
