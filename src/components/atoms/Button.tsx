import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import { darkTheme, grayTheme } from "../../constants/colors";
import Text from "./Text";
import { RootState } from "../../store/configureStore";

const THEME_CONSTANTS = {
  dark: {
    box: darkTheme.box,
  },
  gray: {
    box: grayTheme.box,
  },
};

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
  const theme = useSelector((state: RootState) => state.theme.value);

  return (
    <Container
      onPress={!disabled && onPress}
      style={styles}
      disabled={disabled}
    >
      <Text color={disabled ? THEME_CONSTANTS[theme]?.box : color} size="md">
        {text}
      </Text>
    </Container>
  );
};

export default Button;
