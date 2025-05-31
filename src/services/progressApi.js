import { baseApi } from "./baseApi";

export const progressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    markLessonCompleted: builder.mutation({
      query: (data) => ({
        url: "/progress/mark-completed",
        method: "POST",
        body: data,
      }),
    }),

    getCourseProgress: builder.query({
      query: (courseId) => ({
        url: `/progress/course-progress/${courseId}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useMarkLessonCompletedMutation, useGetCourseProgressQuery } =
  progressApi;
