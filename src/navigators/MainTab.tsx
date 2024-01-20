import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useTheme } from "styled-components";
import { IconsWithoutFeedBack } from "../components/atoms/Icons";
import useHeight from "../hooks/useHeight";
import GroupScreen from "../screens/GroupScreen";
import ProjectScreen from "../screens/ProjectScreen";
import { ComponentHeightProvider } from "../utils/ComponentHeightContext";
import HomeStack from "./HomeStack";
import FriendScreen from "../screens/SNS/RankingScreen";
import SnsStack from "./SnsStack";
import PageHeader from "../components/molecules/PageHeader";
import PageMainHeader from "../components/molecules/PageMainHeader";
import ProjectStack from "./ProjectStack";

const Tab = createBottomTabNavigator();

function MainTab() {
  const theme = useTheme();
  const { NOTCH_BOTTOM, NOTCH_TOP } = useHeight();
  return (
    <ComponentHeightProvider>
      <Tab.Navigator
        screenOptions={{
          headerShadowVisible: false,

          tabBarActiveTintColor: theme.text,
          tabBarInactiveTintColor: theme.textDimmer,
          // headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.box,
            height: NOTCH_BOTTOM + 60,
            // borderTopWidth: 0,
          },
          headerStyle: {
            backgroundColor: theme.box,
            height: NOTCH_TOP + 50,
          },
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <IconsWithoutFeedBack
                type="material"
                name="home"
                size={size * 1.2}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Project"
          component={ProjectStack}
          options={{
            headerShown: false,
            // header: () => <PageMainHeader title="프로젝트" />,
            tabBarIcon: ({ color, size }) => (
              <IconsWithoutFeedBack
                type="ionicons"
                name="file-tray"
                size={size * 1.2}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Group"
          component={GroupScreen}
          options={{
            // headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <IconsWithoutFeedBack
                type="materialIcons"
                name="people-alt"
                size={size * 1.2}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="SnsStack"
          component={SnsStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <IconsWithoutFeedBack
                type="material"
                name="account"
                size={size * 1.2}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </ComponentHeightProvider>
  );
}

export default MainTab;
