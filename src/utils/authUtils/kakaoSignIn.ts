import { getProfile as getKakaoProfile } from "@react-native-seoul/kakao-login";

export async function onKakaoButtonPress() {
  try {
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
    console.log(e);
  }
}
