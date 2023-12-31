import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { todosData } from "../../../../public/todos";
import { spacing } from "../../../constants/spacing";
import { ComponentHeightContext } from "../../../utils/ComponentHeightContext";
import useHeight from "../../../hooks/useHeight";
import Text from "../../atoms/Text";
import BottomDrawer from "./BottomDrawer";
import EditTodoItem from "./EditTodoItem";
import ProjectSelectBtn from "./ProjectSelectBtn";
import TodoItem from "./TodoItem";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";

const DateContainer = styled.View`
  padding: ${spacing.small}px ${spacing.gutter}px 0;
`;
const ProjectsContainer = styled.View`
  padding-left: ${spacing.gutter}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.textDimmer};
  flex-direction: row;
  gap: ${spacing.offset}px;
`;

const BottomDrawerContainer = ({ editEnabled, setEditEnabled }) => {
  const [data, setData] = useState(todosData);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(0);

  const { headerHeight } = useContext(ComponentHeightContext);
  useEffect(() => {
    const _projects = Object.values(todosData).map((project) => {
      return { name: project.name, id: project.project_id };
    });
    setProjects(_projects);
  }, []);

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
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: spacing.gutter,
          paddingTop: useResponsiveFontSize(15),
        }}
      >
        {data[selectedProject].todos.map((todo) =>
          editEnabled ? (
            <EditTodoItem key={todo.todo_id} todo={todo} />
          ) : (
            <TodoItem key={todo.todo_id} todo={todo} />
          )
        )}
      </ScrollView>

      <View style={{ height: headerHeight + 93 + NOTCH_BOTTOM }} />
    </BottomDrawer>
  );
};

export default BottomDrawerContainer;
