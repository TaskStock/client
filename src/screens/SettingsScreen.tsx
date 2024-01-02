import React from "react";
import { View } from "react-native";
import { BlackBtn } from "../components/atoms/Buttons";
import { useAppDispatch, useAppSelect } from "../store/configureStore.hooks";
import { themeSlice } from "../store/modules/theme";

const SettingsScreen = () => {
  const theme = useAppSelect((state) => state.theme.value);

  const dispatch = useAppDispatch();
  const switchToDarkMode = () => {
    dispatch(themeSlice.actions.setTheme("dark"));
  };
  const switchToGrayMode = () => {
    dispatch(themeSlice.actions.setTheme("gray"));
  };
  return (
    <View>
      <BlackBtn text="DarkMode" onPress={switchToDarkMode} />
      <BlackBtn text="GrayMode" onPress={switchToGrayMode} />
    </View>
  );
};

export default SettingsScreen;
