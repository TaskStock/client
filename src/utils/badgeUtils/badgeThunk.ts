import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../services/api";
import { TRootState } from "../../store/configureStore";
import { checkAndRenewTokens } from "../authUtils/tokenUtils";
import { showSuccessToast } from "../showToast";

const badgeThunk = createAsyncThunk(
  "badge/requestBadge",
  async (type: number, { getState, rejectWithValue, dispatch }) => {
    await dispatch(checkAndRenewTokens());
    const rootState = getState() as TRootState;
    const { accessToken } = rootState.auth;
    const { user_id } = rootState.user.user;
    const { badges } = rootState.badge;

    // 이미 뱃지 있으면 fetch 안함
    const exists = badges.some((badge) => badge.type === type);
    // 이미 존재하는 경우, 'already exists' 메시지와 함께 거부
    if (exists) {
      return rejectWithValue("already exists");
    }

    try {
      const res = await client.post(
        "badge",
        { user_id, type },
        { accessToken }
      );
      if (res.result === "success") {
        // {”result”: “success”, “badges”: [1, 2, 3]}
        showSuccessToast("새로운 뱃지를 획득했어요!🔥");
        return res.badges;
      } else {
        return rejectWithValue(res.result);
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export default badgeThunk;
