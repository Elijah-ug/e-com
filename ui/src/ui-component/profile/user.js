import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userQuery = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BUYER_ENDPOINT }),
  endpoints: (build) => ({
    // get user profile
    userProfiles: build.query({  
      query: () => "",
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
      query: (email) => ({
        url: "/login",
        method: "POST",
        body: email,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});
export const { useUserProfilesQuery, useAddBuyerMutation, useLoginBuyerMutation } = userQuery;
