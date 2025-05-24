import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import LessonList from "./Components/LessonList";
import VideoPlayer from "./Components/VideoPlayer";
import {
  useGetCourseByIdQuery,
  useGetProgressQuery,
} from "@/services/coursesApi";

const Lesson = () => {
  const { id } = useParams();
  const [activeLesson, setActiveLesson] = useState(1);

  console.log(id);
  const { data: courseData, isLoading, isError } = useGetCourseByIdQuery(id);
  const { data: progress } = useGetProgressQuery(id);
  console.log(progress);
  console.log(courseData);

  // Transform backend data to match component expectations
  const course = useMemo(() => {
    if (!courseData) return null;

    // Transform lessons array with default values
    const transformedLessons = (courseData.lessons || []).map(
      (lesson, index) => ({
        id: lesson.id || index + 1,
        title: lesson.title || `Lesson ${index + 1}`,
        duration: lesson.duration || "0:00",
        completed: lesson.completed || false, // Default to false
        locked: lesson.locked || index > 0, // Default: first lesson unlocked, rest locked
        ...lesson, // Keep any existing properties
      })
    );

    return {
      ...courseData,
      lessons: transformedLessons,
      progress: courseData.progress || 0, // Default progress to 0
    };
  }, [courseData]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading course</div>;
  if (!course) return <div>Course not found</div>;

  const handleLessonClick = (lessonId, locked) => {
    if (locked) return;
    setActiveLesson(lessonId);
  };

  const handleNavigate = (direction) => {
    const currentIndex = course.lessons.findIndex((l) => l.id === activeLesson);
    if (direction === "previous" && currentIndex > 0) {
      const previousLesson = course.lessons[currentIndex - 1];
      handleLessonClick(previousLesson.id, previousLesson.locked);
    } else if (
      direction === "next" &&
      currentIndex < course?.lessons?.length - 1
    ) {
      const nextLesson = course?.lessons[currentIndex + 1];
      handleLessonClick(nextLesson.id, nextLesson.locked);
    }
  };

  const currentLesson = course?.lessons.find(
    (lesson) => lesson.id === activeLesson
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <VideoPlayer
            currentLesson={currentLesson}
            activeLesson={activeLesson}
            lessons={course?.lessons}
            onNavigate={handleNavigate}
          />
          <LessonList
            lessons={course?.lessons}
            activeLesson={activeLesson}
            onLessonClick={handleLessonClick}
            progress={course?.progress}
          />
        </div>
      </div>
    </div>
  );
};

export default Lesson;
