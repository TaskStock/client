import { View, Dimensions } from "react-native";
import React from "react";
import HomeCalendar from "../HomeCalendar";
import { spacing } from "../../../constants/spacing";
import styled, { useTheme } from "styled-components/native";
import Text from "../../atoms/Text";
import FlexBox from "../../atoms/FlexBox";
import numberWithCommas from "../../../utils/useNumberWithCommas";

const clientHeight = Dimensions.get("window").height;

const Container = styled.View`
  width: 100%;
  flex: 1;
  border-radius: ${spacing.offset}px;
  margin-top: ${spacing.padding}px;
  background-color: ${(props) => props.theme.box};
`;

const DateInfo = () => {
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

  return (
    <View>
      <Text size="xl" weight="bold">
        2023년 1월
      </Text>
      <FlexBox gap={spacing.padding / 2} styles={{ paddingTop: spacing.small }}>
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
  );
};
const CalendarContainer = () => {
  return (
    <View
      style={{
        paddingHorizontal: spacing.gutter,
        paddingTop: spacing.offset,
        flex: 1,
        // height: clientHeight * 0.33,
      }}
    >
      <DateInfo />
      <Container>
        <HomeCalendar />
      </Container>
    </View>
  );
};

export default CalendarContainer;
