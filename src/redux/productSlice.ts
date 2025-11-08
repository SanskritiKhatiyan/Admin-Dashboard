import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ProductList } from "../constants/data";
import type { ProductType } from "../constants/types";

interface ProductState {
  products: ProductType[];
}

const initialState: ProductState = {
  products: ProductList,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductType>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<ProductType>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
  },
});

export const { addProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;
