import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "themeSlice",
  initialState: { value: "gray" },
  reducers: {
    setTheme: (state, action) => {
      console.log(action);
      state.value = action.payload;
      console.log(state.value);
    },
  },
});

export const themeReducer = themeSlice.reducer;
