import React from "react";
import {
  NavigationState,
  SceneRendererProps,
  TabView,
} from "react-native-tab-view";
import TabHeader from "../components/molecules/TabHeader";
import ProjectContainer from "../components/organisms/Project/ProjectContainer";
import PageMainHeader from "../components/molecules/PageMainHeader";
import { useTab } from "../hooks/useTab";

const FirstRoute = () => <ProjectContainer></ProjectContainer>;

const SecondRoute = () => {
  return <ProjectContainer></ProjectContainer>;
};

const sceneMap = {
  first: FirstRoute,
  second: SecondRoute,
};

const routeMap = [
  { key: "first", title: "프로젝트" },
  { key: "second", title: "회고" },
];

const ProjectScreen = () => {
  const { index, onChangeIndex, renderScene, routes } = useTab({
    routeMap,
    sceneMap,
  });

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{
        key: string;
        title: string;
      }>;
    }
  ) => {
    return <TabHeader onPressTab={onChangeIndex} props={props} />;
  };

  return (
    <>
      <PageMainHeader title="프로젝트" />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={onChangeIndex}
        renderTabBar={(props) => renderTabBar(props)}
        onSwipeEnd={() => {}}
        swipeEnabled={false}
      ></TabView>
    </>
  );
};

export default ProjectScreen;
