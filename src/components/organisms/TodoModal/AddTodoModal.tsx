import React, { useCallback } from "react";
import {
  Pressable,
  ScrollView,
  Switch,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import { AppDispatch } from "../../../store/configureStore";
import { useAppSelect } from "../../../store/configureStore.hooks";
import {
  setAddTodoForm,
  closeTodoModal,
  toggleRepeatEndModal,
  useAddTodoMutation,
  useEditTodoMutation,
} from "../../../store/modules/todo/todo";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import FlexBox from "../../atoms/FlexBox";
import Icons from "../../atoms/Icons";
import Margin from "../../atoms/Margin";
import Text from "../../atoms/Text";
import ProjectItemList from "./ProjectItemList";
import ValueSlider from "./ValueSlider";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { getNewRepeatDay } from "../../../utils/getNewRepeatDay";

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

const AddTodoBox = styled.View`
  height: 100%;
  border-radius: 20px;
  padding: ${spacing.offset}px;
  background-color: ${({ theme }) => theme.palette.neutral100_gray};
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

const AddTodoBtn = styled.TouchableOpacity`
  border-radius: 8px;
  padding: 14px 75px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.palette.neutral200_gray};
`;

const CloseBox = styled.View`
  display: flex;
  align-items: flex-end;
`;

const SectionHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  z-index: 2;
`;

const SectionHeaderText = styled.Text`
  font-size: ${useResponsiveFontSize(18)}px;
  color: ${({ theme }) => theme.textDim};
`;

const ValueText = styled(SectionHeaderText)`
  color: ${({ theme }) => theme.palette.red};
`;

const TodoInput = styled.TextInput`
  border-color: ${({ theme }) => theme.textDimmer};
  border-bottom-width: 1px;
  padding: 6px 1px;
`;

const RepeatDayItem = styled.Pressable<{ isSelected?: boolean; size: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50px;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.mainBtnReversed : theme.mainBtnGray};
`;

const DatePickerBox = styled.Pressable`
  display: flex;
  /* border-bottom-width: 1px; */
  border-color: ${({ theme }) => theme.text};
  padding: 6px 4px;
