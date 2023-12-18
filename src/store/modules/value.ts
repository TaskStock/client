import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  text: 1,
};

const valueSlice = createSlice({
  name: "value",
  initialState,
  reducers: {},
});

export default valueSlice.reducer;

export const {} = valueSlice.actions;
