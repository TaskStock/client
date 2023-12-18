import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProjectScreen from "../screens/ProjectScreen";
import FriendScreen from "../screens/FriendScreen";
import MainHeader from "../components/molecules/CustomTabBar/MainHeader";
import { Platform } from "react-native";
import { HeaderHeightProvider } from "../utils/HeaderHeightContext";

const Tab = createMaterialTopTabNavigator();

function MainTab() {
  //   const [headerHeight, setHeaderHeight] = useState(0);
  //   console.log(Platform.OS, "headerHeight: ", headerHeight);

  //   useEffect(() => {
  //     // Update the initialParams whenever headerHeight changes
  //     Tab.setParams({ headerHeight: headerHeight });
  //   }, [headerHeight]);

  return (
    <HeaderHeightProvider>
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
    </HeaderHeightProvider>
  );
}

export default MainTab;
