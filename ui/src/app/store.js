import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "../ui-component/products/productsApi";
import { cartQuery } from "@/ui-component/cart/cartQuery";
import { userQuery } from "@/ui-component/profile/user";
export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [cartQuery.reducerPath]: cartQuery.reducer,
    [userQuery.reducerPath]: userQuery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, cartQuery.middleware, userQuery.middleware),
});
setupListeners(store.dispatch);
