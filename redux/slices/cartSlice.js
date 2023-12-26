import { createSlice } from "@reduxjs/toolkit";

const getLocalCartData = () => {
  let cart = localStorage.getItem("cartData");
  if (cart) {
    return JSON.parse(localStorage.getItem("cartData"));
  } else {
    return false;
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: getLocalCartData() ? getLocalCartData().data : [],
    quantity: getLocalCartData() ? getLocalCartData().quantity : null,
  },
  reducers: {
    addToCart: (state, action) => {
      const find = state.data.findIndex(
        (elem, ind) => elem._id === action.payload.cartData._id
      );
      if (find >= 0) {
        state.data[find].quantity += 1;
        state.data[find].foodPrice =
          state.data[find].originalPrice * state.data[find].quantity;
      } else {
        const tempValue = {
          ...action.payload.cartData,
          quantity: 1,
          originalPrice: action.payload.cartData.foodPrice,
        };
        state.data.push(tempValue);
        state.quantity += 1;
      }
      localStorage.setItem("cartData", JSON.stringify(state));
    },
    deleteCartData: (state, action) => {
      state.data = state.data.filter(
        (elem, ind) => elem._id !== action.payload.cartData._id
      );
      state.quantity -= 1;
      localStorage.setItem("cartData", JSON.stringify(state));
    },
    addCartItem: (state, action) => {
      const find = state.data.findIndex(
        (elem, ind) => elem._id === action.payload.cartData._id
      );
      state.data[find].quantity += 1;
      state.data[find].foodPrice =
        state.data[find].originalPrice * state.data[find].quantity;
      localStorage.setItem("cartData", JSON.stringify(state));
    },
    minusCartItem: (state, action) => {
      const find = state.data.findIndex(
        (elem, ind) => elem._id === action.payload.cartData._id
      );
      if (state.data[find].quantity === 1) {
        state.data = state.data.filter(
          (elem, ind) => elem._id !== action.payload.cartData._id
        );
        state.quantity -= 1;
        localStorage.setItem("cartData", JSON.stringify(state));
      } else {
        state.data[find].quantity -= 1;
        state.data[find].foodPrice =
          state.data[find].originalPrice * state.data[find].quantity;
        localStorage.setItem("cartData", JSON.stringify(state));
      }
    },
  },
});

export const { addToCart, deleteCartData, addCartItem, minusCartItem } =
  cartSlice.actions;
export default cartSlice.reducer;
