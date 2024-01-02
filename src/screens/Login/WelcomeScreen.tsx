import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { BlackBtn } from "../../components/atoms/Buttons";
import FlexBox from "../../components/atoms/FlexBox";
import { IconsPic } from "../../components/atoms/Icons";
import Text from "../../components/atoms/Text";
import LoginContainer from "../../components/molecules/Login/LoginContainer";
import { darkTheme, grayTheme, palette } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { useAppSelect } from "../../store/configureStore.hooks";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";

const THEME_SOURCES = {
  dark: {
    text: darkTheme.text,
    subText: darkTheme.textDim,
  },
  gray: {
    text: grayTheme.text,
    subText: grayTheme.textDim,
  },
};

// 버튼
const ButtonStyle = styled.TouchableOpacity<{ color?: string }>`
  background-color: ${(props) => (props.color ? props.color : props.theme.box)};
  border: 1px solid
    ${(props) => (props.color ? "transparent" : props.theme.text)};
  padding: ${useResponsiveFontSize(14)}px;
  border-radius: ${useResponsiveFontSize(12)}px;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: ${useResponsiveFontSize(8)}px;
`;
const Button = ({
  onPress,
  children,
  color,
}: {
  onPress: () => void;
  children: React.ReactNode;
  color?: string;
}) => {
  return (
    <ButtonStyle onPress={onPress} color={color}>
      {children}
    </ButtonStyle>
  );
};

// 이용약관
const Policy = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: ${spacing.small}px;
`;

const Login = styled.View`
  gap: ${spacing.padding}px;
  width: 100%;
`;
const WelcomeScreen = ({ navigation }) => {
  const theme = useAppSelect((state) => state.theme.value);
  // 구분선
  const Line = () => (
    <View
      style={{
        height: 1,
        backgroundColor: THEME_SOURCES[theme].text,
        flex: 1,
      }}
    />
  );
  const Divider = () => (
    <FlexBox
      alignItems="center"
      gap={spacing.padding}
      styles={{ paddingBottom: spacing.offset }}
    >
      <Line />
      <Text size="sm">로그인/회원가입</Text>
      <Line />
    </FlexBox>
  );

  return (
    <LoginContainer>
      <Login>
        <Divider />
        <Button onPress={() => {}}>
          <Text size="md" weight="semibold">
            구글로 계속하기
          </Text>
        </Button>
        <Button onPress={() => {}} color={palette.kakao}>
          <IconsPic
            source={require("../../../assets/icons/kakao-black.png")}
            size={18}
          />
          <Text size="md" weight="semibold">
            카카오로 계속하기
          </Text>
        </Button>

        <Button onPress={() => {}} color={"black"}>
          <IconsPic
            source={require("../../../assets/icons/apple-white.png")}
            size={18}
          />
          <Text size="md" color={"white"} weight="semibold">
            애플로 계속하기
          </Text>
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("EmailLogin");
          }}
        >
          <Text size="md" weight="semibold">
            이메일로 계속하기
          </Text>
        </Button>
      </Login>
      <Policy>
        <FlexBox>
          <Text size="xs" color={THEME_SOURCES[theme].subText}>
            계속 진행하면 Taskstock의
          </Text>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderBottomWidth: 1,
              borderColor: THEME_SOURCES[theme].text,
            }}
          >
            <Text size="xs" color={THEME_SOURCES[theme].text}>
              {" "}
              서비스 약관{" "}
            </Text>
          </TouchableOpacity>
          <Text size="xs" color={THEME_SOURCES[theme].subText}>
            및{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MainTab", { screen: "Home" });
            }}
            style={{
              borderBottomWidth: 1,
              borderColor: THEME_SOURCES[theme].text,
            }}
          >
            <Text size="xs" color={THEME_SOURCES[theme].text}>
              개인정보 보호정책
            </Text>
          </TouchableOpacity>
          <Text size="xs" color={THEME_SOURCES[theme].subText}>
            에
          </Text>
        </FlexBox>
        <Text size="xs" color={THEME_SOURCES[theme].subText}>
          동의한 것으로 간주합니다.
        </Text>
      </Policy>
    </LoginContainer>
  );
};

export default WelcomeScreen;