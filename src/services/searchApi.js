import { baseApi } from "./baseApi";

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query({
      query: (searchTerm) =>
        `courses/search?query=${encodeURIComponent(searchTerm)}`,
    }),
  }),
});

export const { useLazySearchQuery } = searchApi;
