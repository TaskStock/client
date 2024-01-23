import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../services/api";
import { RootState } from "../configureStore";
import { buttonRender } from "../../utils/UserUtils/buttonRender";
import { followThunk, unfollowThunk } from "../../utils/UserUtils/followThunk";

export interface IFriend {
  user_id: number;
  user_name: string;
  image: string;
  cumulative_value: number;
  strategy: string;
  private: boolean;
  pending: boolean;
  isFollowingMe: boolean;
  isFollowingYou: boolean;
  button: "팔로우" | "팔로잉" | "맞팔로우" | "요청됨";
}

interface initialState {
  followingList: IFriend[];
  followerList: IFriend[];
  searchList: IFriend[];
  loading: boolean;
  error: string | null;
}

const initialFriendState: initialState = {
  followingList: [],
  followerList: [],
  searchList: [],
  loading: false,
  error: null,
};

export const getFriendsThunk = createAsyncThunk(
  "sns/getFriendsThunk",
  async (_, { rejectWithValue, getState }) => {
    const rootState = getState() as RootState;
    const { accessToken } = rootState.auth;

    try {
      const res = await client.get("sns/list", { accessToken });
      console.log(res); // res.followerList, res.followingList
      return res;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response.data);
    }
  }
);

export const searchThunk = createAsyncThunk(
  "sns/searchThunk",
  async (searchText: string, { rejectWithValue, getState }) => {
    const rootState = getState() as RootState;
    const { accessToken } = rootState.auth;
    try {
      const response = await client.get(
        `sns/users/search/?searchScope=global&searchTarget=${searchText}`,
        { accessToken }
      );

      if (response.result === "success") {
        return response.searchResult;
      } else {
        return rejectWithValue(response.result);
      }
    } catch (error) {
      console.log("검색 실패: ", error);
      rejectWithValue(error.response.data);
    }
  }
);

const updateFriendStatus = (friend, followingId) => {
  if (friend.user_id === followingId) {
    friend.private ? (friend.pending = true) : (friend.pending = false);
    friend.isFollowingYou = !friend.pending;

    friend.button = buttonRender(
      friend.pending,
      friend.private,
      friend.isFollowingMe,
      friend.isFollowingYou
    );
  }
};

const friendSlice = createSlice({
  name: "getFriends",
  initialState: initialFriendState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFriendsThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getFriendsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.followerList = action.payload.followerList.filter(
        (friend: IFriend) => friend.isFollowingMe
      );
      state.followerList.map((friend) => {
        friend.button = buttonRender(
          friend.pending,
          friend.private,
          friend.isFollowingMe,
          friend.isFollowingYou
        );
      });
      state.followingList = action.payload.followingList.filter(
        (friend: IFriend) => friend.isFollowingYou
      );
      state.followingList.map((friend) => {
        friend.button = buttonRender(
          friend.pending,
          friend.private,
          friend.isFollowingMe,
          friend.isFollowingYou
        );
      });
    });
    builder.addCase(getFriendsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = "친구 목록 받아오기 실패";
    });
    builder.addCase(searchThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(searchThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.searchList = action.payload;

      state.searchList.map((friend) => {
        friend.button = buttonRender(
          friend.pending,
          friend.private,
          friend.isFollowingMe,
          friend.isFollowingYou
        );
      });
    });
    builder.addCase(searchThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = "검색 실패";
    });
    builder.addCase(followThunk.pending, (state, action) => {
      state.loading = true;
      console.log("followThunk pending");
    });
    builder.addCase(followThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = "Rejected: 팔로우 실패";
      console.log("Rejected: 팔로우 실패");
    });
    builder.addCase(followThunk.fulfilled, (state, action) => {
      state.loading = false;
      // followerList, followingList, searchList 수정
      const followingId = action.payload.followingId;
      [state.followerList, state.followingList, state.searchList].forEach(
        (list) =>
          list.forEach((friend) => updateFriendStatus(friend, followingId))
      );
      console.log("팔로우 성공");
    });
    builder.addCase(unfollowThunk.pending, (state, action) => {
      state.loading = true;
      console.log("unfollowThunk pending");
    });
    builder.addCase(unfollowThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = "Rejected: 언팔로우 실패";
      console.log("Rejected: 언팔로우 실패");
    });
    builder.addCase(unfollowThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.followingList.filter((friend) => {
        if (friend.user_id === action.payload) {
          friend.isFollowingYou = false;
          friend.button = buttonRender(
            friend.pending,
            friend.private,
            friend.isFollowingMe,
            friend.isFollowingYou
          );
        }
      });
      state.searchList.filter((friend) => {
        if (friend.user_id === action.payload) {
          friend.isFollowingYou = false;
          friend.button = buttonRender(
            friend.pending,
            friend.private,
            friend.isFollowingMe,
            friend.isFollowingYou
          );
        }
      });
      console.log("언팔로우 성공");
    });
  },
});

export default friendSlice.reducer;
