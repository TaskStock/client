import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../services/api";
import { TRootState } from "../configureStore";
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
import { checkAndRenewTokens } from "../../utils/authUtils/tokenUtils";

interface IBadge {
  type: number;
  created_time: string;
}

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
  button: "팔로우" | "팔로잉" | "맞팔로우" | "요청됨" | "수락";
  followerList?: IFriend[];
  followingList?: IFriend[];
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
  button?: "팔로우" | "팔로잉" | "맞팔로우" | "요청됨" | "수락";
  badges: IBadge[];
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
    followerList: [],
    followingList: [],
  },
  badges: [],
  loading: false,
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
    getFriendFollowerList: builder.query<
      {
        result: string;
        followerList: IFriend[];
        followingList: IFriend[];
      },
      { userId: number }
    >({
      query: (body) => {
        return {
          url: `ssns/${body.userId}/list`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetFriendInfoQuery, useGetFriendFollowerListQuery } =
  getFriendsApi;

export const getFriendsThunk = createAsyncThunk(
  "sns/getFriendsThunk",
  async (_, { rejectWithValue, getState, dispatch }) => {
    await dispatch(checkAndRenewTokens());
    const rootState = getState() as TRootState;
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
  async (searchText: string, { rejectWithValue, getState, dispatch }) => {
    await dispatch(checkAndRenewTokens());
    const rootState = getState() as TRootState;
    const { accessToken } = rootState.auth;
    if (searchText === "") return [];
    try {
      const response = await client.get(
        `sns/users/search/?searchScope=global&searchTarget=${searchText}`,
        { accessToken }
      );
      // console.log(response);
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
  async (userId: number, { rejectWithValue, getState, dispatch }) => {
    await dispatch(checkAndRenewTokens());
    const rootState = getState() as TRootState;
    const { accessToken } = rootState.auth;
    try {
      const response = await client.get(`sns/users/${userId}`, { accessToken });

      const { result, projects, targetData, todos, values, badges } = response;
      if (result === "success") {
        dispatch(addFriendBadges(badges));

        return targetData;
      } else {
        return rejectWithValue(result);
      }
    } catch (error) {
      console.log("검색 실패: ", error);
      rejectWithValue(error.response.data);
    }
  }
);

export const getUserFollowerThunk = createAsyncThunk(
  "sns/getUserFollowerThunk",
  async (userId: number, { rejectWithValue, getState, dispatch }) => {
    await dispatch(checkAndRenewTokens());
    const rootState = getState() as TRootState;
    const { accessToken } = rootState.auth;
    try {
      const response = await client.get(`sns/${userId}/list`, { accessToken });

      const { result, followerList, followingList } = response;

      if (result === "success") {
        return { followerList, followingList };
      } else {
        return rejectWithValue(result);
      }
    } catch (error) {
      console.log("팔로워 리스트 조회 실패 ", error);
      rejectWithValue(error.response.data);
    }
  }
);

const data = {
  projects: [],
  result: "success",
  targetData: {
    cumulative_value: 52000,
    follower_count: 1,
    following_count: 0,
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocLQx_eNNVNgpEIVp1TuoMQ0dHP2OXVrl6vt1-R7EsRZZSQx=s120",
    introduce: null,
    isFollowingMe: false,
    isFollowingYou: true,
    pending: false,
    private: false,
    strategy: "google",
    user_id: 3,
    user_name: "hwanheejung",
  },
  todos: [
    {
      check: true,
      content: "111",
      date: "2024-02-10T15:21:55.577Z",
      index: 1,
      level: 2,
      project_id: null,
      stockitem_id: null,
      todo_id: 2,
      user_id: 3,
    },
    {
      check: false,
      content: "222",
      date: "2024-02-10T15:21:55.577Z",
      index: 2,
      level: 0,
      project_id: null,
      stockitem_id: null,
      todo_id: 3,
      user_id: 3,
    },
  ],
  values: [
    {
      date: "2024-02-11T15:00:00.000Z",
      end: 52000,
      high: 52000,
      low: 48000,
      start: 50000,
      user_id: 3,
      value_id: 5,
    },
  ],
};

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
  reducers: {
    addFriendBadges: (state, action) => {
      state.badges = action.payload;
    },
  },
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
      console.log("Rejected: 팔로우 실패", action.error.message);
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

      if (state.targetUser.followerList) {
        state.targetUser.followerList.forEach((friend) =>
          updateFriendStatus_follow(friend, followingId)
        );
      }

      if (state.targetUser.followingList) {
        state.targetUser.followingList.forEach((friend) =>
          updateFriendStatus_follow(friend, followingId)
        );
      }

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

      // follower_count, following_count update
      // pending === false이면 나의 following_count +1, 상대방의 follower_count +1
      if (!state.targetUser.pending && state.targetUser.follower_count) {
        state.targetUser.follower_count += 1;
      }

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

      if (state.targetUser.followerList) {
        state.targetUser.followerList.forEach((friend) =>
          updateFriendStatus_unfollow(friend, action.payload)
        );
      }

      if (state.targetUser.followingList) {
        state.targetUser.followingList.forEach((friend) =>
          updateFriendStatus_unfollow(friend, action.payload)
        );
      }

      // targetUser 수정
      state.targetUser.isFollowingYou = false;
      state.targetUser.button = buttonRender(
        state.targetUser.pending,
        state.targetUser.private,
        state.targetUser.isFollowingMe,
        state.targetUser.isFollowingYou
      );

      // follower_count, following_count update
      // pending === false이면 나의 following_count -1, 상대방의 follower_count -1
      if (!state.targetUser.pending && state.targetUser.follower_count) {
        state.targetUser.follower_count -= 1;
      }

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

      if (state.targetUser.followerList) {
        state.targetUser.followerList.forEach((friend) => {
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
        });
      }

      if (state.targetUser.followingList) {
        state.targetUser.followingList.forEach((friend) => {
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
        });
      }

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
    builder.addCase(getUserFollowerThunk.pending, (state, action) => {
      state.loading = true;
      console.log("getUserFollowerThunk pending");
    });
    builder.addCase(getUserFollowerThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = "Rejected: 팔로워 리스트 가져오기 실패";
      console.log("Rejected: 팔로워 리스트 가져오기 실패");
    });
    builder.addCase(getUserFollowerThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.targetUser.followerList = action.payload?.followerList || [];
      state.targetUser.followingList = action.payload?.followingList || [];
      state.error = null;
      console.log("팔로워 리스트 가져오기 성공");
    });
  },
});

export const { addFriendBadges } = friendSlice.actions;
export default friendSlice.reducer;
