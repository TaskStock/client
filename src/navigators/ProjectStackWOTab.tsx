import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ProjectManageScreen from "../screens/Project/ProjectManageScreen";
import RetrospectWriteScreen from "../screens/Project/RetrospectWriteScreen";

const NativeStack = createNativeStackNavigator();

const ProjectStackWOTab = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerShadowVisible: false,
      headerShown: false,
    }}
  >
    <NativeStack.Screen name="ProjectManage" component={ProjectManageScreen} />
    <NativeStack.Screen
      name="RetrospectWrite"
      component={RetrospectWriteScreen}
    />
  </NativeStack.Navigator>
);

export default ProjectStackWOTab;
