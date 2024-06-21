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
      switch (payload.sort) {
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
            a.title.localeCompare(b.title)
          );
          break;
        case "!name":
          state.filtereddata = [...state.filtereddata].sort((a, b) =>
            b.title.localeCompare(a.title)
          );
          break;
        default:
          state.filtereddata = state.filtereddata;
          break;
      }
      state.filtereddata = [
        ...state.product.filter(({ title }) =>
          title.toLowerCase().includes(payload.search.toLowerCase())
        ),
      ];
    },
    // searchData: (state, { payload }) => {
    //   state.filtereddata = [
    //     ...state.product.filter(({ name }) =>
    //       name.toLowerCase().includes(payload.toLowerCase())
    //     ),
    //   ];
    // },
  },
});

export const { getproduct, filterdata, searchData } = ProductSlice.actions;
export default ProductSlice.reducer;
