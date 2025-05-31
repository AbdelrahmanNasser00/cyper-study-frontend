import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LessonList from "./Components/LessonList";
import VideoPlayer from "./Components/VideoPlayer";
import {
  useGetCourseByIdQuery,
  useGetProgressQuery,
} from "@/services/coursesApi";
import { useGetLessonsByCourseQuery } from "@/services/lessonApi";
import { useLessonCompletion } from "@/hooks/useLessonCompletion";

const Lesson = () => {
  const { id } = useParams();
  const [activeLesson, setActiveLesson] = useState(null);

  const { data: courseData, isLoading, isError } = useGetCourseByIdQuery(id);
  const { data: progress, refetch: refetchProgress } = useGetProgressQuery(id);
  const { data: lessons = [] } = useGetLessonsByCourseQuery(id);
  const { completedLessons } = useLessonCompletion(id);
  const { markAsCompleted, getCompletionState, retryCompletion } =
    useLessonCompletion(id, (lessonId) => {
      refetchProgress();
      console.log(`Lesson ${lessonId} marked as completed`);
    });

  useEffect(() => {
    if (lessons?.length && completedLessons && completedLessons.length >= 0) {
      if (!activeLesson) {
        const firstNotCompleted = lessons.find(
          (lesson) => !completedLessons.includes(lesson.id)
        );
        setActiveLesson(
          firstNotCompleted ? firstNotCompleted.id : lessons[0].id
        );
      }
    }
  }, [lessons, completedLessons, activeLesson]);

  const handleLessonClick = (lessonId, locked) => {
    if (!locked) {
      setActiveLesson(lessonId);
    }
  };

  const handleNavigate = (direction) => {
    const currentIndex = lessons.findIndex((l) => l.id === activeLesson);
    if (direction === "previous" && currentIndex > 0) {
      const previousLesson = lessons[currentIndex - 1];
      if (!previousLesson.locked) {
        setActiveLesson(previousLesson.id);
      }
    } else if (direction === "next" && currentIndex < lessons.length - 1) {
      const nextLesson = lessons[currentIndex + 1];
      if (!nextLesson.locked) {
        setActiveLesson(nextLesson.id);
      }
    }
  };

  // Enhance lessons with completion status
  const getEnhancedLessons = () => {
    return lessons.map((lesson) => {
      const completionState = getCompletionState(lesson.id);
      return {
        ...lesson,
        completed: completionState.completed,
        // Determine if lesson is locked (first lesson is never locked)
        locked:
          lesson.order > 1 &&
          !getCompletionState(lessons[lesson.order - 2]?.id)?.completed,
      };
    });
  };

  const enhancedLessons = getEnhancedLessons();
  const currentLesson = enhancedLessons.find(
    (lesson) => lesson.id === activeLesson
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error loading course
      </div>
    );
  if (!courseData)
    return (
      <div className="flex justify-center items-center h-screen">
        Course not found
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <VideoPlayer
            currentLesson={currentLesson}
            activeLesson={activeLesson}
            lessons={enhancedLessons}
            onNavigate={handleNavigate}
            onMarkLessonCompleted={markAsCompleted}
            getCompletionState={getCompletionState}
          />
          <LessonList
            lessons={enhancedLessons}
            activeLesson={activeLesson}
            onLessonClick={handleLessonClick}
            progress={progress}
            getCompletionState={getCompletionState}
            onRetryCompletion={retryCompletion}
          />
        </div>
      </div>
    </div>
  );
};

export default Lesson;
