import { baseApi } from "./baseApi";

export const lessonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get a lesson by ID
    getLessonById: builder.query({
      query: (id) => `/lessons/${id}`,
      providesTags: ["Lesson"],
    }),

    // Get lessons by courseId
    getLessonsByCourse: builder.query({
      query: (courseId) => `/lessons/course/${courseId}`,
      providesTags: ["Lesson"],
    }),

    // Create a new lesson
    createLesson: builder.mutation({
      query: (data) => ({
        url: `/lessons`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Lesson"],
    }),

    // Update a lesson
    updateLesson: builder.mutation({
      query: ({ lessonId, ...data }) => ({
        url: `/lessons/${lessonId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Lesson"],
    }),

    // Mark a lesson as completed
    markLessonAsCompleted: builder.mutation({
      query: (id) => ({
        url: `/lessons/${id}/complete`,
        method: "PATCH",
      }),
      invalidatesTags: ["Lesson"],
    }),

    // Delete a lesson
    deleteLesson: builder.mutation({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lesson"],
    }),

    // Search lessons
    searchLessons: builder.query({
      query: () => `/lessons/search`,
      providesTags: ["Lesson"],
    }),

    // Reorder lessons in a course
    reorderLessons: builder.mutation({
      query: ({ courseId, order }) => ({
        url: `/lessons/course/${courseId}/reorder`,
        method: "PATCH",
        body: { order },
      }),
      invalidatesTags: ["Lesson"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLessonByIdQuery,
  useGetLessonsByCourseQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useMarkLessonAsCompletedMutation,
  useDeleteLessonMutation,
  useSearchLessonsQuery,
  useReorderLessonsMutation,
} = lessonApi;
