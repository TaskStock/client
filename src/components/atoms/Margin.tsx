import React from "react";
import { View } from "react-native";

const Margin = ({
  margin,
  direction = "vertical",
}: {
  margin: number;
  direction?: "vertical" | "horizontal";
}) => {
  if (direction === "vertical") {
    return <View style={{ height: margin }} />;
  } else if (direction === "horizontal") {
    return <View style={{ width: margin }} />;
  } else {
    return <View style={{ height: margin }} />;
  }
};

export default Margin;
