import React, { useCallback } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useDispatch } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { spacing } from "../../constants/spacing";
import { AppDispatch } from "../../store/configureStore";
import { useAppSelect } from "../../store/configureStore.hooks";
import {
  setAddTodoForm,
  submitTodo,
  toggleAddModal,
} from "../../store/modules/todo";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import FlexBox from "../atoms/FlexBox";
import Icons from "../atoms/Icons";
import Margin from "../atoms/Margin";
import Text from "../atoms/Text";
import ProjectItemList from "./TodoModal/ProjectItemList";
import ValueSlider from "./TodoModal/ValueSlider";

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

const Section = ({
  header,
  children,
  margin,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
  margin?: number;
}) => {
  return (
    <View>
      {header}
      <Margin margin={margin ? margin : 5}></Margin>
      {children}
    </View>
  );
};

const dayList = ["월", "화", "수", "목", "금", "토", "일"];

export default function AddTodoModal() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const scrollViewRef = React.useRef<ScrollView>(null);

  const addTodoForm = useAppSelect((state) => state.todo.addTodoForm);

  const [dayItemWidth, setDayItemWidth] = React.useState(0);

  const value = addTodoForm.level * 1000;

  const onPressAddTodoBtn = useCallback(() => {
    dispatch(submitTodo());
  }, [addTodoForm]);

  return (
    <AddTodoOverlay
      onPress={() => {
        dispatch(toggleAddModal());
      }}
    >
      <InnerPressable>
        <AddTodoBox>
          <CloseBox>
            <Icons
              onPress={() => {
                dispatch(toggleAddModal());
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
                    onChange={(e) => {
                      dispatch(
                        setAddTodoForm({
                          name: "text",
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
                          addTodoForm.repeat_day.includes(item);

                        if (isSelected)
                          return <ValueText key={item}>{item}</ValueText>;
                      })}
                    </SectionHeader>
                  }
                  margin={10}
                >
                  <FlexBox gap={10}>
                    {dayList.map((item, index) => {
                      const onPress = () => {
                        dispatch(
                          setAddTodoForm({
                            name: "repeat_day",
                            value: addTodoForm.repeat_day.includes(item)
                              ? addTodoForm.repeat_day.filter(
                                  (day) => day !== item
                                )
                              : [...addTodoForm.repeat_day, item],
                          })
                        );
                      };

                      const isSelected = addTodoForm.repeat_day.includes(item);

                      return (
                        <RepeatDayItem
                          onLayout={(e) => {
                            if (dayItemWidth === 0)
                              setDayItemWidth(e.nativeEvent.layout.width);
                          }}
                          key={index + item}
                          isSelected={isSelected}
                          onPress={onPress}
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
                  margin={10}
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
          <AddTodoBtn onPress={onPressAddTodoBtn}>
            <Text size="md">할 일 추가하기</Text>
          </AddTodoBtn>
        </AddTodoBox>
      </InnerPressable>
    </AddTodoOverlay>
  );
}
