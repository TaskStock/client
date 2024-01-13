import * as SecureStore from "expo-secure-store";
import { getAPIHost } from "../getAPIHost";

// 사용자의 로그인 정보를 안전하게 저장하는 함수
export const saveCredentials = async (email: string, password: string) => {
  try {
    await SecureStore.setItemAsync(
      "userCredentials",
      JSON.stringify({ email, password })
    );
  } catch (error) {
    console.error("Error saving credentials: ", error);
    throw error;
  }
};

// 저장된 로그인 정보를 가져오는 함수
export const getSavedCredentials = async () => {
  try {
    const credentialsString = await SecureStore.getItemAsync("userCredentials");
    return credentialsString ? JSON.parse(credentialsString) : null;
  } catch (error) {
    console.error("Error retrieving credentials", error);
    return null;
  }
};

// 로그인 함수
export const loginWithCredentials = async (email: string, password: string) => {
  // 서버에 로그인 요청을 보내고, 토큰을 반환 받는 로직
  // const response = await client.post("account/login/email", {
  //   email,
  //   password,
  // });

  // 종속성 문제를 위해 api.ts에서 분리
  try {
    const SERVER_URL = getAPIHost();
    const response = await fetch(`${SERVER_URL}account/login/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    console.log("=====이메일 자동로그인 성공=====");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("자동로그인 에러 ", error);
  }
};
