import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AlarmStack from "./AlarmStack";
import SettingsStack from "./SettingsStack";

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
    </Nav.Navigator>
  );
};

export default StackWithoutTab;
