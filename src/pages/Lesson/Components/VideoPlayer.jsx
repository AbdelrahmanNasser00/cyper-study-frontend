import { PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const VideoPlayer = ({ currentLesson, activeLesson, lessons, onNavigate }) => {
  return (
    <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="aspect-video bg-gray-900 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayCircle className="h-20 w-20 text-white opacity-70" />
        </div>
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-2">
          {currentLesson ? currentLesson.title : "Select a lesson"}
        </h1>
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-500">
            Lesson{" "}
            {currentLesson
              ? lessons.findIndex((l) => l.id === activeLesson) + 1
              : "-"}
          </div>
          <div className="text-sm font-medium">
            {currentLesson?.duration || "--:--"}
          </div>
        </div>
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            className="px-4"
            disabled={activeLesson === lessons[0]?.id}
            onClick={() => onNavigate("previous")}
          >
            Previous Lesson
          </Button>
          <Button
            className="px-4"
            disabled={activeLesson === lessons[lessons.length - 1]?.id}
            onClick={() => onNavigate("next")}
          >
            Next Lesson
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
