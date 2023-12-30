import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import WelcomeScreen from "../screens/Login/WelcomeScreen";

const NativeStack = createNativeStackNavigator();

const LoginStack = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <NativeStack.Screen name="Welcome" component={WelcomeScreen} />
  </NativeStack.Navigator>
);

export default LoginStack;
