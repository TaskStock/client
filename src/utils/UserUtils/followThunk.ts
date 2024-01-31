import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../services/api";
import { RootState } from "../../store/configureStore";

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
        return { ...data, followingId };
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
        console.log("updated following list", rootState.friends.followingList);
        return followingId;
      } else {
        return rejectWithValue(data.result);
      }
    } catch (error) {
      console.log("언팔로우 실패 error");
      return rejectWithValue(error.response.data);
    }
  }
);

export const cancelRequestThunk = createAsyncThunk(
  "user/cancelRequest",
  async (targetId: Number, { rejectWithValue, getState, dispatch }) => {
    const rootState = getState() as RootState;
    const { accessToken } = rootState.auth;

    try {
      const data = await client.delete(
        `sns/follow`,
        { following_id: targetId },
        {
          accessToken: accessToken,
        }
      );
      console.log("요청 취소 response: ", data);
      if (data.result === "success") {
        console.log("updated following list", rootState.friends.followingList);
        return targetId;
      } else if (data.result === "alreadyAccepted") {
        // unfollowThunk
        dispatch(unfollowThunk(targetId));
        return rejectWithValue(data);
      } else {
        return rejectWithValue(data.result);
      }
    } catch (error) {
      console.log("요청 취소 실패 error");
      return rejectWithValue(error.response.data);
    }
  }
);

export const acceptRequestThunk = createAsyncThunk(
  "user/acceptRequest",
  async (targetId: Number, { rejectWithValue, getState, dispatch }) => {}
);
