import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Stack from "./Stack";

const Nav = createNativeStackNavigator();

const Root = () => (
  <Nav.Navigator
    screenOptions={{ presentation: "transparentModal", headerShown: false }}
  >
    <Nav.Screen name="Stack" component={Stack} />
  </Nav.Navigator>
);
export default Root;
