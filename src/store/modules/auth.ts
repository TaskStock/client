import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAPIHost } from "../../utils/getAPIHost";
import { storeData } from "../../utils/asyncStorage";

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

// export const logout = createAsyncThunk(
//   "auth/logout",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const state = getState();
//       // console.log("state: ", state);
//       const accessToken = state.auth.accessToken;
//       console.log("보낼 토큰: ", accessToken);
//       const SERVER_URL = getAPIHost();

//       const response = await fetch(`${SERVER_URL}account/logout`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       console.log("------", response.status);
//       // if (!response.ok) {
//       //   throw new Error("서버로부터의 응답이 올바르지 않습니다.---");
//       // }
//       const data = await response.json();
//       // console.log("logout data: ", data);

//       if (data.result !== "success") {
//         throw new Error(data.message || "로그아웃 실패");
//       }

//       await AsyncStorage.removeItem("accessToken"); // 로컬에서 토큰 제거
//       return data;
//     } catch (error) {
//       // console.error("로그아웃 처리 중 오류:", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

const authSlice = createSlice({
  name: "auth",
  initialState: initialUserState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.userId = action.payload.user_id;
      state.loading = false;

      storeData("accessToken", action.payload.accessToken); // asyncStorage에 토큰 저장
      console.log("loginSuccess: ", state);
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
    // .addCase(logout.pending, (state) => {
    //   state.loading = true;
    //   console.log("pending: ", state);
    // })
    // .addCase(logout.fulfilled, (state) => {
    //   console.log("성공: ", state);
    //   Object.assign(state, initialUserState);
    // })
    // .addCase(logout.rejected, (state, action) => {
    //   state.error = action.payload;
    //   state.loading = false;
    //   console.log("에러: ", action.payload);
    // });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
