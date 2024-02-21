import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { EventProvider } from "react-native-outside-press";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { ThemeProvider } from "styled-components/native";
import { toastConfig } from "./src/config/toast";
import { darkTheme, grayTheme } from "./src/constants/colors";
import { customFontsToLoad } from "./src/constants/typography";
import Root from "./src/navigators/Root";
import RNSplashScreen from "./src/screens/Login/SplashScreen";
import { useAppDispatch, useAppSelect } from "./src/store/configureStore.hooks";
import { checkTokenExistence } from "./src/store/modules/auth";
import { startingTheme } from "./src/store/modules/theme";
import { checkAndRenewTokens } from "./src/utils/authUtils/tokenUtils";
import SplashScreen from "react-native-splash-screen";
import { removeData } from "./src/utils/asyncStorage";
import { Host } from "react-native-portalize";
import analytics from "@react-native-firebase/analytics";

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

export const navigationRef = createNavigationContainerRef();

export default function App() {
  const theme = useAppSelect((state) => state.theme.value);
  const dispatch = useAppDispatch();

  const routeNameRef = React.useRef<string | undefined>();

  const { isLoggedIn } = useAppSelect((state) => state.auth);

  useEffect(() => {
    // asyncstorage에서 엑세스토큰, 만료일, refresh만료일을 가져와서
    dispatch(checkTokenExistence());
    dispatch(startingTheme());
    if (isLoggedIn) {
      dispatch(checkAndRenewTokens());
    }

    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, [isLoggedIn]);

  // useEffect(() => {
  //   removeData("firstTime");
  //   removeData("projectFirstTime");
  //   removeData("marketFirstTime");
  // }, []);
  // useEffect(() => {
  //   removeData("accessToken");
  //   removeData("refreshToken");
  //   removeData("accessExp");
  //   removeData("refreshExp");
  //   removeData("deviceId");
  //   removeData("strategy");
  // }, []);

  const [fontsLoaded] = Font.useFonts(customFontsToLoad);

  if (!fontsLoaded) return <RNSplashScreen />;

  return (
    <ThemeProvider theme={THEME[theme].theme}>
      <SafeAreaProvider>
        <EventProvider>
          <Host>
            <NavigationContainer
              ref={navigationRef}
              onReady={() => {
                routeNameRef.current = navigationRef.getCurrentRoute()?.name;
              }}
              onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRoute = navigationRef.getCurrentRoute();
                const currentRouteName = currentRoute?.name;

                const currentScreenName = `${
                  currentRoute?.name
                }_${Object.values(currentRoute?.params || {}).join("/")}`;

                const trackScreenView = (routeName: string | undefined) => {
                  if (routeName) {
                    analytics().logScreenView({
                      screen_name: routeName,
                      screen_class: routeName,
                    });
                    console.log("Analytics", currentScreenName);
                  }
                  // Your implementation of analytics goes here!
                };

                if (previousRouteName !== currentRouteName) {
                  routeNameRef.current = currentRouteName;

                  // Replace the line below to add the tracker from a mobile analytics SDK
                  await trackScreenView(currentRouteName);
                }
              }}
            >
              <GestureHandlerRootView style={{ flex: 1 }}>
                <Root isLoggedIn={isLoggedIn} />
              </GestureHandlerRootView>
            </NavigationContainer>
            <Toast config={toastConfig}></Toast>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle={THEME[theme].barStyle}
            />
          </Host>
        </EventProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
