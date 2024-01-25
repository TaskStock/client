import React, { useEffect, useRef } from "react";
import {
  NavigationState,
  SceneRendererProps,
  TabView,
} from "react-native-tab-view";
import TabHeader from "../../components/molecules/TabHeader";
import ProjectContainer from "../../components/organisms/Project/ProjectContainer";
import PageMainHeader from "../../components/molecules/PageMainHeader";
import { useTab } from "../../hooks/useTab";
import Icons from "../../components/atoms/Icons";
import { useTheme } from "styled-components/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProjectStackParamList } from "../../navigators/ProjectStack";
import { useAppDispatch } from "../../store/configureStore.hooks";
import { resetProjectForm } from "../../store/modules/project/project";
import { resetRetrospectForm } from "../../store/modules/retrospect/retrospect";
import RetrospectContainer from "../../components/organisms/Project/RetrospectContainer";
import _ from "lodash";
import { useProject } from "../../hooks/useProject";
import { useRetrospects } from "../../hooks/useRetrospects";

const ProjectScreenFirst = () => <ProjectContainer></ProjectContainer>;

const ProjectScreenSecond = () => {
  const navigation = useNavigation<NavigationProp<ProjectStackParamList>>();

  const dispatch = useAppDispatch();

  const { projects } = useProject();

  const {
    list,
    isLoading,
    isError,
    searchKeyword,
    selectedFilter,
    onScrollListBottom,
    onChangeSearchKeyword,
    onPressFilter,
  } = useRetrospects();

  const onPressWriteProject = () => {
    dispatch(
      resetRetrospectForm({
        project_id: 0,
      })
    );
    navigation.navigate("RetrospectWrite");
  };

  return (
    <>
      <RetrospectContainer
        projects={projects}
        onScrollListBottom={onScrollListBottom}
        searchKeyword={searchKeyword}
        onPressProjectItem={() => {}}
        onChangeSearchKeyword={onChangeSearchKeyword}
        onPressSearchIcon={() => {}}
        isAllRetrospects={true}
        filterIcon={require("../../../assets/icons/orderIcon.svg")}
        ProjectFilterIcon={require("../../../assets/icons/filterIcon.svg")}
        selectedFilter={selectedFilter}
        onPressFilter={onPressFilter}
        onPressWriteProject={onPressWriteProject}
        data={list}
        isLoading={isLoading}
        isError={isError}
      ></RetrospectContainer>
    </>
  );
};

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
