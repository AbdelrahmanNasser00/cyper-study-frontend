import { useState, useCallback, useRef, useEffect } from "react";
import {
  useGetCourseProgressQuery,
  useMarkLessonCompletedMutation,
} from "@/services/progressApi";

export const useLessonCompletion = (courseId, onSuccess) => {
  const { data: courseProgress, isSuccess: isProgressLoaded } =
    useGetCourseProgressQuery(courseId);
  const completedLessonsIds = courseProgress?.completedLessonIds;

  const [markLessonCompleted, { isLoading }] = useMarkLessonCompletedMutation();
  const [completionStates, setCompletionStates] = useState({});
  const pendingCompletions = useRef(new Set());

  // Initialize completed lessons when data is loaded
  useEffect(() => {
    if (isProgressLoaded && completedLessonsIds.length > 0) {
      const initialStates = completedLessonsIds.reduce((acc, lessonId) => {
        acc[lessonId] = { completed: true, pending: false, error: null };
        return acc;
      }, {});
      setCompletionStates(initialStates);
    }
  }, [isProgressLoaded, completedLessonsIds]);

  const markAsCompleted = useCallback(
    async (lessonId) => {
      // Prevent duplicate API calls
      if (pendingCompletions.current.has(lessonId)) {
        return { success: false, reason: "already_pending" };
      }

      // Check if already completed
      if (completionStates[lessonId]?.completed) {
        return { success: true, reason: "already_completed" };
      }

      try {
        // Mark as pending
        pendingCompletions.current.add(lessonId);

        // Optimistic update
        setCompletionStates((prev) => ({
          ...prev,
          [lessonId]: {
            completed: true,
            pending: true,
            error: null,
          },
        }));

        // Make API call
        await markLessonCompleted({ courseId, lessonId }).unwrap();

        // Success - remove pending state
        setCompletionStates((prev) => ({
          ...prev,
          [lessonId]: {
            completed: true,
            pending: false,
            error: null,
          },
        }));

        onSuccess?.(lessonId);
        return { success: true };
      } catch (error) {
        console.error("Failed to mark lesson as completed:", error);

        // Revert optimistic update
        setCompletionStates((prev) => ({
          ...prev,
          [lessonId]: {
            completed: false,
            pending: false,
            error: error.message || "Failed to mark lesson as completed",
          },
        }));

        return { success: false, error: error.message };
      } finally {
        pendingCompletions.current.delete(lessonId);
      }
    },
    [courseId, markLessonCompleted, completionStates, onSuccess]
  );

  const getCompletionState = useCallback(
    (lessonId) => {
      return (
        completionStates[lessonId] || {
          completed: false,
          pending: false,
          error: null,
        }
      );
    },
    [completionStates]
  );

  const retryCompletion = useCallback(
    (lessonId) => {
      setCompletionStates((prev) => {
        const newMap = { ...prev };
        const current = newMap[lessonId];
        if (current?.error) {
          newMap[lessonId] = { ...current, error: null };
        }
        return newMap;
      });
      return markAsCompleted(lessonId);
    },
    [markAsCompleted]
  );

  return {
    markAsCompleted,
    getCompletionState,
    retryCompletion,
    isMarking: isLoading,
    completedLessons: completedLessonsIds, // Expose completed lessons for convenience
  };
};
