import { createSlice } from "@reduxjs/toolkit";

const initialNotiState = {
  isPushOn: false,
  fcmToken: "",
};

const pushNotiSlice = createSlice({
  name: "pushNoti",
  initialState: initialNotiState,
  reducers: {
    setPushOn: (state, action) => {
      state.isPushOn = action.payload;
    },
    setFcmToken: (state, action) => {
      state.fcmToken = action.payload;
    },
  },
});

export const { setPushOn, setFcmToken } = pushNotiSlice.actions;

export const pushNotiReducer = pushNotiSlice.reducer;
