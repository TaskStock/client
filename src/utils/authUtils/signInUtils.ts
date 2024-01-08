import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../services/api";
import { saveCredentials } from "./autoSignIn";
import { IRegisterUser } from "../../screens/Login/EmailRegisterScreen";

// 회원가입, 로그인
// accessToken => asyncStorage, redux에 저장
// refreshToken => asyncStorage에 저장
// accessExp, refreshExp => redux에 저장
// email, password => keyChain에 저장
export const registerWithEmail = createAsyncThunk(
  "REGISTER_WITH_EMAIL",
  async (data: IRegisterUser, { rejectWithValue }) => {
    try {
      const responseData = await client.post("account/register", data);

      // emaiil, password => secure store에 저장
      await saveCredentials(data.email, data.password);
      console.log("회원가입 시 서버 응답:", responseData);
      return responseData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginWithEmail = createAsyncThunk(
  "LOGIN_WITH_EMAIL",
  async (
    data: {
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const responseData = await client.post("account/login/email", data);
      // emaiil, password => secure store에 저장
      console.log("data", data);
      await saveCredentials(data.email, data.password);
      console.log("로그인 시 서버 응답: ", responseData);
      return responseData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
