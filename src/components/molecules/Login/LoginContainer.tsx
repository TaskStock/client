import React from "react";
import { Image, Keyboard } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import { useAppSelect } from "../../../store/configureStore.hooks";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import Text from "../../atoms/Text";

const THEME_SOURCES = {
  dark: {
    logo: require("../../../../assets/images/logo-dark.png"),
  },
  gray: {
    logo: require("../../../../assets/images/logo-light.png"),
  },
};

const Container = styled.Pressable<{ background?: string }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ background, theme }) =>
    background ? background : theme.loginBackground};
`;
const Logo = styled.View`
  padding: ${useResponsiveFontSize(95)}px ${spacing.gutter}px
    ${useResponsiveFontSize(20)}px;
  gap: ${useResponsiveFontSize(38)}px;
  align-items: center;
`;
const Children = styled.View`
  flex: 1;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding: ${spacing.gutter}px;
`;

const LoginContainer = ({
  children,
  comment = "none",
  background,
}: {
  children: React.ReactNode;
  comment?: string;
  background?: string;
}) => {
  const theme = useAppSelect((state) => state.theme.value);

  const styledTheme = useTheme();

  return (
    <Container
      background={background}
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <Logo>
        <Image
          source={THEME_SOURCES[theme]?.logo}
          style={{
            width: useResponsiveFontSize(148),
            height: useResponsiveFontSize(20),
            resizeMode: "contain",
          }}
        />
        <Text
          size="sm"
          color={comment !== "none" ? styledTheme.text : "transparent"}
          styles={{
            textAlign: "center",
            lineHeight: spacing.lineHeight,
          }}
        >
          {comment}
        </Text>
      </Logo>
      <Children>{children}</Children>
    </Container>
  );
};

export default LoginContainer;
