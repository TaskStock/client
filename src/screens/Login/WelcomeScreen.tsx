import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import Button from "../../components/atoms/Button";
import Text from "../../components/atoms/Text";
import { RootState } from "../../store/configureStore";
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
const WelcomeScreen = ({ navigation }) => {
  const theme = useSelector((state: RootState) => state.theme.value);
  return (
    <Container>
      <Text size="lg"> Welcome to the app </Text>
      <Button
        onPress={() => navigation.navigate("MainTab", { screen: "Home" })}
        text={"Login"}
      />
    </Container>
  );
};

export default WelcomeScreen;
