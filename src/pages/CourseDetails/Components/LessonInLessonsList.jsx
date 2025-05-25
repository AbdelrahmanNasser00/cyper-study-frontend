import { Play, SquarePlay } from "lucide-react";
import { Link } from "react-router-dom";

function LessonInLessonsList({ lesson }) {
  return (
    <li className="flex gap-2 items-center justify-between mb-4">
      <div className="flex gap-2 items-center">
        <SquarePlay className="text-mainColor" />
        <span>{lesson.title}</span>
      </div>
      <div className="flex gap-2 items-center">
        <span>{lesson.duration} min</span>
        <Play className="size-4" />
      </div>
    </li>
  );
}

export default LessonInLessonsList;
