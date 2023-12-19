import React, { useContext, useEffect, useState } from "react";
import BottomDrawer from "./BottomDrawer";
import Text from "../../atoms/Text";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import { todosData } from "../../../../public/todos";
import ProjectSelectBtn from "./ProjectSelectBtn";
import { ScrollView, View } from "react-native";
import { ComponentHeightContext } from "../../../utils/ComponentHeightContext";
import useHeight from "../../../utils/useHeight";

const DateContainer = styled.View`
  padding: 4px ${spacing.gutter}px 0;
`;
const ProjectsContainer = styled.View`
  padding-left: ${spacing.gutter}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.textDimmer};
  flex-direction: row;
  gap: ${spacing.offset}px;
`;

const BottomDrawerContainer = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(0);

  const { headerHeight } = useContext(ComponentHeightContext);
  useEffect(() => {
    const _projects = Object.values(todosData).map((project) => {
      return { name: project.name, id: project.project_id };
    });
    setProjects(_projects);
  }, []);

  //   useEffect(() => {
  //     console.log(selectedProject);
  //   }, [selectedProject]);
  const { NOTCH_BOTTOM } = useHeight();
  return (
    <BottomDrawer onDrawerStateChange={() => {}}>
      <DateContainer>
        <Text size="xl" weight="bold">
          11월 28일
        </Text>
      </DateContainer>
      <ProjectsContainer>
        {projects.map((project) => (
          <ProjectSelectBtn
            projectName={project.name}
            key={project.id}
            selected={selectedProject === project.id}
            onPress={() => setSelectedProject(project.id)}
          />
        ))}
      </ProjectsContainer>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ height: 300, backgroundColor: "yellow" }} />
        <View style={{ height: 300, backgroundColor: "green" }} />
        <View style={{ height: 350, backgroundColor: "yellow" }} />
        <View style={{ height: 300, backgroundColor: "green" }} />
      </ScrollView>

      <View style={{ height: headerHeight + 93 + NOTCH_BOTTOM }} />
    </BottomDrawer>
  );
};

export default BottomDrawerContainer;
