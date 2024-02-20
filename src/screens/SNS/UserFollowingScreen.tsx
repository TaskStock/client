import { FlatList, View } from "react-native";
import React from "react";
import { useGetFriendFollowerListQuery } from "../../store/modules/getFriends";
import PageHeader, {
  PageHeaderForUserDetail,
} from "../../components/molecules/PageHeader";
import TabHeader from "../../components/molecules/TabHeader";
import { useTab } from "../../hooks/useTab";
import { TabView } from "react-native-tab-view";
import Text from "../../components/atoms/Text";
import ProfilePic from "../../components/atoms/ProfilePic";
import FlexBox from "../../components/atoms/FlexBox";
import Margin from "../../components/atoms/Margin";
import UserBox from "../../components/molecules/SNS/UserBox";
import { spacing } from "../../constants/spacing";
import { IFriend } from "../../store/modules/getFriends";
import styled, { useTheme } from "styled-components/native";
import { buttonRender } from "../../utils/UserUtils/buttonRender";

const TabContent = styled.View`
  flex: 1;
  padding-left: ${spacing.gutter};
  padding-right: ${spacing.gutter};
`;

export default function UserFollowingScreen({
  route,
}: {
  route: {
    params: {
      userId: number;
      src: string;
      username: string;
    };
  };
}) {
  const { username, src, userId } = route.params;

  const theme = useTheme();

  const { data } = useGetFriendFollowerListQuery({
    userId,
  });

  const followingList = data?.followingList;
  const followerList = data?.followerList;

  const { index, onChangeIndex, renderScene, routes } = useTab({
    routeMap: [
      { key: "following", title: "팔로잉" },
      { key: "follower", title: "팔로워" },
    ],
    sceneMap: {
      following: () => {
        return (
          <TabContent>
            {followingList?.length === 0 ? (
              <View
                style={{
                  paddingTop: spacing.offset,
                }}
              >
                <Text size="md" color={theme.textDim}>
                  팔로잉한 사용자가 없습니다.
                </Text>
              </View>
            ) : (
              <FlatList<IFriend>
                data={followingList}
                renderItem={({ item }) => {
                  const button = buttonRender(
                    item.pending,
                    item.private,
                    item.isFollowingMe,
                    item.isFollowingYou
                  );

                  return (
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
                      button={button}
                    />
                  );
                }}
                contentContainerStyle={{
                  paddingVertical: spacing.padding,
                  flex: 1,
                }}
                keyExtractor={(item) => item.user_id.toString()}
                // refreshControl={
                //   <RefreshControl
                //     refreshing={isRefreshing}
                //     onRefresh={onRefresh}
                //   />
                // }
              />
            )}
          </TabContent>
        );
      },
      follower: () => {
        return (
          <TabContent>
            {followerList?.length === 0 ? (
              <View
                style={{
                  paddingTop: spacing.offset,
                }}
              >
                <Text size="md" color={theme.textDim}>
                  팔로잉한 사용자가 없습니다.
                </Text>
              </View>
            ) : (
              <FlatList<IFriend>
                data={followerList}
                renderItem={({ item }) => {
                  const button = buttonRender(
                    item.pending,
                    item.private,
                    item.isFollowingMe,
                    item.isFollowingYou
                  );

                  return (
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
                      button={button}
                    />
                  );
                }}
                contentContainerStyle={{
                  paddingVertical: spacing.padding,
                  flex: 1,
                }}
                keyExtractor={(item) => item.user_id.toString()}
                // refreshControl={
                //   <RefreshControl
                //     refreshing={isRefreshing}
                //     onRefresh={onRefresh}
                //   />
                // }
              />
            )}
          </TabContent>
        );
      },
    },
  });

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <PageHeaderForUserDetail>
        <FlexBox
          alignItems="center"
          gap={10}
          styles={{
            paddingLeft: 10,
          }}
        >
          <ProfilePic image={src} size={40} />
          <Text size="lg" weight="bold">
            {username}
          </Text>
        </FlexBox>
      </PageHeaderForUserDetail>
      <Margin margin={10} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={onChangeIndex}
        renderTabBar={(props) => (
          <TabHeader
            props={props}
            onPressTab={(index) => {
              onChangeIndex(index);
            }}
          />
        )}
      />
    </View>
  );
}
