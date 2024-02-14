import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../services/api";
import { TRootState } from "../../store/configureStore";
import { checkAndRenewTokens } from "../authUtils/tokenUtils";

export const toggleStateThunk = createAsyncThunk(
  "pushNoti/toggleState",
  async (isPushOn: boolean, { getState, rejectWithValue, dispatch }) => {
    await dispatch(checkAndRenewTokens());
    const { auth, pushNoti } = getState() as TRootState;

    try {
      if (pushNoti.isPushOn === isPushOn) return isPushOn;
      const res = await client.patch(
        "notice/setting/push",
        {
          isPushOn,
        },
        { accessToken: auth.accessToken }
      );
      //   console.log(res);
      if (res.result === "success") {
        console.log("푸시알림 설정 변경 성공", res);
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
