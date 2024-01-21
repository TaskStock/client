import { View, Text } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import SearchAllContainer from "../../components/organisms/SNS/SearchAllContainer";
import SearchFollowingContainer from "../../components/organisms/SNS/SearchFollowingContainer";
import SearchFollowerContainer from "../../components/organisms/SNS/SearchFollowerContainer";
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabView,
} from "react-native-tab-view";
import SearchTabHeader from "../../components/organisms/SNS/SearchTabHeader";
import { useWindowDimensions } from "react-native";
import PageHeader from "../../components/molecules/PageHeader";
import { useAppSelect } from "../../store/configureStore.hooks";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const FirstRoute = () => <SearchAllContainer />;
const SecondRoute = () => <SearchFollowingContainer />;
const ThirdRoute = () => <SearchFollowerContainer />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

const renderTabBar = (
  props: SceneRendererProps & {
    navigationState: NavigationState<{
      key: string;
      title: string;
    }>;
  },
  setIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  return <SearchTabHeader props={props} setIndex={setIndex} />;
};

const SearchScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const { follower_count, following_count } = useAppSelect(
    (state) => state.user.user
  );
  const [routes] = useState([
    { key: "first", title: "전체" },
    { key: "second", title: `팔로잉 ${following_count}` },
    { key: "third", title: `팔로워 ${follower_count}` },
  ]);
  return (
    <Container>
      <PageHeader title="" />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => renderTabBar(props, setIndex)}
        initialLayout={{ width: layout.width }}
        onSwipeEnd={() => {}}
        swipeEnabled={false}
      ></TabView>
    </Container>
  );
};

export default SearchScreen;
