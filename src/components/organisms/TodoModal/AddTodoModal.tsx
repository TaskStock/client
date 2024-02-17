import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import styled, { useTheme } from "styled-components/native";
import { IsoString } from "../../../@types/calendar";
import { spacing } from "../../../constants/spacing";
import useTodos from "../../../hooks/useTodos";
import useValue from "../../../hooks/useValue";
import {
  useAppDispatch,
  useAppSelect,
} from "../../../store/configureStore.hooks";
import {
  closeTodoModal,
  setAddTodoForm,
  toggleRepeatEndModal,
  useAddTodoMutation,
  useEditTodoMutation,
} from "../../../store/modules/todo/todo";
import Icons from "../../atoms/Icons";
import Text from "../../atoms/Text";
import Section from "../../molecules/Section";
import TutorialBox from "../../molecules/TutorialBox";
import ProjectItemList from "./ProjectItemList";
import ValueSlider from "./ValueSlider";
import { removeData } from "../../../utils/asyncStorage";
import { setStep2, setStep3 } from "../../../store/modules/tutorial";
import Margin from "../../atoms/Margin";
import { showErrorToast } from "../../../utils/showToast";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import { palette } from "../../../constants/colors";

const AddTodoOverlay = styled.Pressable`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerPressable = styled.Pressable`
  width: 85%;
  height: 50%;
`;

const AddTodoBox = styled.View<{ systemTheme: string }>`
  height: 100%;
  border-radius: 20px;
  padding: ${spacing.offset}px;
  background-color: ${({ theme }) => theme.box};
  border-width: ${({ systemTheme }) => (systemTheme === "dark" ? 0.4 : 0)}px;
  border-color: ${({ systemTheme }) =>
    systemTheme === "dark" ? "white" : "transparent"};
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 20px;
  elevation: 5;
`;

const AddTodoContents = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const AddTodoBtn = styled.TouchableOpacity<{ activate: boolean }>`
  border-radius: 8px;
  padding: 14px 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ activate }) =>
    activate ? "black" : palette.neutral600_gray};
  opacity: ${({ activate }) => (activate ? 1 : 0.5)};
`;

const CloseBox = styled.View`
  display: flex;
  align-items: flex-end;
`;

const ValueText = styled(Section.HeaderText)`
  color: ${({ theme }) => theme.palette.red};
  font-weight: 300;
`;

const TodoInput = styled.TextInput`
  border-color: ${({ theme }) => theme.textDimmer};
  border-bottom-width: 1px;
  padding: 6px 1px;
  color: ${({ theme }) => theme.text};
  z-index: 2000;
`;

const RepeatDayItem = styled.Pressable<{ isSelected?: boolean; size: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50px;

  border-width: ${({ isSelected, theme }) =>
    theme.name == "dark" && isSelected ? "1px" : "0px"};
  border-color: ${({ theme }) => theme.text};

  background-color: ${({ theme, isSelected }) =>
    theme.name === "gray" && isSelected
      ? theme.mainBtnReversed
      : theme.mainBtnGray};
`;

const DatePickerBox = styled.Pressable`
  display: flex;
  /* border-bottom-width: 1px; */
  border-color: ${({ theme }) => theme.text};
  padding: 6px 4px;
`;

const dayList = ["월", "화", "수", "목", "금", "토", "일"];

