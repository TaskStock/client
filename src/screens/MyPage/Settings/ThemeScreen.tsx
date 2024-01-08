import React from "react";
import { View } from "react-native";
import { BlackBtn } from "../../../components/atoms/Buttons";
import { useAppDispatch } from "../../../store/configureStore.hooks";
import { pickTheme } from "../../../store/modules/theme";

const ThemeScreen = () => {
  const dispatch = useAppDispatch();
  const switchToDarkMode = () => {
    dispatch(pickTheme("dark"));
  };
  const switchToGrayMode = () => {
    dispatch(pickTheme("gray"));
  };
  return (
    <View>
      <BlackBtn text="DarkMode" onPress={switchToDarkMode} />
      <BlackBtn text="GrayMode" onPress={switchToGrayMode} />
    </View>
  );
};

export default ThemeScreen;
