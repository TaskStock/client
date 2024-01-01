import React from "react";
import styled from "styled-components/native";
import { darkTheme, grayTheme } from "../../constants/colors";
import { useAppSelect } from "../../store/configureStore.hooks";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import Text from "./Text";

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
  padding: ${useResponsiveFontSize(14)}px 0;
  border-radius: ${useResponsiveFontSize(8)}px;
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
  const theme = useAppSelect((state) => state.theme.value);

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
