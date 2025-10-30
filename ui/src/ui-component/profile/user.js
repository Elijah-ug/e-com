import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userQuery = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BUYER_ENDPOINT,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (build) => ({
    // get user profile
    userProfile: build.query({
      query: () => ({
        url: "/customer",
        method: "GET",
      }),
      transformResponse: (res) => res.data,

      providesTags: ["Profile"],
    }),
    // add buyer
    addBuyer: build.mutation({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),

    // login buyer
    loginBuyer: build.mutation({
      query: (email, accessToken) => ({
        url: "/login",
        method: "POST",
        body: email,
        headers: accessToken,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});
export const { useUserProfileQuery, useAddBuyerMutation, useLoginBuyerMutation } = userQuery;
