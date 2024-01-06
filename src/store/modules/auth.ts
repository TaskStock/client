import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../services/api";

interface IInitialUserState {
  accessToken: string;
  refreshToken: string;

  isLoggedIn: boolean;
  loading: boolean;
  error: any;
}

export const initialUserState: IInitialUserState = {
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5MywiaWF0IjoxNzA0NTA0NDA0LCJleHAiOjE3MDQ1MDgwMDR9.Fwkq6vxmScAji8NZN821UutDRmr_rBvYLiuA0EdkZWE",
  refreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5MywiaWF0IjoxNzA0NTU0MTQzfQ.RuU9Gl6KLXHlynv-eadqVtsaOdpnf2bibjlfGTu9Fwo",

  isLoggedIn: false,
  loading: false,
  error: null,
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
      state = action.payload;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // 임시로 설정. 나중에 thunk로 바꿀것
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },

    // 이것도 나중에 refreshToken Asyncstorage에서 삭제하는 Thunk함수로.
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
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setAccessToken,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
