import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../services/api";

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
      const responseData = await client.post("account/register", data);
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
