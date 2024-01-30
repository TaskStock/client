import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SettingsHomeScreen from "../screens/Settings/SettingsHomeScreen";
import ThemeScreen from "../screens/Settings/ThemeScreen";
import AccountScreen from "../screens/Settings/AccountScreen";
import { useTheme } from "styled-components";

const NativeStack = createNativeStackNavigator();

const SettingsStack = () => {
  const theme = useTheme();
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <NativeStack.Screen
        name="Settings"
        component={SettingsHomeScreen}
        options={{}}
      />
      <NativeStack.Screen
        name="SettingsTheme"
        component={ThemeScreen}
        options={{}}
      />
      <NativeStack.Screen
        name="SettingsAccount"
        component={AccountScreen}
        options={{}}
      />
    </NativeStack.Navigator>
  );
};

export default SettingsStack;
