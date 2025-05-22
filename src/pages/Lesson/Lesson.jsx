import { useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "./components/VideoPlayer";
import LessonList from "./components/LessonList";

const Lesson = () => {
  const { courseId } = useParams();
  const [activeLesson, setActiveLesson] = useState(1);

  const course = {
    id: courseId || "1",
    title: "Complete Web Development Bootcamp",
    progress: 35,
    lessons: [
      {
        id: 1,
        title: "Introduction to the Course",
        duration: "5:35",
        completed: true,
        locked: false,
      },
      {
        id: 2,
        title: "Setting up your Development Environment",
        duration: "12:20",
        completed: true,
        locked: false,
      },
      {
        id: 3,
        title: "Your First HTML Page",
        duration: "15:45",
        completed: false,
        locked: false,
      },
      {
        id: 4,
        title: "HTML Structure and Elements",
        duration: "18:30",
        completed: false,
        locked: false,
      },
      {
        id: 5,
        title: "Working with Text and Lists",
        duration: "22:15",
        completed: false,
        locked: false,
      },
      {
        id: 6,
        title: "Adding Links and Images",
        duration: "14:20",
        completed: false,
        locked: false,
      },
      {
        id: 7,
        title: "Introduction to CSS",
        duration: "20:45",
        completed: false,
        locked: true,
      },
    ],
  };

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
      currentIndex < course.lessons.length - 1
    ) {
      const nextLesson = course.lessons[currentIndex + 1];
      handleLessonClick(nextLesson.id, nextLesson.locked);
    }
  };

  const currentLesson = course.lessons.find(
    (lesson) => lesson.id === activeLesson
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <VideoPlayer
            currentLesson={currentLesson}
            activeLesson={activeLesson}
            lessons={course.lessons}
            onNavigate={handleNavigate}
          />
          <LessonList
            lessons={course.lessons}
            activeLesson={activeLesson}
            onLessonClick={handleLessonClick}
            progress={course.progress}
          />
        </div>
      </div>
    </div>
  );
};

export default Lesson;
