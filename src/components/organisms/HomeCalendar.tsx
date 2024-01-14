import dayjs from "dayjs";
import React, { memo, useMemo } from "react";
import { FlatList, LayoutChangeEvent, Pressable, View } from "react-native";
import { useDispatch } from "react-redux";
import styled, { useTheme } from "styled-components/native";
import { spacing } from "../../constants/spacing";
import { useAppDispatch, useAppSelect } from "../../store/configureStore.hooks";
import {
  setCurrentDateString,
  setItemHeight,
} from "../../store/modules/calendar";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import FlexBox from "../atoms/FlexBox";
import {
  CalendarItem as TCalendarItem,
  IsoString,
} from "../../@types/calendar";

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

// 왜그런건가?

// 1. 토글을 한다. -> todoitem이 바뀐다.

// 2. 그에 따라서, 투두아이템이 바뀐다. -> 투두아이템이 바뀌면, hasTOdoDATES가 바뀐다.

// 그로인해 모든 캘린더 아이템이 리렌더링된다.

// hasTodoDates는, 투두가 추가, 삭제 될때 변경되어야 한다.

// 그럼 추가 삭제될때 hasTodoDates가 다시 계산되면,

// 모든 캘린더 아이템이 바뀌는건 맞는건가?

// 아니 그냥 그 날짜에 해당하는 캘린더 아이템만 바뀌면 되는거 아닌가?
// 그럼 그 날짜에 해당하는 캘린더 아이템만 바뀌게 하려면 어떻게 해야할까?
// 렌더되는 아이템을, 날짜 + hasTodoDates로 한다음에,

// 그러니까 처음 마운트, or 날짜가 바뀔때

// 투두 아이템들이 바뀌면, 그에 따라서 calendarItems가 업데이트 되어야 하는데,
const CalendarItem = memo(
  ({ item, hasTodo }: { item: TCalendarItem; hasTodo: boolean }) => {
    const itemHeight = useAppSelect((state) => state.calendar.itemHeight);
    const themeContext = useTheme();
    console.log("CalendarItem rerendered", item.date.date());

    const dispatch = useAppDispatch();
    const date = item.date.date();

    // const notThisMonth = useMemo(() => {
    //   return item.date.month() !== currentDate.month();
    // }, [currentDate, item]);

    // const isSelected = useMemo(() => {
    //   return item.date.isSame(currentDate, "day");
    // }, [currentDate, item]);

    // const isToday = useMemo(() => {
    //   return item.date.isSame(dayjs(), "day");
    // }, [item]);

    const onPress = (date: dayjs.Dayjs) => {
      dispatch(setCurrentDateString(date.toISOString() as IsoString));
    };

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
  }
);

export default function HomeCalendar({
  currentDate,
}: {
  currentDate: dayjs.Dayjs;
}) {
  const calendarItems = useAppSelect((state) => state.calendar.calendarItems);

  const renderItem = ({
    item,
    index,
  }: {
    item: TCalendarItem;
    index: number;
  }) => {
    // 얘는 렌더할때 필요한건가? ㄴㄴ 처음에 투두아이템을 받아왔을때 필요한것이다.
    // 그리고 투두아이템이 바뀌거나 했을때.

    const hasTodo = false;

    // const hasTodo = hasTodoDates.some((date) =>
    //   checkIsSameLocalDay(date, item.toISOString())
    // );

    return <CalendarItem item={item} hasTodo={hasTodo} />;
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
          data={calendarItems}
          keyExtractor={(item) => item.date.toISOString()}
          renderItem={renderItem}
          ListHeaderComponent={<ListHeaderComponent></ListHeaderComponent>}
        ></FlatList>
      </View>
    </CalendarContainer>
  );
}
