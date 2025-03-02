import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CAR_PURCHASE_API = "http://localhost:3000/api/v1/purchase";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: CAR_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (carId) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body: { carId },
      }),
    }),
    getCarDetailWithStatus: builder.query({
      query: (carId) => ({
        url: `/car/${carId}/detail-with-status`,
        method: "GET",
      }),
    }),
    getPurchasedCars: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetCarDetailWithStatusQuery,
  useGetPurchasedCarsQuery,
} = purchaseApi;
