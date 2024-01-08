import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import LoadingSpinner from "../../components/atoms/LoadingSpinner";
import { useAppSelect } from "../../store/configureStore.hooks";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";

const Container = styled.View`
  background-color: black;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: ${useResponsiveFontSize(60)}px;
`;
const SplashScreen = () => {
  return (
    <Container>
      <Image
        source={require("../../../assets/images/logo-dark.png")}
        style={{
          width: useResponsiveFontSize(148),
          height: useResponsiveFontSize(20),
          resizeMode: "contain",
        }}
      />
      <LoadingSpinner size="lg" background="white" />
    </Container>
  );
};

export default SplashScreen;
