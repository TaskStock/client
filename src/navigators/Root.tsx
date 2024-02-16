import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginStack from "./LoginStack";
import MainTab from "./MainTab";
import SettingsStack from "./SettingsStack";
import AlarmStack from "./AlarmStack";
import SnsStack from "./SnsStack";
import MarketStack from "./MarketStack";
import ProjectStackWOTab from "./ProjectStackWOTab";

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
      <Nav.Screen
        name="MainTab"
        component={MainTab}
        options={{ gestureEnabled: false }}
      />
      <Nav.Screen name="SettingsStack" component={SettingsStack} />
      <Nav.Screen name="AlarmStack" component={AlarmStack} />
      <Nav.Screen name="SnsStack" component={SnsStack} />
      <Nav.Screen name="MarketStack" component={MarketStack} />
      <Nav.Screen name="ProjectStackWithoutTab" component={ProjectStackWOTab} />
    </Nav.Navigator>
  );
};
export default Root;
