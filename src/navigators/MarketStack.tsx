import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MarketMainScreen from "../screens/Market/MarketMainScreen";
import MarketListScreen from "../screens/Market/MarketListScreen";
import StockDetailScreen from "../screens/Market/StockDetailScreen";
import WishListScreen from "../screens/Market/WishListScreen";
import WishRegisterScreen from "../screens/Market/WishRegisterScreen";
import StockChallengersDetailScreen from "../screens/Market/StockChallengersDetailScreen";
import { Challengers } from "../@types/stock";
import UserDetailScreen from "../screens/SNS/UserDetailScreen";

export type MarketStackParamList = {
  MarketMainScreen: undefined;
  MarketListScreen: undefined;
  StockDetailScreen: {
    stockId: number;
  };
  StockChallengersDetailScreen: {
    userList: Challengers[];
    count: number;
    name: string;
  };
  WishListScreen: undefined;
  WishRegisterScreen: undefined;
  UserDetail: {
    userId: number;
  };
};

const NativeStack = createNativeStackNavigator<MarketStackParamList>();

const MarketStack = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerShadowVisible: false,
      headerShown: false,
    }}
  >
    <NativeStack.Screen name="MarketListScreen" component={MarketListScreen} />
    <NativeStack.Screen
      name="StockDetailScreen"
      component={StockDetailScreen}
    />
    <NativeStack.Screen
      name="StockChallengersDetailScreen"
      component={StockChallengersDetailScreen}
    />
    <NativeStack.Screen name="WishListScreen" component={WishListScreen} />
    <NativeStack.Screen
      name="WishRegisterScreen"
      component={WishRegisterScreen}
    />
    <NativeStack.Screen name="UserDetail" component={UserDetailScreen} />
  </NativeStack.Navigator>
);

export default MarketStack;
