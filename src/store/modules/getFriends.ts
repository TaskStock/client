import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../services/api";
import { RootState } from "../configureStore";
import { buttonRender } from "../../utils/UserUtils/buttonRender";
import {
  cancelRequestThunk,
  followThunk,
  unfollowThunk,
} from "../../utils/UserUtils/followThunk";
import { createApi } from "@reduxjs/toolkit/query/react";
import { myFetchFunction } from "../myFetchFunction";
import { IUserBox } from "../../@types/userBox";
import { Value } from "../../@types/chart";
import { Todo } from "../../@types/todo";
import { Project } from "../../@types/project";

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
  introduce?: string;
  follower_count?: number;
  following_count?: number;
  button: "팔로우" | "팔로잉" | "맞팔로우" | "요청됨";
}

interface initialState {
  followingList: IFriend[];
  followerList: IFriend[];
  searchList: IFriend[];
  targetUser: IFriend;
  loading: boolean;
  introduce?: string;
  follower_count?: number;
  following_count?: number;
  error: string | null;
  button?: "팔로우" | "팔로잉" | "맞팔로우" | "요청됨";
}

const initialFriendState: initialState = {
  followingList: [],
  followerList: [],
  searchList: [],
  targetUser: {
    user_id: 0,
    user_name: "",
    image: "",
    cumulative_value: 0,
    strategy: "",
    private: false,
    pending: false,
    introduce: "",
    isFollowingMe: false,
    isFollowingYou: false,
    follower_count: 0,
    following_count: 0,
    button: "팔로우",
  },
  loading: false,
  follower_count: 0,
  following_count: 0,
  error: null,
};

interface getFriendInfoQueryResult {
  result: string;
  targetData: IUserBox;
  values: Value[];
  todos: Todo[];
  projects: Project[];
}

export const getFriendsApi = createApi({
  reducerPath: "getFriendsApi",
  baseQuery: myFetchFunction(""),
  endpoints: (builder) => ({
    getFriendInfo: builder.query<getFriendInfoQueryResult, { userId: number }>({
      query: (body) => {
        return {
          url: `ssns/users/${body.userId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetFriendInfoQuery } = getFriendsApi;

export const getFriendsThunk = createAsyncThunk(
  "sns/getFriendsThunk",
  async (_, { rejectWithValue, getState }) => {
    const rootState = getState() as RootState;
    const { accessToken } = rootState.auth;

    try {
      const res = await client.get("sns/list", { accessToken });
      // console.log(res); // res.followerList, res.followingList
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

export const getTargetUserThunk = createAsyncThunk(
  "sns/getTargetUserThunk",
  async (userId: number, { rejectWithValue, getState }) => {
    const rootState = getState() as RootState;
    const { accessToken } = rootState.auth;
    try {
      const response = await client.get(`sns/users/${userId}`, { accessToken });
      // console.log(response);
      if (response.result === "success") {
        return response.targetData;
      } else {
        return rejectWithValue(response.result);
      }
    } catch (error) {
      console.log("검색 실패: ", error);
      rejectWithValue(error.response.data);
    }
  }
);

const updateFriendStatus_follow = (friend, followingId) => {
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

const updateFriendStatus_unfollow = (friend, followingId) => {
  if (friend.user_id === followingId) {
    friend.isFollowingYou = false;
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
          list.forEach((friend) =>
            updateFriendStatus_follow(friend, followingId)
          )
      );

      // targetUser 수정
      state.targetUser.private
        ? (state.targetUser.pending = true)
        : (state.targetUser.pending = false);
      state.targetUser.isFollowingYou = !state.targetUser.pending;

      state.targetUser.button = buttonRender(
        state.targetUser.pending,
        state.targetUser.private,
        state.targetUser.isFollowingMe,
        state.targetUser.isFollowingYou
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
      [state.followerList, state.followingList, state.searchList].forEach(
        (list) =>
          list.forEach((friend) =>
            updateFriendStatus_unfollow(friend, action.payload)
          )
      );
      // targetUser 수정
      state.targetUser.isFollowingYou = false;
      state.targetUser.button = buttonRender(
        state.targetUser.pending,
        state.targetUser.private,
        state.targetUser.isFollowingMe,
        state.targetUser.isFollowingYou
      );
      console.log("언팔로우 성공");
    });
    builder.addCase(cancelRequestThunk.pending, (state, action) => {
      state.loading = true;
      console.log("cancelRequestThunk pending");
    });
    builder.addCase(cancelRequestThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = "Rejected: 요청 취소 실패";
      console.log("Rejected: 요청 취소 실패");
    });
    builder.addCase(cancelRequestThunk.fulfilled, (state, action) => {
      state.loading = false;
      [state.followerList, state.followingList, state.searchList].forEach(
        (list) =>
          list.forEach((friend) => {
            if (friend.user_id === action.payload) {
              friend.pending = false;
              friend.isFollowingYou = false;

              friend.button = buttonRender(
                friend.pending,
                friend.private,
                friend.isFollowingMe,
                friend.isFollowingYou
              );
            }
          })
      );
      console.log("요청 취소 성공");
    });
    builder.addCase(getTargetUserThunk.pending, (state, action) => {
      state.loading = true;
      console.log("getTargetUserThunk pending");
    });
    builder.addCase(getTargetUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = "Rejected: 타켓 유저 정보 가져오기 실패";
      console.log("Rejected: 타켓 유저 정보 가져오기 실패");
    });
    builder.addCase(getTargetUserThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.targetUser = action.payload;
      state.error = null;
      state.targetUser.button = buttonRender(
        action.payload.pending,
        action.payload.private,
        action.payload.isFollowingMe,
        action.payload.isFollowingYou
      );
      console.log("타켓 유저 정보 가져오기 성공");
    });
  },
});

export default friendSlice.reducer;
