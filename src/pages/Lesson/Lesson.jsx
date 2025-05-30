import { useState } from "react";
import { useParams } from "react-router-dom";
import LessonList from "./Components/LessonList";
import VideoPlayer from "./Components/VideoPlayer";
import {
  useGetCourseByIdQuery,
  useGetProgressQuery,
} from "@/services/coursesApi";
import { useGetLessonsByCourseQuery } from "@/services/lessonApi";

const Lesson = () => {
  const { id } = useParams();
  const [activeLesson, setActiveLesson] = useState(1);

  const { data: courseData, isLoading, isError } = useGetCourseByIdQuery(id);
  const { data: progress } = useGetProgressQuery(id);
  const { data: lessons } = useGetLessonsByCourseQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading course</div>;
  if (!courseData) return <div>Course not found</div>;

  const handleLessonClick = (lessonId, locked) => {
    if (locked) return;
    setActiveLesson(lessonId);
  };

  const handleNavigate = (direction) => {
    const currentIndex = lessons.findIndex((l) => l.id === activeLesson);
    if (direction === "previous" && currentIndex > 0) {
      const previousLesson = lessons[currentIndex - 1];
      handleLessonClick(previousLesson.id, previousLesson.locked);
    } else if (direction === "next" && currentIndex < lessons?.length - 1) {
      const nextLesson = lessons[currentIndex + 1];
      handleLessonClick(nextLesson.id, nextLesson.locked);
    }
  };

  const currentLesson = lessons?.find((lesson) => lesson.id === activeLesson);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <VideoPlayer
            currentLesson={currentLesson}
            activeLesson={activeLesson}
            lessons={lessons}
            onNavigate={handleNavigate}
          />
          <LessonList
            lessons={lessons}
            activeLesson={activeLesson}
            onLessonClick={handleLessonClick}
            progress={progress}
          />
        </div>
      </div>
    </div>
  );
};

export default Lesson;
