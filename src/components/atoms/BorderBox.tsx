import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "styled-components/native";

export default function BorderBox({ children }) {
  const theme = useTheme();

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: theme.textInputBorder,
        paddingHorizontal: 1,
        paddingVertical: 6,
      }}
    >
      {children}
    </View>
  );
}
