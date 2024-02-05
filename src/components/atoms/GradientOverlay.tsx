import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { spacing } from "../../constants/spacing";
import { useAppSelect } from "../../store/configureStore.hooks";

export default function GradientOverlay() {
  const theme = useAppSelect((state) => state.theme);

  const gradient =
    theme.value === "dark"
      ? [
          "rgba(255, 255, 255, 0.00)",
          "rgba(255, 255, 255, 0.09)",
          "rgba(255, 255, 255, 0.20)",
        ]
      : ["rgba(255, 255, 255, 0.00)", "rgba(255, 255, 255, 0.47)", "#FFFFFF"];

  return (
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
  );
}
