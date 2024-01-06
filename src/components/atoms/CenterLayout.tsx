import { View, Text } from "react-native";
import React from "react";

export default function CenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </View>
  );
}
