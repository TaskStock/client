import React from "react";
import { Pressable, View } from "react-native";
import { useTheme } from "styled-components";
import { spacing } from "../../../constants/spacing";
import numberWithCommas from "../../../utils/useNumberWithCommas";
import FlexBox from "../../atoms/FlexBox";
import Text from "../../atoms/Text";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import CustomSkeleton from "../../atoms/CustomSkeleton";

const HomeUserInfo = ({
  data,
  isLoading,
  error,
}: {
  data: {
    cumulative_value: number;
    value_yesterday_ago: number;
    nickname: string;
  };
  isLoading: boolean;
  error: string | null;
}) => {
  const theme = useTheme();
  const diff = data.cumulative_value - data.value_yesterday_ago;
  const diff_rate =
    ((data.cumulative_value - data.value_yesterday_ago) * 100) /
    data.cumulative_value;

  const renderDiffRate = diff_rate.toFixed(2);

  return (
    <FlexBox alignItems="flex-end">
      {isLoading || error ? (
        <CustomSkeleton>
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={100}
              height={22}
              borderRadius={4}
              marginBottom={4}
            />
            <SkeletonPlaceholder.Item
              width={100}
              height={22}
              borderRadius={4}
              marginBottom={4}
            />
            <SkeletonPlaceholder.Item
              width={200}
              height={20}
              borderRadius={4}
              marginBottom={4}
            />
          </SkeletonPlaceholder.Item>
        </CustomSkeleton>
      ) : (
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
              어제보다
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
      )}
    </FlexBox>
  );
};

export default HomeUserInfo;
