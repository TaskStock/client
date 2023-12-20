import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";
import { darkMode } from "../../atom/theme";
import { darkTheme, grayTheme } from "../../constants/colors";
import Text from "./Text";

const Container = styled.TouchableOpacity`
  /* flex: 1; */
  background-color: ${(props) => props.theme.mainBtnGray};
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
  color,
  disabled = false,
  onPress,
  styles,
}: ButtonProps) => {
  const isDark = useRecoilValue(darkMode);
  return (
    <Container
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
