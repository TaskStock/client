import { createSlice } from "@reduxjs/toolkit";
import { toggleStateThunk } from "../../utils/PushNotification/pushNotiThunk";

const initialNotiState = {
  allowed: false,
  isPushOn: false,
  fcmToken: "",
  error: "",
};

const pushNotiSlice = createSlice({
  name: "pushNoti",
  initialState: initialNotiState,
  reducers: {
    setFcmToken: (state, action) => {
      state.fcmToken = action.payload;
    },
    updatePushState: (state, action) => {
      state.isPushOn = action.payload;
    },
    setAllowed: (state, action) => {
      state.allowed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(toggleStateThunk.fulfilled, (state, action) => {
      console.log("푸시알림 설정 변경 성공", action.payload);
      state.isPushOn = action.payload as boolean;
    });
    builder.addCase(toggleStateThunk.rejected, (state, action) => {
      console.log("푸시알림 설정 변경 실패");
      state.error = action.payload as string;
    });
  },
});

export const { setFcmToken, updatePushState, setAllowed } =
  pushNotiSlice.actions;

export const pushNotiReducer = pushNotiSlice.reducer;
