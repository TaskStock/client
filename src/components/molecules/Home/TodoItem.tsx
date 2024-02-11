import React, { memo, useCallback, useEffect, useState } from "react";
import { Modal, Platform, View, Text as RNText } from "react-native";
import { useDispatch } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { Todo } from "../../../@types/todo";
import { spacing } from "../../../constants/spacing";
import { useAppSelect } from "../../../store/configureStore.hooks";
import {
  openEditTodoModal,
  useChangeToNextDayTodoMutationMutation,
  useDeleteTodoMutation,
  useToggleTodoMutation,
} from "../../../store/modules/todo/todo";
import numberWithCommas from "../../../utils/useNumberWithCommas";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import CheckBox from "../../atoms/CheckBox";
import FlexBox from "../../atoms/FlexBox";
import Icons from "../../atoms/Icons";
import Text from "../../atoms/Text";
import { checkIsWithInCurrentCalcDay } from "../../../utils/checkIsSameLocalDay";
import { useGetAllTodoArgs } from "../../../hooks/useGetAllTodoArgs";
import { useGetValuesArg } from "../../../hooks/useGetValuesArg";
import { setStep3 } from "../../../store/modules/tutorial";

const THEME_CONSTANTS = {
  dark: {
    checkedBoxSrc: require("../../../../assets/icons/checked-dark.png"),
    unCheckedBoxSrc: require("../../../../assets/icons/unchecked-dark.png"),
  },
  gray: {
    checkedBoxSrc: require("../../../../assets/icons/checked-light.png"),
    unCheckedBoxSrc: require("../../../../assets/icons/unchecked-light.png"),
  },
};

const ModalOverlay = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const TodoModal = styled.View<{ position: { bottom: number; left: number } }>`
  position: absolute;
  top: ${({ position }) => position.bottom}px;
  right: ${useResponsiveFontSize(60)}px;
  padding: ${spacing.padding}px;
  z-index: 100;
  border-radius: 10px;
  background-color: ${({ theme }) =>
    theme.name == "dark"
      ? theme.palette.neutral500_dark
      : theme.palette.neutral100_gray};
  flex-direction: column;
  gap: 10px;
  ${Platform.select({
    ios: `
      shadow-color: black;
      shadow-offset: 0px 2px;
      shadow-opacity: 0.25;
      shadow-radius: 10px;
    `,
    android: `
      elevation: 5;
    `,
  })}
`;
const TodoModalItem = styled.TouchableOpacity<{ isSelected?: boolean }>`
  background-color: ${({ isSelected, theme }) => {
    if (theme.name == "dark" && isSelected) {
      return theme.palette.neutral700_gray;
    } else if (theme.name == "dark") {
      return theme.palette.neutral500_dark;
    }
    if (isSelected) {
      return theme.text;
    } else {
      return theme.box;
    }
  }};
  border-radius: 6px;
  padding: ${useResponsiveFontSize(13)}px ${useResponsiveFontSize(38)}px;
`;

const TodoCheckBox = memo(
  ({
    isChecked,
    onPress,
    theme,
  }: {
    theme: string;
    isChecked: boolean;
    onPress: () => void;
  }) => {
    return isChecked ? (
      <CheckBox
        src={THEME_CONSTANTS[theme]?.checkedBoxSrc}
        onPress={() => {
          onPress();
        }}
      />
    ) : (
      <CheckBox
        src={THEME_CONSTANTS[theme]?.unCheckedBoxSrc}
        onPress={() => {
          onPress();
        }}
      />
    );
  }
);

