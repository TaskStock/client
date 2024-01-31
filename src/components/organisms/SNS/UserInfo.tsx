import { View } from "react-native";
import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import FlexBox from "../../atoms/FlexBox";
import { IconsWithoutFeedBack } from "../../atoms/Icons";
import Text from "../../atoms/Text";
import PrivateLockIcon from "../../atoms/PrivateLockIcon";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import numberWithCommas from "../../../utils/useNumberWithCommas";
import ProfilePic from "../../atoms/ProfilePic";
import FollowBtn from "../../atoms/FollowBtn";
import {
  useAppDispatch,
  useAppSelect,
} from "../../../store/configureStore.hooks";
import {
  cancelRequestThunk,
  followThunk,
  unfollowThunk,
} from "../../../utils/UserUtils/followThunk";

const Container = styled.View`
  padding: ${spacing.padding}px ${spacing.offset}px ${spacing.offset}px;
  border-width: 1px;
  border-color: transparent;
  border-bottom-color: ${({ theme }) => theme.textDimmer};
`;

const Info = ({ text, iconType, iconName, color }) => {
  return (
    <FlexBox alignItems="center" gap={spacing.padding}>
      <IconsWithoutFeedBack
        name={iconName}
        type={iconType}
        size={17}
        color={color}
      />
      <Text size="xs">{text}</Text>
    </FlexBox>
  );
};

// strategy 필요
const UserInfo = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const data = useAppSelect((state) => state.friends.targetUser);

  const handleFollow = () => {
    switch (data.button) {
      case "팔로우":
      case "맞팔로우":
        dispatch(followThunk(data.user_id));
        break;
      case "팔로잉":
        dispatch(unfollowThunk(data.user_id));
        break;
      case "요청됨":
        dispatch(cancelRequestThunk(data.user_id));
        break;
    }
  };

  return (
    <Container>
      <FlexBox gap={spacing.offset} alignItems="center">
        <ProfilePic image={data.image} strategy={data.strategy} />
        <View>
          <FlexBox alignItems="center" gap={spacing.offset}>
            <Text
              size="lg"
              weight="semibold"
              styles={{ paddingBottom: spacing.small }}
            >
              {data.user_name}
            </Text>
            <PrivateLockIcon isPrivate={data.private} />
          </FlexBox>
          <Text size="xs" color={theme.textDim}>
            {data.introduce ? data.introduce : ""}
          </Text>
        </View>
      </FlexBox>
      <FlexBox alignItems="flex-end" justifyContent="space-between">
        <FlexBox
          direction="column"
          gap={useResponsiveFontSize(2)}
          styles={{ paddingTop: spacing.padding, paddingLeft: spacing.small }}
        >
          <Info
            text={`현재 가치 ${numberWithCommas(data.cumulative_value)}원`}
            iconName={"line-graph"}
            iconType={"entypo"}
            color={theme.text}
          />
          <Info
            text={`${data.follower_count} 팔로워 · ${data.following_count} 팔로잉`}
            iconName={"person-outline"}
            iconType={"materialIcons"}
            color={theme.text}
          />
          <Info
            text={`뱃지`}
            iconName={"trophy-award"}
            iconType={"material"}
            color={theme.text}
          />
        </FlexBox>
        <FollowBtn onPress={handleFollow} text={data.button} />
      </FlexBox>
    </Container>
  );
};

export default UserInfo;
