import { Dot } from "lucide-react";
import LessonInLessonsList from "./LessonInLessonsList";

function ContentTab() {
  return (
    <div className="bg-gray-100 p-5 rounded-2xl">
      {/* start header */}
      <h3 className="text-2xl font-bold">Course Content</h3>
      <div className="flex gap-3 items-center justify-between">
        <div className="flex">
          <span>412 lessons</span>
          <span className="flex gap-1">
            {" "}
            <Dot />
            65 hours
          </span>
        </div>
      </div>
      <hr className="my-5" />
      {/* end header */}
      {/* start content */}
      <ul>
        {/* lesson */}
        <LessonInLessonsList></LessonInLessonsList>
        {/* lesson */}
      </ul>
      {/* end content */}
    </div>
  );
}

export default ContentTab;
