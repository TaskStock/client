// import { GOOGLE_AUTH_IOS_CLIENT_ID } from "@env";
import { GOOGLE_AUTH_IOS_CLIENT_ID } from "@env";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  // webClientId: '', // idToken을 얻기 위해 필요한 값임
  iosClientId: GOOGLE_AUTH_IOS_CLIENT_ID,
});

export async function onGoogleButtonPress() {
  console.log("===== 구글clientID", GOOGLE_AUTH_IOS_CLIENT_ID);
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const user = userInfo.user; // Google로부터 받은 유저 정보
    console.log("google: ", user);

    const googleUser = {
      email: user.email,
      userName: user.name,
      userPicture: user.photo,
      isAgree: 1,
      strategy: "google",
    };
    console.log("googleUser: ", googleUser);

    return googleUser;
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
