import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ProjectScreen from "../screens/Project/ProjectScreen";
import ProjectDetailScreen from "../screens/Project/ProjectDetailScreen";
import ProjectManageScreen from "../screens/Project/ProjectManageScreen";
import RetrospectWriteScreen from "../screens/Project/RetrospectWriteScreen";

export type ProjectStackParamList = {
  Project: undefined;
  ProjectDetail: {
    project_id: number;
    project_title: string;
  };
  ProjectManage: undefined;
  RetrospectWrite: undefined;
};

const NativeStack = createNativeStackNavigator<ProjectStackParamList>();

const ProjectStack = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerShadowVisible: false,
      headerShown: false,
    }}
  >
    <NativeStack.Screen name="Project" component={ProjectScreen} />
    <NativeStack.Screen name="ProjectDetail" component={ProjectDetailScreen} />
    <NativeStack.Screen name="ProjectManage" component={ProjectManageScreen} />
    <NativeStack.Screen
      name="RetrospectWrite"
      component={RetrospectWriteScreen}
    />
  </NativeStack.Navigator>
);

export default ProjectStack;
