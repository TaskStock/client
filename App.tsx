import { NavigationContainer } from "@react-navigation/native";
import { useAssets } from "expo-asset";
import * as Font from "expo-font";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
// import { ThemeProvider } from "styled-components";
import { ThemeProvider, DefaultTheme } from "styled-components/native";
import Loader from "./src/components/atoms/Loader";
import { darkTheme, grayTheme } from "./src/constants/colors";
import { customFontsToLoad } from "./src/constants/typography";
import Root from "./src/navigators/Root";
import { RootState } from "./src/store/configureStore";

const THEME = {
  dark: {
    theme: darkTheme,
    barStyle: "light-content",
  },
  gray: {
    theme: grayTheme,
    barStyle: "dark-content",
  },
};

export default function App() {
  const theme = useSelector((state: RootState) => state.theme.value);

  const [assets] = useAssets([require("./assets/splash.png")]);
  const [fontsLoaded] = Font.useFonts(customFontsToLoad);
  if (!assets || !fontsLoaded) return <Loader />;
  // console.log(assets);
  // console.log(fontsLoaded);

  return (
    <ThemeProvider theme={THEME[theme].theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
        <StatusBar barStyle={THEME[theme].barStyle} />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
