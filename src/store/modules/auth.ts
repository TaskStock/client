import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IInitialUserState {
  accessToken: string;
  userId: number;
  isLoggedIn: boolean;
  loading: boolean;
  error: any;
}

export const initialUserState: IInitialUserState = {
  accessToken: "",
  userId: 0,
  isLoggedIn: false,
  loading: false,
  error: null,
};

// 회원가입
export const registerUser = createAsyncThunk(
  "REGISTER_USER",
  async (data, { rejectWithValue }) => {
    try {
      const responseData = await client.post("account/register", data);
      const { accessToken } = responseData;

      // 토큰을 AsyncStorage에 저장
      await AsyncStorage.setItem("accessToken", accessToken);

      return responseData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 초기 상태를 검사하여 업데이트하는 비동기 함수
export const checkTokenExistence = createAsyncThunk(
  "auth/checkTokenExistence",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (accessToken) {
        return { accessToken, isLoggedIn: true };
      }
      return { accessToken: "", isLoggedIn: false };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialUserState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state = action.payload;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      AsyncStorage.removeItem("accessToken"); // 로그아웃 시 토큰 삭제
      Object.assign(state, initialUserState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.userId = action.payload.user_id;
        state.isLoggedIn = true;
        state.loading = false;
        console.log(state);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkTokenExistence.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = action.payload.isLoggedIn;
        state.loading = false;
      })
      .addCase(checkTokenExistence.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
