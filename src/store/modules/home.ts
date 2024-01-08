import { createSlice } from "@reduxjs/toolkit";

//drawer 혹은 tab을 통해 화면을 전환할 때 사용하는 state
const homeSlice = createSlice({
  name: "home",
  initialState: {
    tabIndex: 0,
  },
  reducers: {
    setTabIndex: (state, action) => {
      state.tabIndex = action.payload;
    },
  },
});

export default homeSlice.reducer;
export const { setTabIndex } = homeSlice.actions;
