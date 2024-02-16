import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import EditProfileScreen from "../screens/SNS/EditProfileScreen";
import RankingScreen from "../screens/SNS/RankingScreen";
import SearchScreen from "../screens/SNS/SearchScreen";
import UserDetailScreen from "../screens/SNS/UserDetailScreen";
import BadgeScreen from "../screens/SNS/BadgeScreen";
import BadgeAllScreen from "../screens/SNS/BadgeAllScreen";

export type SnsStackParamList = {
  Ranking: undefined;
  EditProfile: undefined;
  Search: undefined;
  UserDetail: {
    userId: number;
  };
  Badge: undefined;
  BadgeAll: undefined;
};

const NativeStack = createNativeStackNavigator<SnsStackParamList>();

const SnsStack = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
      }}
    >
      <NativeStack.Screen name="EditProfile" component={EditProfileScreen} />
      <NativeStack.Screen name="Search" component={SearchScreen} />
      <NativeStack.Screen name="UserDetail" component={UserDetailScreen} />
      <NativeStack.Screen name="Badge" component={BadgeScreen} />
      <NativeStack.Screen
        name="BadgeAll"
        component={BadgeAllScreen}
        options={{
          presentation: "modal",
        }}
      />
    </NativeStack.Navigator>
  );
};

export default SnsStack;
