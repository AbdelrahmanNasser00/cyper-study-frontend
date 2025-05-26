import { baseApi } from "./baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get current user profile
    getProfile: builder.query({
      query: () => "/profile",
    }),

    // Update user profile (name, email, bio, etc.)
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/profile",
        method: "PUT",
        body: data,
      }),
    }),

    // Update user password
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/profile/password",
        method: "PUT",
        body: data,
      }),
    }),

    // Update profile picture (multipart/form-data)
    updateProfilePicture: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("profilePicture", file);

        return {
          url: "/profile/picture",
          method: "PUT",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useUpdateProfilePictureMutation,
} = profileApi;
