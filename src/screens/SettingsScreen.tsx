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
  const handleLogout = () => {};
  return (
    <View>
      <BlackBtn text="DarkMode" onPress={switchToDarkMode} />
      <BlackBtn text="GrayMode" onPress={switchToGrayMode} />
      <BlackBtn text="로그아웃" onPress={handleLogout} />
    </View>
  );
};

export default SettingsScreen;
