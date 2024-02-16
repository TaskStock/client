import React, { useEffect } from "react";
import { Pressable, View } from "react-native";
import { useTheme } from "styled-components";
import { spacing } from "../../../constants/spacing";
import numberWithCommas from "../../../utils/useNumberWithCommas";
import FlexBox from "../../atoms/FlexBox";
import Text from "../../atoms/Text";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import CustomSkeleton from "../../atoms/CustomSkeleton";
import createBadgeDispatcher from "../../../utils/badgeUtils/badge";
import { useAppDispatch } from "../../../store/configureStore.hooks";
import { calculateUserDiffRate } from "../../../utils/calculateUserDiffRate";
import { showSuccessToast } from "../../../utils/showToast";

const HomeUserInfo = ({
  data,
  isLoading,
  error,
  refetch,
  isMyData,
}: {
  data: {
    cumulative_value: number;
    value_yesterday_ago: number;
    nickname: string;
  };
  isLoading: boolean;
  error: string | null;
  refetch?: () => void;
  isMyData: boolean;
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { diff, diff_rate, renderDiffRate } = calculateUserDiffRate({
    cumulative_value: data.cumulative_value,
    value_yesterday_ago: data.value_yesterday_ago,
  });

  const badgeFunctions = createBadgeDispatcher(dispatch);

  useEffect(() => {
    if (!isMyData) {
      console.log("다른 사람의 데이터입니다.");
      return;
    }

    if (data.cumulative_value >= 100000 && data.cumulative_value < 200000) {
      badgeFunctions.reached10K();
      showSuccessToast("새로운 뱃지를 획득했어요!🔥");
    } else if (
      data.cumulative_value >= 200000 &&
      data.cumulative_value < 500000
    ) {
      badgeFunctions.reached20K();
      showSuccessToast("새로운 뱃지를 획득했어요!🔥");
    } else if (
      data.cumulative_value >= 500000 &&
      data.cumulative_value < 1000000
    ) {
      badgeFunctions.reached50K();
      showSuccessToast("새로운 뱃지를 획득했어요!🔥");
    } else if (data.cumulative_value >= 1000000) {
      badgeFunctions.reached100K();
      showSuccessToast("새로운 뱃지를 획득했어요!🔥");
    }

    if (diff_rate == 11) {
      badgeFunctions.reached11Percent();
      showSuccessToast("새로운 뱃지를 획득했어요!🔥");
    } else if (diff_rate >= 50) {
      badgeFunctions.reached50Percent();
      showSuccessToast("새로운 뱃지를 획득했어요!🔥");
    }
  }, [data.cumulative_value, diff_rate]);

  return (
    <FlexBox alignItems="flex-end">
      {isLoading ? (
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
      ) : !error ? (
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
      ) : (
        <Pressable
          onPress={() => {
            refetch && refetch();
          }}
        >
          <Text size="md">에러가 발생했어요</Text>
          <Text size="md">다시 시도하기</Text>
        </Pressable>
      )}
    </FlexBox>
  );
};

export default HomeUserInfo;
