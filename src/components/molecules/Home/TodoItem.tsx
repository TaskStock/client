import React, { useEffect, useState } from "react";
import { darkTheme, grayTheme } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { useAppSelect } from "../../../store/configureStore.hooks";
import numberWithCommas from "../../../utils/useNumberWithCommas";
import CheckBox from "../../atoms/CheckBox";
import FlexBox from "../../atoms/FlexBox";
import Text from "../../atoms/Text";
import Icons from "../../atoms/Icons";
import styled, { useTheme } from "styled-components/native";
import { useDispatch } from "react-redux";
import { openEditTodoModal } from "../../../store/modules/todo";
import { Todo } from "../../../@types/todo";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import { Modal, View } from "react-native";
import { Platform } from "react-native";

const THEME_CONSTANTS = {
  dark: {
    checkedBoxSrc: require("../../../../assets/icons/checked-dark.png"),
    unCheckedBoxSrc: require("../../../../assets/icons/unchecked-dark.png"),
    high: darkTheme.high,
  },
  gray: {
    checkedBoxSrc: require("../../../../assets/icons/checked-light.png"),
    unCheckedBoxSrc: require("../../../../assets/icons/unchecked-light.png"),
    high: grayTheme.high,
  },
};

const ModalOverlay = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const TodoModal = styled.View<{ position: { top: number; left: number } }>`
  position: absolute;
  top: ${({ position }) => position.top}px;
  right: ${useResponsiveFontSize(60)}px;
  padding: ${spacing.padding}px;
  z-index: 100;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.box};
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
    if (isSelected) {
      return theme.text;
    } else {
      return theme.box;
    }
  }};
  border-radius: 6px;
  padding: ${useResponsiveFontSize(13)}px ${useResponsiveFontSize(38)}px;
`;

const TodoItem = ({ todo }: { todo: Todo }) => {
  const [checked, setChecked] = useState(todo.check);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const theme = useAppSelect((state) => state.theme.value);
  const todoDrawerPosition = useAppSelect(
    (state) => state.todo.todoDrawerPosition
  );

  const didMountRef = React.useRef(false);
  const MeasurePositionTriggerRef = React.useRef(false);
  const itemRef = React.useRef(null);

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

  return (
    <View ref={itemRef}>
      <FlexBox
        justifyContent="space-between"
        alignItems="center"
        styles={{ paddingBottom: spacing.padding }}
      >
        <FlexBox gap={10} alignItems="center">
          {checked ? (
            <CheckBox
              src={THEME_CONSTANTS[theme]?.checkedBoxSrc}
              onPress={() => {
                setChecked(!checked);
              }}
            />
          ) : (
            <CheckBox
              src={THEME_CONSTANTS[theme]?.unCheckedBoxSrc}
              onPress={() => {
                setChecked(!checked);
              }}
            />
          )}

          <Text size="md">{todo.content}</Text>
        </FlexBox>
        <FlexBox gap={10} alignItems="center">
          {checked ? (
            <Text size="md" color={THEME_CONSTANTS[theme]?.high}>
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
                  top: modalPosition.y,
                  left: modalPosition.x,
                }}
              >
                <TodoModalItem
                  isSelected={true}
                  onPress={() => {
                    dispatch(
                      openEditTodoModal({
                        text: todo.content,
                        level: todo.level,
                        project_id: todo.project_id,
                        repeat_day: todo.repeat_day,
                        repeat_end_date: todo.repeat_end_date,
                        todo_id: todo.todo_id,
                      })
                    );
                    setIsModalOpen(!isModalOpen);
                  }}
                >
                  <Text size="md" color={styledTheme.textReverse}>
                    수정
                  </Text>
                </TodoModalItem>
                <TodoModalItem>
                  <Text size="md">삭제</Text>
                </TodoModalItem>
              </TodoModal>
            </ModalOverlay>
          </Modal>
        )}
      </FlexBox>
    </View>
  );
};

export default TodoItem;
