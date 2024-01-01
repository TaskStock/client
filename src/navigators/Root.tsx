import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MainTab from "./MainTab";
import LoginStack from "./LoginStack";

const Nav = createNativeStackNavigator();

const Root = () => {
  return (
    <Nav.Navigator
      screenOptions={{
        // presentation: "transparentModal",
        headerShown: false,
      }}
    >
      <Nav.Screen name="MainTab" component={MainTab} />
      <Nav.Screen name="Login" component={LoginStack} />
    </Nav.Navigator>
  );
};
export default Root;
