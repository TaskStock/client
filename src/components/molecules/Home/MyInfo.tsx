import React from "react";
import { View } from "react-native";
import { darkTheme, grayTheme } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { useAppSelect } from "../../../store/configureStore.hooks";
import numberWithCommas from "../../../utils/useNumberWithCommas";
import FlexBox from "../../atoms/FlexBox";
import Text from "../../atoms/Text";

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
  const theme = useAppSelect((state) => state.theme.value);
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
      <FlexBox gap={spacing.padding / 2} styles={{ paddingTop: spacing.small }}>
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
