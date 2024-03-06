import React, { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components";
import { spacing } from "../../../constants/spacing";
import { useAppDispatch } from "../../../store/configureStore.hooks";
import { IFriend, getFriendsThunk } from "../../../store/modules/getFriends";
import FlexBox from "../../atoms/FlexBox";
import Icons from "../../atoms/Icons";
import {
  CustomRefreshControl,
  RefreshSpinner,
} from "../../atoms/LoadingSpinner";
import Text from "../../atoms/Text";
import UserBox from "../../molecules/SNS/UserBox";

const Filter = ({ onPress, iconColor }) => (
  <TouchableOpacity onPress={onPress} style={{ marginTop: spacing.padding }}>
    <FlexBox alignItems="center" gap={spacing.small}>
      <Icons
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

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      dispatch(getFriendsThunk());
      setIsRefreshing(false);
    }, 1000);
  };

  const theme = useTheme();
  return (
    <>
      {/* <Filter onPress={() => {}} iconColor={theme.text} /> */}
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
        contentContainerStyle={{
          paddingVertical: spacing.padding,
          paddingBottom: 100,
        }}
        keyExtractor={(item) => item.user_id.toString()}
        refreshControl={
          <CustomRefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<RefreshSpinner />}
      />
    </>
  );
};

export default RankingTab;
