import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_PRODUCTS_ENDPOINT,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      console.log("TOKEN from localStorage to backend==>", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (build) => ({
    // get all products
    getProducts: build.query({
      query: ({ page = 1, limit = 10 }) => `?page=${page}&limit=${limit}`,
      providesTags: ["Product"],
    }),
    // get single product
    getProductById: build.query({
      query: (id) => `${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    // search a product by name or description
    searchProduct: build.query({
      query: (searchTerm) => `search?query=${searchTerm}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    addProduct: build.mutation({
      query: (formData) => {
        return {
          url: "/add-product",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Product", id }],
    }),
  }),
});
export const { useGetProductsQuery, useGetProductByIdQuery, useSearchProductQuery, useAddProductMutation } =
  productsApi;
export default productsApi;
