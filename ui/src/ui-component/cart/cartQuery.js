import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartQuery = createApi({
  reducerPath: "cartProducts",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_CART_PRODUCTS_ENDPOINT }),
  endpoints: (build) => ({
    // get cart products
    getCartProducts: build.query({
      query: (idBuyer) => `/${idBuyer}`,
      providesTags: ["Cart"],
    }),
    // add cart products
    addProductToCart: build.mutation({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    // increase/decrease item qty
    updateProductQty: build.mutation({
      query: ({ quantity, buyerId, productId, positive }) => ({
        url: `/${buyerId}/${productId}`,
        method: "PUT",
        body: { quantity, positive },
      }),
      invalidatesTags: ["Cart"],
    }),
    // remove item
    removeItemFromCart: build.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        params: id,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});
export const {
  useGetCartProductsQuery,
  useAddProductToCartMutation,
  useUpdateProductQtyMutation,
  useRemoveItemFromCartMutation,
} = cartQuery;
