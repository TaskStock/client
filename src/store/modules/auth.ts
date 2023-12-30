import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IUser {
  email: string;
  userName: string;
  password: string;
  isAgree: number;
  theme: string;
  language: string;
}

export const initialUserState = {
  token: null,
  //   access: localStorage.getItem("access"),
  //   refresh: localStorage.getItem("refresh"),

  isLoggedIn: false,
  loading: false,
  error: null,

  user: {
    email: "",
    userName: "",
    password: null,
    isAgree: 1,
    theme: "gray",
    language: "korean",
  },
};

export const registerUser = createAsyncThunk(
  "REGISTER_USER",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8000/account/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (!response.ok) {
        // 네트워크 응답이 OK가 아니라면 에러 처리
        return rejectWithValue(responseData);
      }

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
      state.user = action.payload;
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
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.loading = false;
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
