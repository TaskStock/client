import { View } from "react-native";
import React from "react";
import styled from "styled-components/native";
import Text from "./Text";
import { useRecoilValue } from "recoil";
import { darkTheme, grayTheme } from "../../constants/colors";
import { darkMode } from "../../atom/theme";

const Container = styled.TouchableOpacity`
  /* flex: 1; */
  background-color: ${(props) =>
    props.type === "main" ? props.theme.mainBtnGray : props.theme.subBtnGray};
  padding: 14px 0;
  border-radius: 8px;
  align-items: center;
  opacity: ${(props) => (props.disabled ? 0.8 : 1)};
`;

interface ButtonProps {
  text: string;
  type?: "main" | "sub";
  color?: string;
  disabled?: boolean;
  onPress: () => void;
  styles?: any;
}

const Button = ({
  text,
  type = "main",
  color,
  disabled = false,
  onPress,
  styles,
}: ButtonProps) => {
  const isDark = useRecoilValue(darkMode);
  return (
    <Container
      type={type}
      onPress={!disabled && onPress}
      style={styles}
      disabled={disabled}
    >
      <Text
        color={disabled ? (isDark ? darkTheme.box : grayTheme.box) : color}
        size="md"
      >
        {text}
      </Text>
    </Container>
  );
};

export default Button;
