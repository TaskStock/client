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

        // rootState.friends.followingList.filter((friend) => {
        //   if (friend.user_id === followingId) {
        //     friend.button = buttonRender(
        //       friend.pending,
        //       friend.private,
        //       friend.isFollowingMe,
        //       friend.isFollowingYou
        //     );
        //     console.log(friend.user_name, friend.button);
        //   }
        // });
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
