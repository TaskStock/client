import { View } from "react-native";
import React from "react";
import Text from "../../atoms/Text";
import { Image } from "react-native";
import { getAPIHost } from "../../../utils/getAPIHost";
import { convertSlash } from "../../../utils/convertSlash";
import styled from "styled-components/native";
import FlexBox from "../../atoms/FlexBox";

const BlankImage = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  background-color: gray;
`;

const MyInfo = ({ data }) => {
  const SERVER_URL = getAPIHost();
  const uri = convertSlash(SERVER_URL + data.image);
  return (
    <View>
      <FlexBox>
        {data.image ? (
          <Image
            style={{ width: 50, height: 50, borderRadius: 50 }}
            source={{
              uri: uri,
            }}
          />
        ) : (
          <BlankImage />
        )}
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
