import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/configureStore";
import { useAppDispatch } from "../../store/configureStore.hooks";
import { getData } from "../asyncStorage";
import { getAPIHost } from "../getAPIHost";
import getDeviceId from "../getDeviceId";
import { logout } from "./signInUtils";

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
    const SERVER_URL = getAPIHost();
    const deviceId = await getDeviceId();
    const response = await fetch(`${SERVER_URL}account/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken, device_id: deviceId }),
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

    console.log("=====checkAndRenewTokens=====");

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

    // CASE1 : accessToken, refreshToken 둘다 유효한 경우
    if (
      accessToken &&
      refreshToken &&
      currentTime < accessExp - fifteenMinInSec &&
      currentTime < refreshExp - sevenDaysInSec
    ) {
      console.log("=====토큰들 유효함=====");
      return;
    }

    // CASE2 : accessToken 만료, refreshToken 유효
    if (
      accessToken &&
      refreshToken &&
      currentTime > accessExp - fifteenMinInSec &&
      currentTime < refreshExp
    ) {
      // 새 accessToken 요청
      console.log("=====accessToken 만료, refreshToken 유효=====");
      const newTokens = await requestNewTokens(accessToken, refreshToken);
      return newTokens;
    }

    // CASE 3: accessToken, refreshToken 둘 다 만료 => logout
    if (
      (accessToken && refreshToken && currentTime > refreshExp) ||
      refreshExp - currentTime < sevenDaysInSec
    ) {
      const dispatch = useAppDispatch();
      console.log("=====토큰들 만료됨=====");
      return dispatch(logout());
    }
  }
);
