import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Appearance } from "react-native";
import { getData, storeData } from "../../utils/asyncStorage";

export const startingTheme = createAsyncThunk(
  "theme/startingTheme",
  async () => {
    const pickedTheme = await getData("theme");
    if (pickedTheme === null) {
      // console.log("시스템 테마 가져옴");

      return Appearance.getColorScheme() === "dark" ? "dark" : "gray";
    } else {
      // console.log("설정 테마: ", pickedTheme);
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
  async (theme: string) => {
    // server에 전송

    return theme;
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
      });
  },
});

export const themeReducer = themeSlice.reducer;
