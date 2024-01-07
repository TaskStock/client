import React from "react";
import styled from "styled-components/native";
import Divider from "../../components/molecules/Login/Divider";
import GoogleBtn from "../../components/molecules/Login/GoogleBtn";
import LoginContainer from "../../components/molecules/Login/LoginContainer";
import Policy from "../../components/molecules/Login/Policy";
import SocialBtn from "../../components/molecules/Login/SocialBtn";
import { spacing } from "../../constants/spacing";
import { checkStorage } from "../../utils/asyncStorage";
import { client } from "../../services/api";
import { getAPIHost } from "../../utils/getAPIHost";

const Login = styled.View`
  gap: ${spacing.padding}px;
  width: 100%;
`;
const WelcomeScreen = ({ navigation }) => {
  // 임시 설정
  // 서비스 약관 누르면 asyncStorage에 저장된 토큰 확인
  // 개인정보 보호정책 누르면 메인 화면으로 이동

  const handleGoogleLogin = async () => {
    try {
      const SERVER_URL = getAPIHost();
      const endpoint = "account/login/google";
      const response = await fetch(`${SERVER_URL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("서버로부터의 응답이 올바르지 않습니다.");
      }

      const responseData = await response.json();
      console.log("google client: ", responseData);
    } catch (error) {
      console.error("Google 로그인 중 오류 발생: ", error);
    }
  };

  return (
    <LoginContainer>
      <Login>
        <Divider />
        <GoogleBtn onPress={handleGoogleLogin} />
        <SocialBtn type="kakao" onPress={() => {}} />
        <SocialBtn type="apple" onPress={() => {}} />
        <SocialBtn
          type="email"
          onPress={() => {
            navigation.navigate("EmailLogin");
          }}
        />
      </Login>

      <Policy
        serviceOnPress={checkStorage}
        privacyOnPress={() => {
          navigation.navigate("MainTab", { screen: "Home" });
        }}
      />
    </LoginContainer>
  );
};

export default WelcomeScreen;
