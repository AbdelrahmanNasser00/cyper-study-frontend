import { baseApi } from "../baseApi";

export const instructorDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSummary: builder.query({
      query: () => ({
        url: "/instructor/dashboard/summary",
        method: "GET",
      }),
      providesTags: ["InstructorDashboard"],
    }),

    getRatingsSummary: builder.query({
      query: () => ({
        url: "/instructor/dashboard/ratings-summary",
        method: "GET",
      }),
      providesTags: ["InstructorDashboard"],
    }),

    getCoursePerformance: builder.query({
      query: (courseId) => ({
        url: `/instructor/dashboard/course-performance/${courseId}`,
        method: "GET",
      }),
      providesTags: ["InstructorDashboard"],
    }),

    getMonthlyEarnings: builder.query({
      query: () => ({
        url: "/instructor/dashboard/earnings/monthly",
        method: "GET",
      }),
      providesTags: ["InstructorDashboard"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDashboardSummaryQuery,
  useGetRatingsSummaryQuery,
  useGetCoursePerformanceQuery,
  useGetMonthlyEarningsQuery,
} = instructorDashboardApi;
