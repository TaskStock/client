import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { darkTheme, grayTheme } from "../../../constants/colors";
import numberWithCommas from "../../../utils/useNumberWithCommas";
import FlexBox from "../../atoms/FlexBox";
import Text from "../../atoms/Text";
import { RootState } from "../../../store/configureStore";

const THEME_CONSTANTS = {
  dark: {
    textDim: darkTheme.textDim,
    high: darkTheme.high,
    low: darkTheme.low,
  },
  gray: {
    textDim: grayTheme.textDim,
    high: grayTheme.high,
    low: grayTheme.low,
  },
};

const MyInfo = ({ data }) => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const diff = data.cumulative_value - data.value_month_ago;
  const diff_rate =
    ((data.cumulative_value - data.value_month_ago) * 100) /
    data.cumulative_value;

  const renderDiffRate = diff_rate.toFixed(2);

  return (
    <View>
      <Text size="xl" weight="bold">
        {data.nickname}님
      </Text>
      <Text size="xl" weight="bold">
        {numberWithCommas(data.cumulative_value)}원
      </Text>
      <FlexBox gap={5} styles={{ paddingTop: 4 }}>
        <Text
          size="sm"
          weight="regular"
          color={THEME_CONSTANTS[theme]?.textDim}
        >
          1개월 전보다
        </Text>
        <Text
          size="sm"
          weight="regular"
          color={
            diff > 0
              ? THEME_CONSTANTS[theme]?.high
              : THEME_CONSTANTS[theme]?.low
          }
        >
          {numberWithCommas(diff)}원 ({renderDiffRate.toString()}%)
        </Text>
      </FlexBox>
    </View>
  );
};

export default MyInfo;
