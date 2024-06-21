import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  filtereddata: [],
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getproduct: (state, { payload }) => {
      state.product = payload;
      state.filtereddata = payload; // Initialize filtereddata with product data
    },
    filterdata: (state, { payload }) => {
      // Sorting logic
      switch (payload.sort) {
        case "rating":
          state.filtereddata = [...state.product].sort(
            (a, b) => b.rating - a.rating
          );
          break;
        case "price":
          state.filtereddata = [...state.product].sort(
            (a, b) => b.price - a.price
          );
          break;
        case "name":
          state.filtereddata = [...state.product].sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          break;
        case "!name":
          state.filtereddata = [...state.product].sort((a, b) =>
            b.title.localeCompare(a.title)
          );
          break;
        default:
          state.filtereddata = [...state.product];
          break;
      }

      // Filtering logic
      state.filtereddata = state.filtereddata.filter(({ title }) =>
        title.toLowerCase().includes(payload.search.toLowerCase())
      );
    },
  },
});

export const { getproduct, filterdata } = ProductSlice.actions;
export default ProductSlice.reducer;
