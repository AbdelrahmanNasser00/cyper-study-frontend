import { Play, SquarePlay } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsStudent } from "@/store/Slices/authSlice";

function LessonInLessonsList({ lesson }) {
  const isStudent = useSelector(selectIsStudent);
  const { id } = useParams();

  const handleClick = (e) => {
    if (!isStudent) {
      e.preventDefault();
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === Infinity) {
      return "0:00";
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  return (
    <Link to={`/courses/${id}/lesson`} onClick={handleClick}>
      <li
        className={`flex gap-2 items-center justify-between mb-4 ${
          !isStudent ? "opacity-50 cursor-not-allowed" : ""
        }`}>
        <div className="flex gap-2 items-center">
          <SquarePlay className="text-mainColor" />
          <span>{lesson.title}</span>
        </div>
        <div className="flex gap-2 items-center">
          <span>{formatTime(lesson.duration)}</span>
          <Play className="size-4" />
        </div>
      </li>
    </Link>
  );
}

export default LessonInLessonsList;
