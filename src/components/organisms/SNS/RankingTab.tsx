import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import UserBox from "../../molecules/SNS/UserBox";

import { IUserBox } from "../../../@types/userBox";
import FlexBox from "../../atoms/FlexBox";
import { IconsWithoutFeedBack } from "../../atoms/Icons";
import Text from "../../atoms/Text";
import { spacing } from "../../../constants/spacing";

// const dummy = {
//   cumulative_value: 4000,
//   image: null,
//   rank: "1",
//   strategy: "local",
//   user_id: 126,
//   user_name: "ㅇㅈㄱ",
// };

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
            rank={item.rank}
            value={item.cumulative_value}
            image={item.image}
            strategy={item.strategy}
          />
        )}
        keyExtractor={(item) => item.user_id.toString()}
      />
    </>
  );
};

export default RankingTab;
