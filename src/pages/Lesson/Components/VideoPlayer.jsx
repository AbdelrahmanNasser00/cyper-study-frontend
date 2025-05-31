import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player/vimeo";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Loader2,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const VideoPlayer = ({
  currentLesson,
  activeLesson,
  lessons = [],
  onNavigate,
  onMarkLessonCompleted,
  getCompletionState,
}) => {
  const playerRef = useRef(null);
  const playerWrapperRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const completionThreshold = useRef(0.9); // 90%
  const hasTriggeredCompletion = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false); // New state to track navigation

  // Reset states when lesson changes
  useEffect(() => {
    hasTriggeredCompletion.current = false;
    setPlayed(0);
    setDuration(0);
    setIsReady(false);
    setPlaying(false);
    setShowControls(true);
  }, [activeLesson]);

  // Fullscreen handler
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      playerWrapperRef.current?.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen();
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (playing) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (playing && showControls) {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    } else if (!playing) {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [playing, showControls]);

  const handlePlayPause = () => {
    setPlaying(!playing);
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (!playing) {
      controlsTimeoutRef.current = setTimeout(
        () => setShowControls(false),
        3000
      );
    }
  };

  const tryMarkCompletion = async (lessonId) => {
    if (!hasTriggeredCompletion.current && lessonId && !isNavigating) {
      hasTriggeredCompletion.current = true;
      const result = await onMarkLessonCompleted(lessonId);
      if (!result.success && result.reason !== "already_completed") {
        hasTriggeredCompletion.current = false;
      }
    }
  };

  const handleProgress = (state) => {
    if (!seeking && !isNavigating) {
      setPlayed(state.played);
      if (
        state.played >= completionThreshold.current &&
        state.played > 0.05 &&
        !hasTriggeredCompletion.current &&
        activeLesson &&
        !getCompletionState(activeLesson).completed
      ) {
        tryMarkCompletion(activeLesson);
      }
    }
  };

  const handleDuration = (newDuration) => {
    setDuration(newDuration);
  };

  const handlePlayerReady = () => {
    setIsReady(true);
  };

  const handlePlayerEnded = () => {
    setPlaying(false);
    setShowControls(true);
    if (!hasTriggeredCompletion.current && activeLesson && !isNavigating) {
      tryMarkCompletion(activeLesson);
    }
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    playerRef.current.seekTo(parseFloat(e.target.value));
    if (playing) {
      controlsTimeoutRef.current = setTimeout(
        () => setShowControls(false),
        3000
      );
    }
  };

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

  const handleNavigation = (direction) => {
    setIsNavigating(true); // Set navigation flag
    setPlaying(false);
    setIsReady(false);
    setPlayed(0);
    setDuration(0);
    setShowControls(true);
    hasTriggeredCompletion.current = false;

    // Call onNavigate and wait for it to complete
    Promise.resolve(onNavigate(direction)).then(() => {
      // Reset navigation flag after navigation is complete
      setTimeout(() => {
        setIsNavigating(false);
      }, 100); // Small delay to ensure state updates
    });
  };

  return (
    <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-md overflow-hidden">
      <div
        ref={playerWrapperRef}
        className="aspect-video bg-black relative group"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          if (playing && controlsTimeoutRef.current)
            clearTimeout(controlsTimeoutRef.current);
          if (playing)
            controlsTimeoutRef.current = setTimeout(
              () => setShowControls(false),
              500
            );
        }}>
        <ReactPlayer
          ref={playerRef}
          url={currentLesson?.videoUrl}
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          muted={muted}
          onReady={handlePlayerReady}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onEnded={handlePlayerEnded}
          config={{
            vimeo: {
              playerOptions: {
                controls: false,
              },
            },
          }}
        />

        {!isReady && !currentLesson?.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            No video selected or URL is missing.
          </div>
        )}
        {!isReady && currentLesson?.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-white" />
          </div>
        )}

        {!playing && isReady && (
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 flex items-center justify-center z-10
                       focus:outline-none"
            aria-label="Play video">
            <Play className="h-16 w-16 text-white opacity-80 hover:opacity-100 transition-opacity" />
          </button>
        )}

        {(showControls || !playing) && isReady && (
          <div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-3 sm:p-4 z-20"
            onMouseMove={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
              <input
                type="range"
                min={0}
                max={0.999999}
                step="any"
                value={played}
                onMouseDown={handleSeekMouseDown}
                onChange={handleSeekChange}
                onMouseUp={handleSeekMouseUp}
                className="flex-1 h-1.5 bg-gray-500/50 rounded-full appearance-none cursor-pointer 
                           [&::-webkit-slider-thumb]:appearance-none 
                           [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 
                           [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00c1d4]
                           [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3
                           [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#00c1d4]
                           [&::-moz-range-thumb]:border-none"
                aria-label="Video progress"
              />
            </div>

            <div className="flex items-center justify-between gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={handlePlayPause}
                  className="text-white hover:text-[#00c1d4] transition-colors focus:outline-none"
                  aria-label={playing ? "Pause video" : "Play video"}>
                  {playing ? (
                    <Pause className="h-5 w-5 sm:h-6 sm:w-6" />
                  ) : (
                    <Play className="h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                </button>
                <span className="text-white text-xs sm:text-sm min-w-[80px] sm:min-w-[100px]">
                  {formatTime(duration * played)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setMuted(!muted)}
                  className="text-white hover:text-[#00c1d4]">
                  {muted || volume === 0 ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={muted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setMuted(parseFloat(e.target.value) === 0);
                  }}
                  className="w-16 h-1.5 bg-gray-500/50 rounded-full appearance-none cursor-pointer
                             [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3
                             [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00c1d4]"
                  aria-label="Volume"
                />
                <button
                  onClick={toggleFullScreen}
                  className="text-white hover:text-[#00c1d4] transition-colors focus:outline-none"
                  aria-label={
                    isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                  }>
                  {isFullscreen ? (
                    <Minimize className="h-5 w-5 sm:h-6 sm:w-6" />
                  ) : (
                    <Maximize className="h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-semibold mb-2">
          {currentLesson ? currentLesson.title : "Select a lesson"}
        </h1>
        <div className="flex items-center justify-between mb-4 sm:mb-6 text-xs sm:text-sm">
          <div className="text-gray-500">
            Lesson{" "}
            {currentLesson && lessons.length > 0
              ? lessons.findIndex((l) => l.id === activeLesson) + 1
              : "-"}
            {" of "}
            {lessons.length}
          </div>
          <div className="font-medium text-gray-600">
            {isReady && duration > 0
              ? formatTime(duration)
              : formatTime(currentLesson?.duration) || "0:00"}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 sm:mt-6">
          <Button
            variant="outline"
            className="px-3 sm:px-4 flex items-center gap-2 text-xs sm:text-sm"
            disabled={!lessons.length || activeLesson === lessons[0]?.id}
            onClick={() => handleNavigation("previous")}>
            <SkipBack className="h-4 w-4" />
            Previous
          </Button>
          <Button
            className="px-3 sm:px-4 flex items-center gap-2 bg-[#00c1d4] hover:bg-[#00a4b4] text-xs sm:text-sm"
            disabled={
              !lessons.length ||
              activeLesson === lessons[lessons.length - 1]?.id
            }
            onClick={() => handleNavigation("next")}>
            Next
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
