import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: "",
  data: "",
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProducts: (state, action) => {
      state.products = action.payload;
      console.log(action.payload);
    },
    fetchProduct: (state, action) => {
      state.product = action.payload;
      console.log(action.payload);
    }
  },
});



export const { getProducts, getProduct,  cre } = ProductSlice.actions;

export default ProductSlice.reducer;
