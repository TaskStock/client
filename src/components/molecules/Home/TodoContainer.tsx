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
import {
  useAppDispatch,
  useAppSelect,
} from "../../../store/configureStore.hooks";
import dayjs from "dayjs";
import {
  toggleAddModal,
  useGetAllTodosQuery,
} from "../../../store/modules/todo";
import FlexBox from "../../atoms/FlexBox";
import Icons from "../../atoms/Icons";
import LoadingSpinner from "../../atoms/LoadingSpinner";
import CenterLayout from "../../atoms/CenterLayout";

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

const TodoContainer = () => {
  // const [data, setData] = useState(todosData);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const currentDate = dayjs(
    useAppSelect((state) => state.calendar.currentDateString)
  );

  const dispatch = useAppDispatch();

  const {
    data: todosData,
    isLoading,
    isError,
    error,
  } = useGetAllTodosQuery({
    date: currentDate.format("YYYY-MM-DD"),
  });

  if (error) {
    console.log(error);
  }

  // useEffect(() => {
  //   const _projects = Object.values(todosData).map((project) => {
  //     return { name: project.name, id: project.project_id };
  //   });
  //   setProjects(_projects);
  // }, []);

  const currentDateFormat = currentDate.format("MM월 DD일");

  const { NOTCH_BOTTOM } = useHeight();
  return (
    <BottomDrawer onDrawerStateChange={() => {}}>
      <DateContainer>
        <FlexBox justifyContent="space-between" alignItems="center">
          <Text size="xl" weight="bold">
            {currentDateFormat}
          </Text>
          <Icons
            type="entypo"
            name="circle-with-plus"
            size={28}
            onPress={() => {
              dispatch(toggleAddModal());
            }}
          />
        </FlexBox>
      </DateContainer>
      <ProjectsContainer>
        <ProjectSelectBtn
          projectName={"전체"}
          selected={selectedProject === null}
          onPress={() => setSelectedProject(null)}
        />
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
        {!isLoading && (
          <>
            <TodoItem
              todo={{
                text: "test",
                level: 1,
                check: false,
              }}
            />
            <TodoItem
              todo={{
                text: "test",
                level: 1,
                check: false,
              }}
            />
            <TodoItem
              todo={{
                text: "test",
                level: 1,
                check: false,
              }}
            />
            <TodoItem
              todo={{
                text: "test",
                level: 1,
                check: false,
              }}
            />
            <TodoItem
              todo={{
                text: "test",
                level: 1,
                check: false,
              }}
            />
          </>
        )}

        {/* {data[selectedProject].todos.map((todo) => (
          editEnabled ? (
            <EditTodoItem key={todo.todo_id} todo={todo} />
          ) : (
            <TodoItem key={todo.todo_id} todo={todo} />
          )
          <TodoItem key={todo.todo_id} todo={todo} />
        ))} */}
      </ScrollView>

      {/* <View style={{ height: headerHeight + 93 + NOTCH_BOTTOM }} /> */}
    </BottomDrawer>
  );
};

export default TodoContainer;
