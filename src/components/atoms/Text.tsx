import React from "react";
import { TextStyle } from "react-native";
import styled from "styled-components/native";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";

export type SizeStyles = "xl" | "lg" | "md" | "sm" | "xs" | "xxs";
export type WeightStyles =
  | "light"
  | "regular"
  | "medium"
  | "bold"
  | "semibold"
  | "extraBold";

const $sizeStyles = {
  xl: { fontSize: useResponsiveFontSize(24) },
  lg: { fontSize: useResponsiveFontSize(20) },
  md: { fontSize: useResponsiveFontSize(18) },
  sm: { fontSize: useResponsiveFontSize(16) },
  xs: { fontSize: useResponsiveFontSize(12) },
  xxs: { fontSize: useResponsiveFontSize(10) },
};

const $weightStyles = {
  light: { fontFamily: "light" },
  regular: { fontFamily: "regular" },
  medium: { fontFamily: "medium" },
  bold: { fontFamily: "bold" },
  semibold: { fontFamily: "semibold" },
  extraBold: { fontFamily: "extraBold" },
};

const TextStyling = styled.Text<{
  size: SizeStyles;
  weight: WeightStyles;
  color: string;
}>`
  font-size: ${({ size }) => $sizeStyles[size].fontSize}px;
  font-family: ${({ weight }) => $weightStyles[weight].fontFamily};
  color: ${(props) =>
    props.color === "default" ? props.theme.text : props.color};
  font-weight: 400;
`;

interface TextProps {
  children: string | string[] | number | React.ReactNode;
  size: SizeStyles;
  weight?: WeightStyles;
  color?: string;
  styles?: TextStyle;
}

const Text: React.FC<TextProps> = ({
  children,
  size = "md",
  weight = "regular",
  color = "default",
  styles,
}) => {
  return (
    <TextStyling size={size} weight={weight} color={color} style={styles}>
      {children}
    </TextStyling>
  );
};

export default Text;
