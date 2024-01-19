import React from "react";
import { View } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import FlexBox from "../../atoms/FlexBox";
import { IconsWithoutFeedBack } from "../../atoms/Icons";
import ProfilePic from "../../atoms/ProfilePic";
import Text from "../../atoms/Text";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import numberWithCommas from "../../../utils/useNumberWithCommas";

const Container = styled.View`
  padding: ${spacing.offset}px 0;
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

const MyInfo = ({ data }) => {
  const theme = useTheme();
  return (
    <Container>
      <FlexBox gap={spacing.offset} alignItems="center">
        <ProfilePic image={data.image} strategy={data.strategy} />
        <View>
          <Text
            size="lg"
            weight="semibold"
            styles={{ paddingBottom: spacing.small }}
          >
            {data.user_name}
          </Text>
          <Text size="xs" color={theme.textDim}>
            {data.introduce}
          </Text>
        </View>
      </FlexBox>
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
    </Container>
  );
};

export default MyInfo;
