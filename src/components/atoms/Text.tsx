import { View, TextStyle } from "react-native";
import React from "react";
import styled from "styled-components/native";

export type SizeStyles = "xl" | "lg" | "md" | "sm" | "xs";
export type WeightStyles =
  | "light"
  | "regular"
  | "medium"
  | "bold"
  | "extraBold";

const $sizeStyles = {
  xl: { fontSize: 24 },
  lg: { fontSize: 20 },
  md: { fontSize: 18 },
  sm: { fontSize: 16 },
  xs: { fontSize: 12 },
};

const $weightStyles = {
  light: { fontFamily: "light" },
  regular: { fontFamily: "regular" },
  medium: { fontFamily: "medium" },
  bold: { fontFamily: "bold" },
  extraBold: { fontFamily: "extraBold" },
};

const TextStyling = styled.Text<{ size: SizeStyles; weight: WeightStyles }>`
  font-size: ${({ size }) => $sizeStyles[size].fontSize}px;
  font-family: ${({ weight }) => $weightStyles[weight].fontFamily};
  color: ${(props) => props.color};
  font-weight: 400;
`;

interface TextProps {
  children: string | string[] | number;
  size: SizeStyles;
  weight?: WeightStyles;
  color?: string;
  styles?: TextStyle;
}

const Text: React.FC<TextProps> = ({
  children,
  size,
  weight = "regular",
  color = "black",
  styles,
}) => {
  return (
    <TextStyling size={size} weight={weight} color={color} style={styles}>
      {children}
    </TextStyling>
  );
};

export default Text;
