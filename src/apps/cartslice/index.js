import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) ?? [],
};
export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtocart: (state, { payload }) => {
      state.cart.push({ ...payload, count: 1 });
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    increment: (state, { payload }) => {
      const index = state.cart.findIndex((item) => item.id === payload);
      console.log(index);
      state.cart[index].count += 1;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decrement: (state, { payload }) => {
      const index = state.cart.findIndex((item) => item.id === payload);
      state.cart[index].count -= 1;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    deleteitem: (state, { payload }) => {
      state.cart = [...state.cart.filter((item) => item.id !== payload)];
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});
export const { addtocart, decrement, increment, deleteitem } =
  CartSlice.actions;
export default CartSlice.reducer;
