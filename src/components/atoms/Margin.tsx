import React from "react";
import { View } from "react-native";

const Margin = ({ margin }: { margin: number }) => {
  return <View style={{ height: margin }} />;
};

export default Margin;
