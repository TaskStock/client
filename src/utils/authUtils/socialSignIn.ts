import { GOOGLE_AUTH_IOS_CLIENT_ID } from "@env";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

console.log("GOOGLE_AUTH_IOS_CLIENT_ID: ", GOOGLE_AUTH_IOS_CLIENT_ID);

GoogleSignin.configure({
  // webClientId: '', // idToken을 얻기 위해 필요한 값임
  iosClientId: GOOGLE_AUTH_IOS_CLIENT_ID,
});

export async function onGoogleButtonPress() {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const user = userInfo.user; // Google로부터 받은 유저 정보
    console.log("google: ", user);
    // {
    //   email: "",
    //   familyName: null,
    //   givenName: "",
    //   id: "",
    //   name: "",
    //   photo: "",
    // }

    // 서버로 토큰 전송
    //   sendTokenToServer(token);
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // 사용자가 로그인을 취소함
      console.log("로그인 취소");
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // 이미 로그인이 진행중임
      console.log("이미 로그인 중");
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // Play Service가 사용 불가능함
      console.log("Play Service 사용 불가");
    } else {
      // 기타 에러
      console.log("기타 에러");
    }
  }
}

export async function onKakaoButtonPress() {}
