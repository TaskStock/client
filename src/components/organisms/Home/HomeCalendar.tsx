import { View } from "react-native";
import React, { memo, useEffect } from "react";
import Calendar from "../../molecules/Calendar";
import { spacing } from "../../../constants/spacing";
import { useTheme } from "styled-components/native";
import Text from "../../atoms/Text";
import FlexBox from "../../atoms/FlexBox";
import numberWithCommas from "../../../utils/useNumberWithCommas";
import dayjs from "dayjs";
import Icons from "../../atoms/Icons";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import useUser from "../../../hooks/useUser";
import useTodos from "../../../hooks/useTodos";
import ItemContainerBox from "../../molecules/ItemContainerBox";
import { useCurrentDate } from "../../../hooks/useCurrentDate";
import { Todo } from "../../../@types/todo";

export const DateInfo = ({
  currentDate,
  onPressLeft,
  onPressRight,
  isShowingInfo = true,
}: {
  currentDate: dayjs.Dayjs;
  onPressLeft: () => void;
  onPressRight: () => void;
  isShowingInfo?: boolean;
}) => {
  const theme = useTheme();

  const { user } = useUser();

  const data = {
    cumulative_value: user.cumulative_value,
    value_month_ago: user.value_yesterday_ago,
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
        {isShowingInfo && (
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
        )}
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

const HomeCalendar = () => {
  const { currentDate, subtract1Month, add1Month } = useCurrentDate();
  const { data: todos } = useTodos();

  const onPressLeft = subtract1Month;
  const onPressRight = add1Month;

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
      <ItemContainerBox>
        <Calendar todos={todos} />
      </ItemContainerBox>
    </View>
  );
};

export default HomeCalendar;
