import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsStack from "./SettingsStack";
import AlarmStack from "./AlarmStack";

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
