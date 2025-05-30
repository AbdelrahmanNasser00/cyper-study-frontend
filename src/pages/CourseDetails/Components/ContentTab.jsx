import { Dot } from "lucide-react";
import LessonInLessonsList from "./LessonInLessonsList";

function ContentTab({ lessons }) {
  return (
    <div className="bg-gray-100 p-5 rounded-2xl">
      {/* start header */}
      <h3 className="text-2xl font-bold">Course Content</h3>
      <div className="flex gap-3 items-center justify-between">
        <div className="flex">
          <Dot className="text-mainColor" />
          <span>{lessons.length} lessons</span>
        </div>
      </div>
      <hr className="my-5" />
      {/* end header */}
      {/* start content */}
      <ul>
        {/* lesson */}
        {lessons.map((lesson) => (
          <LessonInLessonsList key={lesson.title} lesson={lesson} />
        ))}

        {/* lesson */}
      </ul>
      {/* end content */}
    </div>
  );
}

export default ContentTab;
