import { createSlice } from "@reduxjs/toolkit";
import badgeThunk from "../../utils/badgeUtils/badgeThunk";

interface IBadge {
  type: number;
  created_time: string;
}

interface BadgeState {
  badges: IBadge[];
}

const initialState: BadgeState = {
  badges: [
    // {
    //   type: 1,
    //   created_time: "2024-02-05T15:47:21.993Z",
    // },
    // {
    //   type: 2,
    //   created_time: "2024-02-05T15:47:21.993Z",
    // },
  ],
};

const badgeSlice = createSlice({
  name: "badge",
  initialState,
  reducers: {
    addBadge: (state, action) => {
      state.badges = action.payload;
      // console.log("뱃지 추가 성공: ", state.badges);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(badgeThunk.fulfilled, (state, action) => {
      state.badges = action.payload;
    });
    builder.addCase(badgeThunk.rejected, (state, action) => {
      console.log("뱃지 추가 실패: ", action.payload);
    });
  },
});

export const { addBadge } = badgeSlice.actions;
export const badgeReducer = badgeSlice.reducer;
