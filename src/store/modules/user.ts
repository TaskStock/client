import { createSlice } from "@reduxjs/toolkit";
import { editUserInfoThunk } from "../../utils/UserUtils/editUserInfoThunk";
import { getUserInfoThunk } from "../../utils/UserUtils/getUserInfoThunk";
import { setPrivateThunk } from "../../utils/UserUtils/setPrivate";
import {
  setToDefaultImageThunk,
  uploadImageThunk,
} from "../../utils/UserUtils/uploadImageThunk";

interface initialState {
  user: {
    user_id: number;
    email: string;
    user_name: string;
    private: boolean;
    follower_count: number;
    following_count: number;
    premium: number;
    cumulative_value: number;
    value_yesterday_ago: number;
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
    private: false,
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

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    updateUserValue: (state, action) => {
      state.user.cumulative_value += action.payload;
    },
  },
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

    builder.addCase(setPrivateThunk.pending, (state, action) => {
      state.loading = true;
      console.log("setPrivateThunk pending");
    });
    builder.addCase(setPrivateThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = "Rejected: 비공개 계정 전환 실패";
      console.log("Rejected: 비공개 계정 전환 실패");
    });
    builder.addCase(setPrivateThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user.private = action.payload;
      if (action.payload === true) {
        console.log("비공개 계정 전환 성공");
      } else {
        console.log("공개 계정 전환 성공");
      }
    });
  },
});

export default userSlice.reducer;
export const { updateUserValue } = userSlice.actions;
