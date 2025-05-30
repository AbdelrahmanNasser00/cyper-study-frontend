import { baseApi } from "./baseApi";

export const enrollmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
    }),

    verifyPayment: builder.query({
      query: ({ orderId, token }) => ({
        url: `/orders/complete-order`,
        method: "GET",
        params: { orderId, token },
      }),
    }),

    cancelPayment: builder.mutation({
      query: (orderId) => ({
        url: "/orders/cancel-order",
        method: "POST",
        body: { orderId },
      }),
    }),
  }),
});

export const {
  useCreatePaymentOrderMutation,
  useLazyVerifyPaymentQuery,
  useCancelPaymentMutation,
} = enrollmentApi;
