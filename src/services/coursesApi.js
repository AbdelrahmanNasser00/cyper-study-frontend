import { baseApi } from "./baseApi";

export const coursesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Public routes
    getAllCourses: builder.query({
      query: () => ({ url: "courses", method: "GET" }),
    }),
    getCourseById: builder.query({
      query: (id) => ({ url: `courses/${id}`, method: "GET" }),
    }),
    searchCourses: builder.query({
      query: (query) => ({
        url: `courses/search?query=${query}`,
        method: "GET",
      }),
    }),
    getCoursesByCategory: builder.query({
      query: (category) => ({
        url: `courses/category/${category}`,
        method: "GET",
      }),
    }),
    topCourses: builder.query({
      query: (limit = 5) => ({
        url: `courses/top?limit=${limit}`,
        method: "GET",
      }),
    }),

    // Instructor routes
    createCourse: builder.mutation({
      query: (courseData) => ({
        url: "courses",
        method: "POST",
        body: courseData,
      }),
    }),
    getInstructorCourses: builder.query({
      query: () => ({ url: "courses/my-courses", method: "GET" }),
    }),
    getInstructorCourseById: builder.query({
      query: (id) => ({ url: `courses/my-courses/${id}`, method: "GET" }),
    }),
    updateCourse: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `courses/my-courses/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `courses/my-courses/${id}`,
        method: "DELETE",
      }),
    }),

    // Student routes
    getStudentEnrolledCourses: builder.query({
      query: () => ({ url: "courses/my-enrollments", method: "GET" }),
    }),
    getStudentEnrolledCourseById: builder.query({
      query: (courseId) => `courses/my-enrollments/${courseId}`,
      transformResponse: (response) => {
        return {
          isEnrolled: response.Enrollments && response.Enrollments.length > 0,
          course: response,
        };
      },
    }),
    // Progress routes
    makeLessonAsCompleted: builder.mutation({
      query: (course) => ({
        url: "progress/mark-completed",
        method: "POST",
        body: course,
      }),
    }),

    getProgress: builder.query({
      query: (courseId) => ({
        url: `progress/course-progress/${courseId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useGetCourseByIdQuery,
  useSearchCoursesQuery,
  useGetCoursesByCategoryQuery,
  useTopCoursesQuery,
  useCreateCourseMutation,
  useGetInstructorCoursesQuery,
  useGetInstructorCourseByIdQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetStudentEnrolledCoursesQuery,
  useGetStudentEnrolledCourseByIdQuery,
  useMakeLessonAsCompletedMutation,
  useGetProgressQuery,
} = coursesApi;
