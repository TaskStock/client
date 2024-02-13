import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import { useAppSelect } from "../../../store/configureStore.hooks";
import numberWithCommas from "../../../utils/useNumberWithCommas";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import FlexBox from "../../atoms/FlexBox";
import { IconsWithoutFeedBack } from "../../atoms/Icons";
import PrivateLockIcon from "../../atoms/PrivateLockIcon";
import ProfilePic from "../../atoms/ProfilePic";
import Text from "../../atoms/Text";
import BadgesPreview from "../../molecules/SNS/BadgesPreview";

const Container = styled.View`
  padding: ${spacing.offset}px 0;
`;

const Info = ({ text, iconType, iconName, color }) => {
  return (
    <FlexBox alignItems="center" gap={spacing.padding}>
      <IconsWithoutFeedBack
        name={iconName}
        type={iconType}
        size={spacing.offset}
        color={color}
      />
      <Text size="sm">{text}</Text>
    </FlexBox>
  );
};

const MyInfo = () => {
  const theme = useTheme();
  const navigation = useNavigation() as any;
  const {
    private: isPrivate,
    image,
    user_name,
    introduce,
    cumulative_value,
    follower_count,
    following_count,
  } = useAppSelect((state) => state.user.user);
  const { strategy } = useAppSelect((state) => state.auth);
  const { badges } = useAppSelect((state) => state.badge);

  return (
    <Container>
      <FlexBox gap={spacing.offset} alignItems="center">
        <ProfilePic image={image} strategy={strategy} />
        <View>
          <FlexBox alignItems="center" gap={spacing.offset}>
            <Text
              size="lg"
              weight="semibold"
              styles={{ paddingBottom: spacing.small }}
            >
              {user_name}
            </Text>
            <PrivateLockIcon isPrivate={isPrivate} />
          </FlexBox>
          <Text size="sm" color={theme.textDim}>
            {introduce}
          </Text>
        </View>
      </FlexBox>
      <FlexBox
        direction="column"
        gap={useResponsiveFontSize(7)}
        styles={{ paddingTop: spacing.padding, paddingLeft: spacing.small }}
      >
        <Info
          text={`현재 가치 ${numberWithCommas(cumulative_value)}원`}
          iconName={"line-graph"}
          iconType={"entypo"}
          color={theme.text}
        />
        <Info
          text={`${follower_count} 팔로워 · ${following_count} 팔로잉`}
          iconName={"person-outline"}
          iconType={"materialIcons"}
          color={theme.text}
        />
        {badges.length > 0 && (
          <BadgesPreview
            badges={badges}
            onPress={() => navigation.navigate("Badge", { type: "me" })}
          />
        )}
      </FlexBox>
    </Container>
  );
};

export default MyInfo;
