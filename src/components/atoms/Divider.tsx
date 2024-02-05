import { View, Text } from "react-native";
import React from "react";

export default function Divider({
  marginVertical = 10,
  color = "black",
  strokeWidth = 1,
}: {
  marginVertical?: number;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: color,
        height: strokeWidth,
        marginVertical: marginVertical,
      }}
    ></View>
  );
}
