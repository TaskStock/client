import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { EventProvider } from "react-native-outside-press";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, grayTheme } from "./src/constants/colors";
import { customFontsToLoad } from "./src/constants/typography";
import Root from "./src/navigators/Root";
import SplashScreen from "./src/screens/Login/SplashScreen";
import { useAppDispatch, useAppSelect } from "./src/store/configureStore.hooks";
import { checkTokenExistence } from "./src/store/modules/auth";
import { startingTheme } from "./src/store/modules/theme";
import { checkAndRenewTokens } from "./src/utils/authUtils/tokenUtils";
import { removeData } from "./src/utils/asyncStorage";

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
  const theme = useAppSelect((state) => state.theme.value);
  const dispatch = useAppDispatch();

  const { isLoggedIn, loading: tokenLoading } = useAppSelect(
    (state) => state.auth
  );

  useEffect(() => {
    // asyncstorage에서 엑세스토큰, 만료일, refresh만료일을 가져와서
    dispatch(checkTokenExistence());
    dispatch(startingTheme());
    if (isLoggedIn) {
      dispatch(checkAndRenewTokens());
    }
  }, [dispatch, isLoggedIn]);

  // useEffect(() => {
  //   removeData("accessToken");
  //   removeData("refreshToken");
  //   removeData("accessExp");
  //   removeData("refreshExp");
  //   removeData("deviceId");
  //   removeData("strategy");
  // }, []);

  const [fontsLoaded] = Font.useFonts(customFontsToLoad);

  if (!fontsLoaded || tokenLoading) return <SplashScreen />;

  return (
    <ThemeProvider theme={THEME[theme].theme}>
      <SafeAreaProvider>
        <EventProvider>
          <NavigationContainer>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Root isLoggedIn={isLoggedIn} />
            </GestureHandlerRootView>
          </NavigationContainer>
          <StatusBar barStyle={THEME[theme].barStyle} />
        </EventProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
