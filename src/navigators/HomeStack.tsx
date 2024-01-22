import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AlarmScreen from "../screens/AlarmScreen";
import HomeScreen from "../screens/HomeScreen";
import SettingsStack from "./SettingsStack";

const NativeStack = createNativeStackNavigator();

const HomeStack = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerShadowVisible: false,
      headerShown: false,
    }}
  >
    <NativeStack.Screen name="Home" component={HomeScreen} />
    <NativeStack.Screen name="Alarm" component={AlarmScreen} />
    <NativeStack.Screen name="SettingsStack" component={SettingsStack} />
  </NativeStack.Navigator>
);

export default HomeStack;
