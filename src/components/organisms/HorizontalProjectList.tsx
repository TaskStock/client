import { View, Text, ScrollView, Platform } from "react-native";
import React from "react";
import { spacing } from "../../constants/spacing";
import styled from "styled-components/native";
import { Project } from "../../@types/project";
import ProjectSelectBtn from "../molecules/Home/ProjectSelectBtn";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";

export const Projects = styled.View`
  ${Platform.OS === "android" ? "min-width: 500px;" : "min-width: 100%;"}
  padding-left: ${spacing.gutter}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.textDimmer};
  flex-direction: row;
  gap: ${spacing.offset}px;
`;

export default function HorizontalProjectList({
  selectedProjectId,
  onPressProject,
  projects,
}: {
  selectedProjectId: number | null;
  onPressProject: (id: number | null) => void;
  projects: Project[] | undefined;
}) {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{
        flexGrow: 0,
      }}
    >
      <Projects>
        <ProjectSelectBtn
          projectName={"전체"}
          selected={selectedProjectId === null}
          onPress={() => onPressProject(null)}
        />
        {projects &&
          projects.map((project) => (
            <ProjectSelectBtn
              projectName={project.name}
              key={project.project_id}
              selected={selectedProjectId === project.project_id}
              onPress={() => onPressProject(project.project_id)}
            />
          ))}
      </Projects>
    </ScrollView>
  );
}
