import { useEffect } from "react";
import { BackHandler } from "react-native";

const useCustomBackHandler = (backAction) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [backAction]);
};

export default useCustomBackHandler;
