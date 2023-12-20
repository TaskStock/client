import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const useResponsiveFontSize = (fontSize: number) => {
  return Math.round((fontSize * windowWidth) / 430);
};

export default useResponsiveFontSize;
