import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import EditProfileScreen from "../screens/SNS/EditProfileScreen";
import RankingScreen from "../screens/SNS/RankingScreen";
import SearchScreen from "../screens/SNS/SearchScreen";
import UserDetailScreen from "../screens/SNS/UserDetailScreen";
import Icons from "../components/atoms/Icons";
import { useTheme } from "styled-components";
import { View } from "react-native";

const NativeStack = createNativeStackNavigator();

const SnsStack = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
      }}
    >
      <NativeStack.Screen name="Ranking" component={RankingScreen} />
      <NativeStack.Screen name="EditProfile" component={EditProfileScreen} />
      <NativeStack.Screen name="Search" component={SearchScreen} />
      <NativeStack.Screen name="UserDetail" component={UserDetailScreen} />
    </NativeStack.Navigator>
  );
};

export default SnsStack;
