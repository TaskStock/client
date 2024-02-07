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
    {
      type: 1,
      created_time: "2024-02-05T15:47:21.993Z",
    },
    {
      type: 9,
      created_time: "2024-02-05T16:02:07.204Z",
    },
  ],
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
