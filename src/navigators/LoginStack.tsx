import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { useTheme } from "styled-components";
import Icons from "../components/atoms/Icons";
import EmailCheckCodeScreen from "../screens/Login/EmailCheckCodeScreen";
import EmailLoginScreen from "../screens/Login/EmailLoginScreen";
import EmailRegisterScreen from "../screens/Login/EmailRegisterScreen";
import EmailSendScreen from "../screens/Login/EmailSendScreen";
import FindPwEmailSendScreen from "../screens/Login/FindPwEmailSendScreen";
import FindPwSetNewPwScreen from "../screens/Login/FindPwSetNewPwScreen";
import WelcomeScreen from "../screens/Login/WelcomeScreen";

const NativeStack = createNativeStackNavigator();

const LoginStack = ({ navigation }) => {
  const theme = useTheme();

  const optionsWithHeader = {
    headerBackTitleVisible: false,
    headerLeft: () => (
      <Icons
        type="feather"
        name="chevron-left"
        size={35}
        color={theme.text}
        onPress={() => {
          navigation.goBack();
        }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      />
    ),
    headerTitle: "",
  };

  const optionsWithoutHeader = {
    headerBackTitleVisible: false,
    headerLeft: () => <View style={{ height: 35, width: "100%" }} />,
    headerTitle: "",
  };

  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: theme.loginBackground,
        },
      }}
    >
      <NativeStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: "",
          headerStyle: {
            backgroundColor: theme.box,
          },
        }}
      />
      <NativeStack.Screen
        name="EmailLogin"
        component={EmailLoginScreen}
        options={optionsWithHeader}
      />
      <NativeStack.Screen
        name="EmailSend"
        component={EmailSendScreen}
        options={optionsWithHeader}
      />
      <NativeStack.Screen
        name="EmailCheckCode"
        component={EmailCheckCodeScreen}
        options={optionsWithHeader}
      />
      <NativeStack.Screen
        name="EmailRegister"
        component={EmailRegisterScreen}
        options={optionsWithoutHeader}
      />
      <NativeStack.Screen
        name="FindPwEmailSend"
        component={FindPwEmailSendScreen}
        options={optionsWithHeader}
      />
      <NativeStack.Screen
        name="FindPwSetNewPw"
        component={FindPwSetNewPwScreen}
        options={optionsWithHeader}
      />
    </NativeStack.Navigator>
  );
};

export default LoginStack;
