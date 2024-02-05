import { createSlice } from "@reduxjs/toolkit";
import badgeThunk from "../../utils/badgeUtils/badgeThunk";

interface BadgeState {
  badges: number[];
}

const initialState: BadgeState = {
  badges: [],
};

const badgeSlice = createSlice({
  name: "badge",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(badgeThunk.fulfilled, (state, action) => {
      state.badges.push(action.payload);
    });
  },
});

export const badgeReducer = badgeSlice.reducer;
