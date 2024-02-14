import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useTheme } from "styled-components";
import FindPwSetNewPwScreen from "../screens/Login/FindPwSetNewPwScreen";
import AccountScreen from "../screens/Settings/AccountScreen";
import ChangePwCheckPwScreen from "../screens/Settings/ChangePwCheckPwScreen";
import CustomerServiceScreen from "../screens/Settings/CustomerServiceScreen";
import InfoScreen from "../screens/Settings/InfoScreen";
import OssLicenseScreen from "../screens/Settings/OssLicenseScreen";
import SettingsHomeScreen from "../screens/Settings/SettingsHomeScreen";
import ThemeScreen from "../screens/Settings/ThemeScreen";
import UnSubscribeScreen from "../screens/Settings/UnSubscribeScreen";
import LicenseDetailScreen from "../screens/Settings/LicenseDetailScreen";

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
      <NativeStack.Screen name="OssLicense" component={OssLicenseScreen} />
      <NativeStack.Screen
        name="OssLicenseDetail"
        component={LicenseDetailScreen}
      />
    </NativeStack.Navigator>
  );
};

export default SettingsStack;
