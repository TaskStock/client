import { createSlice } from "@reduxjs/toolkit";
import badgeThunk from "../../utils/badgeUtils/badgeThunk";

interface BadgeState {
  badges: number[];
}

const initialState: BadgeState = {
  badges: [], // 1, 3, 5, 6
};

const badgeSlice = createSlice({
  name: "badge",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(badgeThunk.fulfilled, (state, action) => {
      state.badges = action.payload;
    });
    builder.addCase(badgeThunk.rejected, (state, action) => {
      console.log("뱃지 추가 실패: ", action.payload);
    });
  },
});

export const badgeReducer = badgeSlice.reducer;
