import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabView,
} from "react-native-tab-view";
import styled from "styled-components/native";
import { useAppSelect } from "../../../store/configureStore.hooks";
import RankingTab from "./RankingTab";
import SnsTabHeader from "./SnsTabHeader";

const Container = styled.View`
  flex: 1;
`;

const RankingContainer = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "팔로워" },
    { key: "second", title: "팔로잉" },
  ]);
  const { followingList, followerList } = useAppSelect(
    (state) => state.friends
  );
  const FirstRoute = () => <RankingTab data={followerList} />;
  const SecondRoute = () => <RankingTab data={followingList} />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{
        key: string;
        title: string;
      }>;
    }
  ) => {
    return <SnsTabHeader props={props} setIndex={setIndex} />;
  };
  return (
    <Container>
      <TabView
        navigationState={{
          index,
          routes,
        }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => renderTabBar(props)}
        initialLayout={{ width: layout.width }}
        onSwipeEnd={() => {}}
        swipeEnabled={true}
      />
    </Container>
  );
};

export default RankingContainer;
