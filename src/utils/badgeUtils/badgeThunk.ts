import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../services/api";
import { RootState } from "../../store/configureStore";

const badgeThunk = createAsyncThunk(
  "badge/requestBadge",
  async (type: number, { getState, rejectWithValue }) => {
    const rootState = getState() as RootState;
    const { accessToken } = rootState.auth;
    const { user_id } = rootState.user.user;
    const { badges } = rootState.badge;

    // 이미 뱃지 있으면 fetch 안함
    if (badges.includes(type)) {
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
