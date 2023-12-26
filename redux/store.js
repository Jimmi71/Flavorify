import { configureStore } from "@reduxjs/toolkit";
import foodDataReducer from "./slices/foodDataSlice";
import cartReducer from "./slices/cartSlice";
import searchReducer from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    foodData: foodDataReducer,
    cartData: cartReducer,
    searchData: searchReducer,
  },
});
