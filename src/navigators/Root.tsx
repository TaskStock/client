import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Stack from "./Stack";
import MainTab from "./MainTab";

const Nav = createNativeStackNavigator();

const Root = () => (
  <Nav.Navigator
    screenOptions={{ presentation: "transparentModal", headerShown: false }}
  >
    <Nav.Screen name="MainTab" component={MainTab} />
    <Nav.Screen name="Stack" component={Stack} />
  </Nav.Navigator>
);
export default Root;
