import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icons, { IconsWithoutFeedBack } from "../components/atoms/Icons";
import { darkTheme, grayTheme } from "../constants/colors";
import useHeight from "../hooks/useHeight";
import GroupScreen from "../screens/GroupScreen";
import HomeScreen from "../screens/HomeScreen";
import MyPageScreen from "../screens/MyPageScreen";
import ProjectScreen from "../screens/ProjectScreen";
import { useAppSelect } from "../store/configureStore.hooks";
import { ComponentHeightProvider } from "../utils/ComponentHeightContext";
import AlarmScreen from "../screens/AlarmScreen";
import MyPageStack from "./MyPageStack";

const THEME_SOURCES = {
  dark: {
    background: darkTheme.box,
    activeTint: darkTheme.text,
    inactiveTint: darkTheme.textDimmer,
  },
  gray: {
    background: grayTheme.box,
    activeTint: grayTheme.text,
    inactiveTint: grayTheme.textDimmer,
  },
};

const Tab = createBottomTabNavigator();

function MainTab() {
  const theme = useAppSelect((state) => state.theme.value);
  const { NOTCH_BOTTOM, NOTCH_TOP } = useHeight();
  return (
    // <ComponentHeightProvider>
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: THEME_SOURCES[theme].activeTint,
        tabBarInactiveTintColor: THEME_SOURCES[theme].inactiveTint,
        // headerShown: false,
        tabBarStyle: {
          backgroundColor: THEME_SOURCES[theme].background,
          height: NOTCH_BOTTOM + 60,
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: THEME_SOURCES[theme].background,
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
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Project"
        component={ProjectScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IconsWithoutFeedBack
              type="ionicons"
              name="file-tray"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Group"
        component={GroupScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <IconsWithoutFeedBack
              type="materialIcons"
              name="people-alt"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyPageStack"
        component={MyPageStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IconsWithoutFeedBack
              type="materialIcons"
              name="people-alt"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
    // </ComponentHeightProvider>
  );
}

export default MainTab;
