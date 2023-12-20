import { NavigationContainer } from "@react-navigation/native";
import { useAssets } from "expo-asset";
import * as Font from "expo-font";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRecoilState } from "recoil";
import { ThemeProvider } from "styled-components";
import { darkMode } from "./src/atom/theme";
import Loader from "./src/components/atoms/Loader";
import { darkTheme, grayTheme } from "./src/constants/colors";
import { customFontsToLoad } from "./src/constants/typography";
import Root from "./src/navigators/Root";
import { StatusBar } from "react-native";

export default function App() {
  const [darkmode, setDarkmode] = useRecoilState(darkMode);

  const [assets] = useAssets([require("./assets/splash.png")]);
  const [fontsLoaded] = Font.useFonts(customFontsToLoad);
  if (!assets || !fontsLoaded) return <Loader />;
  // console.log(assets);
  // console.log(fontsLoaded);

  return (
    <ThemeProvider theme={darkmode ? darkTheme : grayTheme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
        <StatusBar barStyle={darkmode ? "light-content" : "dark-content"} />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
