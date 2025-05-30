import { baseApi } from "@/services/baseApi"; // Updated import path

export const certificatesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    generateCertificate: builder.mutation({
      query: (data) => ({
        url: "/certificate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Certificates"],
    }),

    getAllCertificates: builder.query({
      query: () => ({
        url: "/certificate",
        method: "GET",
      }),
      providesTags: ["certificate"],
    }),

    getMyCertificates: builder.query({
      query: () => ({
        url: "/certificate/my-certificates",
        method: "GET",
      }),
      providesTags: ["certificate"],
    }),

    getCertificateById: builder.query({
      query: (id) => ({
        url: `/certificate/${id}`,
        method: "GET",
      }),
      providesTags: ["certificate"],
    }),

    deleteCertificate: builder.mutation({
      query: (id) => ({
        url: `/certificate/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["certificate"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGenerateCertificateMutation,
  useGetAllCertificatesQuery,
  useGetMyCertificatesQuery,
  useGetCertificateByIdQuery,
  useDeleteCertificateMutation,
} = certificatesApi;
