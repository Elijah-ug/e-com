import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
reducerPath: "productsApi",
baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_PRODUCTS_ENDPOINT}),
endpoints: (build)=>({
    // get all products
    getProducts:build.query({
      query: () => "",
      providesTags: ["Product"]
    }),
    // get single product
    getProductById: build.query({
        query: (id) => `${id}`,
        providesTags: (result, error, id) => [{type: "Product", id}]
    }),
    // search a product by name or description
    searchProduct: build.query({
        query: (searchTerm) => `search?query=${searchTerm}`,
        providesTags: ["Product"]
    })
})
})
export const {useGetProductsQuery, useGetProductByIdQuery, useSearchProductQuery} = productsApi
export default productsApi