import React from "react";
import { Platform, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Project } from "../../@types/project";
import { spacing } from "../../constants/spacing";
import ProjectSelectBtn from "../molecules/Home/ProjectSelectBtn";

export const Projects = styled.View`
  ${Platform.OS === "android" ? "min-width: 500px;" : "min-width: 100%;"}
  padding: 0 ${spacing.gutter}px;
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
          publicRange={"all"}
        />
        {projects &&
          projects
            .filter((project) => {
              return project.finished === false;
            })
            .map((project) => (
              <ProjectSelectBtn
                projectName={project.name}
                publicRange={project.public_range}
                key={project.project_id}
                selected={selectedProjectId === project.project_id}
                onPress={() => onPressProject(project.project_id)}
              />
            ))}
      </Projects>
    </ScrollView>
  );
}
