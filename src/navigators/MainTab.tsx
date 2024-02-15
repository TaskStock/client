import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useTheme } from "styled-components";
import { IconsWithoutFeedBack } from "../components/atoms/Icons";
import useHeight from "../hooks/useHeight";
import GroupScreen from "../screens/GroupScreen";
import HomeScreen from "../screens/HomeScreen";
import { ComponentHeightProvider } from "../utils/ComponentHeightContext";
import ProjectStack from "./ProjectStack";
import SnsStack from "./SnsStack";
import MarketStack from "./MarketStack";
import RankingScreen from "../screens/SNS/RankingScreen";
import MarketMainScreen from "../screens/Market/MarketMainScreen";

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
          name="Home"
          component={HomeScreen}
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
          name="MarketMainScreen"
          component={MarketMainScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <IconsWithoutFeedBack
                type="feather"
                name="shopping-bag"
                size={size * 1.2}
                color={color}
              />
            ),
          }}
        />

        <Tab.Screen
          name="ProjectStack"
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
          name="Ranking"
          component={RankingScreen}
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
