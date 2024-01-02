import React from "react";
import styled from "styled-components/native";
import { Image } from "react-native";
import { spacing } from "../../../constants/spacing";
import { useAppSelect } from "../../../store/configureStore.hooks";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import Text from "../../atoms/Text";
import { darkTheme, grayTheme } from "../../../constants/colors";

const THEME_SOURCES = {
  dark: {
    logo: require("../../../../assets/images/logo-dark.png"),
    text: darkTheme.text,
  },
  gray: {
    logo: require("../../../../assets/images/logo-light.png"),
    text: grayTheme.text,
  },
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
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
}: {
  children: React.ReactNode;
  comment?: string;
}) => {
  const theme = useAppSelect((state) => state.theme.value);
  return (
    <Container>
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
          color={comment !== "none" ? THEME_SOURCES[theme].text : "transparent"}
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
