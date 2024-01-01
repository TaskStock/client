import React from "react";
import styled from "styled-components/native";
import Text from "../../components/atoms/Text";
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
const ButtonStyle = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.subBtnGray};
  padding: ${useResponsiveFontSize(14)}px;
`;
const Button = ({ text, onPress }) => {
  return (
    <ButtonStyle onPress={onPress}>
      <Text size="md">{text}</Text>
    </ButtonStyle>
  );
};

const WelcomeScreen = ({ navigation }) => {
  const theme = useAppSelect((state) => state.theme.value);
  return (
    <Container>
      <Button text={"카카오로 계속하기"} onPress={() => {}} />
      <Button text={"구글로 계속하기"} onPress={() => {}} />
      <Button text={"애플로 계속하기"} onPress={() => {}} />
      <Button
        text={"이메일로 계속하기"}
        onPress={() => {
          navigation.navigate("EmailLogin");
        }}
      />
      <Button
        onPress={() => navigation.navigate("MainTab", { screen: "Home" })}
        text={"Login"}
      />
    </Container>
  );
};

export default WelcomeScreen;
