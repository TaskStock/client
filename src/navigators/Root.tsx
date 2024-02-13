import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginStack from "./LoginStack";
import MainTab from "./MainTab";
import StackWithoutTab from "./StackWithoutTab";

const Nav = createNativeStackNavigator();

const Root = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const initialRoute = isLoggedIn ? "MainTab" : "LoginStack";
  return (
    <Nav.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialRoute}
    >
      <Nav.Screen name="LoginStack" component={LoginStack} />
      <Nav.Screen name="MainTab" component={MainTab} />
      <Nav.Screen name="StackWithoutTab" component={StackWithoutTab} />
    </Nav.Navigator>
  );
};
export default Root;
