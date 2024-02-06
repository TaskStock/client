import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Appearance } from "react-native";
import { getData, storeData } from "../../utils/asyncStorage";
import { client } from "../../services/api";
import { RootState } from "../configureStore";

export const startingTheme = createAsyncThunk(
  "theme/startingTheme",
  async () => {
    const pickedTheme = await getData("theme");
    if (pickedTheme === null) {
      console.log("시스템 테마 가져옴");

      return Appearance.getColorScheme() === "dark" ? "dark" : "gray";
    } else {
      console.log("설정 테마: ", pickedTheme);
      // console.log(
      //   "시스템 테마: ",
      //   Appearance.getColorScheme() === "dark" ? "dark" : "gray"
      // );
      return pickedTheme;
    }
  }
);

// 설정에서 테마 변경
export const pickTheme = createAsyncThunk(
  "theme/pickTheme",
  async (theme: string, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const { accessToken } = state.auth;
    try {
      const res = await client.patch(
        "account/setting/theme",
        { theme },
        { accessToken }
      );
      if (res.result === "success") {
        return theme;
      } else {
        return rejectWithValue(res);
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// 서버에서 테마 가져오는건 홈화면에서 getUserInfo에서 가져와서 setTheme으로 설정

type ThemeState = { value: string };

export const themeSlice = createSlice({
  name: "themeSlice",
  initialState: { value: "gray" } as ThemeState, // gray, dark
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      storeData("theme", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startingTheme.fulfilled, (state, action) => {
        state.value = action.payload;
        // console.log("theme", state.value);
      })
      .addCase(pickTheme.fulfilled, (state, action) => {
        state.value = action.payload;
        storeData("theme", action.payload);
        // console.log("pickTheme", state.value);
      })
      .addCase(pickTheme.rejected, (state, action) => {
        console.log("pickTheme rejected", action.payload);
      });
  },
});
export const { setTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
