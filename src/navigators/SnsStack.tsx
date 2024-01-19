import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import EditProfileScreen from "../screens/SNS/EditProfileScreen";
import RankingScreen from "../screens/SNS/RankingScreen";
import SearchScreen from "../screens/SNS/SearchScreen";
import UserDetailScreen from "../screens/SNS/UserDetailScreen";

const NativeStack = createNativeStackNavigator();

const SnsStack = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerShadowVisible: false,
      headerShown: false,
    }}
  >
    <NativeStack.Screen name="Ranking" component={RankingScreen} />
    <NativeStack.Screen name="EditProfile" component={EditProfileScreen} />
    <NativeStack.Screen
      name="Search"
      options={{
        headerShown: true,
      }}
      component={SearchScreen}
    />
    <NativeStack.Screen
      name="UserDetail"
      options={{
        headerShown: true,
      }}
      component={UserDetailScreen}
    />
  </NativeStack.Navigator>
);

export default SnsStack;
