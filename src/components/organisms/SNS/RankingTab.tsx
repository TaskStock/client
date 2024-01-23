import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import UserBox from "../../molecules/SNS/UserBox";
import { IUserBox } from "../../../@types/userBox";
import FlexBox from "../../atoms/FlexBox";
import { IconsWithoutFeedBack } from "../../atoms/Icons";
import Text from "../../atoms/Text";
import { spacing } from "../../../constants/spacing";

const Filter = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ marginTop: spacing.padding }}>
    <FlexBox alignItems="center" gap={spacing.small}>
      <IconsWithoutFeedBack
        type="ionicons"
        name="filter"
        size={spacing.offset}
      />
      <Text size="sm">필터</Text>
    </FlexBox>
  </TouchableOpacity>
);

const RankingTab = ({ data }) => {
  return (
    <>
      <Filter onPress={() => {}} />
      <FlatList<IUserBox>
        data={data}
        renderItem={({ item }) => (
          <UserBox
            username={item.user_name}
            value={item.cumulative_value}
            image={item.image}
            strategy={item.strategy}
            userId={item.user_id}
            isPrivate={item.private}
            isPending={item.pending}
            isFollowingMe={item.isFollowingMe}
            isFollowingYou={item.isFollowingYou}

            // "user_id": 129,
            // "image": "uploads\\profile\\1705246791372-dog.jpg",
            // "user_name": "민세원",
            // "cumulative_value": 0,
            // "private": false,
            // "pending": false,
            // "strategy": "local",
            // "isFollowingMe": true,
            // "isFollowingYou": true
          />
        )}
        keyExtractor={(item) => item.user_id.toString()}
      />
    </>
  );
};

export default RankingTab;
