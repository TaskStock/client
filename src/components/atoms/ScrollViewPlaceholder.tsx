import { View, Text } from "react-native";
import React from "react";

export default function ScrollViewPlaceholder({
  bgColor,
}: {
  bgColor: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: bgColor,
      }}
    ></View>
  );
}
