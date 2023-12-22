import { FlatList, Pressable, View } from "react-native";
import React, { memo, useContext, useEffect, useMemo } from "react";
import Text from "../atoms/Text";
import styled, { useTheme } from "styled-components/native";
import { spacing } from "../../constants/spacing";
import dayjs from "dayjs";
import Icons from "../atoms/Icons";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import FlexBox from "../atoms/FlexBox";
import { useDispatch, useSelector } from "react-redux";
import { setItemHeight } from "../../store/modules/calendar";
import { RootState } from "../../store/configureStore";

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
`;

const CalendarItemContainer = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CalendarItemInner = styled.View<{
  bgColor?: string;
}>`
  width: 30px;
  height: 30px;
  border-radius: 30px;
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

const CalendarItem = ({
  item,
  currentDate,
  onPress,
}: {
  item: dayjs.Dayjs;
  currentDate: dayjs.Dayjs;
  onPress: (item: dayjs.Dayjs) => void;
}) => {
  const height = useSelector((state: RootState) => state.calendar.itemHeight);
  const themeContext = useTheme();
  const date = item.date();
  const notThisMonth = item.month() !== currentDate.month();

  const isSelected = useMemo(() => {
    return item.isSame(currentDate, "day");
  }, [currentDate, item]);

  return (
    <CalendarItemContainer>
      <Pressable onPress={() => onPress(item)}>
        <CalendarItemInner
          bgColor={isSelected ? themeContext.background : "transparent"}
        >
          <CalendarItemText
            color={!notThisMonth ? themeContext.text : themeContext.textDimmer}
            size={13}
          >
            {date}
          </CalendarItemText>
        </CalendarItemInner>
      </Pressable>
    </CalendarItemContainer>
  );
};

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
          setCurrentDate(item);
        }}
      />
    );
  };
  const [currentDate, setCurrentDate] = React.useState(dayjs());

  const calculateCalendar = () => {
    const startOfMonth = currentDate.startOf("month");
    // const startDay = now.set("date", 1);
    const startDay = startOfMonth.startOf("week");

    const endOfMonth = currentDate.endOf("month");
    const endDay = endOfMonth.endOf("week");

    const calendar = [];

    let day = startDay;
    while (day.isBefore(endDay)) {
      calendar.push(day);
      day = day.add(1, "day");
    }
    return calendar;
  };

  // const itemHeight = height / calculateWeek();
  const data = calculateCalendar();
  const headerText = currentDate.format("YYYY.MM");

  const dispatch = useDispatch();

  return (
    <CalendarContainer>
      <CalendarHeader>
        <Pressable
          onPress={() => {
            setCurrentDate(currentDate.subtract(1, "month"));
          }}
        >
          <Icons
            type="entypo"
            name="chevron-thin-left"
            color={themeContext.text}
            size={useResponsiveFontSize(22)}
          />
        </Pressable>
        <Text size="lg" weight="bold">
          {headerText}
        </Text>
        <Pressable
          onPress={() => {
            setCurrentDate(currentDate.add(1, "month"));
          }}
        >
          <Icons
            type="entypo"
            name="chevron-thin-right"
            color={themeContext.text}
            size={useResponsiveFontSize(22)}
          />
        </Pressable>
      </CalendarHeader>
      <CalendarContent
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
      </CalendarContent>
    </CalendarContainer>
  );
}