const TodoItem = ({ todo }: { todo: Todo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const didMountRef = React.useRef(false);
  const MeasurePositionTriggerRef = React.useRef(false);
  const itemRef = React.useRef<View | null>(null);

  const [toggle, setToggle] = useState(todo.check);

  const theme = useAppSelect((state) => state.theme.value);
  const todoDrawerPosition = useAppSelect(
    (state) => state.todo.todoDrawerPosition
  );
  const ishomeDrawerOpen = useAppSelect((state) => state.home.isDrawerOpen);

  const [changeToNextDayTodo] = useChangeToNextDayTodoMutationMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [toggleCheckTodo] = useToggleTodoMutation();

  const getAllTodoQueryArg = useGetAllTodoArgs();
  const { startDate, endDate } = useGetValuesArg();

  useEffect(() => {
    MeasurePositionTriggerRef.current = false;
  }, [todoDrawerPosition]);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    setIsModalOpen(!isModalOpen);
  }, [modalPosition]);

  const styledTheme = useTheme();
  const dispatch = useDispatch();

  const measureItemRef = useCallback(() => {
    itemRef.current?.measure((x, y, width, height, pageX, pageY) => {
      console.log(pageX, pageY, "pageX, pageY");

      setModalPosition({ x: pageX, y: pageY });
    });
  }, [itemRef.current]);

  console.log(modalPosition, "modalPosition");

  const { showTutorial, step3 } = useAppSelect((state) => state.tutorial);
  const toggleTodoCheck = useCallback(() => {
    setToggle(!toggle);
    if (showTutorial && step3) {
      dispatch(setStep3(false));
    }

    toggleCheckTodo({
      todo_id: todo.todo_id,
      check: !todo.check,
      todo_date: todo.date,
      level: todo.level,
      isHomeDrawerOpen: ishomeDrawerOpen,
      queryArgs: {
        current_date: getAllTodoQueryArg.date,
        graph_before_date: startDate,
        graph_today_date: endDate,
      },
    });
  }, [
    todo.check,
    todo.todo_id,
    todo.date,
    todo.level,
    getAllTodoQueryArg.date,
    startDate,
    endDate,
    toggle,
    ishomeDrawerOpen,
  ]);

  const onPressChangeToNextDayTodo = useCallback(() => {
    changeToNextDayTodo({
      todo_id: todo.todo_id,
      todo_date: todo.date,
      isHomeDrawerOpen: ishomeDrawerOpen,
      todo_checked: todo.check,
      todo_level: todo.level,
      queryArgs: {
        current_date: getAllTodoQueryArg.date,
        graph_before_date: startDate,
        graph_today_date: endDate,
      },
    });
  }, [
    todo.todo_id,
    todo.date,
    todo.check,
    todo.level,
    getAllTodoQueryArg.date,
    startDate,
    endDate,
    ishomeDrawerOpen,
  ]);

  const onPressEditTodo = useCallback(() => {
    dispatch(
      openEditTodoModal({
        text: todo.content,
        level: todo.level,
        date: todo.date,
        checked: todo.check,
        project_id: todo.project_id,
        repeat_day: todo.repeat_day,
        repeat_end_date: todo.repeat_end_date,
        todo_id: todo.todo_id,
      })
    );
    setIsModalOpen(!isModalOpen);
  }, [todo, isModalOpen, dispatch, openEditTodoModal]);

  const onPressDeleteTodo = useCallback(() => {
    deleteTodo({
      todo_id: todo.todo_id,
      todo_date: todo.date,
      project_id: todo.project_id,
      isHomeDrawerOpen: ishomeDrawerOpen,
      value: todo.level * 1000,
      checked: todo.check,
      queryArgs: {
        date: getAllTodoQueryArg.date,
        graph_before_date: startDate,
        graph_today_date: endDate,
      },
    });
  }, [
    todo.todo_id,
    todo.date,
    todo.level,
    getAllTodoQueryArg.date,
    startDate,
    endDate,
    todo.check,
    ishomeDrawerOpen,
  ]);

  return (
    <View ref={itemRef}>
      <FlexBox
        justifyContent="space-between"
        alignItems="center"
        styles={{ paddingBottom: spacing.padding }}
      >
        <FlexBox
          gap={10}
          alignItems="center"
          styles={{
            flex: 1,
          }}
        >
          <TodoCheckBox
            theme={theme}
            isChecked={toggle}
            onPress={() => {
              toggleTodoCheck();
            }}
          />
          <RNText
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              color: styledTheme.text,
              flex: 1,
              fontSize: useResponsiveFontSize(17),
            }}
          >
            {todo.content}
          </RNText>
        </FlexBox>
        <FlexBox gap={10} alignItems="center">
          {toggle ? (
            <Text size="md" color={styledTheme.high}>
              +{numberWithCommas(todo.level * 1000)}원
            </Text>
          ) : (
            <Text size="md">{numberWithCommas(todo.level * 1000)}원</Text>
          )}
          <Icons
            type="material"
            name="dots-horizontal"
            size={24}
            color={styledTheme.textDimmer}
            onPress={() => {
              if (!MeasurePositionTriggerRef.current) {
                MeasurePositionTriggerRef.current = true;
                measureItemRef();
              } else {
                setIsModalOpen(!isModalOpen);
              }
            }}
          />
        </FlexBox>
        {isModalOpen && (
          <Modal transparent={true}>
            <ModalOverlay
              onPress={() => {
                setIsModalOpen(!isModalOpen);
              }}
            >
              <TodoModal
                position={{
                  bottom: modalPosition.y,
                  left: modalPosition.x,
                }}
              >
                <TodoModalItem isSelected={true} onPress={onPressEditTodo}>
                  <Text
                    size="md"
                    color={
                      styledTheme.name == "gray"
                        ? styledTheme.textReverse
                        : styledTheme.text
                    }
                  >
                    수정하기
                  </Text>
                </TodoModalItem>
                {!todo.check && checkIsWithInCurrentCalcDay(todo.date) && (
                  <TodoModalItem
                    isSelected={false}
                    onPress={onPressChangeToNextDayTodo}
                  >
                    <Text size="md" color={styledTheme.text}>
                      내일하기
                    </Text>
                  </TodoModalItem>
                )}
                <TodoModalItem onPress={onPressDeleteTodo}>
                  <Text size="md">삭제하기</Text>
                </TodoModalItem>
              </TodoModal>
            </ModalOverlay>
          </Modal>
        )}
      </FlexBox>
    </View>
  );
};

export default memo(TodoItem);
