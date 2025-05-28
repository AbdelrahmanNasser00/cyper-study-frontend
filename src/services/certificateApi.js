import { baseApi } from "@/services/baseApi"; // Updated import path

export const certificatesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    generateCertificate: builder.mutation({
      query: (data) => ({
        url: "/certificates",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Certificates"],
    }),

    getAllCertificates: builder.query({
      query: () => ({
        url: "/certificates",
        method: "GET",
      }),
      providesTags: ["Certificates"],
    }),

    getMyCertificates: builder.query({
      query: () => ({
        url: "/certificates/my-certificates",
        method: "GET",
      }),
      providesTags: ["Certificates"],
    }),

    getCertificateById: builder.query({
      query: (id) => ({
        url: `/certificates/${id}`,
        method: "GET",
      }),
      providesTags: ["Certificates"],
    }),

    deleteCertificate: builder.mutation({
      query: (id) => ({
        url: `/certificates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Certificates"],
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
