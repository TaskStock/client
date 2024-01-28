import { View, Text } from "react-native";
import React from "react";
import styled, { useTheme } from "styled-components/native";
import { spacing } from "../../constants/spacing";
import { LinearGradient } from "expo-linear-gradient";

const Box = styled.View`
  width: 100%;
  flex: 1;
  border-radius: ${spacing.offset}px;
  margin-top: ${spacing.padding}px;
`;

export default function ItemContainerBox({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();

  const gradient =
    theme.name === "dark"
      ? [
          "rgba(255, 255, 255, 0.00)",
          "rgba(255, 255, 255, 0.09)",
          "rgba(255, 255, 255, 0.20)",
        ]
      : ["rgba(255, 255, 255, 0.00)", "rgba(255, 255, 255, 0.47)", "#FFFFFF"];

  return (
    <Box>
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: spacing.offset,
        }}
      ></LinearGradient>
      {children}
    </Box>
  );
}
