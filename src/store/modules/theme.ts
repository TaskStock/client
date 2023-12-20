import { Theme } from "@react-navigation/native";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ThemeState = { value: string };

export const themeSlice = createSlice({
  name: "themeSlice",
  initialState: { value: "gray" } as ThemeState, // gray, dark
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const themeReducer = themeSlice.reducer;
