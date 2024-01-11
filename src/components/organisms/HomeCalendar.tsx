import dayjs from "dayjs";
import React, { memo, useMemo } from "react";
import { FlatList, LayoutChangeEvent, Pressable, View } from "react-native";
import { useDispatch } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { spacing } from "../../constants/spacing";
import { useAppSelect } from "../../store/configureStore.hooks";
import {
  setCurrentDateString,
  setItemHeight,
} from "../../store/modules/calendar";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import FlexBox from "../atoms/FlexBox";
import { DateString, IsoString } from "../../@types/calendar";
import { useGetAllTodosQuery } from "../../store/modules/todo/todo";
import { checkIsSameLocalDay } from "../../utils/checkIsSameLocalDay";
import useTodos from "../../hooks/useTodos";
import { Todo } from "../../@types/todo";

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
  const itemHeight = useAppSelect((state) => state.calendar.itemHeight);

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

const CalendarItem = memo(
  ({
    item,
    currentDate,
    onPress,
    hasTodo,
  }: {
    item: dayjs.Dayjs;
    currentDate: dayjs.Dayjs;
    onPress: (item: dayjs.Dayjs) => void;
    hasTodo: boolean;
  }) => {
    const itemHeight = useAppSelect((state) => state.calendar.itemHeight);
    const themeContext = useTheme();

    const date = item.date();

    const notThisMonth = useMemo(() => {
      return item.month() !== currentDate.month();
    }, [currentDate, item]);

    const isSelected = useMemo(() => {
      return item.isSame(currentDate, "day");
    }, [currentDate, item]);

    const isToday = useMemo(() => {
      return item.isSame(dayjs(), "day");
    }, [item]);

    return (
      <CalendarItemContainer size={itemHeight}>
        <Pressable onPress={() => onPress(item)}>
          <CalendarItemInner
            bgColor={isSelected ? themeContext.text : "transparent"}
            borderColor={isToday ? themeContext.text : "transparent"}
          >
            <CalendarItemText
              color={
                !notThisMonth
                  ? isSelected
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
        {!notThisMonth && hasTodo && <CalendarItemDot></CalendarItemDot>}
      </CalendarItemContainer>
    );
  }
);

export default function HomeCalendar({
  currentDate,
}: {
  currentDate: dayjs.Dayjs;
}) {
  const { data: todos } = useTodos();

  const hasTodoDates: string[] = useMemo(() => {
    function extractDatesWithTodos(todos: Todo[]): string[] {
      const uniqueDatesSet = new Set<string>();

      todos.forEach((todo) => {
        if (todo.date && todo.date.trim() !== "") {
          uniqueDatesSet.add(todo.date);
        }
      });

      // Convert the Set to an array to get the final result
      const uniqueDatesArray: string[] = Array.from(uniqueDatesSet);

      return uniqueDatesArray;
    }

    return extractDatesWithTodos(todos);
  }, [todos]);

  console.log(hasTodoDates);

  const renderItem = ({
    item,
    index,
  }: {
    item: dayjs.Dayjs;
    index: number;
  }) => {
    // 얘는 렌더할때 필요한건가? ㄴㄴ 처음에 투두아이템을 받아왔을때 필요한것이다.
    // 그리고 투두아이템이 바뀌거나 했을때.

    const hasTodo = hasTodoDates.some((date) => {
      return checkIsSameLocalDay(date, item.toISOString());
    });

    return (
      <CalendarItem
        item={item}
        currentDate={currentDate}
        hasTodo={hasTodo}
        onPress={(item: dayjs.Dayjs) => {
          dispatch(setCurrentDateString(item.toISOString() as IsoString));
        }}
      />
    );
  };
  const datesOfMonth = useAppSelect((state) => state.calendar.datesOfMonth);
  const dispatch = useDispatch();

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    dispatch(setItemHeight(height));
  };

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
          data={datesOfMonth}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListHeaderComponent={<ListHeaderComponent></ListHeaderComponent>}
        ></FlatList>
      </View>
    </CalendarContainer>
  );
}
