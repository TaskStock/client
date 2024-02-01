import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import { IAlarmData } from "../../../screens/Alarm/AlarmScreen";
import { useAppSelect } from "../../../store/configureStore.hooks";
import {
  acceptRequestInAlarm,
  cancelRequestInAlarm,
  followInAlarm,
  unfollowInAlarm,
} from "../../../utils/Alarm/followInAlarm";
import { buttonRender } from "../../../utils/UserUtils/buttonRender";
import { formatToLocalMonthDay } from "../../../utils/convertUTCtoLocal";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import FlexBox from "../../atoms/FlexBox";
import FollowBtn from "../../atoms/FollowBtn";
import { IconProps, IconsWithoutFeedBack } from "../../atoms/Icons";
import Text from "../../atoms/Text";

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

const updateBtnText = (info) => {
  const {
    isFollowingMe,
    isFollowingYou,
    pending,
    private: isPrivate,
    displayAccept,
  } = info;

  if (displayAccept) {
    return "수락";
  } else {
    return buttonRender(pending, isPrivate, isFollowingMe, isFollowingYou);
  }
};

const AlarmBox = ({ item }: { item: IAlarmData }) => {
  const theme = useTheme();
  const navigation = useNavigation() as any;
  const { accessToken } = useAppSelect((state) => state.auth);

  const [alarmItem, setAlarmItem] = useState(item);
  const createdAt = formatToLocalMonthDay(alarmItem.created_time);

  const [buttonText, setButtonText] = useState("");

  const handleFollowChange = async () => {
    const { target_id: userId, private: isPrivate } = alarmItem.info;

    const updateAlarmInfo = (newInfo) => {
      setAlarmItem((prevAlarmItem) => ({
        ...prevAlarmItem,
        info: {
          ...prevAlarmItem.info,
          ...newInfo,
        },
      }));
    };

    try {
      switch (buttonText) {
        case "팔로우":
        case "맞팔로우":
          await followInAlarm(userId, accessToken);
          updateAlarmInfo({
            pending: isPrivate,
            isFollowingYou: !isPrivate,
          });
          break;
        case "팔로잉":
          await unfollowInAlarm(userId, accessToken);
          updateAlarmInfo({
            isFollowingYou: false,
          });
          break;
        case "요청됨":
          await cancelRequestInAlarm(userId, accessToken);
          updateAlarmInfo({
            pending: false,
            isFollowingYou: false,
          });
          break;
        case "수락":
          await acceptRequestInAlarm(userId, accessToken);
          updateAlarmInfo({
            displayAccept: false,
            isFollowingMe: true,
          });
          break;
        default:
          console.log("Invalid button text");
      }
    } catch (error) {
      console.error("handleFollowChange Failed: ", error);
    }
  };

  useEffect(() => {
    if (alarmItem.type === "sns") {
      setButtonText(updateBtnText(alarmItem.info));
      console.log("update buttonText in useEffect", alarmItem.info);
    }
  }, [alarmItem]);

  let handleOnPress;
  if (alarmItem.type === "admin") {
    // type === 'admin' 이면 클릭 시 notice_id의 상세페이지로 이동
    const { detail, title } = alarmItem.info;
    handleOnPress = () => {
      navigation.navigate("AlarmDetail", { detail, title, createdAt });
    };
  } else {
    // type === 'sns' or 'general' 이면 클릭 시 target_id의 상세페이지로 이동
    handleOnPress = () => {
      navigation.navigate("UserDetail", { userId: alarmItem.info.target_id });
    };
  }

  return (
    <AlarmContainer
      read={alarmItem.is_read}
      onPress={handleOnPress ? handleOnPress : undefined}
      disabled={!handleOnPress}
    >
      <Icon theme={theme} type={alarmItem.type} />
      <FlexBox
        direction="column"
        gap={spacing.padding}
        styles={{ paddingHorizontal: spacing.offset, flex: 1 }}
      >
        <Text size="md">{alarmItem.content}</Text>
        <Text size="sm" color={theme.textDim}>
          {createdAt}
        </Text>
      </FlexBox>
      {alarmItem.type === "sns" && (
        <FollowBtn text={buttonText} onPress={handleFollowChange} />
      )}
    </AlarmContainer>
  );
};

export default AlarmBox;