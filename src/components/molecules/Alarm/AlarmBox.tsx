import React from "react";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import { IAlarmData } from "../../../screens/Alarm/AlarmScreen";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import FlexBox from "../../atoms/FlexBox";
import FollowBtn from "../../atoms/FollowBtn";
import { IconProps, IconsWithoutFeedBack } from "../../atoms/Icons";
import Text from "../../atoms/Text";
import { useNavigation } from "@react-navigation/native";
import { formatToLocalMonthDay } from "../../../utils/convertUTCtoLocal";

const AlarmContainer = styled.TouchableOpacity<{ read: boolean }>`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: ${spacing.offset}px ${spacing.offset}px;
  background-color: ${({ theme, read }) =>
    read ? theme.background : theme.box};
`;
const IconContainer = styled.View`
  width: ${useResponsiveFontSize(48)}px;
  height: ${useResponsiveFontSize(48)}px;
  align-items: center;
  justify-content: center;
`;

const Icon = ({ theme, type }) => {
  let iconType: IconProps["type"] = "feather";
  let iconName = "trending-up";
  let iconColor = theme.high;
  let iconSize = useResponsiveFontSize(30);
  if (type === "sns") {
    iconType = "materialIcons";
    iconName = "person-outline";
    iconColor = theme.text;
    iconSize = useResponsiveFontSize(40);
  } else if (type === "admin") {
    iconType = "materialIcons";
    iconName = "emoji-people";
    iconColor = theme.text;
    iconSize = useResponsiveFontSize(40);
  }
  return (
    <IconContainer>
      <IconsWithoutFeedBack
        type={iconType}
        name={iconName}
        size={iconSize}
        color={iconColor}
      />
    </IconContainer>
  );
};

const AlarmBox = ({ item }: { item: IAlarmData }) => {
  const theme = useTheme();
  const { type, content, created_time, is_read, info, notice_id } = item;
  const navigation = useNavigation() as any;

  const createdAt = formatToLocalMonthDay(created_time);

  let handleOnPress;
  if (type === "admin") {
    // type === 'admin' 이면 클릭 시 notice_id의 상세페이지로 이동
    const { detail, title } = info;
    handleOnPress = () => {
      navigation.navigate("AlarmDetail", { detail, title, createdAt });
    };
  } else if (type === "sns") {
    // type === 'sns' 이면 팔로우버튼
    const { follower_id, isFollowingMe, isFollowingYou, pending } = info;
  } else if (type === "general") {
    // type === 'general' 이면 클릭 시 target_id의 상세페이지로 이동
    const { target_id } = info;
    handleOnPress = () => {
      navigation.navigate("UserDetail", { userId: target_id });
    };
  }

  return (
    <AlarmContainer
      read={type !== "sns" ? is_read : false}
      onPress={handleOnPress ? handleOnPress : undefined}
      disabled={type !== "sns" ? !handleOnPress : true}
    >
      <Icon theme={theme} type={type} />
      <FlexBox
        direction="column"
        gap={spacing.padding}
        styles={{ paddingHorizontal: spacing.offset, flex: 1 }}
      >
        <Text size="md">{content}</Text>
        <Text size="sm" color={theme.textDim}>
          {createdAt}
        </Text>
      </FlexBox>
      {type === "sns" && <FollowBtn text="팔로우" onPress={() => {}} />}
    </AlarmContainer>
  );
};

export default AlarmBox;
