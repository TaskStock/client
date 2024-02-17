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
import { calculateUserDiffRate } from "../../../utils/calculateUserDiffRate";
import { IUserBox } from "../../../@types/userBox";

export const DateInfo = ({
  currentDate,
  onPressLeft,
  onPressRight,
  isShowingInfo = true,
  user,
}: {
  user: {
    value_yesterday_ago: IUserBox["value_yesterday_ago"];
    cumulative_value: IUserBox["cumulative_value"];
  };
  currentDate: dayjs.Dayjs;
  onPressLeft: () => void;
  onPressRight: () => void;
  isShowingInfo?: boolean;
}) => {
  const theme = useTheme();

  const { diff, renderDiffRate } = calculateUserDiffRate(user);

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
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        />
        <Icons
          onPress={onPressRight}
          type="entypo"
          name="chevron-thin-right"
          color={theme.text}
          size={useResponsiveFontSize(25)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        />
      </FlexBox>
    </FlexBox>
  );
};

const HomeCalendar = ({
  user: { value_yesterday_ago, cumulative_value },
  todos,
}: {
  todos: {
    data: Todo[] | undefined;
    isLoading: boolean;
    isError: boolean;
  };
  user: {
    value_yesterday_ago: IUserBox["value_yesterday_ago"];
    cumulative_value: IUserBox["cumulative_value"];
  };
}) => {
  const { currentDate, subtract1Month, add1Month } = useCurrentDate();

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
        user={{
          value_yesterday_ago,
          cumulative_value,
        }}
        currentDate={currentDate}
        onPressLeft={onPressLeft}
        onPressRight={onPressRight}
      />
      <ItemContainerBox>
        <Calendar todos={todos.data} />
      </ItemContainerBox>
    </View>
  );
};

export default HomeCalendar;
