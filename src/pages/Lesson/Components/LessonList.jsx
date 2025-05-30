import { Check, Lock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const LessonList = ({
  lessons = [],
  activeLesson,
  onLessonClick,
  progress = 0,
}) => {
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
    <div className="w-full lg:w-1/3">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Course Content</h2>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {progress.progressPercentage}% complete
            </div>
            <div className="text-sm font-medium">
              {lessons?.length || 0} lessons
            </div>
          </div>
          <Progress value={progress.progressPercentage} className="mt-2" />
        </div>
        <div className="divide-y max-h-[600px] overflow-auto">
          {lessons?.length > 0 ? (
            lessons.map((lesson) => (
              <button
                key={lesson.id}
                className={`w-full p-4 flex items-center hover:bg-gray-100 transition-colors ${
                  activeLesson === lesson.id ? "bg-gray-100" : ""
                }`}
                onClick={() => onLessonClick(lesson.id, lesson.locked)}
                disabled={lesson.locked}>
                <div
                  className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                    lesson.completed
                      ? "bg-green-500 text-white"
                      : lesson.locked
                      ? "bg-gray-200 text-gray-400"
                      : "border-2 border-gray-300"
                  }`}>
                  {lesson.completed ? (
                    <Check className="h-4 w-4" />
                  ) : lesson.locked ? (
                    <Lock className="h-3 w-3" />
                  ) : null}
                </div>
                <div className="text-left flex-1 flex flex-col">
                  <div
                    className={`${
                      lesson.locked ? "text-gray-400" : "text-gray-800"
                    }`}>
                    {lesson.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatTime(lesson.duration)}
                  </div>
                </div>
                {lesson.locked && (
                  <Lock className="h-4 w-4 text-gray-400 ml-2" />
                )}
                {activeLesson === lesson.id && (
                  <div className="ml-2 h-2 w-2 rounded-full bg-brand-blue"></div>
                )}
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No lessons available yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonList;
