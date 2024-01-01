import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MyPageScreen from "../screens/MyPageScreen";
import SettingsScreen from "../screens/SettingsScreen";

const NativeStack = createNativeStackNavigator();

const MyPageStack = () => (
  <NativeStack.Navigator screenOptions={{}}>
    <NativeStack.Screen
      name="MyPage"
      component={MyPageScreen}
      options={{
        headerShown: true,
      }}
    />
    <NativeStack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        headerShown: true,
      }}
    />
  </NativeStack.Navigator>
);

export default MyPageStack;
