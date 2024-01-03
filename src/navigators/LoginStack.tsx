import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Icons from "../components/atoms/Icons";
import EmailCheckCodeScreen from "../screens/Login/EmailCheckCodeScreen";
import EmailLoginScreen from "../screens/Login/EmailLoginScreen";
import EmailRegisterScreen from "../screens/Login/EmailRegisterScreen";
import EmailSendScreen from "../screens/Login/EmailSendScreen";
import WelcomeScreen from "../screens/Login/WelcomeScreen";
import { useAppSelect } from "../store/configureStore.hooks";
import FindPasswordScreen from "../screens/Login/FindPasswordScreen";

const NativeStack = createNativeStackNavigator();

const LoginStack = ({ navigation }) => {
  const optionsWithHeader = {
    headerBackTitleVisible: false,
    headerLeft: () => (
      <Icons
        type="feather"
        name="chevron-left"
        size={35}
        color={"black"}
        onPress={() => {
          navigation.goBack();
        }}
      />
    ),
    headerTitle: "",
  };
  const theme = useAppSelect((state) => state.theme.value);
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen
        name="EmailCheckCode"
        component={EmailCheckCodeScreen}
        options={optionsWithHeader}
      />
      <NativeStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitle: "",
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
      {/* <NativeStack.Screen
        name="EmailCheckCode"
        component={EmailCheckCodeScreen}
        options={optionsWithHeader}
      /> */}
      <NativeStack.Screen
        name="EmailRegister"
        component={EmailRegisterScreen}
        options={optionsWithHeader}
      />
      <NativeStack.Screen
        name="FindPassword"
        component={FindPasswordScreen}
        options={optionsWithHeader}
      />
    </NativeStack.Navigator>
  );
};

export default LoginStack;
