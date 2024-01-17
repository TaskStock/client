import React from "react";
import { View } from "react-native";
import FlexBox from "../../atoms/FlexBox";
import ProfilePic from "../../atoms/ProfilePic";
import Text from "../../atoms/Text";

const MyInfo = ({ data }) => {
  return (
    <View>
      <FlexBox>
        <ProfilePic image={data.image} strategy={data.strategy} />
        <View>
          <Text size="md">{data.user_name}</Text>
          <Text size="md">{data.introduce}</Text>
        </View>
      </FlexBox>
      <FlexBox gap={20}>
        <Text size="md">follower: {data.follower_count}</Text>
        <Text size="md">following: {data.following_count}</Text>
      </FlexBox>
      <Text size="md">{data.cumulative_value}원</Text>
    </View>
  );
};

export default MyInfo;
