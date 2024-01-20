import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../services/api";
import {
  setToDefaultImageThunk,
  uploadImageThunk,
} from "../../utils/SnsUtils/uploadImageThunk";
import { RootState } from "../configureStore";

interface initialState {
  user: {
    user_id: number;
    email: string;
    user_name: string;
    hide: boolean;
    follower_count: number;
    following_count: number;
    premium: number;
    cumulative_value: number;
    value_month_ago: number;
    created_time: string;
    image: string;
    introduce: string;
    group_id: number;
    region: string;
    strategy: string;
  };
  loading: boolean;
  error: string | null;
}

const initialUserState: initialState = {
  user: {
    user_id: 0,
    email: "",
    user_name: "",
    hide: false,
    follower_count: 0,
    following_count: 0,
    premium: 0,
    cumulative_value: 0,
    value_month_ago: 0,
    created_time: "",
    image: "",
    introduce: "",
    group_id: 0,
    region: "",
    strategy: "",
  },
  loading: false,
  error: null,
};

export const getUserInfoThunk = createAsyncThunk(
  "user/getUserInfo",
  async (data, { rejectWithValue, getState }) => {
    const rootState = getState() as RootState;

    const accessToSend = rootState.auth.accessToken.replace(/^"|"$/g, "");

    try {
      const data = await client("account/getUserInfo", {
        accessToken: accessToSend,
      });

      console.log("getUserInfoThunk success");

      return data;
    } catch (error) {
      console.log("getUserInfoThunk error");
      return rejectWithValue(error.response.data);
    }
  }
);

export const editUserInfoThunk = createAsyncThunk(
  "user/editUserInfo",
  async (
    info: { user_name: string; introduce: string },
    { rejectWithValue, getState }
  ) => {
    const rootState = getState() as RootState;
    const accessToSend = rootState.auth.accessToken.replace(/^"|"$/g, "");
    try {
      const data = await client.patch(
        "sns/edit/info",
        { ...info },
        {
          accessToken: accessToSend,
        }
      );
      console.log(info, accessToSend);

      if (data.result === "success") {
        return info;
      }
    } catch (error) {
      console.log("editUserInfoThunk error");
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getUserInfoThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserInfoThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = "유저 정보 받아오기 실패";
    });
    builder.addCase(getUserInfoThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.userData;
    });
    builder.addCase(editUserInfoThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(editUserInfoThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = "유저 정보 수정 실패";
    });
    builder.addCase(editUserInfoThunk.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.user.user_name = action.payload.user_name;
        state.user.introduce = action.payload.introduce;
      }
    });
    builder.addCase(uploadImageThunk.pending, (state, action) => {
      state.loading = true;
      console.log("uploadImageThunk pending");
    });
    builder.addCase(uploadImageThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = "이미지 업로드 실패";
    });
    builder.addCase(uploadImageThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user.image = action.payload.imagePath;
      console.log("성공", state.user.image);
    });
    builder.addCase(setToDefaultImageThunk.pending, (state, action) => {
      state.loading = true;
      console.log("setToDefaultImageThunk pending");
    });
    builder.addCase(setToDefaultImageThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = "기본이미지 변경 실패";
    });
    builder.addCase(setToDefaultImageThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user.image = action.payload.imagePath;
      console.log("성공", state.user.image);
    });
  },
});

export default userSlice.reducer;
