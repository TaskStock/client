import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SettingsHomeScreen from "../screens/Settings/SettingsHomeScreen";
import ThemeScreen from "../screens/Settings/ThemeScreen";
import AccountScreen from "../screens/Settings/AccountScreen";
import { useTheme } from "styled-components";
import InfoScreen from "../screens/Settings/InfoScreen";
import CustomerServiceScreen from "../screens/Settings/CustomerServiceScreen";
import ChangePwCheckPwScreen from "../screens/Settings/ChangePwCheckPwScreen";
import Icons from "../components/atoms/Icons";
import FindPwSetNewPwScreen from "../screens/Login/FindPwSetNewPwScreen";
import UnSubscribeScreen from "../screens/Settings/UnSubscribeScreen";

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
      <NativeStack.Screen name="Settings" component={SettingsHomeScreen} />
      <NativeStack.Screen name="SettingsTheme" component={ThemeScreen} />
      <NativeStack.Screen name="SettingsAccount" component={AccountScreen} />
      <NativeStack.Screen name="SettingsInfo" component={InfoScreen} />
      <NativeStack.Screen
        name="SettingsCustomerService"
        component={CustomerServiceScreen}
      />
      <NativeStack.Screen
        name="ChangePwCheckPw"
        component={ChangePwCheckPwScreen}
      />
      <NativeStack.Screen name="SetNewPw" component={FindPwSetNewPwScreen} />
      <NativeStack.Screen name="UnSubscribe" component={UnSubscribeScreen} />
    </NativeStack.Navigator>
  );
};

export default SettingsStack;
