import { View, Text } from "react-native";
import React from "react";
import ContentLayout from "../../atoms/ContentLayout";
import ProjectList from "../../organisms/Project/ProjectList";
import { useProject } from "../../../hooks/useProject";
import { Project } from "../../../@types/project";

export default function SnsDetailThird({
  projects,
}: {
  projects: {
    data: Project[] | undefined;
    isLoading: boolean;
    isError: boolean;
  };
}) {
  return (
    <ContentLayout>
      <ProjectList
        projects={projects.data}
        isLoading={projects.isLoading}
        isError={projects.isError}
      ></ProjectList>
    </ContentLayout>
  );
}
