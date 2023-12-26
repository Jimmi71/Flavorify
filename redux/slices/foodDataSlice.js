import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFoodData = createAsyncThunk("fetchFoodData", () => {
  return axios.get("/api/foodData").then((res) => {
    return res.data.foodData;
  });
});

const foodDataSlice = createSlice({
  name: "foodData",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFoodData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFoodData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchFoodData.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = false;
    });
  },
});

export default foodDataSlice.reducer;
