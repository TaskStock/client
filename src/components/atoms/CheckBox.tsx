import React from "react";
import { IconsPic } from "./Icons";

const CheckBox = ({ src, onPress }: { src: any; onPress: () => void }) => {
  return <IconsPic source={src} size={30} onPress={onPress} />;
};

export default CheckBox;
