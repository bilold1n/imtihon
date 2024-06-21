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
      state.filtereddata = payload;
    },
    filterdata: (state, { payload }) => {
      switch (payload) {
        case "rating":
          state.filtereddata = [...state.filtereddata].sort(
            (a, b) => b.rating - a.rating
          );
          break;
        case "price":
          state.filtereddata = [...state.filtereddata].sort(
            (a, b) => b.price - a.price
          );
          break;
        case "name":
          state.filtereddata = [...state.filtereddata].sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          break;
        case "!name":
          state.filtereddata = [...state.filtereddata].sort((a, b) =>
            b.name.localeCompare(a.name)
          );
          break;
        default:
          state.filtereddata = state.filtereddata;
          break;
      }
    },
    searchData: (state, { payload }) => {
      state.filtereddata = [
        ...state.product.filter(({ name }) =>
          name.toLowerCase().includes(payload.toLowerCase())
        ),
      ];
    },
  },
});

export const { getproduct, filterdata, searchData } = ProductSlice.actions;
export default ProductSlice.reducer;
