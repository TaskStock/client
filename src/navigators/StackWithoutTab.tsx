import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsStack from "./SettingsStack";
import AlarmStack from "./AlarmStack";
import BadgeScreen from "../screens/SNS/BadgeScreen";
// import { CardStyleInterpolators } from "@react-navigation/stack";

const Nav = createNativeStackNavigator();

const StackWithoutTab = () => {
  return (
    <Nav.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Nav.Screen name="SettingsStack" component={SettingsStack} />
      <Nav.Screen name="AlarmStack" component={AlarmStack} />
      <Nav.Screen
        name="Badge"
        component={BadgeScreen}
        options={{
          presentation: "card",
          gestureDirection: "vertical",
        }}
      />
    </Nav.Navigator>
  );
};

export default StackWithoutTab;
