import React from "react";
import styled from "styled-components/native";
import { Image } from "react-native";
import { spacing } from "../../../constants/spacing";
import { useAppSelect } from "../../../store/configureStore.hooks";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";

const THEME_SOURCES = {
  dark: {
    logo: require("../../../../assets/images/logo-dark.png"),
  },
  gray: {
    logo: require("../../../../assets/images/logo-light.png"),
  },
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
const Logo = styled.View`
  padding: ${useResponsiveFontSize(95)}px 0 ${useResponsiveFontSize(60)}px;
`;
const Children = styled.View`
  flex: 1;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding: ${spacing.gutter}px;
`;
const LoginContainer = ({ children }) => {
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
      </Logo>
      <Children>{children}</Children>
    </Container>
  );
};

export default LoginContainer;
