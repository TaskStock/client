import { View, Text } from "react-native";
import React from "react";
import {
  useAppDispatch,
  useAppSelect,
} from "../../../store/configureStore.hooks";
import { themeSlice } from "../../../store/modules/theme";
import { BlackBtn } from "../../../components/atoms/Buttons";

const ThemeScreen = () => {
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

export default ThemeScreen;
