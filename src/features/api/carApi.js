import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CAR_API = "http://localhost:3000/api/v1/car";

export const carApi = createApi({
  reducerPath: "carApi",
  tagTypes: ["Refetch_Creator_Car", "Refetch_Lecture"],
  baseQuery: fetchBaseQuery({
    baseUrl: CAR_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCar: builder.mutation({
      query: ({ carTitle, category }) => ({
        url: "",
        method: "POST",
        body: { carTitle, category },
      }),
      invalidatesTags: ["Refetch_Creator_Car"],
    }),
    getSearchCar: builder.query({
      query: ({ searchQuery, categories, sortByPrice }) => {
        // Build qiery string
        let queryString = `/search?query=${encodeURIComponent(searchQuery)}`

        // append cateogry 
        if (categories && categories.length > 0) {
          const categoriesString = categories.map(encodeURIComponent).join(",");
          queryString += `&categories=${categoriesString}`;
        }

        // Append sortByPrice is available
        if (sortByPrice) {
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
        }

        return {
          url: queryString,
          method: "GET",
        }
      }
    }),
    getPublishedCar: builder.query({
      query: () => ({
        url: "/published-cars",
        method: "GET",
      }),
    }),
    getCreatorCar: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Car"],
    }),
    editCar: builder.mutation({
      query: ({ formData, carId }) => ({
        url: `/${carId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch_Creator_Car"],
    }),
    getCarById: builder.query({
      query: (carId) => ({
        url: `/${carId}`,
        method: "GET",
      }),
    }),
    createLecture: builder.mutation({
      query: ({ lectureTitle, carId }) => ({
        url: `/${carId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),
    getCarLecture: builder.query({
      query: (carId) => ({
        url: `/${carId}/lecture`,
        method: "GET",
      }),
      providesTags: ["Refetch_Lecture"],
    }),
    editLecture: builder.mutation({
      query: ({
        lectureTitle,
        videoInfo,
        isPreviewFree,
        carId,
        lectureId,
      }) => ({
        url: `/${carId}/lecture/${lectureId}`,
        method: "POST",
        body: { lectureTitle, videoInfo, isPreviewFree },
      }),
    }),
    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Lecture"],
    }),
    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
    }),
    publishCar: builder.mutation({
      query: ({ carId, query }) => ({
        url: `/${carId}?publish=${query}`,
        method: "PATCH",
      }),
    }),
  }),
});
export const {
  useCreateCarMutation,
  useGetSearchCarQuery,
  useGetPublishedCarQuery,
  useGetCreatorCarQuery,
  useEditCarMutation,
  useGetCarByIdQuery,
  useCreateLectureMutation,
  useGetCarLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  usePublishCarMutation,
} = carApi;
