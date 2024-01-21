import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRegisterUser } from "../../screens/Login/EmailRegisterScreen";
import { client } from "../../services/api";
import { saveCredentials } from "./autoSignIn";
import { RootState } from "../../store/configureStore";
import getDeviceId from "../getDeviceId";

// 회원가입, 로그인
// accessToken => asyncStorage, redux에 저장
// refreshToken => asyncStorage에 저장
// accessExp, refreshExp => asyncStorage, redux에 저장
// deviceId => asyncStorage, redux에 저장
// email, password => keyChain에 저장
export const registerWithEmail = createAsyncThunk(
  "auth/registerWithEmail",
  async (data: IRegisterUser, { rejectWithValue }) => {
    try {
      const deviceId = await getDeviceId();
      console.log("registerWithEmail deviceId: ", deviceId);
      const responseData = await client.post("account/register", {
        ...data,
        device_id: deviceId,
      });

      // email, password => secure store에 저장
      // await saveCredentials(data.email, data.password);

      const result = {
        ...responseData,
        deviceId,
      };

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginWithEmail = createAsyncThunk(
  "auth/loginWithEmail",
  async (
    data: {
      email: string;
      password: string;
    },

    { rejectWithValue }
  ) => {
    try {
      const deviceId = await getDeviceId();
      console.log("loginWithEmail deviceId: ", deviceId);
      const responseData = await client.post("account/login/email", {
        ...data,
        device_id: deviceId,
      });
      // email, password => secure store에 저장

      console.log("로그인 시 서버 응답: ", responseData);

      // if (responseData.result === "success") {
      //   await saveCredentials(data.email, data.password);
      // }

      const result = {
        ...responseData,
        deviceId,
      };
      return result;
    } catch (error) {
      const result = {
        result: "fail",
      };
      console.log("로그인 실패: ");
      return rejectWithValue(result);
    }
  }
);

// 로그아웃
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { accessToken, deviceId } = state.auth;
      const accessToSend = accessToken.replace(/^"|"$/g, "");

      const data = await client.delete(
        "account/logout",
        {
          device_id: deviceId,
        },
        {
          accessToken: accessToSend,
        }
      );

      if (data.result !== "success") {
        throw new Error(data.message || "로그아웃 실패");
      }
      return data;
    } catch (error) {
      // console.error("로그아웃 처리 중 오류:", error);
      return rejectWithValue(error.message);
    }
  }
);