export default function AddTodoModal() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const addTodoForm = useAppSelect((state) => state.todo.addTodoForm);

  const isEditMode = Boolean(
    useAppSelect((state) => state.todo.addTodoForm.todo_id)
  );
  const isRepeatDateModalOpen = useAppSelect(
    (state) => state.todo.isRepeatDateModalOpen
  );
  const scrollViewRef = React.useRef<ScrollView>(null);

  const systemTheme = useAppSelect((state) => state.theme.value);

  const [dayItemWidth, setDayItemWidth] = React.useState(0);

  const value = addTodoForm.level * 1000;

  const inputRef = React.useRef(null);

  const {
    getValuesQueryArgs: { startDate, endDate },
  } = useValue();

  const { getAllTodoQueryArg } = useTodos();

  const [addTodo, addTodoResult] = useAddTodoMutation();
  const [editTodo, editTodoResult] = useEditTodoMutation();

  const isHomeDrawerOpen = useAppSelect((state) => state.home.isDrawerOpen);

  const currentDate = useAppSelect((state) => state.calendar.currentDateString);

  // tutorial
  const { showTutorial, step2 } = useAppSelect((state) => state.tutorial);
  // const showTutorial = true;
  useEffect(() => {
    if (showTutorial) {
      dispatch(
        setAddTodoForm({
          name: "content",
          value: "TaskStock 시작하기",
        })
      );
    }
  }, [showTutorial]);

  const [tutorialShown1, setTutorialShown1] = useState(false);
  const [tutorialShown2, setTutorialShown2] = useState(false);

  useEffect(() => {
    console.log(showTutorial, step2);
    if (showTutorial && step2) {
      setTutorialShown1(true);
    }
  }, [showTutorial]);

  useEffect(() => {
    console.log("value: ", value);
    if (value > 0) {
      setTutorialShown1(false);
      setTutorialShown2(true);
    }
  }, [value]);

  const onPressSubmitBtn = () => {
    if (!addTodoForm.content) {
      showErrorToast("할일을 입력해주세요!");
      return;
    }

    if (isEditMode) {
      editTodo({
        form: addTodoForm,
        todo_date: addTodoForm.todo_date!,
        original_level: addTodoForm.original_level,
        isHomeDrawerOpen: isHomeDrawerOpen,
        // addTodoForm의 checked는, editModal이 열릴때 들어간다.
        // 그러므로, isEditMode일때는 addTodoForm.checked가 항상 true이다.
        todo_checked: addTodoForm.checked!,
        queryArgs: {
          date: getAllTodoQueryArg.date,
          graph_before_date: startDate,
          graph_today_date: endDate,
        },
      });
    } else {
      addTodo({
        form: addTodoForm,
        add_date: currentDate as IsoString,
        isHomeDrawerOpen: isHomeDrawerOpen,
        stockitem_id: null,
        queryArgs: {
          date: getAllTodoQueryArg.date,
          graph_before_date: startDate,
          graph_today_date: endDate,
        },
      });
    }
    setTutorialShown2(false);
    dispatch(setStep2(false));
  };

  const datePickerInitialDate = addTodoForm.repeat_end_date
    ? new Date(addTodoForm.repeat_end_date)
    : new Date();

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;

    const formattedDate = dayjs(currentDate).format("YYYY-MM-DD");

    dispatch(
      setAddTodoForm({
        name: "repeat_end_date",
        value: formattedDate,
      })
    );
  };

  const toggleIsEndRepeat = () => {
    dispatch(toggleRepeatEndModal());
  };

  return (
    <AddTodoOverlay
      onPress={() => {
        dispatch(closeTodoModal());
        setTutorialShown1(false);
        setTutorialShown2(false);
      }}
    >
      {showTutorial && tutorialShown1 ? (
        <TutorialBox
          type={2}
          style={{
            top: useResponsiveFontSize(120),
            right: useResponsiveFontSize(0),
            height: useResponsiveFontSize(280),
            zIndex: 100,
          }}
          ratio={0.8}
          onPress={() => inputRef.current.focus()}
        />
      ) : null}
      <InnerPressable>
        <AddTodoBox systemTheme={systemTheme}>
          <CloseBox>
            <Icons
              onPress={() => {
                dispatch(closeTodoModal());
                setTutorialShown1(false);
                setTutorialShown2(false);
              }}
              type="ionicons"
              name="close"
              color={theme.text}
              size={30}
            />
          </CloseBox>
          <ScrollView
            style={{
              flex: 1,
              marginBottom: spacing.padding,
            }}
          >
            <Pressable
              style={{
                flex: 1,
              }}
            >
              <AddTodoContents>
                <Section
                  header={
                    <Section.Header>
                      <Section.HeaderText>할 일</Section.HeaderText>
                    </Section.Header>
                  }
                >
                  <TodoInput
                    ref={inputRef}
                    placeholder={"할 일을 입력해주세요."}
                    autoComplete="off"
                    autoCapitalize="none"
                    placeholderTextColor={theme.textDim}
                    value={addTodoForm.content}
                    onChange={(e) => {
                      dispatch(
                        setAddTodoForm({
                          name: "content",
                          value: e.nativeEvent.text,
                        })
                      );
                    }}
                  ></TodoInput>
                </Section>
                <Section
                  header={
                    <Section.Header>
                      <>
                        <Section.HeaderText>가치</Section.HeaderText>
                      </>
                      <ValueText>{value}원</ValueText>
                    </Section.Header>
                  }
                >
                  {Platform.OS === "android" && (
                    <Margin margin={spacing.padding}></Margin>
                  )}
                  <ValueSlider></ValueSlider>
                </Section>

                <Section
                  gapSize="lg"
                  header={
                    <Section.Header>
                      <Section.HeaderText>프로젝트</Section.HeaderText>
                    </Section.Header>
                  }
                >
                  <ProjectItemList></ProjectItemList>
                </Section>
              </AddTodoContents>
            </Pressable>
          </ScrollView>
          <View
            style={{
              zIndex: 1000,
            }}
          >
            {showTutorial && tutorialShown2 ? (
              <TutorialBox
                type={3}
                style={{
                  top: useResponsiveFontSize(45),
                  left: useResponsiveFontSize(15),
                  height: 150,
                }}
                ratio={0.65}
              />
            ) : null}

            <AddTodoBtn
              onPress={
                addTodoForm.content !== "" ? onPressSubmitBtn : undefined
              }
              disabled={addTodoForm.content !== "" ? false : true}
              activate={addTodoForm.content !== "" ? true : false}
            >
              <Text size="md" color={"white"}>
                {isEditMode ? "할 일 수정하기" : "할 일 추가하기"}
              </Text>
            </AddTodoBtn>
          </View>
        </AddTodoBox>
      </InnerPressable>
    </AddTodoOverlay>
  );
}
