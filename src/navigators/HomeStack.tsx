import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import AlarmScreen from "../screens/AlarmScreen";
import FriendScreen from "../screens/FriendScreen";

const NativeStack = createNativeStackNavigator();

const HomeStack = () => (
  <NativeStack.Navigator
    screenOptions={
      {
        //   headerShown: false,
      }
    }
  >
    <NativeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <NativeStack.Screen
      name="Alarm"
      component={AlarmScreen}
      options={{
        headerShown: true,
      }}
    />
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
