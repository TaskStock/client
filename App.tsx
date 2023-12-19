import React from "react";
import * as Font from "expo-font";
import { useAssets } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot, useRecoilState } from "recoil";
import Root from "./src/navigators/Root";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Loader from "./src/components/atoms/Loader";
import { customFontsToLoad } from "./src/constants/typography";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";
import { darkTheme, grayTheme } from "./src/constants/colors";
import { darkMode } from "./src/atom/theme";

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
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
