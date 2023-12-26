import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: { searchData: "" },
  reducers: {
    getSearchData: (state, action) => {
      state.searchData = action.payload;
    },
  },
});
export const { getSearchData } = searchSlice.actions;
export default searchSlice.reducer;
