import { Check, Lock, AlertCircle, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const LessonList = ({
  lessons = [],
  activeLesson,
  onLessonClick,
  progress = {},
  getCompletionState,
  onRetryCompletion,
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

  const renderLessonStatus = (lesson) => {
    const completionState = getCompletionState(lesson.id);

    if (completionState.pending) {
      return (
        <div className="w-6 h-6 rounded-full mr-3 flex items-center justify-center bg-blue-100">
          <Loader2 className="h-3 w-3 animate-spin text-blue-600" />
        </div>
      );
    }

    if (completionState.error) {
      return (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRetryCompletion?.(lesson.id);
          }}
          className="w-6 h-6 rounded-full mr-3 flex items-center justify-center bg-red-100 hover:bg-red-200 transition-colors"
          title={`Error: ${completionState.error}. Click to retry.`}
        >
          <AlertCircle className="h-3 w-3 text-red-600" />
        </button>
      );
    }

    if (completionState.completed) {
      return (
        <div className="w-6 h-6 rounded-full mr-3 flex items-center justify-center bg-green-500 text-white">
          <Check className="h-4 w-4" />
        </div>
      );
    }

    if (lesson.locked) {
      return (
        <div className="w-6 h-6 rounded-full mr-3 flex items-center justify-center bg-gray-200 text-gray-400">
          <Lock className="h-3 w-3" />
        </div>
      );
    }

    return (
      <div className="w-6 h-6 rounded-full mr-3 border-2 border-gray-300"></div>
    );
  };

  return (
    <div className="w-full lg:w-1/3">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Course Content</h2>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {progress.progressPercentage || 0}% complete
            </div>
            <div className="text-sm font-medium">
              {lessons?.length || 0} lessons
            </div>
          </div>
          <Progress value={progress.progressPercentage || 0} className="mt-2" />
        </div>
        <div className="divide-y max-h-[600px] overflow-auto">
          {lessons?.length > 0 ? (
            lessons.map((lesson) => {
              const completionState = getCompletionState(lesson.id);

              return (
                <button
                  key={lesson.id}
                  className={`w-full p-4 flex items-center hover:bg-gray-100 transition-colors ${
                    activeLesson === lesson.id ? "bg-gray-100" : ""
                  }`}
                  onClick={() => onLessonClick(lesson.id, lesson.locked)}
                  disabled={lesson.locked}
                >
                  {renderLessonStatus(lesson)}
                  <div className="text-left flex-1 flex flex-col">
                    <div
                      className={`${
                        lesson.locked ? "text-gray-400" : "text-gray-800"
                      } ${completionState.completed ? "font-medium" : ""}`}
                    >
                      {lesson.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatTime(lesson.duration)}
                      {completionState.error && (
                        <span className="text-red-500 ml-2">
                          • Failed to save
                        </span>
                      )}
                    </div>
                  </div>
                  {lesson.locked && (
                    <Lock className="h-4 w-4 text-gray-400 ml-2" />
                  )}
                  {activeLesson === lesson.id && !lesson.locked && (
                    <div className="ml-2 h-2 w-2 rounded-full bg-[#00c1d4]"></div>
                  )}
                </button>
              );
            })
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
