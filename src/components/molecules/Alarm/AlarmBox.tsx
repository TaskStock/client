import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import { useClient } from "../../../hooks/useClient";
import { AlarmStackParamList } from "../../../navigators/AlarmStack";
import { IAlarmData } from "../../../screens/Alarm/AlarmScreen";
import {
  useAppDispatch,
  useAppSelect,
} from "../../../store/configureStore.hooks";
import {
  addFollowerCount,
  addFollowingCount,
  subFollowingCount,
} from "../../../store/modules/user";
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
import Icons, { IconProps } from "../../atoms/Icons";
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
      <Icons
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
  const navigation = useNavigation<NavigationProp<AlarmStackParamList>>();
  const dispatch = useAppDispatch();
  const client = useClient(dispatch);
  const { accessToken } = useAppSelect((state) => state.auth);

  const [alarmItem, setAlarmItem] = useState(item);

  useEffect(() => {
    setAlarmItem(item);
  }, [item]);
  const subText = formatToLocalMonthDay(alarmItem.created_time);

  const [buttonText, setButtonText] = useState("");

  const handleFollowChange = async () => {
    const {
      target_id: userId,
      private: isPrivate,
      isFollowingYou,
    } = alarmItem.info;

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
      let result;
      switch (buttonText) {
        case "팔로우":
        case "맞팔로우":
          result = await followInAlarm(
            userId,
            accessToken,
            alarmItem.notice_id,
            client
          );
          if (result === "success") {
            updateAlarmInfo({
              pending: isPrivate,
              isFollowingYou: !isPrivate,
            });
            if (!isPrivate) {
              dispatch(addFollowingCount());
            }
          } else {
            Toast.show({
              type: "error",
              text1: "서버에서 오류가 발생했습니다. 다시 시도해주세요.",
              visibilityTime: 2000,
              keyboardOffset: 100,
            });
          }

          break;
        case "팔로잉":
          result = await unfollowInAlarm(
            userId,
            accessToken,
            alarmItem.notice_id,
            client
          );
          if (result === "success") {
            updateAlarmInfo({
              isFollowingYou: false,
            });
            dispatch(subFollowingCount());
          } else {
            Toast.show({
              type: "error",
              text1: "서버에서 오류가 발생했습니다. 다시 시도해주세요.",
              visibilityTime: 2000,
              keyboardOffset: 100,
            });
          }
          break;
        case "요청됨":
          result = await cancelRequestInAlarm(
            userId,
            accessToken,
            alarmItem.notice_id,
            client
          );
          if (result === "success") {
            updateAlarmInfo({
              pending: false,
              isFollowingYou: false,
            });
          } else {
            Toast.show({
              type: "error",
              text1: "서버에서 오류가 발생했습니다. 다시 시도해주세요.",
              visibilityTime: 2000,
              keyboardOffset: 100,
            });
          }
          break;
        case "수락":
          result = await acceptRequestInAlarm(
            userId,
            accessToken,
            alarmItem.notice_id,
            client
          );
          if (result === "success") {
            updateAlarmInfo({
              displayAccept: false,
              isFollowingMe: true,
              isFollowingYou: isFollowingYou,
            });
            dispatch(addFollowerCount());
          } else {
            Toast.show({
              type: "error",
              text1: "서버에서 오류가 발생했습니다. 다시 시도해주세요.",
              visibilityTime: 2000,
              keyboardOffset: 100,
            });
          }
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
      // console.log("update buttonText in useEffect", alarmItem.info);
    }
  }, [alarmItem]);

  let handleOnPress;
  if (alarmItem.type === "admin") {
    // type === 'admin' 이면 클릭 시 notice_id의 상세페이지로 이동
    const { detail, title } = alarmItem.info;
    handleOnPress = () => {
      navigation.navigate("AlarmDetail", { detail, title, subText });
    };
  } else if (alarmItem.type === "badge") {
    // type === 'badge' 이면 클릭 시 뱃지 상세페이지로 이동
    console.log(alarmItem);
    handleOnPress = () => {
      navigation.navigate("MainTab", { screen: "Ranking" });
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
          {subText}
        </Text>
      </FlexBox>
      {alarmItem.type === "sns" && (
        <FollowBtn text={buttonText} onPress={handleFollowChange} />
      )}
    </AlarmContainer>
  );
};

export default AlarmBox;
