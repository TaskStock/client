import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import WelcomeScreen from "../screens/Login/WelcomeScreen";
import EmailRegisterScreen from "../screens/Login/EmailRegisterScreen";
import EmailSendScreen from "../screens/Login/EmailSendScreen";
import EmailCheckCodeScreen from "../screens/Login/EmailCheckCodeScreen";

const NativeStack = createNativeStackNavigator();

const LoginStack = () => (
  <NativeStack.Navigator
    screenOptions={
      {
        // headerShown: false,
      }
    }
  >
    <NativeStack.Screen name="Welcome" component={WelcomeScreen} />
    <NativeStack.Screen name="EmailSend" component={EmailSendScreen} />
    <NativeStack.Screen
      name="EmailCheckCode"
      component={EmailCheckCodeScreen}
    />
    <NativeStack.Screen name="EmailRegister" component={EmailRegisterScreen} />
  </NativeStack.Navigator>
);

export default LoginStack;
