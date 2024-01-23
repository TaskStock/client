import React from "react";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import UserBox from "../../molecules/SNS/UserBox";
import { IUserBox } from "../../../@types/userBox";
import FlexBox from "../../atoms/FlexBox";
import { IconsWithoutFeedBack } from "../../atoms/Icons";
import Text from "../../atoms/Text";
import { spacing } from "../../../constants/spacing";
import { useRefresh } from "@react-native-community/hooks";
import { useAppDispatch } from "../../../store/configureStore.hooks";
import { getFriendsThunk } from "../../../store/modules/getFriends";
import { IFriend } from "../../../store/modules/getFriends";
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
  const dispatch = useAppDispatch();
  const { isRefreshing, onRefresh } = useRefresh(() =>
    dispatch(getFriendsThunk())
  );
  return (
    <>
      <Filter onPress={() => {}} />
      <FlatList<IFriend>
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
            button={item.button}
          />
        )}
        style={{ flex: 1 }}
        keyExtractor={(item) => item.user_id.toString()}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    </>
  );
};

export default RankingTab;
