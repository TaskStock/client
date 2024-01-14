import React from "react";
import { FlatList } from "react-native";
import UserBox from "../../molecules/SNS/UserBox";

import { IUserBox } from "../../../@types/userBox";

const RankingAll = ({ data }) => {
  return (
    <FlatList<IUserBox>
      data={data}
      renderItem={({ item }) => (
        <UserBox
          username={item.user_name}
          rank={item.rank}
          value={item.cumulative_value}
          image={item.image}
        />
      )}
      keyExtractor={(item) => item.user_id.toString()}
    />
  );
};

export default RankingAll;
