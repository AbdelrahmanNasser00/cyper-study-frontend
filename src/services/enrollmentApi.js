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
      query: ({ token, orderId }) => ({
        url: `/orders/complete-order`,
        method: "GET",
        params: {
          ...(token && { token }),
          ...(orderId && { orderId }),
          // Handle different parameter names
          session_id: token, // For Stripe
          paymentId: token, // For PayPal alternative
        },
      }),
    }),

    cancelPayment: builder.mutation({
      query: (orderId) => ({
        url: "/orders/cancel-order",
        method: "POST",
        body: { orderId },
      }),
    }),

    // Add a new endpoint to get order status
    getOrderStatus: builder.query({
      query: (orderId) => ({
        url: `/orders/${orderId}/status`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreatePaymentOrderMutation,
  useLazyVerifyPaymentQuery,
  useCancelPaymentMutation,
  useGetOrderStatusQuery,
  useLazyGetOrderStatusQuery,
} = enrollmentApi;
