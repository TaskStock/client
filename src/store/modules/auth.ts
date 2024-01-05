import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IInitialUserState {
  accessToken: string;
  refreshToken: string;

  isLoggedIn: boolean;
  loading: boolean;
  error: any;
}

export const initialUserState: IInitialUserState = {
  accessToken: "",
  refreshToken: "",

  isLoggedIn: false,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "REGISTER_USER",
  async (data, { rejectWithValue }) => {
    try {
      const responseData = await client.post("account/register", data);
      const { accessToken, refreshToken } = responseData;

      // 토큰을 AsyncStorage에 저장
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);

      return responseData;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
        state.refreshToken = action.payload.refreshToken;

        state.isLoggedIn = true;
        state.loading = false;
        console.log(state);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
