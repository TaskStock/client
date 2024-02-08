import { View, Text } from "react-native";
import React from "react";
import { spacing } from "../../constants/spacing";

export default function ContentLayout({
  children,
  noFlex = false,
  noVerticalPadding = false,
}: {
  children: React.ReactNode;
  noFlex?: boolean;
  noVerticalPadding?: boolean;
}) {
  return (
    <View
      style={{
        paddingHorizontal: spacing.gutter,
        paddingVertical: noVerticalPadding ? 0 : spacing.gutter,
        flex: noFlex ? 0 : 1,
      }}
    >
      {children}
    </View>
  );
}
