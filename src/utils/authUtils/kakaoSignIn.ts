import {
  getProfile as getKakaoProfile,
  login,
} from "@react-native-seoul/kakao-login";

export async function onKakaoButtonPress() {
  console.log("kakao login button pressed");
  try {
    const token = await login();
    const user = await getKakaoProfile();

    const kakaoUser = {
      email: user.email,
      userName: user.nickname,
      userPicture: user.profileImageUrl,
      isAgree: 1,
      strategy: "kakao",
    };

    return kakaoUser;
  } catch (e) {
    console.log(e.message);
  }
}