`;

const Section = ({
  header,
  children,
  gapSize = "md",
}: {
  header: React.ReactNode;
  children?: React.ReactNode;
  gapSize?: "md" | "lg" | "xl";
}) => {
  const margin = gapSize === "md" ? 5 : gapSize === "lg" ? 10 : 15;

  return (
    <View>
      {header}
      <Margin margin={margin}></Margin>
      {children}
    </View>
  );
};

const dayList = ["월", "화", "수", "목", "금", "토", "일"];

export default function AddTodoModal() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const addTodoForm = useAppSelect((state) => state.todo.addTodoForm);
  const isEditMode = Boolean(
    useAppSelect((state) => state.todo.addTodoForm.todo_id)
  );
  const isRepeatDateModalOpen = useAppSelect(
    (state) => state.todo.isRepeatDateModalOpen
  );
  const scrollViewRef = React.useRef<ScrollView>(null);

  const [dayItemWidth, setDayItemWidth] = React.useState(0);

  const value = addTodoForm.level * 1000;

  const {
    oneMonthBeforeQueryString,
    todayQueryString,
    currentDateYYYYMMDD: currentDateFormat,
  } = useAppSelect((state) => state.calendar);

  const [addTodo, addTodoResult] = useAddTodoMutation();
  const [editTodo, editTodoResult] = useEditTodoMutation();

  const onPressSubmitBtn = () => {
    if (isEditMode) {
      editTodo({
        form: addTodoForm,
        todo_date: addTodoForm.todo_date!,
        original_level: addTodoForm.original_level,
        queryArgs: {
          date: currentDateFormat,
          graph_before_date: oneMonthBeforeQueryString,
          graph_today_date: todayQueryString,
        },
      });
    } else {
      addTodo({
        form: addTodoForm,
        add_date: dayjs().toISOString(),
        queryArgs: {
          date: currentDateFormat,
          graph_before_date: oneMonthBeforeQueryString,
          graph_today_date: todayQueryString,
        },
      });
    }
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
      }}
    >
      <InnerPressable>
        <AddTodoBox>
          <CloseBox>
            <Icons
              onPress={() => {
                dispatch(closeTodoModal());
              }}
              type="ionicons"
              name="close"
              size={30}
            />
          </CloseBox>
          <ScrollView
            style={{
              marginBottom: spacing.offset,
            }}
            ref={(ref) => (scrollViewRef.current = ref)}
          >
            <Pressable
              style={{
                flex: 1,
              }}
            >
              <AddTodoContents>
                <Section
                  header={
                    <SectionHeader>
                      <SectionHeaderText>할 일</SectionHeaderText>
                    </SectionHeader>
                  }
                >
                  <TodoInput
                    placeholder="할 일을 입력해주세요."
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
                    <SectionHeader>
                      <SectionHeaderText>가치</SectionHeaderText>
                      <ValueText>{value}원</ValueText>
                    </SectionHeader>
                  }
                >
                  <ValueSlider></ValueSlider>
                </Section>
                <Section
                  header={
                    <SectionHeader>
                      <SectionHeaderText>반복</SectionHeaderText>
                      {dayList.map((item) => {
                        const isSelected =
                          addTodoForm.repeat_day &&
                          addTodoForm.repeat_day.includes(item);

                        if (isSelected)
                          return <ValueText key={item}>{item}</ValueText>;
                      })}
                    </SectionHeader>
                  }
                  gapSize="lg"
                >
                  <FlexBox gap={10}>
                    {dayList.map((item, index) => {
                      const onPressDayItem = () => {
                        dispatch(
                          setAddTodoForm({
                            name: "repeat_day",
                            value: getNewRepeatDay(
                              addTodoForm.repeat_day,
                              index
                            ),
                          })
                        );
                      };

                      const isSelected = addTodoForm.repeat_day[index] === "1";

                      return (
                        <RepeatDayItem
                          onLayout={(e) => {
                            if (dayItemWidth === 0)
                              setDayItemWidth(e.nativeEvent.layout.width);
                          }}
                          key={index + item}
                          isSelected={isSelected}
                          onPress={onPressDayItem}
                          size={dayItemWidth}
                        >
                          <Text
                            size="md"
                            color={
                              isSelected ? theme.textReverse : theme.textDim
                            }
                          >
                            {item}
                          </Text>
                        </RepeatDayItem>
                      );
                    })}
                  </FlexBox>
                </Section>
                <Section
                  header={
                    <SectionHeader>
                      <FlexBox
                        justifyContent="space-between"
                        alignItems="center"
                        styles={{
                          flex: 1,
                          minHeight: useResponsiveFontSize(50),
                        }}
                      >
                        <FlexBox
                          justifyContent="center"
                          alignItems="center"
                          gap={10}
                        >
                          <SectionHeaderText>반복 종료</SectionHeaderText>
                          <Switch
                            onValueChange={toggleIsEndRepeat}
                            value={isRepeatDateModalOpen}
                            trackColor={{
                              false: theme.palette.neutral600_gray,
                              true: theme.palette.neutral500_dark,
                            }}
                          ></Switch>
                        </FlexBox>
                        {isRepeatDateModalOpen && (
                          <DatePickerBox>
                            <DateTimePicker
                              value={datePickerInitialDate}
                              mode="date"
                              display="default"
                              onChange={onChangeDate}
                              style={{
                                bottom: 0,
                              }}
                            />
                          </DatePickerBox>
                        )}
                      </FlexBox>
                    </SectionHeader>
                  }
                ></Section>
                <Section
                  gapSize="lg"
                  header={
                    <SectionHeader>
                      <SectionHeaderText>프로젝트</SectionHeaderText>
                    </SectionHeader>
                  }
                >
                  <ProjectItemList
                    scrollViewRef={scrollViewRef}
                  ></ProjectItemList>
                </Section>
              </AddTodoContents>
            </Pressable>
          </ScrollView>
          <AddTodoBtn onPress={onPressSubmitBtn}>
            <Text size="md">
              {isEditMode ? "투두 수정하기" : "투두 추가하기"}
            </Text>
          </AddTodoBtn>
        </AddTodoBox>
      </InnerPressable>
    </AddTodoOverlay>
  );
}
