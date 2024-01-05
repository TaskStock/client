import React, { useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import Text from "../../atoms/Text";
import BottomDrawer from "./BottomDrawer";
import ProjectSelectBtn from "./ProjectSelectBtn";
import TodoItem from "./TodoItem";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import {
  useAppDispatch,
  useAppSelect,
} from "../../../store/configureStore.hooks";
import dayjs from "dayjs";
import {
  openAddTodoModal,
  setTodoDrawerPosition,
  useGetAllTodosQuery,
} from "../../../store/modules/todo";
import FlexBox from "../../atoms/FlexBox";
import Icons from "../../atoms/Icons";
import CenterLayout from "../../atoms/CenterLayout";
import Margin from "../../atoms/Margin";
import AddTodoItem from "../../organisms/Home/AddTodoItem";

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
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const currentDate = dayjs(
    useAppSelect((state) => state.calendar.currentDateString)
  );

  const dispatch = useAppDispatch();

  const { data, isLoading, isError, error, refetch } = useGetAllTodosQuery({
    date: currentDate.format("YYYY-MM-DD"),
  });

  const todosData = data ? data.todos : [];

  if (error) {
    console.log(error);
  }

  const currentDateFormat = currentDate.format("MM월 DD일");

  return (
    <BottomDrawer
      onDrawerStateChange={(nextState) => {
        dispatch(setTodoDrawerPosition(nextState));
      }}
    >
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
              dispatch(openAddTodoModal());
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
        {!isError ? (
          todosData && (
            <>
              {todosData.map((todo) => {
                if (
                  selectedProject !== null &&
                  todo.project_id !== selectedProject
                )
                  return null;

                return <TodoItem key={todo.todo_id} todo={todo} />;
              })}
              <AddTodoItem />
            </>
          )
        ) : (
          <CenterLayout>
            <Text size="md">할일을 불러오는 중 에러가 발생했어요</Text>
            <Margin margin={5} />
            <Pressable
              onPress={() => {
                refetch();
              }}
            >
              <Text size="md">다시 로드하기</Text>
            </Pressable>
          </CenterLayout>
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
    </BottomDrawer>
  );
};

export default TodoContainer;
