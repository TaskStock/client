import React from "react";
import { View } from "react-native";
import { useTheme } from "styled-components";
import { spacing } from "../../../constants/spacing";
import numberWithCommas from "../../../utils/useNumberWithCommas";
import FlexBox from "../../atoms/FlexBox";
import Text from "../../atoms/Text";

const HomeUserInfo = ({
  data,
}: {
  data: {
    cumulative_value: number;
    value_month_ago: number;
    nickname: string;
  };
}) => {
  const theme = useTheme();
  const diff = data.cumulative_value - data.value_month_ago;
  const diff_rate =
    ((data.cumulative_value - data.value_month_ago) * 100) /
    data.cumulative_value;

  const renderDiffRate = diff_rate.toFixed(2);

  return (
    <FlexBox alignItems="flex-end">
      <View>
        <Text size="xl" weight="bold">
          {data.nickname}님
        </Text>
        <Text size="xl" weight="bold">
          {numberWithCommas(data.cumulative_value)}원
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
    </FlexBox>
  );
};

export default HomeUserInfo;
