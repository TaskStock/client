import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { spacing } from "../../../constants/spacing";

const Share = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: "100%", marginTop: spacing.offset }}
    >
      <Image
        source={require("../../../../assets/images/badges/badge-share.png")}
        style={{
          width: "100%",
          height: 50,
          resizeMode: "contain",
        }}
      />
    </TouchableOpacity>
  );
};

export default Share;
