import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import AlarmScreen from "../screens/AlarmScreen";
import FriendScreen from "../screens/FriendScreen";

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
    <NativeStack.Screen
      name="Friend"
      component={FriendScreen}
      options={{
        headerShown: true,
      }}
    />
  </NativeStack.Navigator>
);

export default HomeStack;
