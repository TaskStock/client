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
} from "../../../store/modules/todo/todo";
import FlexBox from "../../atoms/FlexBox";
import Icons from "../../atoms/Icons";
import CenterLayout from "../../atoms/CenterLayout";
import Margin from "../../atoms/Margin";
import AddTodoItem from "../../organisms/Home/AddTodoItem";
import LoadingSpinner from "../../atoms/LoadingSpinner";
import { setTabIndex } from "../../../store/modules/home";
import DraggableTodoList from "../../organisms/Home/DraggableTodoList";
import useTodos from "../../../hooks/useTodos";
import { useTheme } from "styled-components";
import { useProject } from "../../../hooks/useProject";
import { setSelectedProjectId } from "../../../store/modules/project";

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
  const theme = useTheme();
  const { currentDateString } = useAppSelect((state) => state.calendar);
  const dispatch = useAppDispatch();

  const { data: todosData, error, isError, isLoading, refetch } = useTodos();
  const { projects, selectedProjectId } = useProject();

  const headerDate = dayjs(currentDateString).format("MM월 DD일");

  return (
    <BottomDrawer
      onDrawerStateChange={(nextState) => {
        dispatch(setTodoDrawerPosition(nextState));
      }}
    >
      <DateContainer>
        <FlexBox justifyContent="space-between" alignItems="center">
          <Pressable
            onPress={() => {
              dispatch(setTabIndex(1));
            }}
          >
            <Text size="xl" weight="bold">
              {headerDate}
            </Text>
          </Pressable>

          <Icons
            type="entypo"
            name="circle-with-plus"
            size={28}
            color={theme.name === "dark" ? theme.text : theme.textDimmer}
            onPress={() => {
              dispatch(openAddTodoModal());
            }}
          />
        </FlexBox>
      </DateContainer>
      <ProjectsContainer>
        <ProjectSelectBtn
          projectName={"전체"}
          selected={selectedProjectId === null}
          onPress={() => dispatch(setSelectedProjectId(null))}
        />
        {projects.map((project) => (
          <ProjectSelectBtn
            projectName={project.name}
            key={project.project_id}
            selected={selectedProjectId === project.project_id}
            onPress={() => dispatch(setSelectedProjectId(project.project_id))}
          />
        ))}
      </ProjectsContainer>
      <View
        style={{
          flex: 1,
        }}
      >
        {!isLoading ? (
          !isError ? (
            todosData && (
              <DraggableTodoList
                selectedProjectId={selectedProjectId}
              ></DraggableTodoList>
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
          )
        ) : (
          <CenterLayout>
            <LoadingSpinner />
          </CenterLayout>
        )}
      </View>
    </BottomDrawer>
  );
};

export default TodoContainer;
