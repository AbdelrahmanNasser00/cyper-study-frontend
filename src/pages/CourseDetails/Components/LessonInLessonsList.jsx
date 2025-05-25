import { Play, SquarePlay } from "lucide-react";

function LessonInLessonsList() {
  return (
    <li className="flex gap-2 items-center justify-between mb-4">
      <div className="flex gap-2 items-center">
        <SquarePlay className="text-mainColor" />
        <span>introduction to the course</span>
      </div>
      <div className="flex gap-2 items-center">
        <span>5:35</span>
        <Play className="size-4" />
      </div>
    </li>
  );
}

export default LessonInLessonsList;
