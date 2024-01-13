import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/configureStore";
import { getData } from "../asyncStorage";
import { getSavedCredentials, loginWithCredentials } from "./autoSignIn";

// 토큰 갱신을 위한 서버 요청 함수
const requestNewTokens = async (accessToken: string, refreshToken: string) => {
  // refreshToken을 사용하여 새 토큰을 요청

  try {
    // const response = await client.post(
    //   "account/refresh",
    //   { refreshToken },
    //   { accessToken }
    // );
    // console.log("=====새 토큰 요청 성공=====", response);
    // return response;

    // 종속성 문제를 위해 api.ts에서 분리
    const response = await fetch("account/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Token refresh failed");
    }

    const data = await response.json();
    console.log("=====새 토큰 요청 성공=====", data);
    return data;
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
    // 15분으로 다시 변경해야함
    const fifteenMinInSec = 15 * 60;

    // refreshToken => asyncStorage에서 가져옴, 만료 7일 전 갱신
    const refreshToken = await getData("refreshToken");
    const sevenDaysInSec = 7 * 24 * 60 * 60;

    // UTC 기준 Unix timestamp (seconds)
    const currentTime = Math.floor(Date.now() / 1000);

    // accessToken, refreshToken 둘다 유효한 경우
    if (
      accessToken &&
      refreshToken &&
      currentTime < accessExp - fifteenMinInSec &&
      currentTime < refreshExp - sevenDaysInSec
    ) {
      console.log("=====토큰들 유효함=====");
      return;
    }

    // CASE1 : accessToken 만료, refreshToken 유효
    if (
      accessToken &&
      refreshToken &&
      currentTime > accessExp - fifteenMinInSec &&
      currentTime < refreshExp
    ) {
      // 새 accessToken 요청
      console.log("=====accessToken 만료, refreshToken 유효=====");
      return requestNewTokens(accessToken, refreshToken);
    }

    // CASE 2: accessToken, refreshToken 둘 다 만료 || refreshToken 만료 7일 전 자동로그인으로 재발급
    if (
      (accessToken && refreshToken && currentTime > refreshExp) ||
      refreshExp - currentTime < sevenDaysInSec
    ) {
      const savedCredentials = await getSavedCredentials();
      if (savedCredentials) {
        const { email, password } = savedCredentials;
        // 자동로그인으로 accessToken, refreshToken 재발급
        console.log("=====자동로그인으로 토큰 재발급=====", email, password);
        return loginWithCredentials(email, password);
      } else {
        return rejectWithValue("No saved credentials");
      }
    }
  }
);
