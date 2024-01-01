import dayjs from "dayjs";
import React, { memo, useMemo } from "react";
import { FlatList, Pressable, View } from "react-native";
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
import Icons from "../atoms/Icons";
import Text from "../atoms/Text";

const CalendarContainer = styled.View`
  border-radius: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px ${spacing.offset}px;
`;
const CalendarHeader = styled.View`
  width: 100%;
  padding: ${spacing.offset}px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const CalendarContent = styled.View`
  flex: 1;
  margin-bottom: ${spacing.offset}px;
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

  return (
    <FlexBox>
      {DateType.map((item, index) => {
        const color =
          index === 0 ? themeContext.palette.red : themeContext.text;

        return (
          <CalendarItemContainer key={index}>
            <CalendarItemInner>
              <CalendarItemText weight={500} color={color} size={15}>
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
    const height = useAppSelect((state) => state.calendar.itemHeight);
    const weeksOfMonth = useAppSelect((state) => state.calendar.weeksOfMonth);
    const themeContext = useTheme();
    const date = item.date();

    const itemHeight = weeksOfMonth > 0 ? height / (weeksOfMonth + 1) : 0;

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
              size={13}
            >
              {date}
            </CalendarItemText>
          </CalendarItemInner>
        </Pressable>
      </CalendarItemContainer>
    );
  }
);

export default function HomeCalendar() {
  const themeContext = useTheme();
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
          // setCurrentDate(item);
          dispatch(setCurrentDateString(item.toISOString()));
        }}
      />
    );
  };
  const currentDate = dayjs(
    useAppSelect((state) => state.calendar.currentDateString)
  );
  const data = useAppSelect((state) => state.calendar.datesOfMonth);
  const headerText = currentDate.format("YYYY.MM");
  const dispatch = useDispatch();

  return (
    <CalendarContainer>
      <CalendarHeader>
        <Icons
          onPress={() => {
            dispatch(
              setCurrentDateString(
                currentDate.subtract(1, "month").toISOString()
              )
            );
          }}
          type="entypo"
          name="chevron-thin-left"
          color={themeContext.text}
          size={useResponsiveFontSize(22)}
        />
        <Pressable
          onPress={() => {
            // setOpen(true);
          }}
        >
          <Text size="lg" weight="bold">
            {headerText}
          </Text>
        </Pressable>

        <Icons
          onPress={() => {
            dispatch(
              setCurrentDateString(currentDate.add(1, "month").toISOString())
            );
          }}
          type="entypo"
          name="chevron-thin-right"
          color={themeContext.text}
          size={useResponsiveFontSize(22)}
        />
      </CalendarHeader>
      <CalendarContent>
        <View
          style={{
            flex: 1,
          }}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;

            dispatch(setItemHeight(height));
          }}
        >
          <FlatList
            numColumns={7}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            ListHeaderComponent={<ListHeaderComponent></ListHeaderComponent>}
          ></FlatList>
        </View>
      </CalendarContent>
    </CalendarContainer>
  );
}
