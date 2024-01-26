import dayjs from "dayjs";
import React, { memo, useEffect, useMemo, useRef } from "react";
import { FlatList, LayoutChangeEvent, Pressable, View } from "react-native";
import { useDispatch } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { spacing } from "../../constants/spacing";
import { useAppDispatch, useAppSelect } from "../../store/configureStore.hooks";
import {
  setCurrentDateString,
  setItemContainerHeight,
} from "../../store/modules/calendar";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import FlexBox from "../atoms/FlexBox";
import {
  CalendarItem as TCalendarItem,
  IsoString,
} from "../../@types/calendar";
import { Todo } from "../../@types/todo";
import { useCalculateTodoCount } from "../../hooks/useCalculateTodoCount";
import { useResizeLayoutOnFocus } from "../../hooks/useResizeLayoutOnFocus";
import { useFocusEffect } from "@react-navigation/native";

const CalendarContainer = styled.View`
  border-radius: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: ${spacing.offset}px;
  padding-top: ${spacing.padding}px;
`;

const CalendarItemContainer = styled.View<{ size?: number }>`
  flex: 1;
  /* display: flex; */
  /* justify-content: center; */
  align-items: center;
  /* border-width: 1px;
  border-color: black; */
  width: ${({ size }) => (size ? size : 30)}px;
  height: ${({ size }) => (size ? size : 30)}px;
`;

const CalendarItemInner = styled.View<{
  bgColor?: string;
  borderColor?: string;
}>`
  width: ${useResponsiveFontSize(35)}px;
  height: ${useResponsiveFontSize(35)}px;
  border-radius: ${useResponsiveFontSize(35 / 2)}px;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "none")};
  border-color: ${({ borderColor }) =>
    borderColor ? borderColor : "transparent"};
  border-width: ${useResponsiveFontSize(0.8)}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CalendarItemDot = styled.View`
  position: absolute;
  bottom: ${useResponsiveFontSize(4)}px;
  width: ${useResponsiveFontSize(4)}px;
  height: ${useResponsiveFontSize(4)}px;
  border-radius: ${useResponsiveFontSize(2)}px;
  background-color: ${({ theme }) => theme.palette.red};
`;

const CalendarItemText = styled.Text<{
  color: string;
  size: number;
  weight?: number;
}>`
  font-size: ${({ size }) => useResponsiveFontSize(size)}px;
  color: ${({ color }) => color};
  font-weight: ${({ weight }) => (weight ? weight : 400)};
`;

const ListHeaderComponent = () => {
  const DateType = ["일", "월", "화", "수", "목", "금", "토"];
  const themeContext = useTheme();
  const itemHeight = useAppSelect((state) => state.calendar.calendarItemHeight);

  return (
    <FlexBox>
      {DateType.map((item, index) => {
        const color =
          index === 0 ? themeContext.palette.red : themeContext.text;

        return (
          <CalendarItemContainer key={index} size={itemHeight}>
            <CalendarItemInner>
              <CalendarItemText weight={500} color={color} size={16}>
                {item}
              </CalendarItemText>
            </CalendarItemInner>
          </CalendarItemContainer>
        );
      })}
    </FlexBox>
  );
};

const CalendarItem = memo(({ item }: { item: TCalendarItem }) => {
  const itemHeight = useAppSelect((state) => state.calendar.calendarItemHeight);
  const themeContext = useTheme();
  const dispatch = useAppDispatch();
  const date = item.date.date();

  const onPress = (date: dayjs.Dayjs) => {
    dispatch(setCurrentDateString(date.toISOString() as IsoString));
  };

  const hasTodo = item.todoCount > 0;

  return (
    <CalendarItemContainer size={itemHeight}>
      <Pressable onPress={() => onPress(item.date)}>
        <CalendarItemInner
          bgColor={item.isSelected ? themeContext.text : "transparent"}
          borderColor={item.isToday ? themeContext.text : "transparent"}
        >
          <CalendarItemText
            color={
              item.isThisMonth
                ? item.isSelected
                  ? themeContext.textReverse
                  : themeContext.text
                : themeContext.textDimmer
            }
            size={14}
          >
            {date}
          </CalendarItemText>
        </CalendarItemInner>
      </Pressable>
      {item.isThisMonth && hasTodo && <CalendarItemDot></CalendarItemDot>}
    </CalendarItemContainer>
  );
});

function Calendar({ todos }: { todos: Todo[] }) {
  const calendarItems = useAppSelect((state) => state.calendar.calendarItems);

  const { recalculate } = useCalculateTodoCount({ todos });

  useFocusEffect(() => {
    recalculate();
  });

  const renderItem = ({ item }: { item: TCalendarItem }) => {
    return <CalendarItem item={item} />;
  };

  const dispatch = useDispatch();

  const onLayout = useResizeLayoutOnFocus({
    resizeFunction: (height) => dispatch(setItemContainerHeight(height)),
  });

  return (
    <CalendarContainer>
      <View
        style={{
          flex: 1,
        }}
        onLayout={onLayout}
      >
        <FlatList
          numColumns={7}
          data={calendarItems}
          keyExtractor={(item) => item.date.toISOString()}
          renderItem={renderItem}
          ListHeaderComponent={<ListHeaderComponent></ListHeaderComponent>}
        ></FlatList>
      </View>
    </CalendarContainer>
  );
}

export default memo(Calendar);
