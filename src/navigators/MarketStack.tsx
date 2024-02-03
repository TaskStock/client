import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MarketMainScreen from "../screens/Market/MarketMainScreen";
import MarketListScreen from "../screens/Market/MarketListScreen";
import StockDetailScreen from "../screens/Market/StockDetailScreen";
import WishListScreen from "../screens/Market/WishListScreen";
import WishRegisterScreen from "../screens/Market/WishRegisterScreen";

export type MarketStackParamList = {
  MarketMainScreen: undefined;
  MarketListScreen: undefined;
  StockDetailScreen: {
    stockId: number;
  };
  WishListScreen: undefined;
  WishRegisterScreen: undefined;
};

const NativeStack = createNativeStackNavigator<MarketStackParamList>();

const MarketStack = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerShadowVisible: false,
      headerShown: false,
    }}
  >
    <NativeStack.Screen name="MarketMainScreen" component={MarketMainScreen} />
    <NativeStack.Screen name="MarketListScreen" component={MarketListScreen} />
    <NativeStack.Screen
      name="StockDetailScreen"
      component={StockDetailScreen}
    />
    <NativeStack.Screen name="WishListScreen" component={WishListScreen} />
    <NativeStack.Screen
      name="WishRegisterScreen"
      component={WishRegisterScreen}
    />
  </NativeStack.Navigator>
);

export default MarketStack;
