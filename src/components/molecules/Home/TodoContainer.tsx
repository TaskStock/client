import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import {
  useAppDispatch,
  useAppSelect,
} from "../../../store/configureStore.hooks";
import { setTabIndex } from "../../../store/modules/home";
import {
  openAddTodoModal,
  setTodoDrawerPosition,
} from "../../../store/modules/todo/todo";
import { ComponentHeightContext } from "../../../utils/ComponentHeightContext";
import CenterLayout from "../../atoms/CenterLayout";
import FlexBox from "../../atoms/FlexBox";
import Icons from "../../atoms/Icons";
import LoadingSpinner from "../../atoms/LoadingSpinner";
import Margin from "../../atoms/Margin";
import Text from "../../atoms/Text";
import DraggableTodoList from "../../organisms/Home/DraggableTodoList";
import BottomDrawer from "./BottomDrawer";
import ProjectSelectBtn from "./ProjectSelectBtn";
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

  const { DEFAULT_HEIGHT, OPEN_STATE } = useContext(ComponentHeightContext);
  // final value
  const [defaultValue, setDefaultValue] = useState(0);
  const [openState, setOpenState] = useState(0);

  useEffect(() => {
    if (DEFAULT_HEIGHT !== defaultValue || OPEN_STATE !== openState) {
      setDefaultValue(DEFAULT_HEIGHT);
      setOpenState(OPEN_STATE);
    }
  }, [DEFAULT_HEIGHT, OPEN_STATE]);

  if (defaultValue !== 0 && openState !== 0) {
    return (
      <BottomDrawer
        openState={openState}
        closedState={defaultValue}
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
          <DraggableTodoList selectedProjectId={selectedProjectId} />
        </View>
      </BottomDrawer>
    );
  } else {
    return null;
  }
};

export default TodoContainer;
