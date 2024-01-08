import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Appearance } from "react-native";

const getSystemTheme = () => {
  const colorScheme = Appearance.getColorScheme();
  return colorScheme === "dark" ? "dark" : "gray";
};

type ThemeState = { value: string };

export const themeSlice = createSlice({
  name: "themeSlice",
  initialState: { value: getSystemTheme() } as ThemeState, // gray, dark
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const themeReducer = themeSlice.reducer;
