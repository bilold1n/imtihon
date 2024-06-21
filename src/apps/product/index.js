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
      let filteredProducts = [...state.product];

      // Sorting logic
      switch (payload.sort) {
        case "rating":
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case "price":
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case "name":
          filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "!name":
          filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
          break;
        default:
          break;
      }

      // Filtering logic
      if (payload.price) {
        filteredProducts = filteredProducts.filter(
          ({ price }) => price < payload.price
        );
      }

      if (payload.search) {
        filteredProducts = filteredProducts.filter(({ title }) =>
          title.toLowerCase().includes(payload.search.toLowerCase())
        );
      }

      state.filtereddata = filteredProducts;
    },
  },
});

export const { getproduct, filterdata } = ProductSlice.actions;
export default ProductSlice.reducer;
