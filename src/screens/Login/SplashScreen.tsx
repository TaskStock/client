import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import LoadingSpinner from "../../components/atoms/LoadingSpinner";
import { useAppSelect } from "../../store/configureStore.hooks";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";

const THEME_SOURCES = {
  dark: {
    logo: require("../../../assets/images/logo-dark.png"),
  },
  gray: {
    logo: require("../../../assets/images/logo-light.png"),
  },
};

const Container = styled.View`
  background-color: ${(props) => props.theme.background};
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: ${useResponsiveFontSize(60)}px;
`;
const SplashScreen = () => {
  const theme = useAppSelect((state) => state.theme.value);

  return (
    <Container>
      <Image
        source={THEME_SOURCES[theme]?.logo}
        style={{
          width: useResponsiveFontSize(148),
          height: useResponsiveFontSize(20),
          resizeMode: "contain",
        }}
      />
      <LoadingSpinner size="lg" />
    </Container>
  );
};

export default SplashScreen;
