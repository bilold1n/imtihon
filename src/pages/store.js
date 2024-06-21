import { configureStore } from "@reduxjs/toolkit";
import userslice from "../apps/userslice";
import cartslice from "../apps/cartslice";
import product from "../apps/product";
export const store = configureStore({
  reducer: {
    user: userslice,
    cart: cartslice,
    product: product,
  },
});
