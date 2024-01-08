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
import { IsoString } from "../../@types/calendar";

const CalendarContainer = styled.View`
  border-radius: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: ${spacing.offset}px;
  padding-top: ${spacing.padding}px;
`;

const CalendarItemContainer = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CalendarItemInner = styled.View<{
  bgColor?: string;
  size?: number;
}>`
  width: ${({ size }) => (size ? size : 30)}px;
  height: ${({ size }) => (size ? size : 30)}px;
  border-radius: ${({ size }) => (size ? size : 30) / 2}px;
  display: flex;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "none")};
  justify-content: center;
  align-items: center;
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
          <CalendarItemContainer key={index}>
            <CalendarItemInner size={itemHeight}>
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
  }: {
    item: dayjs.Dayjs;
    currentDate: dayjs.Dayjs;
    onPress: (item: dayjs.Dayjs) => void;
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

    return (
      <CalendarItemContainer>
        <Pressable onPress={() => onPress(item)}>
          <CalendarItemInner
            size={itemHeight}
            bgColor={isSelected ? themeContext.background : "transparent"}
          >
            <CalendarItemText
              color={
                !notThisMonth ? themeContext.text : themeContext.textDimmer
              }
              size={14}
            >
              {date}
            </CalendarItemText>
          </CalendarItemInner>
        </Pressable>
      </CalendarItemContainer>
    );
  }
);

export default function HomeCalendar({
  currentDate,
}: {
  currentDate: dayjs.Dayjs;
}) {
  const renderItem = ({
    item,
    index,
  }: {
    item: dayjs.Dayjs;
    index: number;
  }) => {
    return (
      <CalendarItem
        item={item}
        currentDate={currentDate}
        onPress={(item: dayjs.Dayjs) => {
          dispatch(setCurrentDateString(item.toISOString() as IsoString));
        }}
      />
    );
  };
  const data = useAppSelect((state) => state.calendar.datesOfMonth);
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
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListHeaderComponent={<ListHeaderComponent></ListHeaderComponent>}
        ></FlatList>
      </View>
    </CalendarContainer>
  );
}
