import { TouchableOpacity } from "react-native";
import React from "react";
import { IconsPic } from "./Icons";

const CheckBox = ({ src, onPress }: { src: any; onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <IconsPic source={src} size={30} />
    </TouchableOpacity>
  );
};

export default CheckBox;
