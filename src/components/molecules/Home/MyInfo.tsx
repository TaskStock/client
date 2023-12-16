import { View } from "react-native";
import React, { useState } from "react";
import Text from "../../atoms/Text";
import numberWithCommas from "../../../utils/useNumberWithCommas";
import FlexBox from "../../atoms/FlexBox";
import { grayTheme } from "../../../constants/colors";

const MyInfo = ({ data }) => {
  const diff = data.cumulative_value - data.value_month_ago;
  //   계산법 수정 필요
  const diff_rate = (data.cumulative_value - data.value_month_ago) / 1000;

  return (
    <View>
      <Text size="xl" weight="bold">
        {data.nickname}님
      </Text>
      <Text size="xl" weight="bold">
        {numberWithCommas(data.cumulative_value)}원
      </Text>
      <FlexBox gap={5} styles={{ paddingTop: 4 }}>
        <Text size="sm" weight="regular" color={grayTheme.textDim}>
          1개월 전보다
        </Text>
        <Text
          size="sm"
          weight="regular"
          color={diff > 0 ? grayTheme.high : grayTheme.low}
        >
          {numberWithCommas(diff)}원 ({diff_rate.toString()}%)
        </Text>
      </FlexBox>
    </View>
  );
};

export default MyInfo;
