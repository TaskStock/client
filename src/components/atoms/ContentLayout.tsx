import { View, Text } from "react-native";
import React from "react";
import { spacing } from "../../constants/spacing";

export default function ContentLayout({
  children,
  noFlex = false,
}: {
  children: React.ReactNode;
  noFlex?: boolean;
}) {
  return (
    <View
      style={{
        paddingHorizontal: spacing.gutter,
        paddingVertical: spacing.offset,
        flex: noFlex ? 0 : 1,
      }}
    >
      {children}
    </View>
  );
}
