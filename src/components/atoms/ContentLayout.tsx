import { View, Text } from "react-native";
import React from "react";
import { spacing } from "../../constants/spacing";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View
      style={{
        paddingHorizontal: spacing.gutter,
        paddingVertical: spacing.offset,
      }}
    >
      {children}
    </View>
  );
}
