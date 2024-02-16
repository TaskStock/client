import { View, Text } from "react-native";
import React from "react";
import { spacing } from "../../constants/spacing";

export default function ContentLayout({
  children,
  noFlex = false,
  noVerticalPadding = false,
  noHorizontalPadding = false,
}: {
  children: React.ReactNode;
  noFlex?: boolean;
  noVerticalPadding?: boolean;
  noHorizontalPadding?: boolean;
}) {
  return (
    <View
      style={{
        paddingHorizontal: noHorizontalPadding ? 0 : spacing.gutter,
        paddingVertical: noVerticalPadding ? 0 : spacing.gutter,
        flex: noFlex ? 0 : 1,
      }}
    >
      {children}
    </View>
  );
}
