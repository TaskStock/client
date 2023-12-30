import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, grayTheme } from "./src/constants/colors";
import { customFontsToLoad } from "./src/constants/typography";
import Root from "./src/navigators/Root";
import SplashScreen from "./src/screens/Login/SplashScreen";
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
  const [isReady, setIsReady] = useState(false);
  const theme = useSelector((state: RootState) => state.theme.value);
  // const [assets] = useAssets([require("./assets/splash.png")]);
  const [fontsLoaded] = Font.useFonts(customFontsToLoad);
  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 3000);
  }, []);

  if (!isReady || !fontsLoaded) return <SplashScreen />;

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
