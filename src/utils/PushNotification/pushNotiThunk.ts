import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../services/api";
import { RootState } from "../../store/configureStore";

export const toggleStateThunk = createAsyncThunk(
  "pushNoti/toggleState",
  async (isPushOn: boolean, { getState, rejectWithValue }) => {
    const { auth } = getState() as RootState;
    try {
      const res = await client.patch(
        "notice/setting/push",
        {
          isPushOn,
        },
        { accessToken: auth.accessToken }
      );
      //   console.log(res);
      if (res.result === "success") {
        return isPushOn;
      } else {
        return rejectWithValue(res);
      }
    } catch (e) {
      console.log("설정 푸시알림 토글 에러", e);
      return rejectWithValue(e);
    }
  }
);
