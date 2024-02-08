import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "styled-components";
import AlarmDetailScreen from "../screens/Alarm/AlarmDetailScreen";
import AlarmScreen from "../screens/Alarm/AlarmScreen";
import UserDetailScreen from "../screens/SNS/UserDetailScreen";

export type AlarmStackParamList = {
  Alarm: undefined;
  AlarmDetail: {
    detail: string;
    title: string;
    subText: string;
  };
  UserDetail: {
    userId: number;
  };
};

const NativeStack = createNativeStackNavigator<AlarmStackParamList>();

const AlarmStack = () => {
  const theme = useTheme();
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <NativeStack.Screen name="Alarm" component={AlarmScreen} />
      <NativeStack.Screen name="AlarmDetail" component={AlarmDetailScreen} />
      <NativeStack.Screen name="UserDetail" component={UserDetailScreen} />
    </NativeStack.Navigator>
  );
};

export default AlarmStack;
