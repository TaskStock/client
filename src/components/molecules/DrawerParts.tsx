import { View, Text } from "react-native";
import React from "react";
import { spacing } from "../../constants/spacing";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";

export function DrawerContent({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        // paddingHorizontal: spacing.gutter,
        paddingTop: useResponsiveFontSize(15),
      }}
    >
      {children}
    </View>
  );
}

export function DrawerHeader({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        paddingHorizontal: spacing.gutter,
        paddingTop: spacing.padding + spacing.small,
      }}
    >
      {children}
    </View>
  );
}
