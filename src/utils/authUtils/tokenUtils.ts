import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../services/api";
import { getData } from "../asyncStorage";
import { getSavedCredentials, loginWithCredentials } from "./autoSignIn";
import { RootState } from "../../store/configureStore";

// 토큰 갱신을 위한 서버 요청 함수
const requestNewTokens = async (tokenType: string, refreshToken: string) => {
  // refreshToken을 사용하여 새 토큰을 요청
  try {
    const response = await client.post("account/refresh", {
      tokenType,
      refreshToken,
    });
    return response;
  } catch (error) {
    throw new Error("get new accessToken failed");
  }
};

// 토큰 확인 및 갱신을 위한 createAsyncThunk
export const checkAndRenewTokens = createAsyncThunk(
  "auth/checkAndRenewTokens",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;

    //accessToken => Redux store에서 가져옴, 만료 15분 전 갱신
    const {
      auth: { accessToken, accessExp, refreshExp },
    } = state;
    const fifteenMinInSec = 15 * 60;

    // refreshToken => asyncStorage에서 가져옴, 만료 7일 전 갱신
    const refreshToken = await getData("refreshToken");
    const sevenDaysInSec = 7 * 24 * 60 * 60;

    // UTC 기준 Unix timestamp (seconds)
    const currentTime = Math.floor(Date.now() / 1000);

    // CASE1 : accessToken 만료, refreshToken 유효
    if (
      accessToken &&
      refreshToken &&
      currentTime > accessExp - fifteenMinInSec &&
      currentTime < refreshExp
    ) {
      // 새 accessToken 요청
      return requestNewTokens("accessToken", refreshToken);
    }

    // CASE 2: accessToken, refreshToken 둘 다 만료
    if (accessToken && refreshToken && currentTime > refreshExp) {
      const savedCredentials = await getSavedCredentials();
      if (savedCredentials) {
        const { email, password } = savedCredentials;
        // 자동로그인으로 accessToken, refreshToken 재발급
        return loginWithCredentials(email, password);
      } else {
        return rejectWithValue("No saved credentials");
      }
    }

    // CASE 3: refreshToken 만료 7일 전 재발급
    if (refreshToken && refreshExp - currentTime < sevenDaysInSec) {
      // 새 refreshToken 요청
      return requestNewTokens("refreshToken", refreshToken);
    }
  }
);
