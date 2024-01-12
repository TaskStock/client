import React from "react";
import { Platform } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import Divider from "../../components/molecules/Login/Divider";
import GoogleBtn from "../../components/molecules/Login/GoogleBtn";
import LoginContainer from "../../components/molecules/Login/LoginContainer";
import Policy from "../../components/molecules/Login/Policy";
import SocialBtn from "../../components/molecules/Login/SocialBtn";
import { spacing } from "../../constants/spacing";
import { useAppSelect } from "../../store/configureStore.hooks";
import { checkStorage } from "../../utils/asyncStorage";

const Login = styled.View`
  gap: ${spacing.padding}px;
  width: 100%;
`;
const WelcomeScreen = ({ navigation }) => {
  // 임시 설정
  // 서비스 약관 누르면 asyncStorage에 저장된 토큰 확인
  // 개인정보 보호정책 누르면 메인 화면으로 이동

  // 최근 로그인한 기록
  const strategy = useAppSelect((state) => state.auth.strategy);

  const handleGoogleLogin = async () => {};
  const theme = useTheme();

  return (
    <LoginContainer background={theme.box}>
      <Login>
        <Divider />
        <GoogleBtn
          onPress={handleGoogleLogin}
          recentlyLoggiedIn={strategy === "google"}
        />
        <SocialBtn
          type="kakao"
          onPress={() => {}}
          recentlyLoggiedIn={strategy === "kakao"}
        />
        {Platform.OS === "ios" && (
          <SocialBtn
            type="apple"
            onPress={() => {}}
            recentlyLoggiedIn={strategy === "apple"}
          />
        )}

        <SocialBtn
          type="email"
          onPress={() => {
            navigation.navigate("EmailLogin");
          }}
          recentlyLoggiedIn={strategy === "local"}
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
