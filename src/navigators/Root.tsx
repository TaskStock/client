import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MainTab from "./MainTab";
import Stack from "./Stack";

const Nav = createNativeStackNavigator();

const Root = () => {
  return (
    <Nav.Navigator
      screenOptions={{ presentation: "transparentModal", headerShown: false }}
    >
      <Nav.Screen name="MainTab" component={MainTab} />
      <Nav.Screen name="Stack" component={Stack} />
    </Nav.Navigator>
  );
};
export default Root;
