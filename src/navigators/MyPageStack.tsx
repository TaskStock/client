import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SettingsHomeScreen from "../screens/MyPage/Settings/SettingsHomeScreen";
import ThemeScreen from "../screens/MyPage/Settings/ThemeScreen";
import MyPageScreen from "../screens/MyPage/MyPageScreen";

const NativeStack = createNativeStackNavigator();

const MyPageStack = () => (
  <NativeStack.Navigator screenOptions={{}}>
    <NativeStack.Screen
      name="MyPage"
      component={MyPageScreen}
      options={{
        headerShown: false,
      }}
    />
    <NativeStack.Screen
      name="SettingsHome"
      component={SettingsHomeScreen}
      options={{
        headerShown: true,
      }}
    />
    <NativeStack.Screen
      name="SettingsTheme"
      component={ThemeScreen}
      options={{
        headerShown: true,
      }}
    />
  </NativeStack.Navigator>
);

export default MyPageStack;
