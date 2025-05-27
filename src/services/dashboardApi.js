import { baseApi } from "./baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: () => "/instructor/dashboard/summary",
    }),
    getRatingsSummary: builder.query({
      query: () => "/instructor/dashboard/ratings-summary",
    }),
    getCoursePerformance: builder.query({
      query: (courseId) => `/instructor/dashboard/course-performance/${courseId}`,
    }),
    getMonthlyEarnings: builder.query({
      query: () => "/instructor/dashboard/earnings/monthly",
    }),
  }),
});

export const {
  useGetSummaryQuery,
  useGetRatingsSummaryQuery,
  useGetCoursePerformanceQuery,
  useGetMonthlyEarningsQuery,
} = dashboardApi;