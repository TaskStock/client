import React from "react";
import { Image } from "react-native";

const DotGap = () => {
  return (
    <Image
      source={require("../../../../assets/images/badges/badge-dotGap.png")}
      style={{
        width: 10,
        height: 40,
        resizeMode: "contain",
      }}
    />
  );
};

export default DotGap;
