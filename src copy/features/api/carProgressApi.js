import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CAR_PROGRESS_API = "http://localhost:3000/api/v1/progress";

export const carProgressApi = createApi({
  reducerPath: "carProgressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: CAR_PROGRESS_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCarProgress: builder.query({
      query: (carId) => ({
        url: `/${carId}`,
        method: "GET",
      }),
    }),
    updateLectureProgress: builder.mutation({
      query: ({ carId, lectureId }) => ({
        url: `/${carId}/lecture/${lectureId}/view`,
        method: "POST"
      }),
    }),

    completeCar: builder.mutation({
      query: (carId) => ({
        url: `/${carId}/complete`,
        method: "POST"
      })
    }),
    inCompleteCar: builder.mutation({
      query: (carId) => ({
        url: `/${carId}/incomplete`,
        method: "POST"
      })
    }),

  }),
});
export const {
  useGetCarProgressQuery,
  useUpdateLectureProgressMutation,
  useCompleteCarMutation,
  useInCompleteCarMutation
} = carProgressApi;