import { View, Dimensions } from "react-native";
import React from "react";
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
import { setCurrentDateString } from "../../../store/modules/calendar";
import Icons from "../../atoms/Icons";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";

const clientHeight = Dimensions.get("window").height;

const Container = styled.View`
  width: 100%;
  flex: 1;
  border-radius: ${spacing.offset}px;
  margin-top: ${spacing.padding}px;
  background-color: ${(props) => props.theme.box};
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

  const data = {
    cumulative_value: 100000,
    value_month_ago: 10000,
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

  const dispatch = useAppDispatch();

  const subtract1Month = () => {
    dispatch(
      setCurrentDateString(currentDate.subtract(1, "month").toISOString())
    );
  };

  const add1Month = () => {
    dispatch(setCurrentDateString(currentDate.add(1, "month").toISOString()));
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
        onPressLeft={subtract1Month}
        onPressRight={add1Month}
      />
      <Container>
        <HomeCalendar currentDate={currentDate} />
      </Container>
    </View>
  );
};

export default CalendarContainer;
