// to checkout **transformResponse**
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sellerQuery = createApi({
  reducerPath: "seller",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SELLERS_ENDPOINT,
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem("accessToken");
      console.log("Seller token is==>", accessToken);
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Sellers"],
  endpoints: (build) => ({
    // get user
    getSeller: build.query({
      query: () => ({
        url: "/seller",
        method: "GET",
      }),
      transformResponse: (res) => res.data,
      providesTags: ["Sellers"],
    }),
    // add seller
    registerSeller: build.mutation({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Sellers"],
    }),
    // login seller
    loginSeller: build.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Seller"],
    }),

    // update seller
    updateSeller: build.mutation({
      query: (body) => ({
        url: "/seller/update",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Seller"],
    }),
    // get sellers products
    getSellersProducts: build.query({
      query: () => ({
        url: "/seller/remaining-products",
        method: "GET",
      }),
      transformResponse: (res) => res.data,
      providesTags: ["Sellers"],
    }),

    getSellersOrderedProducts: build.query({
      query: () => ({
        url: "/seller/ordered-products",
        method: "GET",
      }),
      transformResponse: (res) => res.data,
      providesTags: ["Sellers"],
    }),
  }),
});
export const {
  useLoginSellerMutation,useUpdateSellerMutation,
  useRegisterSellerMutation,
  useGetSellerQuery,
  useGetSellersProductsQuery,
  useGetSellersOrderedProductsQuery,
} = sellerQuery;
