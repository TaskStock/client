import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import LoginStack from "./LoginStack";
import MainTab from "./MainTab";

const Nav = createNativeStackNavigator();

const Root = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <Nav.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isLoggedIn ? (
        <Nav.Screen name="MainTab" component={MainTab} />
      ) : (
        <>
          <Nav.Screen name="LoginStack" component={LoginStack} />
          <Nav.Screen name="MainTab" component={MainTab} />
        </>
      )}
    </Nav.Navigator>
  );
};
export default Root;
