import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabView,
} from "react-native-tab-view";
import HomeTabHeader from "../components/organisms/Home/HomeTabHeader";
import ProjectContainer from "../components/organisms/Project/ProjectContainer";

const FirstRoute = () => <ProjectContainer></ProjectContainer>;

const SecondRoute = () => {
  return <ProjectContainer></ProjectContainer>;
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const ProjectScreen = () => {
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: "first", title: "프로젝트" },
    { key: "second", title: "회고" },
  ]);

  const onChangeIndex = (index: number) => {
    setIndex(index);
  };

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{
        key: string;
        title: string;
      }>;
    }
  ) => {
    return (
      <HomeTabHeader
        onPressTab={(index) => {
          setIndex(index);
        }}
        props={props}
      />
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={onChangeIndex}
      renderTabBar={(props) => renderTabBar(props)}
      // initialLayout={{ width: "100%" }}
      onSwipeEnd={() => {}}
      swipeEnabled={false}
    ></TabView>
  );
};

export default ProjectScreen;
