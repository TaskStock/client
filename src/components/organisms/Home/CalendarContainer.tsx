import { View, Dimensions } from "react-native";
import React, { memo, useEffect } from "react";
import HomeCalendar from "../HomeCalendar";
import { spacing } from "../../../constants/spacing";
import styled, { useTheme } from "styled-components/native";
import Text from "../../atoms/Text";
import FlexBox from "../../atoms/FlexBox";
import numberWithCommas from "../../../utils/useNumberWithCommas";
import dayjs from "dayjs";
import {
  useAppDispatch,
  useAppSelect,
} from "../../../store/configureStore.hooks";
import {
  setCurrentDateString,
  updateCalendarItemTodoCount,
} from "../../../store/modules/calendar";
import Icons from "../../atoms/Icons";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import { LinearGradient } from "expo-linear-gradient";
import { IsoString } from "../../../@types/calendar";
import useUser from "../../../hooks/useUser";
import useTodos from "../../../hooks/useTodos";

const clientHeight = Dimensions.get("window").height;

const Container = styled.View`
  width: 100%;
  flex: 1;
  border-radius: ${spacing.offset}px;
  margin-top: ${spacing.padding}px;
`;

const DateInfo = ({
  currentDate,
  onPressLeft,
  onPressRight,
}: {
  currentDate: dayjs.Dayjs;
  onPressLeft: () => void;
  onPressRight: () => void;
}) => {
  const theme = useTheme();

  const { user } = useUser();

  const data = {
    cumulative_value: user.cumulative_value,
    value_month_ago: user.value_month_ago,
  };

  const diff = data.cumulative_value - data.value_month_ago;
  const diff_rate =
    ((data.cumulative_value - data.value_month_ago) * 100) /
    data.cumulative_value;

  const renderDiffRate = diff_rate.toFixed(2);
  const formattedDate = currentDate.format("YYYY년 MM월");

  return (
    <FlexBox alignItems="flex-end">
      <View style={{ flex: 1 }}>
        <Text size="xl" weight="bold">
          {formattedDate}
        </Text>
        <FlexBox
          gap={spacing.padding / 2}
          styles={{ paddingTop: spacing.small }}
        >
          <Text size="sm" weight="regular" color={theme.textDim}>
            1개월 전보다
          </Text>
          <Text
            size="sm"
            weight="regular"
            color={diff > 0 ? theme.high : theme.low}
          >
            {numberWithCommas(diff)}원 ({renderDiffRate.toString()}%)
          </Text>
        </FlexBox>
      </View>
      <FlexBox
        gap={spacing.offset}
        styles={{
          paddingHorizontal: spacing.padding,
        }}
      >
        <Icons
          onPress={onPressLeft}
          type="entypo"
          name="chevron-thin-left"
          color={theme.text}
          size={useResponsiveFontSize(25)}
        />
        <Icons
          onPress={onPressRight}
          type="entypo"
          name="chevron-thin-right"
          color={theme.text}
          size={useResponsiveFontSize(25)}
        />
      </FlexBox>
    </FlexBox>
  );
};

const CalendarContainer = () => {
  const currentDate = dayjs(
    useAppSelect((state) => state.calendar.currentDateString)
  );

  const memorizedCurrentDate = React.useRef(
    dayjs(currentDate).format("YYYY-MM")
  );

  const { data: todos } = useTodos();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      todos &&
      dayjs(currentDate).format("YYYY-MM") !== memorizedCurrentDate.current
    ) {
      console.log("calculating todo count");

      memorizedCurrentDate.current = dayjs(currentDate).format("YYYY-MM");
      dispatch(updateCalendarItemTodoCount({ todos }));
    }
  }, [currentDate]);

  const theme = useTheme();

  const gradient =
    theme.name === "dark"
      ? [
          "rgba(255, 255, 255, 0.00)",
          "rgba(255, 255, 255, 0.09)",
          "rgba(255, 255, 255, 0.20)",
        ]
      : ["rgba(255, 255, 255, 0.00)", "rgba(255, 255, 255, 0.47)", "#FFFFFF"];

  const onPressLeft = () => {
    dispatch(
      setCurrentDateString(
        currentDate.subtract(1, "month").toISOString() as IsoString
      )
    );
  };

  const onPressRight = () => {
    dispatch(
      setCurrentDateString(
        currentDate.add(1, "month").toISOString() as IsoString
      )
    );
  };

  return (
    <View
      style={{
        paddingHorizontal: spacing.gutter,
        paddingTop: spacing.offset,
        flex: 1,
      }}
    >
      <DateInfo
        currentDate={currentDate}
        onPressLeft={onPressLeft}
        onPressRight={onPressRight}
      />
      <Container>
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: spacing.offset,
          }}
        ></LinearGradient>
        <HomeCalendar />
      </Container>
    </View>
  );
};

export default CalendarContainer;
