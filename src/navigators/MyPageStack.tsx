import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MyPageScreen from "../screens/MyPageScreen";
import SettingsScreen from "../screens/SettingsScreen";

const NativeStack = createNativeStackNavigator();

const MyPageStack = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <NativeStack.Screen name="MyPage" component={MyPageScreen} />
    <NativeStack.Screen name="Settings" component={SettingsScreen} />
  </NativeStack.Navigator>
);

export default MyPageStack;
