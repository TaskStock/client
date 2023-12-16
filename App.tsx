import React from "react";
import * as Font from "expo-font";
import { useAssets } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./src/navigators/Root";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Loader from "./src/components/atoms/Loader";
import { customFontsToLoad } from "./src/constants/typography";

export default function App() {
  const [assets] = useAssets([require("./assets/splash.png")]);
  const [fontsLoaded] = Font.useFonts(customFontsToLoad);
  if (!assets || !fontsLoaded) return <Loader />;
  console.log(assets);
  console.log(fontsLoaded);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
