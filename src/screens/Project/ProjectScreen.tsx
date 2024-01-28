import React from "react";
import {
  NavigationState,
  SceneRendererProps,
  TabView,
} from "react-native-tab-view";
import TabHeader from "../../components/molecules/TabHeader";
import PageMainHeader from "../../components/molecules/PageMainHeader";
import { useTab } from "../../hooks/useTab";
import Icons from "../../components/atoms/Icons";
import { useTheme } from "styled-components/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProjectStackParamList } from "../../navigators/ProjectStack";
import { useAppDispatch } from "../../store/configureStore.hooks";
import { resetProjectForm } from "../../store/modules/project/project";
import ProjectScreenSecond from "../../components/pages/project/ProjectScreenSecond";
import ProjectScreenFirst from "../../components/pages/project/ProjectScreenFirst";

const sceneMap = {
  first: ProjectScreenFirst,
  second: ProjectScreenSecond,
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

  const theme = useTheme();

  const navigation = useNavigation<NavigationProp<ProjectStackParamList>>();

  const dispatch = useAppDispatch();

  return (
    <>
      <PageMainHeader title="프로젝트">
        <Icons
          type="entypo"
          name="circle-with-plus"
          size={28}
          color={theme.text}
          onPress={() => {
            dispatch(resetProjectForm());
            navigation.navigate("ProjectManage");
          }}
        />
      </PageMainHeader>
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
