import dayjs from "dayjs";
import React, { memo, useContext } from "react";
import { Pressable, View } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import { useProject } from "../../../hooks/useProject";
import {
  useAppDispatch,
  useAppSelect,
} from "../../../store/configureStore.hooks";
import { setIsDrawerOpen, setTabIndex } from "../../../store/modules/home";
import { setSelectedProjectId } from "../../../store/modules/project/project";
import {
  openAddTodoModal,
  setTodoDrawerPosition,
} from "../../../store/modules/todo/todo";
import { ComponentHeightContext } from "../../../utils/ComponentHeightContext";
import FlexBox from "../../atoms/FlexBox";
import Icons from "../../atoms/Icons";
import Text from "../../atoms/Text";
import DraggableTodoList from "../../organisms/Home/DraggableTodoList";
import HorizontalProjectList from "../../organisms/HorizontalProjectList";
import BottomDrawer from "./BottomDrawer";
import analytics from "@react-native-firebase/analytics";

export const DateContainer = styled.View`
  padding: ${spacing.small}px ${spacing.gutter}px 0;
`;

const TodoContainer = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { currentDateString } = useAppSelect((state) => state.calendar);
  const { projects, selectedProjectId } = useProject();

  const headerDate = dayjs(currentDateString).format("MM월 DD일");

  const { DEFAULT_HEIGHT, OPEN_STATE } = useContext(ComponentHeightContext);

  const defaultValue = DEFAULT_HEIGHT;
  const openState = OPEN_STATE;

  if (defaultValue !== 0 && openState !== 0) {
    return (
      <BottomDrawer
        openState={openState}
        closedState={defaultValue}
        onDrawerStateChange={(nextState) => {
          dispatch(setTodoDrawerPosition(nextState));
          dispatch(
            setIsDrawerOpen({
              toState: nextState === "OPEN_STATE" ? true : false,
            })
          );
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
              color={theme.text}
              onPress={async () => {
                dispatch(
                  openAddTodoModal({
                    project_id: selectedProjectId,
                  })
                );
                await analytics().logEvent("add_todo", {
                  project_id: selectedProjectId,
                });
              }}
            />
          </FlexBox>
        </DateContainer>
        <HorizontalProjectList
          selectedProjectId={selectedProjectId}
          onPressProject={(id) => {
            dispatch(setSelectedProjectId(id));
          }}
          projects={projects}
        ></HorizontalProjectList>

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

export default memo(TodoContainer);
