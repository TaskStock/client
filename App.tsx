import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, grayTheme } from "./src/constants/colors";
import { customFontsToLoad } from "./src/constants/typography";
import Root from "./src/navigators/Root";
import SplashScreen from "./src/screens/Login/SplashScreen";
import { useAppDispatch, useAppSelect } from "./src/store/configureStore.hooks";
import { checkTokenExistence } from "./src/store/modules/auth";
import { checkAndRenewTokens } from "./src/utils/authUtils/tokenUtils";

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
  const theme = useAppSelect((state) => state.theme.value);
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelect((state) => state.auth.isLoggedIn);
  const tokenLoading = useAppSelect((state) => state.auth.loading);

  useEffect(() => {
    dispatch(checkTokenExistence());
    dispatch(checkAndRenewTokens());
  }, [dispatch]);

  // const [assets] = useAssets([require("./assets/splash.png")]);
  const [fontsLoaded] = Font.useFonts(customFontsToLoad);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 1000);
  }, []);

  if (!isReady || !fontsLoaded || tokenLoading) return <SplashScreen />;

  return (
    <ThemeProvider theme={THEME[theme].theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Root isLoggedIn={isLoggedIn} />
        </NavigationContainer>
        <StatusBar barStyle={THEME[theme].barStyle} />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
