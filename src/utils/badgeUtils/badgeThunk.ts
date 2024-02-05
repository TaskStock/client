import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../services/api";
import { RootState } from "../../store/configureStore";

const badgeThunk = createAsyncThunk(
  "badge/requestBadge",
  async (type: number, { getState, rejectWithValue }) => {
    const { accessToken } = (getState() as RootState).auth;
    try {
      const res = await client.post("badge", { type }, { accessToken });
      if (res.result === "success") {
        return type;
      } else {
        return rejectWithValue(res.result);
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export default badgeThunk;
