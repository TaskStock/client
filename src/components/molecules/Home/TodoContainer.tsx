import analytics from "@react-native-firebase/analytics";
import dayjs from "dayjs";
import React, { memo, useContext, useEffect, useState } from "react";
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
import TutorialBox from "../TutorialBox";
import BottomDrawer from "./BottomDrawer";
import { setStep1 } from "../../../store/modules/tutorial";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";

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

  const { showTutorial, step1, step3 } = useAppSelect(
    (state) => state.tutorial
  );

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
            <View>
              {showTutorial && step1 ? (
                <TutorialBox
                  style={{
                    bottom: -useResponsiveFontSize(30),
                    right: -useResponsiveFontSize(17),
                  }}
                  type={1}
                />
              ) : null}

              <Icons
                type="entypo"
                name="circle-with-plus"
                size={28}
                color={theme.text}
                onPress={async () => {
                  dispatch(setStep1(false));
                  dispatch(
                    openAddTodoModal({
                      project_id: selectedProjectId,
                    })
                  );
                  await analytics().logEvent("add_todo", {
                    project_id: selectedProjectId,
                  });
                }}
                style={{ zIndex: 1000 }}
              />
            </View>
          </FlexBox>
          {showTutorial && step3 ? (
            <TutorialBox
              style={{
                bottom: -useResponsiveFontSize(80),
                left: useResponsiveFontSize(8),
              }}
              type={4}
            />
          ) : null}
        </DateContainer>

        <HorizontalProjectList
          selectedProjectId={selectedProjectId}
          onPressProject={(id) => {
            dispatch(setSelectedProjectId(id));
          }}
          projects={projects}
        />

        <View
          style={{
            flex: 1,
            // paddingHorizontal: spacing.gutter,
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
