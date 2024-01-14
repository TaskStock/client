import React from "react";
import { FlatList } from "react-native";
import UserBox from "../../molecules/SNS/UserBox";

import { IUserBox } from "../../../@types/userBox";

// const dummy = {
//   cumulative_value: 4000,
//   image: null,
//   rank: "1",
//   strategy: "local",
//   user_id: 126,
//   user_name: "ㅇㅈㄱ",
// };

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
          strategy={item.strategy}
        />
      )}
      keyExtractor={(item) => item.user_id.toString()}
    />
  );
};

export default RankingAll;
