import React from "react";
import styled, { useTheme } from "styled-components/native";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import Text from "./Text";

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
  const theme = useTheme();

  return (
    <Container
      onPress={!disabled && onPress}
      style={styles}
      disabled={disabled}
    >
      <Text color={disabled ? theme.box : color} size="md">
        {text}
      </Text>
    </Container>
  );
};

export default Button;
