import React, { memo, useEffect, useState } from "react";
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
import useTodos from "../../../hooks/useTodos";
import useValue from "../../../hooks/useValue";
import dayjs from "dayjs";
import { DateString, DateStringYYYYMM } from "../../../@types/calendar";

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

  const theme = useAppSelect((state) => state.theme.value);
  const todoDrawerPosition = useAppSelect(
    (state) => state.todo.todoDrawerPosition
  );

  const [changeToNextDayTodo] = useChangeToNextDayTodoMutationMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [toggleCheckTodo] = useToggleTodoMutation();

  const didMountRef = React.useRef(false);
  const MeasurePositionTriggerRef = React.useRef(false);
  const itemRef = React.useRef<View | null>(null);

  const startDate = dayjs()
    .local()
    .subtract(29, "day")
    .format("YYYY-MM-DD") as DateString;
  const endDate = dayjs()
    .local()
    .add(1, "day")
    .format("YYYY-MM-DD") as DateString;

  const getAllTodoQueryArg = {
    date: dayjs().local().format("YYYY-MM") as DateStringYYYYMM,
  };

  // const { getAllTodoQueryArg } = useTodos();

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

  const measureItemRef = () => {
    itemRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setModalPosition({ x: pageX, y: pageY });
    });
  };

  const toggleTodoCheck = () => {
    toggleCheckTodo({
      todo_id: todo.todo_id,
      check: !todo.check,
      todo_date: todo.date,
      level: todo.level,
      queryArgs: {
        current_date: getAllTodoQueryArg.date,
        graph_before_date: startDate,
        graph_today_date: endDate,
      },
    });
  };

  const onPressChangeToNextDayTodo = () => {
    changeToNextDayTodo({
      todo_id: todo.todo_id,
      todo_date: todo.date,
      todo_checked: todo.check,
      todo_level: todo.level,
      queryArgs: {
        current_date: getAllTodoQueryArg.date,
        graph_before_date: startDate,
        graph_today_date: endDate,
      },
    });
  };

  const onPressEditTodo = () => {
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
  };

  const onPressDeleteTodo = () => {
    deleteTodo({
      todo_id: todo.todo_id,
      todo_date: todo.date,
      value: todo.level * 1000,
      checked: todo.check,
      queryArgs: {
        date: getAllTodoQueryArg.date,
        graph_before_date: startDate,
        graph_today_date: endDate,
      },
    });
  };

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
            isChecked={todo.check}
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
          {todo.check ? (
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
                {!todo.check && (
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
