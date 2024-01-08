import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkStorage, storeData } from "../../utils/asyncStorage";
import {
  loginWithEmail,
  registerWithEmail,
} from "../../utils/authUtils/signInUtils";
import { checkAndRenewTokens } from "../../utils/authUtils/tokenUtils";

interface IInitialUserState {
  accessToken: string;
  accessExp: number;
  refreshExp: number;
  isLoggedIn: boolean;
  loading: boolean;
  error: any;
}

export const initialUserState: IInitialUserState = {
  accessToken: "",
  accessExp: 0,
  refreshExp: 0,
  isLoggedIn: false,
  loading: false,
  error: null,
};

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

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    console.log("logout 실행");
    // try {
    //   const state = getState();
    //   // console.log("state: ", state);
    //   const accessToken = state.auth.accessToken;
    //   console.log("보낼 토큰: ", accessToken);
    //   const SERVER_URL = getAPIHost();
    //   const response = await fetch(`${SERVER_URL}account/logout`, {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   });
    //   console.log("------", response.status);
    //   // if (!response.ok) {
    //   //   throw new Error("서버로부터의 응답이 올바르지 않습니다.---");
    //   // }
    //   const data = await response.json();
    //   // console.log("logout data: ", data);
    //   if (data.result !== "success") {
    //     throw new Error(data.message || "로그아웃 실패");
    //   }
    //   await AsyncStorage.removeItem("accessToken"); // 로컬에서 토큰 제거
    //   return data;
    // } catch (error) {
    //   // console.error("로그아웃 처리 중 오류:", error);
    //   return rejectWithValue(error.message);
    // }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialUserState,
  reducers: {
    // 임시로 설정. 나중에 thunk로 바꿀것
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 이메일 회원가입
      .addCase(registerWithEmail.pending, (state) => {
        state.loading = true;
        console.log("회원가입 진행중");
      })
      .addCase(registerWithEmail.fulfilled, (state, action) => {
        // redux에 저장
        state.accessToken = action.payload.accessToken;
        // state.accessExp = action.payload.accessExp;
        // state.refreshExp = action.payload.refreshExp;
        state.isLoggedIn = true;
        state.loading = false;
        console.log("회원가입 redux: ", state);

        // AsyncStorage에 저장
        storeData("accessToken", action.payload.accessToken);
        storeData("refreshToken", action.payload.refreshToken);

        checkStorage();
      })
      .addCase(registerWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

        console.log("회원가입 실패", action.payload);
      })
      // 이메일 로그인
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
        console.log("로그인 진행중");
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        if (action.payload.accessToken) {
          state.accessToken = action.payload.accessToken;
          // state.accessExp = action.payload.accessExp;
          // state.refreshExp = action.payload.refreshExp;
          state.isLoggedIn = true;
          state.loading = false;

          storeData("accessToken", action.payload.accessToken);
          storeData("refreshToken", action.payload.refreshToken);
          console.log("로그인 성공: ", action.payload);
        }
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("로그인 실패", action.payload);
      })
      .addCase(checkTokenExistence.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = action.payload.isLoggedIn;
        state.loading = false;
      })
      .addCase(checkTokenExistence.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 로그아웃
      .addCase(logout.pending, (state) => {
        state.loading = true;
        console.log("pending: ", state);
      })
      .addCase(logout.fulfilled, (state) => {
        // asyncStorage에서 토큰 제거
        AsyncStorage.removeItem("accessToken");
        AsyncStorage.removeItem("refreshToken");

        Object.assign(state, initialUserState);
        console.log(state);
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        console.log("에러: ", action.payload);
      })
      // 토큰 갱신
      .addCase(checkAndRenewTokens.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAndRenewTokens.fulfilled, (state, action) => {
        state.loading = false;
        // 토큰이 있는 경우(만료되었더라도)
        if (action.payload) {
          const { accessToken, refreshToken, accessExp, refreshExp } =
            action.payload;
          state.accessToken = accessToken;
          state.accessExp = accessExp;
          state.refreshExp = refreshExp;
          storeData("accessToken", accessToken);
          storeData("refreshToken", refreshToken);
        }
      })
      .addCase(checkAndRenewTokens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { setAccessToken } = authSlice.actions;

export const authReducer = authSlice.reducer;
