import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ProjectScreen from "../screens/ProjectScreen";
import ProjectDetailScreen from "../screens/ProjectDetailScreen";

export type ProjectStackParamList = {
  Project: undefined;
  ProjectDetail: {
    project_id: number;
    project_title: string;
  };
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
  </NativeStack.Navigator>
);

export default ProjectStack;
