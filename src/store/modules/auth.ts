import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, storeData } from "../../utils/asyncStorage";
import {
  loginWithEmail,
  logout,
  registerWithEmail,
} from "../../utils/authUtils/signInUtils";
import { checkAndRenewTokens } from "../../utils/authUtils/tokenUtils";

interface IInitialUserState {
  accessToken: string;
  accessExp: number;
  refreshExp: number;
  deviceId: string;
  isLoggedIn: boolean;
  loading: boolean;
  error: any;
  strategy: string;
}

export const initialUserState: IInitialUserState = {
  accessToken: "",
  accessExp: 0,
  refreshExp: 0,
  deviceId: "",
  isLoggedIn: false,
  loading: false,
  error: null,
  strategy: "",
};

// 초기 상태를 검사하여 업데이트하는 비동기 함수
export const checkTokenExistence = createAsyncThunk(
  "auth/checkTokenExistence",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = await getData("accessToken");
      const accessExp = await getData("accessExp");
      const refreshExp = await getData("refreshExp");
      const strategy = await getData("strategy");
      const deviceId = await getData("deviceId");

      if (accessToken && accessExp && refreshExp) {
        return {
          accessToken,
          accessExp: Number(accessExp),
          refreshExp: Number(refreshExp),
          deviceId,
          isLoggedIn: true,
          strategy,
        };
      }

      return {
        accessToken: "",
        accessExp: 0,
        refreshExp: 0,
        deviceId,
        isLoggedIn: false,
        strategy,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
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
    setStrategy: (state, action) => {
      state.strategy = action.payload;
    },
    setLoggedIn: (state, action) => {
      if (action.payload.accessToken) {
        state.accessToken = action.payload.accessToken;
        state.accessExp = action.payload.accessExp;
        state.refreshExp = action.payload.refreshExp;
        state.isLoggedIn = true;
        state.loading = false;
        state.error = false;
        state.deviceId = action.payload.deviceId;

        const strategy = getData("strategy");

        if (strategy && typeof strategy === "string") {
          state.strategy = strategy;
        }

        storeData("accessToken", action.payload.accessToken);
        storeData("refreshToken", action.payload.refreshToken);
        storeData("accessExp", action.payload.accessExp);
        storeData("refreshExp", action.payload.refreshExp);
        storeData("deviceId", action.payload.deviceId);

        console.log("로그인 성공: ");
      }
    },
    setSocialLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.accessExp = action.payload.accessExp;
      state.refreshExp = action.payload.refreshExp;
      state.isLoggedIn = true;
      state.loading = false;
      state.error = false;
      state.deviceId = action.payload.deviceId;
      state.strategy = action.payload.strategy;

      storeData("accessToken", action.payload.accessToken);
      storeData("refreshToken", action.payload.refreshToken);
      storeData("accessExp", action.payload.accessExp);
      storeData("refreshExp", action.payload.refreshExp);
      storeData("deviceId", action.payload.deviceId);
      storeData("strategy", action.payload.strategy);

      console.log("소셜로그인 성공: ", state);
    },
  },
  extraReducers: (builder) => {
    // 이메일 회원가입
    builder.addCase(registerWithEmail.pending, (state) => {
      state.loading = true;
      console.log("회원가입 진행중");
    });
    builder.addCase(registerWithEmail.fulfilled, (state, action) => {
      // redux에 저장
      state.accessToken = action.payload.accessToken;
      state.accessExp = action.payload.accessExp;
      state.refreshExp = action.payload.refreshExp;
      state.isLoggedIn = true;
      state.loading = false;
      state.strategy = action.payload.strategy;
      state.deviceId = action.payload.deviceId;

      // AsyncStorage에 저장
      storeData("accessToken", action.payload.accessToken);
      storeData("refreshToken", action.payload.refreshToken);
      storeData("accessExp", action.payload.accessExp);
      storeData("refreshExp", action.payload.refreshExp);
      storeData("deviceId", action.payload.deviceId);

      // strategy는 회원가입 시에만 저장
      storeData("strategy", action.payload.strategy);

      console.log("회원가입 성공: ");
    });
    builder.addCase(registerWithEmail.rejected, (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = action.payload;

      console.log("회원가입 실패", action.payload);
    });
    // 이메일 로그인
    builder.addCase(loginWithEmail.pending, (state) => {
      state.loading = true;
      console.log("로그인 진행중");
    });
    builder.addCase(loginWithEmail.fulfilled, (state, action) => {
      if (action.payload.accessToken) {
        state.accessToken = action.payload.accessToken;
        state.accessExp = action.payload.accessExp;
        state.refreshExp = action.payload.refreshExp;
        state.isLoggedIn = true;
        state.loading = false;
        state.error = false;
        state.deviceId = action.payload.deviceId;
        const strategy = getData("strategy");

        if (strategy && typeof strategy === "string") {
          state.strategy = strategy;
        }

        storeData("accessToken", action.payload.accessToken);
        storeData("refreshToken", action.payload.refreshToken);
        storeData("accessExp", action.payload.accessExp);
        storeData("refreshExp", action.payload.refreshExp);
        storeData("deviceId", action.payload.deviceId);

        console.log("로그인 성공: ");
      }
    });
    builder.addCase(loginWithEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.isLoggedIn = false;
      console.log("로그인 실패", action.payload);
    });
    builder.addCase(checkTokenExistence.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.accessExp = action.payload.accessExp;
      state.refreshExp = action.payload.refreshExp;
      state.strategy = action.payload.strategy;
      state.deviceId = action.payload.deviceId;
      state.loading = false;
    });
    builder.addCase(checkTokenExistence.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // 로그아웃
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      console.log("로그아웃 진행중: ", state);
    });
    builder.addCase(logout.fulfilled, (state) => {
      // asyncStorage에서 토큰 제거
      AsyncStorage.removeItem("accessToken");
      AsyncStorage.removeItem("refreshToken");
      AsyncStorage.removeItem("accessExp");
      AsyncStorage.removeItem("refreshExp");

      state.accessToken = "";
      state.accessExp = 0;
      state.refreshExp = 0;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      console.log("로그아웃 에러: ", action.payload);
    });
    builder.addCase(checkAndRenewTokens.pending, (state) => {
      // state.loading = true;
      console.log("토큰 갱신 진행중");
    });
    builder.addCase(checkAndRenewTokens.fulfilled, (state, action) => {
      // state.loading = false;

      const { accessToken, refreshToken, accessExp, refreshExp } =
        action.payload;
      state.accessToken = accessToken;
      state.accessExp = accessExp;

      if (refreshExp && refreshExp) {
        state.refreshExp = refreshExp;
        storeData("refreshExp", refreshExp);
        storeData("refreshToken", refreshToken);
      }
      storeData("accessToken", accessToken);
      storeData("accessExp", accessExp);
      console.log("토큰 갱신 성공 ", action.payload);
    });
    builder.addCase(checkAndRenewTokens.rejected, (state, action) => {
      // state.loading = false;
      state.error = action.payload;
      console.log("토큰 갱신 rejected: ", action.payload);
    });
  },
});

export const { setAccessToken, setStrategy, setLoggedIn, setSocialLoggedIn } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
