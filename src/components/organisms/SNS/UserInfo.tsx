import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, Pressable, TouchableOpacity, View } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import {
  useAppDispatch,
  useAppSelect,
} from "../../../store/configureStore.hooks";
import {
  cancelRequestThunk,
  followThunk,
  unfollowThunk,
} from "../../../utils/UserUtils/followThunk";
import numberWithCommas from "../../../utils/useNumberWithCommas";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import FlexBox from "../../atoms/FlexBox";
import FollowBtn from "../../atoms/FollowBtn";
import Icons from "../../atoms/Icons";
import PrivateLockIcon from "../../atoms/PrivateLockIcon";
import ProfilePic from "../../atoms/ProfilePic";
import Text from "../../atoms/Text";
import BadgesPreview from "../../molecules/SNS/BadgesPreview";
import ZoomPicModal from "./ZoomPicModal";

const Container = styled.View`
  padding: ${spacing.padding}px ${spacing.gutter}px ${spacing.offset}px;
  border-width: 1px;
  border-color: transparent;
  border-bottom-color: ${({ theme }) => theme.textDimmer};
`;

const Info = ({ text, iconType, iconName, color }) => {
  return (
    <FlexBox alignItems="center" gap={spacing.padding}>
      <Icons name={iconName} type={iconType} size={17} color={color} />
      <Text size="sm">{text}</Text>
    </FlexBox>
  );
};

const UserInfo = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { targetUser: data, badges } = useAppSelect((state) => state.friends);

  const current_user_id = useAppSelect((state) => state.user.user.user_id);

  const navigation = useNavigation() as any;
  const handleFollow = () => {
    switch (data.button) {
      case "팔로우":
      case "맞팔로우":
        dispatch(
          followThunk({ followingId: data.user_id, isPrivate: data.private })
        );
        break;
      case "팔로잉":
        dispatch(unfollowThunk(data.user_id));
        break;
      case "요청됨":
        dispatch(cancelRequestThunk(data.user_id));
        break;
    }
  };
  const { width: clientWidth } = Dimensions.get("window");

  const [picZoomModal, setPicZoomModal] = useState(false);
  return (
    <Container>
      <ZoomPicModal
        picZoomModal={picZoomModal}
        setPicZoomModal={setPicZoomModal}
      >
        <ProfilePic
          image={data.image}
          strategy={data.strategy}
          size={clientWidth * 0.6}
        />
      </ZoomPicModal>
      <FlexBox gap={spacing.offset} alignItems="center">
        <TouchableOpacity onPress={() => setPicZoomModal(true)}>
          <ProfilePic image={data.image} strategy={data.strategy} />
        </TouchableOpacity>
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
          <Text size="sm" color={theme.textDim}>
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
          <Pressable
            onPress={() =>
              navigation.navigate("UserFollowing", {
                userId: data.user_id,
                src: data.image,
                username: data.user_name,
              })
            }
          >
            <Info
              text={`${data.follower_count} 팔로워 · ${data.following_count} 팔로잉`}
              iconName={"person-outline"}
              iconType={"materialIcons"}
              color={theme.text}
            />
          </Pressable>
          {badges.length > 0 && (
            <BadgesPreview
              badges={badges}
              onPress={() => navigation.navigate("Badge", { type: "friend" })}
            />
          )}
        </FlexBox>
        {current_user_id !== data.user_id && (
          <FollowBtn onPress={handleFollow} text={data.button} />
        )}
      </FlexBox>
    </Container>
  );
};

export default UserInfo;
