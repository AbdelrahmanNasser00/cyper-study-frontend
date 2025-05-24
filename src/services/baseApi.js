/**
 * @fileoverview Core API configuration for the application using RTK Query.
 *
 * This file sets up the main 'baseApi' instance which serves as the foundation
 * for all API interactions managed by RTK Query.
 *
 * Key functionalities:
 * 1.  **Base URL Configuration:** Sets the base URL for all API requests using
 *     environment variables (`VITE_BASE_URL`).
 * 2.  **Automatic Header Injection:** The `prepareHeaders` function intercepts
 *     each request and automatically adds the 'Authorization' header with the
 *     Bearer token retrieved from localStorage, if available.
 * 3.  **Automatic Logout on 401:** The `baseQueryWithReauth` wrapper intercepts
 *     responses. If a request returns a 401 (Unauthorized) status code, it
 *     automatically dispatches the `logout` action from the `authSlice` to
 *     clear the user's session state and remove the invalid token.
 * 4.  **Endpoint Injection:** Configured with empty endpoints (`endpoints: () => ({})`)
 *     to allow other feature-specific API slices to inject their endpoints into
 *     this central API instance using `baseApi.injectEndpoints`.
 * 5.  **Caching Configuration:** Defines common `tagTypes` (like "Auth") for
 *     cache invalidation purposes across different API slices and sets a default
 *     `keepUnusedDataFor` duration.
 */

import { logout } from "@/store/Slices/authSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error?.originalStatus === 401) {
    // TODO: Add refresh token logic
    api.dispatch(logout());
  }
  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ["Auth"],
  keepUnusedDataFor: 60,
});
