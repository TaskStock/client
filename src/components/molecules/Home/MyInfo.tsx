import React from "react";
import { View } from "react-native";
import { useRecoilValue } from "recoil";
import { darkMode } from "../../../atom/theme";
import { darkTheme, grayTheme } from "../../../constants/colors";
import numberWithCommas from "../../../utils/useNumberWithCommas";
import FlexBox from "../../atoms/FlexBox";
import Text from "../../atoms/Text";
const MyInfo = ({ data }) => {
  const isDark = useRecoilValue(darkMode);
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
          color={isDark ? darkTheme.textDim : grayTheme.textDim}
        >
          1개월 전보다
        </Text>
        <Text
          size="sm"
          weight="regular"
          color={
            diff > 0
              ? isDark
                ? darkTheme.high
                : grayTheme.high
              : isDark
              ? darkTheme.low
              : grayTheme.low
          }
        >
          {numberWithCommas(diff)}원 ({renderDiffRate.toString()}%)
        </Text>
      </FlexBox>
    </View>
  );
};

export default MyInfo;
