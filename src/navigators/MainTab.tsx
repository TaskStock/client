import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProjectScreen from "../screens/ProjectScreen";
import FriendScreen from "../screens/FriendScreen";
import MainHeader from "../components/molecules/CustomTabBar/MainHeader";

const Tab = createMaterialTopTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MainHeader {...props} />}
      screenOptions={{ swipeEnabled: false }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: "홈" }}
      />
      <Tab.Screen
        name="Project"
        component={ProjectScreen}
        options={{ tabBarLabel: "프로젝트" }}
      />
      <Tab.Screen
        name="Friend"
        component={FriendScreen}
        options={{ tabBarLabel: "친구" }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
