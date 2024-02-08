import React from "react";
import { Image, TouchableWithoutFeedback } from "react-native";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";

const CheckBox = ({ src, onPress }: { src: any; onPress?: () => void }) => {
  return (
    <TouchableWithoutFeedback
      onPress={onPress ? onPress : undefined}
      disabled={!onPress}
    >
      <Image
        source={src}
        style={{
          width: useResponsiveFontSize(30),
          height: useResponsiveFontSize(30),
          resizeMode: "contain",
        }}
      />
    </TouchableWithoutFeedback>
  );
};

export default CheckBox;
