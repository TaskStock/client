import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/configureStore";
import { client } from "../../services/api";

export const followThunk = createAsyncThunk(
  "user/followThunk",
  async (followingId: Number, { rejectWithValue, getState }) => {
    const rootState = getState() as RootState;
    const { accessToken } = rootState.auth;

    try {
      const data = await client.post(
        "sns/follow",
        {
          following_id: followingId,
        },
        {
          accessToken: accessToken,
        }
      );
      console.log("팔로우 response: ", data);
      if (data.result === "success") {
        return data;
      } else {
        return rejectWithValue(data.result);
      }
    } catch (error) {
      console.log("팔로우 실패 error");
      return rejectWithValue(error.response.data);
    }
  }
);

export const unfollowThunk = createAsyncThunk(
  "user/unfollowThunk",
  async (followingId: Number, { rejectWithValue, getState }) => {
    const rootState = getState() as RootState;
    const { accessToken } = rootState.auth;

    try {
      const data = await client.delete(
        `sns/unfollow`,
        { unfollowing_id: followingId },
        {
          accessToken: accessToken,
        }
      );
      console.log("언팔로우 response: ", data);
      if (data.result === "success") {
        return data;
      } else {
        return rejectWithValue(data.result);
      }
    } catch (error) {
      console.log("언팔로우 실패 error");
      return rejectWithValue(error.response.data);
    }
  }
);
