import { baseApi } from "./baseApi";

export const coursesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    topCourses: builder.query({
      query: () => ({
        url: "courses/top",
        method: "GET",
      }),
    }),
  }),
});

export const { useTopCoursesQuery } = coursesApi;
