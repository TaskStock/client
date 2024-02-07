import { useRefresh } from "@react-native-community/hooks";
import React from "react";
import { FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { spacing } from "../../../constants/spacing";
import { useAppDispatch } from "../../../store/configureStore.hooks";
import { IFriend, getFriendsThunk } from "../../../store/modules/getFriends";
import FlexBox from "../../atoms/FlexBox";
import { IconsWithoutFeedBack } from "../../atoms/Icons";
import Text from "../../atoms/Text";
import UserBox from "../../molecules/SNS/UserBox";
import { useTheme } from "styled-components";

const Filter = ({ onPress, iconColor }) => (
  <TouchableOpacity onPress={onPress} style={{ marginTop: spacing.padding }}>
    <FlexBox alignItems="center" gap={spacing.small}>
      <IconsWithoutFeedBack
        type="ionicons"
        name="filter"
        color={iconColor}
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
  const theme = useTheme();
  return (
    <>
      <Filter onPress={() => {}} iconColor={theme.text} />
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
